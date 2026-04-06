import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ShinyButton } from "@/components/ui/shiny-button"

const features = [
  "Неограниченно задач",
  "Все классы (5–11)",
  "Все разделы математики",
  "Подготовка к ОГЭ и ЕГЭ",
  "Пошаговые объяснения",
  "Трекер прогресса",
  "Похожие задачи для закрепления",
  "Мобильная версия",
]

export function PricingSection() {
  return (
    <section className="py-20 relative overflow-hidden" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="border border-border py-1 px-4 rounded-lg text-sm text-muted-foreground">Доступ</div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-balance font-display">
            Полностью бесплатно
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            МатемАИ — школьный проект. Весь функционал открыт для всех без оплаты и регистрации.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto"
        >
          <Card className="p-8 border-primary shadow-lg shadow-primary/10 flex flex-col items-center text-center">
            <div className="mb-6">
              <div className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1 rounded-full mb-4">
                Школьный проект
              </div>
              <div className="flex items-baseline gap-1 justify-center">
                <span className="text-6xl font-bold">0 ₽</span>
              </div>
              <p className="text-muted-foreground mt-2">навсегда бесплатно</p>
            </div>

            <ul className="space-y-3 mb-8 w-full text-left">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <ShinyButton className="w-full text-base">
              Начать прямо сейчас
            </ShinyButton>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
