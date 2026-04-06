import json
import os
import psycopg2

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """Получение списка учебников по классу и сохранение выбранного учебника пользователя"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    conn = get_conn()
    cur = conn.cursor()

    if event.get("httpMethod") == "GET":
        grade = event.get("queryStringParameters", {}).get("grade")
        if not grade:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "grade обязателен"})}
        cur.execute(
            "SELECT id, title, author, subject FROM textbooks WHERE %s = ANY(grades) ORDER BY subject, author",
            (int(grade),)
        )
        rows = cur.fetchall()
        books = [{"id": r[0], "title": r[1], "author": r[2], "subject": r[3]} for r in rows]
        return {"statusCode": 200, "headers": headers, "body": json.dumps(books)}

    if event.get("httpMethod") == "POST":
        body = json.loads(event.get("body") or "{}")
        user_id = body.get("user_id")
        textbook_id = body.get("textbook_id")
        if not user_id or not textbook_id:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "user_id и textbook_id обязательны"})}
        cur.execute(
            "UPDATE users SET textbook_id = %s WHERE id = %s RETURNING id, email, name, grade, textbook_id",
            (textbook_id, user_id)
        )
        row = cur.fetchone()
        conn.commit()
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"id": row[0], "email": row[1], "name": row[2], "grade": row[3], "textbook_id": row[4]})
        }

    return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}
