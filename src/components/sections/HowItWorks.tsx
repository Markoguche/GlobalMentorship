import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Search, UserCheck, CreditCard, FileText, Video, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { number: '01', icon: Search, title: 'Browse Mentors', description: 'Explore our curated list of world-class mentors across various industries and expertise areas.' },
  { number: '02', icon: UserCheck, title: 'Choose a Mentor', description: 'Review profiles, expertise, and pricing to find the perfect mentor for your goals.' },
  { number: '03', icon: CreditCard, title: 'Pay for Session', description: 'Secure your session with our safe and seamless payment system.' },
  { number: '04', icon: FileText, title: 'Sign Agreement', description: 'Complete a simple mentorship agreement to set expectations and goals.' },
  { number: '05', icon: Video, title: 'Attend Session', description: 'Join your virtual or physical mentorship session and start your transformation.' }
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = stepsRef.current?.querySelectorAll('.step-item')
      if (steps) {
        gsap.from(steps, {
          scrollTrigger: { trigger: stepsRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
          x: -50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
        })
      }
      const line = stepsRef.current?.querySelector('.connecting-line')
      if (line) {
        gsap.from(line, {
          scrollTrigger: { trigger: stepsRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
          scaleX: 0, transformOrigin: 'left center', duration: 1.5, ease: 'power2.out'
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 relative bg-background text-foreground overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 backdrop-blur-sm border border-primary/20"
          >
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            How the Platform Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Get matched with your ideal mentor in just a few clicks.
          </motion.p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connecting Line - Green in both modes */}
          <div className="connecting-line hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-primary" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="step-item relative"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative group">
                  {/* Number Badge - White in Dark, Green in Light */}
                  <div className={
                    `absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10
                    bg-primary text-white dark:bg-white dark:text-primary`
                  }>
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="bg-card border border-border rounded-2xl p-6 hover:bg-muted/50 transition-all duration-300 h-full">
                    {/* Icon Container */}
                    <div className={
                      `w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300
                      bg-primary text-white dark:bg-white dark:text-primary`
                    }>
                      <step.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link
            to="/mentors"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-300 shadow-lg
            /* Light Mode: Green bg -> Hover White bg */
            bg-primary text-white hover:bg-white hover:text-primary
            /* Dark Mode: White bg -> Hover Green bg */
            dark:bg-white dark:text-primary dark:hover:bg-primary dark:hover:text-white"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}