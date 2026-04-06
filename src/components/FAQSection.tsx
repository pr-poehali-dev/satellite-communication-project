import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "МатемАИ просто даёт готовые ответы?",
    answer:
      "Нет. МатемАИ объясняет каждый шаг решения понятным языком. Цель — помочь ученику разобраться в теме, а не списать. ИИ задаёт наводящие вопросы и показывает логику решения, а не просто финальный ответ.",
  },
  {
    question: "Для каких классов подходит сервис?",
    answer:
      "МатемАИ охватывает программу 5–11 классов: арифметика, алгебра, геометрия, тригонометрия, начала анализа. Также есть задачи из демо-вариантов ОГЭ и ЕГЭ.",
  },
  {
    question: "Какие учебники поддерживаются?",
    answer:
      "В базе задачи из самых распространённых российских учебников: Мерзляк, Макарычев, Атанасян, Петерсон, Никольский и другие. База пополняется каждый месяц.",
  },
  {
    question: "Можно использовать с телефона?",
    answer:
      "Да, МатемАИ полностью адаптирован для мобильных устройств. Открывай прямо в браузере телефона — без установки приложений.",
  },
  {
    question: "Как работает бесплатный тариф?",
    answer:
      "На бесплатном тарифе доступно до 10 задач в день с пошаговыми объяснениями. Для неограниченного доступа и расширенных функций можно перейти на платный тариф.",
  },
  {
    question: "Безопасно ли для детей?",
    answer:
      "МатемАИ разработан специально для школьников. Никакой рекламы, стороннего контента и нежелательных материалов. Родители могут подключить семейный тариф и следить за прогрессом ребёнка.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-12"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg text-sm text-muted-foreground">FAQ</div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-5 text-center">
            Частые вопросы
          </h2>
          <p className="text-center mt-5 text-muted-foreground">Всё, что нужно знать о МатемАИ.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-display text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
