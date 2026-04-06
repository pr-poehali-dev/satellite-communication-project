import { Card } from "@/components/ui/card"
import Icon from "@/components/ui/icon"
import { motion } from "framer-motion"

export function FeaturesSection() {
  const features = [
    {
      icon: "MessageCircle",
      title: "Простые объяснения",
      description: "ИИ объясняет каждый шаг понятным языком — как будто рядом сидит умный старший брат.",
    },
    {
      icon: "BookOpen",
      title: "Задачи из учебников",
      description: "База задач из школьных учебников по алгебре, геометрии, тригонометрии и другим разделам.",
    },
    {
      icon: "Layers",
      title: "Пошаговое решение",
      description: "Никаких готовых ответов без объяснений. Каждый шаг разобран, чтобы ученик понял логику.",
    },
    {
      icon: "GraduationCap",
      title: "Подготовка к ОГЭ и ЕГЭ",
      description: "Тысячи задач из демо-вариантов экзаменов с разбором типичных ошибок.",
    },
    {
      icon: "TrendingUp",
      title: "Прогресс обучения",
      description: "Отслеживай, какие темы уже освоены, а над какими стоит поработать больше.",
    },
    {
      icon: "ShieldCheck",
      title: "Безопасно для детей",
      description: "Сервис разработан специально для школьников — без рекламы и лишнего контента.",
    },
  ]

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32" id="features">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-balance font-display">
          Всё, что нужно для уверенного решения задач
        </h2>
        <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
          МатемАИ помогает не списывать, а по-настоящему понимать математику — шаг за шагом.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors h-full">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={feature.icon} className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-display">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
