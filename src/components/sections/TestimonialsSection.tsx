import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '../../data/mentors'

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={sectionRef} className="section-padding relative bg-gradient-to-b from-white via-surface-50/50 to-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-100/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-navy-100/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-5xl mx-auto container-padding">
        {/* Header */}
        <div className="testimonial-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-600 text-sm font-semibold mb-6">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
            What Our{' '}
            <span className="text-primary-500">Mentees Say</span>
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Real transformations from real professionals who took the leap and invested in their growth.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-glass-lg border border-navy-100 p-8 md:p-12 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 left-8 w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary-500" />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Stars */}
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl text-navy-700 leading-relaxed mb-6 italic">
                    "{testimonials[activeIndex].content}"
                  </blockquote>

                  {/* Author */}
                  <div>
                    <p className="font-semibold text-navy-900">{testimonials[activeIndex].name}</p>
                    <p className="text-sm text-primary-500">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-xl bg-white border border-navy-200 flex items-center justify-center hover:bg-navy-50 hover:border-navy-300 transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5 text-navy-600" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-primary-500'
                      : 'w-2 bg-navy-200 hover:bg-navy-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-xl bg-white border border-navy-200 flex items-center justify-center hover:bg-navy-50 hover:border-navy-300 transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5 text-navy-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}