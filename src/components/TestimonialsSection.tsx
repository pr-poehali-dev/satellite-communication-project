import { motion } from "framer-motion"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

const testimonials = [
  {
    text: "Сын наконец-то разобрался с квадратными уравнениями! Раньше ждали репетитора три раза в неделю, теперь он сам решает с МатемАИ.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Ирина Смирнова",
    role: "Мама ученика 8 класса",
  },
  {
    text: "Потрясающе, что ИИ не просто даёт ответ, а объясняет каждый шаг. Дочь реально стала понимать геометрию, а не просто списывать.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Андрей Козлов",
    role: "Папа ученицы 9 класса",
  },
  {
    text: "Использую МатемАИ на самоподготовке. Объяснения намного понятнее, чем в учебнике. Особенно помогло перед ОГЭ.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Маша Т.",
    role: "Ученица, 9 класс",
  },
  {
    text: "Как учитель математики, я рада, что такой сервис появился. Дети приходят подготовленными, вопросы стали глубже.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Наталья Петрова",
    role: "Учитель математики",
  },
  {
    text: "Готовлюсь к ЕГЭ и МатемАИ стал незаменимым помощником. Нашёл задачи именно из тех тем, где у меня были пробелы.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Дима К.",
    role: "Выпускник, 11 класс",
  },
  {
    text: "Раньше математика была кошмаром. Теперь понимаю откуда берутся формулы. МатемАИ объясняет так, что запоминается.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Катя Н.",
    role: "Ученица, 7 класс",
  },
  {
    text: "Как репетитор использую МатемАИ для домашних заданий своих учеников. Они разбирают задачи сами, а на уроке мы идём дальше.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Артём Волков",
    role: "Репетитор по математике",
  },
  {
    text: "Подписку взяли на весь год. Оба ребёнка пользуются каждый день. Оценки по математике выросли у обоих.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Елена Морозова",
    role: "Мама двух школьников",
  },
  {
    text: "Сервис помог понять дроби — это была моя главная проблема. Теперь решаю задачи сам и даже помогаю однокласснику.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Максим Б.",
    role: "Ученик, 6 класс",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export function TestimonialsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg text-sm text-muted-foreground">Отзывы</div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-5 text-center">
            Что говорят ученики и родители
          </h2>
          <p className="text-center mt-5 text-muted-foreground">
            Тысячи школьников уже улучшили оценки с МатемАИ.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  )
}
