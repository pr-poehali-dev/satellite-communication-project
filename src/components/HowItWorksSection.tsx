import { motion } from "framer-motion"
import { Brain, Activity, CheckCircle2, ArrowUpRight, BookOpen, Search } from "lucide-react"
import { Card } from "@/components/ui/card"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "Найди задачу",
      description:
        "Введи номер задачи из учебника или сфотографируй её. МатемАИ мгновенно найдёт нужное и поймёт, о чём задача.",
      visual: (
        <div className="h-[280px] flex items-center justify-center">
          <Card className="w-full p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Алгебра, 8 класс</p>
                    <p className="text-sm text-muted-foreground">Задача №247</p>
                  </div>
                </div>
                <p className="font-bold text-lg text-primary">Найдено</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">Тема</span>
                  <span className="text-sm font-medium">Квадратные уравнения</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">Сложность</span>
                  <span className="text-sm font-medium">Средняя</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      icon: Brain,
      title: "ИИ объясняет решение",
      description:
        "Искусственный интеллект разбирает задачу пошагово, объясняет каждое действие простым языком и показывает, почему именно так.",
      visual: (
        <div className="h-[280px] flex items-center justify-center">
          <Card className="w-full p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold">МатемАИ объясняет</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <Activity className="w-3 h-3" />
                  <span>Активен</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">Шаг 1: Записываем условие</p>
                    <p className="text-xs text-muted-foreground">x² + 5x + 6 = 0</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">Шаг 2: Находим дискриминант</p>
                    <p className="text-xs text-muted-foreground">D = b² − 4ac = 25 − 24 = 1</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">Шаг 3: Находим корни</p>
                    <p className="text-xs text-muted-foreground">x₁ = −2, x₂ = −3</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      icon: ArrowUpRight,
      title: "Закрепи и расти",
      description:
        "После объяснения ИИ предложит похожие задачи для закрепления. Твой прогресс сохраняется — видно, что уже освоено.",
      visual: (
        <div className="h-[280px] flex items-center justify-center">
          <Card className="w-full p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold">Мой прогресс</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+12 задач</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Квадратные уравнения</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-primary rounded-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Геометрия: площади</span>
                    <span className="font-semibold">72%</span>
                  </div>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-primary rounded-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Дроби и проценты</span>
                    <span className="font-semibold">94%</span>
                  </div>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <div className="h-full w-[94%] bg-primary rounded-full" />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-primary/10 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Решено задач</p>
                  <p className="text-lg font-bold text-primary">138</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Дней подряд</p>
                  <p className="text-lg font-bold text-primary">14</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Как это работает</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Три простых шага от непонятной задачи до уверенного знания
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="mb-6">{step.visual}</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Шаг {index + 1}</span>
              </div>
              <h3 className="text-xl font-bold font-display mb-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
