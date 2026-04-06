import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Card } from "@/components/ui/card"
import Icon from "@/components/ui/icon"

const TEXTBOOKS_URL = "https://functions.poehali.dev/13d191ca-1561-4110-a815-2154fd58441e"

interface Textbook {
  id: number
  title: string
  author: string
  subject: string
}

const subjectColors: Record<string, string> = {
  "Математика": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Алгебра": "bg-violet-500/10 text-violet-500 border-violet-500/20",
  "Геометрия": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
}

const subjectIcons: Record<string, string> = {
  "Математика": "Calculator",
  "Алгебра": "FunctionSquare",
  "Геометрия": "Triangle",
}

export default function Books() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [books, setBooks] = useState<Textbook[]>([])
  const [grouped, setGrouped] = useState<Record<string, Textbook[]>>({})
  const [selected, setSelected] = useState<number | null>(user?.textbook_id ?? null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!user) { navigate("/"); return }
    if (!user.grade) { navigate("/dashboard"); return }

    fetch(`${TEXTBOOKS_URL}?grade=${user.grade}`)
      .then((r) => r.json())
      .then((data: Textbook[]) => {
        setBooks(data)
        const g: Record<string, Textbook[]> = {}
        data.forEach((b) => {
          if (!g[b.subject]) g[b.subject] = []
          g[b.subject].push(b)
        })
        setGrouped(g)
      })
      .finally(() => setFetching(false))
  }, [user, navigate])

  const handleSave = async () => {
    if (!selected || !user) return
    setLoading(true)
    const res = await fetch(TEXTBOOKS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, textbook_id: selected }),
    })
    const data = await res.json()
    if (res.ok) {
      updateUser(data)
      navigate("/dashboard")
    }
    setLoading(false)
  }

  const handleLogout = () => { logout(); navigate("/") }

  const selectedBook = books.find((b) => b.id === selected)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold font-display">МатемАИ</a>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">{user?.name || user?.email}</span>
          <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Выйти
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
              <Icon name="GraduationCap" size={14} />
              {user?.grade} класс
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display mb-3">Выбери учебник</h1>
            <p className="text-muted-foreground text-lg">
              По какому учебнику занимаешься? Подберём задачи именно из него.
            </p>
          </div>

          {fetching ? (
            <div className="text-center text-muted-foreground py-16">Загружаем учебники...</div>
          ) : (
            <div className="space-y-8">
              {Object.entries(grouped).map(([subject, subjectBooks]) => (
                <div key={subject}>
                  <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${subjectColors[subject] || "bg-muted text-muted-foreground"}`}>
                    <Icon name={subjectIcons[subject] || "BookOpen"} size={12} fallback="BookOpen" />
                    {subject}
                  </div>
                  <div className="grid gap-3">
                    {subjectBooks.map((book) => (
                      <motion.button
                        key={book.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelected(book.id)}
                        className="w-full text-left"
                      >
                        <Card className={`p-4 flex items-center gap-4 transition-all cursor-pointer ${
                          selected === book.id
                            ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                            : "border-border hover:border-primary/40"
                        }`}>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            selected === book.id ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}>
                            <Icon name="BookOpen" size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">{book.title}</p>
                            <p className="text-muted-foreground text-sm">{book.author}</p>
                          </div>
                          {selected === book.id && (
                            <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0" />
                          )}
                        </Card>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 space-y-3">
            <ShinyButton
              className="w-full text-base py-3"
              disabled={!selected || loading}
              onClick={handleSave}
            >
              {loading
                ? "Сохраняем..."
                : selectedBook
                ? `Выбрать «${selectedBook.title} — ${selectedBook.author}»`
                : "Выберите учебник"}
            </ShinyButton>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              ← Изменить класс
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
