import json
import os
import hashlib
import secrets
import psycopg2

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def hash_password(password: str, salt: str) -> str:
    return hashlib.sha256(f"{salt}{password}".encode()).hexdigest()

def handler(event: dict, context) -> dict:
    """Регистрация и вход пользователей через email и пароль"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    action = body.get("action")
    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""

    if not email or not password:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Email и пароль обязательны"})}

    conn = get_conn()
    cur = conn.cursor()

    if action == "register":
        name = (body.get("name") or "").strip()
        salt = secrets.token_hex(16)
        pw_hash = hash_password(password, salt)
        stored = f"{salt}:{pw_hash}"
        try:
            cur.execute(
                "INSERT INTO users (email, password_hash, name) VALUES (%s, %s, %s) RETURNING id, email, name",
                (email, stored, name)
            )
            row = cur.fetchone()
            conn.commit()
            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps({"id": row[0], "email": row[1], "name": row[2]})
            }
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            return {"statusCode": 409, "headers": headers, "body": json.dumps({"error": "Этот email уже зарегистрирован"})}

    elif action == "login":
        cur.execute("SELECT id, email, name, password_hash FROM users WHERE email = %s", (email,))
        row = cur.fetchone()
        if not row:
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Неверный email или пароль"})}
        user_id, user_email, user_name, stored = row
        salt, pw_hash = stored.split(":", 1)
        if hash_password(password, salt) != pw_hash:
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Неверный email или пароль"})}
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"id": user_id, "email": user_email, "name": user_name})
        }

    return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Неизвестное действие"})}
