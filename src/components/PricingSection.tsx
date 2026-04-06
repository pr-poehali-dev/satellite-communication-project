import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ShinyButton } from "@/components/ui/shiny-button"

const pricingTiers = [
  {
    name: "Бесплатный",
    price: "0 ₽",
    period: "/мес",
    description: "Попробуй МатемАИ без оплаты — идеально для знакомства",
    features: [
      "10 задач в день",
      "Алгебра и геометрия (5–7 кл.)",
      "Пошаговые объяснения",
      "История решений",
      "Мобильная версия",
    ],
    cta: "Начать бесплатно",
    popular: false,
  },
  {
    name: "Ученик",
    price: "299 ₽",
    period: "/мес",
    description: "Для активной подготовки к урокам, ОГЭ и ЕГЭ",
    features: [
      "Неограниченно задач",
      "Все классы (5–11)",
      "Все разделы математики",
      "Подготовка к ОГЭ и ЕГЭ",
      "Трекер прогресса",
      "Похожие задачи для закрепления",
      "Приоритетная поддержка",
    ],
    cta: "Попробовать бесплатно",
    popular: true,
  },
  {
    name: "Семейный",
    price: "499 ₽",
    period: "/мес",
    description: "Для семей с несколькими детьми-школьниками",
    features: [
      "До 3 учеников",
      "Всё из тарифа «Ученик»",
      "Родительский дашборд",
      "Отчёт об успеваемости",
      "Уведомления родителям",
      "Поддержка 24/7",
    ],
    cta: "Попробовать бесплатно",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="border border-border py-1 px-4 rounded-lg text-sm text-muted-foreground">Тарифы</div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-balance font-display">
            Доступно каждому школьнику
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Начни бесплатно, перейди на полный доступ когда понадобится.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Популярный
                  </span>
                </div>
              )}
              <Card
                className={`p-8 h-full flex flex-col ${
                  tier.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border"
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold font-display mb-1">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <ShinyButton
                  variant={tier.popular ? "default" : "secondary"}
                  className="w-full"
                >
                  {tier.cta}
                </ShinyButton>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
