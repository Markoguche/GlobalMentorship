import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Search, UserCheck, CreditCard, FileText, Video, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Browse Mentors',
    description: 'Explore our curated list of world-class mentors across various industries and expertise areas.',
    color: 'blue'
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Choose a Mentor',
    description: 'Review profiles, expertise, and pricing to find the perfect mentor for your goals.',
    color: 'blue'
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Pay for Session',
    description: 'Secure your session with our safe and seamless payment system.',
    color: 'blue'
  },
  {
    number: '04',
    icon: FileText,
    title: 'Sign Agreement',
    description: 'Complete a simple mentorship agreement to set expectations and goals.',
    color: 'blue'
  },
  {
    number: '05',
    icon: Video,
    title: 'Attend Session',
    description: 'Join your virtual or physical mentorship session and start your transformation.',
    color: 'blue'
  }
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate steps on scroll
      const steps = stepsRef.current?.querySelectorAll('.step-item')
      if (steps) {
        gsap.from(steps, {
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        })
      }

      // Animate connecting line
      const line = stepsRef.current?.querySelector('.connecting-line')
      if (line) {
        gsap.from(line, {
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.5,
          ease: 'power2.out'
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const colorClasses = {
    primary: 'from-primary-400 to-primary-500 bg-primary-50 text-primary-600 border-primary-200',
    emerald: 'from-emerald-400 to-emerald-500 bg-emerald-50 text-emerald-600 border-emerald-200',
    blue: 'from-blue-400 to-blue-500 bg-blue-50 text-blue-600 border-blue-200',
    violet: 'from-violet-400 to-violet-500 bg-violet-50 text-violet-600 border-violet-200',
    amber: 'from-amber-400 to-amber-500 bg-amber-50 text-amber-600 border-amber-200'
  }

  return (
    <section id="how-it-works" ref={sectionRef} className="section-padding relative bg-navy-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-white/10 text-primary-300 text-sm font-semibold mb-6 backdrop-blur-sm border border-white/10"
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
            className="text-lg text-navy-300 max-w-2xl mx-auto"
          >
            Get matched with your ideal mentor in just a few clicks. Our streamlined process makes professional mentorship accessible to everyone.
          </motion.p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connecting Line */}
          <div className="connecting-line hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-white" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="step-item relative"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative group">
                  {/* Number Badge */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[1]} flex items-center justify-center text-xs font-bold text-white shadow-lg z-10`}>
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 h-full">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[1]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-white">{step.title}</h3>
                    <p className="text-sm text-navy-300 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Arrow (except last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-white/50" />
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
          className="text-center my-32"
        >
          <a
            href="/mentors"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r bg-blue-600 text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg shadow-white/25 hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}