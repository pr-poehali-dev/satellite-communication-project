import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ShinyButton } from "@/components/ui/shiny-button"
import { useAuth } from "@/context/AuthContext"

const AUTH_URL = "https://functions.poehali.dev/784177df-b493-47ab-b6c7-c799e2b74e35"

export function AuthModal() {
  const { authOpen, setAuthOpen, login } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const reset = () => {
    setName("")
    setEmail("")
    setPassword("")
    setError("")
  }

  const switchMode = (m: "login" | "register") => {
    setMode(m)
    reset()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: mode, email, password, name }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Что-то пошло не так")
      } else {
        login(data)
        reset()
        navigate("/dashboard")
      }
    } catch {
      setError("Ошибка соединения. Попробуй ещё раз.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={authOpen} onOpenChange={setAuthOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-display text-center">
            {mode === "login" ? "Войти в МатемАИ" : "Создать аккаунт"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {mode === "register" && (
            <div>
              <label className="text-sm font-medium mb-1 block">Имя</label>
              <Input
                placeholder="Как тебя зовут?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <Input
              type="email"
              placeholder="example@mail.ru"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Пароль</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <ShinyButton type="submit" className="w-full text-base" disabled={loading}>
            {loading ? "Подождите..." : mode === "login" ? "Войти" : "Зарегистрироваться"}
          </ShinyButton>
        </form>

        <div className="text-center text-sm text-muted-foreground mt-2">
          {mode === "login" ? (
            <>
              Нет аккаунта?{" "}
              <button onClick={() => switchMode("register")} className="text-primary hover:underline font-medium">
                Зарегистрироваться
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?{" "}
              <button onClick={() => switchMode("login")} className="text-primary hover:underline font-medium">
                Войти
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
