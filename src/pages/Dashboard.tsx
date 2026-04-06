import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Card } from "@/components/ui/card"

const AUTH_URL = "https://functions.poehali.dev/784177df-b493-47ab-b6c7-c799e2b74e35"

const grades = [5, 6, 7, 8, 9, 10, 11]

export default function Dashboard() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<number | null>(user?.grade ?? null)
  const [loading, setLoading] = useState(false)

  if (!user) {
    navigate("/")
    return null
  }

  const handleSave = async () => {
    if (!selected) return
    setLoading(true)
    const res = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "set_grade", user_id: user.id, grade: selected }),
    })
    const data = await res.json()
    if (res.ok) updateUser(data)
    setLoading(false)
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold font-display">МатемАИ</a>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {user.name || user.email}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Выйти
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-display mb-3">
            {user.grade ? "Твой класс" : `Привет, ${user.name || "ученик"}!`}
          </h1>
          <p className="text-muted-foreground mb-10 text-lg">
            {user.grade
              ? "Можешь изменить класс в любое время"
              : "Выбери свой класс, чтобы мы подобрали задачи по программе"}
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mb-10">
            {grades.map((g) => (
              <motion.button
                key={g}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelected(g)}
                className="aspect-square"
              >
                <Card
                  className={`w-full h-full flex items-center justify-center text-xl font-bold font-display transition-all cursor-pointer
                    ${selected === g
                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "border-border hover:border-primary/50"
                    }`}
                >
                  {g}
                </Card>
              </motion.button>
            ))}
          </div>

          <ShinyButton
            className="w-full text-base py-3"
            disabled={!selected || loading}
            onClick={handleSave}
          >
            {loading
              ? "Сохраняем..."
              : user.grade
              ? `Сохранить изменения (${selected} класс)`
              : `Начать с ${selected ?? "..."} классом`}
          </ShinyButton>

          {user.grade && (
            <p className="mt-4 text-sm text-muted-foreground">
              Текущий класс: <span className="text-foreground font-semibold">{user.grade}</span>
            </p>
          )}
        </motion.div>
      </main>
    </div>
  )
}
