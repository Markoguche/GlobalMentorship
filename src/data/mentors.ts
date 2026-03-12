import men1 from '../assets/men1.jpg';
import men2 from '../assets/men2.jpg';
import men3 from '../assets/men3.jpg';
import men4 from '../assets/men4.jpg';
import icon1 from '../assets/icon.jpg';
import icon2 from '../assets/icon2.jpg';

export interface Mentor {
  id: number;
  name: string;
  title: string;
  bio: string;
  fullBio: string;
  skills: string[];
  price: number;
  image: string;
  rating: number;
  sessions: number;
  location: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export const mentors: Mentor[] = [
  {
    id: 1,
    name: "Oyewole Joledo",
    title: "MBA, MSc — 6X Startup Founder",
    bio: "A passionate Country Director with a proven track record of driving growth through strategic partnerships.",
    fullBio: `Oyewole Joledo is a passionate Country Director / Business Development Manager with a proven track record of driving growth through strategic partnerships, product launches, and innovative marketing initiatives. He excels at building strong relationships with key stakeholders, from government officials to industry leaders, to create win-win scenarios and unlock new market opportunities.

Highlights of his achievements include:
- Launched a tech solution that secured 7,000+ sign-ups and generated revenue within four months.
- Onboarded 4,000+ tech talents and established partnerships with key players in the tech industry.
- Led business development initiatives at Servelead Global, achieving a staggering 50% and then 60% YoY revenue increase.
- Cultivated a thriving work environment, fostering employee engagement and productivity, evidenced by winning the "Young Entrepreneur of the Year" award.`,
    skills: ["Business Development", "Strategic Partnerships", "Management", "Leadership", "Start-ups"],
    price: 200,
    image: men1,
    rating: 4.8,
    sessions: 189,
    location: "London, UK/Abuja, Nigeria"
  },
  {
    id: 2,
    name: "Ijeoma Aladesaye",
    title: "CEO & Leadership Expert",
    bio: "An experienced, result oriented, and transformational leader dedicated to steering companies towards measurable growth.",
    fullBio: `Ijeoma Aladesaye is an experienced, result oriented, and transformational leader, who is dedicated to steering companies/organisations towards measurable growth and visualised impact. With an unwavering commitment to excellence, she embraces challenges as opportunities and thrives in achieving the seemingly impossible.

In her role as Chief Executive Officer at Servelead Group of Companies and Program Director at Respectech HR, she has forged successful partnerships with local and international organisations, facilitated the training and mentorship of over 700 talents in the tech and non Tech space, and orchestrated numerous job placements, aligning talents with companies for mutual benefit.

She has spearheaded the establishment and growth of multiple businesses, earning recognition such as the Servelead Global Award for Excellence. Driven by a passion for excellence and a relentless pursuit of success, she is poised to continue making meaningful contributions to organisational growth and societal advancement.`,
    skills: ["Strategic Vision Mapping", "Leadership Development", "Public Speaking", "People Management", "Change Management", "Emotional Intelligence"],
    price: 150,
    image: men2,
    rating: 4.9,
    sessions: 234,
    location: "Abuja, Nigeria"
  },
  {
    id: 3,
    name: "Pamela Williams",
    title: "Award-Winning Brand Strategist",
    bio: "An Award-Winning Media, Brand, and Communications Expert, empowering brands and championing creativity.",
    fullBio: `Pamela Williams is an Award-Winning Media, Brand, and Communications Expert, empowering brands, championing creativity, and making a positive difference. She helps you shape and elevate your brand's success by transforming your ideas into revenue through creative direction, project management, experience curation, brand and content strategy development, social media management, digital marketing, and content writing.

She is the Creative Director of Aidos Creations, a media agency in Abuja, Nigeria.

Pamela Williams has had multiple awards over the years. In 2023, she was awarded Nigeria's 25 under 25 as the Media and Communications category winner. In 2022, she won Staff of the Year, Most Punctual Staff, Most Resourceful, and an Award of Excellence from Servelead Group of Companies. She also won the LEADERCOM award from Social Good Fund, California, and was named Entrepreneur of the Year by Rhema Chapel Campus Fellowship.

With an understanding of the pivotal role that a strong online presence plays in shaping and elevating a brand's success, she consistently aims to help you stand out. She delivers exceptional, excellent, and effective public speeches and trainings that educate, empower, and enrich diverse target audiences.`,
    skills: ["Brand Strategy", "Creative Direction", "Digital Marketing", "Content Development", "Public Speaking", "Event Planning"],
    price: 100,
    image: men3,
    rating: 4.9,
    sessions: 156,
    location: "Abuja, Nigeria"
  },
  {
    id: 4,
    name: "Princess Alugwe",
    title: "International Development Expert",
    bio: "A dedicated Program Manager in the international development sector, deeply committed to the Sustainable Development Goals.",
    fullBio: `Princess Alugwe is a dedicated Program Manager in the international development sector, deeply committed to the Sustainable Development Goals (SDGs). Her passion for driving positive change is reflected through extensive volunteer experience in health, education, poverty alleviation, and climate change sectors.

Current Role: Head of Programmes, Servelead Humanitarian
In her current role at Servelead Humanitarian, Princess oversees all humanitarian efforts in Nigeria, managing projects worth over $200,000. Her responsibilities include strategic planning, program implementation, and ensuring that initiatives align with the mission to foster sustainable development and human welfare.

Key Expertise:
- Project/Program Management: Skilled in planning, executing, and overseeing projects.
- Grant Writing: Proficient in securing funding and managing grants.
- Development Communications: Known as "The Social Impact Communicator," Princess excels in crafting compelling narratives that highlight the impact of development initiatives in Africa.

An accomplished public speaker, Princess regularly engages audiences on topics related to sustainable development and social impact. Additionally, she provides training in grant writing, LinkedIn optimization, project/program management, and volunteer management.`,
    skills: ["Program Management", "Grant Writing", "LinkedIn Optimization", "Development Communications", "Volunteer Management", "SDG Advocacy"],
    price: 90,
    image: men4,
    rating: 4.7,
    sessions: 98,
    location: "Abuja, Nigeria"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Chinedu Okoro",
    role: "Founder, TechStart Africa",
    content: "The mentorship I received completely transformed my approach to business. My revenue grew 3x in just 6 months.",
    avatar: icon1
  },
  {
    id: 2,
    name: "Amara Eze",
    role: "CEO, GreenLeaf Solutions",
    content: "I was struggling with scaling my startup. After just 3 sessions, I had a clear roadmap and the confidence to execute.",
    avatar: icon2
  },
  {
    id: 3,
    name: "David Babatunde",
    role: "Product Lead, Fintech Corp",
    content: "The quality of mentors here is exceptional. Real industry leaders who actually care about your growth.",
    avatar: icon1
  }
];