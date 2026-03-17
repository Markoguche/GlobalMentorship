import men1 from '../assets/men1.jpg';
import men2 from '../assets/men2.jpg';
import men3 from '../assets/men3.jpg';
import men4 from '../assets/men4.jpg';
import men5 from '../assets/men5.jpg'; 
import men6 from '../assets/men6.jpg'; 
import men7 from '../assets/men7.jpg'; 
import men8 from '../assets/men8.jpg'; 
import men9 from '../assets/men9.jpg'; 
import men10 from '../assets/men10.jpg'; 
import men11 from '../assets/men11.jpg'; 
import men12 from '../assets/men12.jpg'; 
import men13 from '../assets/men13.jpg'; 

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
  email: string;
  category: 'CEO' | 'CTO' | 'CMO' | 'Creative' | 'Operations' | 'Expert';
  linkedin: string;
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
    price: 200, // KEEP
    image: men1,
    rating: 4.8,
    sessions: 200,
    location: "London, UK / Abuja, Nigeria",
    email: "oyewole@example.com",
    category: "CEO",
    linkedin: "https://www.linkedin.com/in/oyewole-joledo-mba-m-sc-7a2617a2"
  },
  {
    id: 9,
    name: "Matt Black",
    title: "AI Strategist & Founder Advisor",
    bio: "Exploring how AI reshapes the architecture of organizations and decision-making for founders and investors.",
    fullBio: `Artificial intelligence is moving from tools to systems. Networks of intelligent agents are beginning to perform real work inside software, organizations, and infrastructure. This shift changes how companies are built. It also changes how founders operate. And it raises new questions about control, governance, and sovereignty in an Al-mediated world.

My work explores the operating systems emerging in this new era. Over the past four decades I have built companies, advised founders, and worked with thousands of businesses across multiple industries. That experience now informs my exploration of how Al reshapes the architecture of organizations and decision-making.

Focus Areas:
- AI-native companies
- Multi-agent systems
- AI sovereignty
- Decision intelligence
- Human-Al collaboration
- Founder leverage through Al

I'm particularly interested in how small teams and individuals will gain extraordinary leverage as intelligent systems mature. Here I share ideas, frameworks, and observations about this transition.

If you're a founder, investor, or builder thinking about the future of Al-native companies and intelligent systems, l'd enjoy the conversation.`,
    skills: ["AI Strategy", "Multi-agent Systems", "Management Consulting", "Founder Advisory", "Decision Intelligence", "Strategic Planning"],
    price: 500, // KEEP
    image: men9,
    rating: 5.0,
    sessions: 60,
    location: "San Francisco, USA",
    email: "matt@example.com",
    category: "Expert",
    linkedin: "https://www.linkedin.com/in/themattblack"
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
    price: 150, // KEEP
    image: men2,
    rating: 4.9,
    sessions: 234,
    location: "Abuja, Nigeria",
    email: "ijeoma@example.com",
    category: "CEO",
    linkedin: "https://www.linkedin.com/in/ijeoma-aladesaye-65393019b"
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
    price: 100, // KEEP
    image: men3,
    rating: 4.9,
    sessions: 156,
    location: "Abuja, Nigeria",
    email: "pamela@example.com",
    category: "CMO",
    linkedin: "https://www.linkedin.com/in/thepamelawilliams"
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
    price: 100, // KEEP
    image: men4,
    rating: 4.7,
    sessions: 98,
    location: "Abuja, Nigeria",
    email: "princess@example.com",
    category: "Operations",
    linkedin: "https://www.linkedin.com/in/princess-alugwe-783751182"
  },
  {
    id: 5,
    name: "Imal Silva",
    title: "Multidisciplinary Artist & Creative Entrepreneur",
    bio: "Multidisciplinary artist, creative entrepreneur, adjunct lecturer and creative policy expert. Alumnus of the Royal College of Art.",
    fullBio: `Imal Silva (born 16th January 1971) is multidisciplinary artist, creative entrepreneur, adjunct lecturer and creative policy expert. Imal is an alumnus of the Royal College of Art, United Kingdom.

He is an artist at his core and over the years has explored the concept of sustainability and human development. In recent times, his work has extended to more philosophical conversations of life, meaning and purpose. The approach to his art is mostly abstract and contemporary in nature.

Born in Sri Lanka, and living most of his teenage and adult life in Nigeria, his life and work reflect the increasing reality of a larger demographic of migrants and persons of multicultural backgrounds.

Imal is an adjunct lecturer at the University of Abuja on the creative economy and a serial speaker on visual art and the business of art. He has participated in several exhibitions and workshops in Ibadan, Lagos, and Abuja in Nigeria. He has also served twice as a judge in the Annual National Art Competition, titled Life in My City organized by the French Institute in Nigeria.

He believes that the arts are strategic to public engagement and promoting values of sustainability, and has enabled several creatives, through projects in communities where he lived. He encourages creatives to use their creativity to engage in social and developmental issues.`,
    skills: ["Visual Arts", "Creative Economy", "Lecturing", "Business Development", "Sustainability Advocacy"],
    price: 400, // KEEP
    image: men5,
    rating: 4.9,
    sessions: 145,
    location: "Abuja, Nigeria",
    email: "imal@example.com",
    category: "Creative",
    linkedin: "https://www.linkedin.com/in/imal-silva-3b29a799"
  },
  {
    id: 6,
    name: "Elijah Affi",
    title: "Executive Producer & Mandela Fellow",
    bio: "Executive Producer, Creative Director, CoFounder of Takeout Media. Executive Producer for the Netflix #1 film Tokunbo.",
    fullBio: `Elijah Affi is an accomplished Executive Producer, Creative Director, and CoFounder of Takeout Media. With extensive experience in media production, Elijah has successfully led a range of high-profile projects, blending creativity with strategic vision to deliver exceptional content. His leadership and expertise have made him a key figure in the entertainment and media industries.

Elijah served as Executive Producer for the Netflix #1 film Tokunbo, a project that received widespread acclaim and attracted a global audience. As the Lead Producer at Ingene Studios, he continues to spearhead innovative productions, guiding teams through every stage of the creative process—from initial concept to final delivery.

In addition to his work in production, Elijah is a certified management consultant, leveraging his business acumen to collaborate with top-tier organizations. His client portfolio includes global brands such as the World Bank, TotalEnergies, and Ecobank.

Passionate about creating impactful content, Elijah is committed to pushing the boundaries of storytelling and elevating the quality of entertainment worldwide. He is a Director of TM Global and a Mandela Washington Fellow.`,
    skills: ["Media Production", "Creative Direction", "Executive Production", "Strategic Vision", "Management Consulting"],
    price: 200, // KEEP
    image: men6,
    rating: 4.8,
    sessions: 130,
    location: "Abuja, Nigeria",
    email: "elijah@example.com",
    category: "CMO",
    linkedin: "https://www.linkedin.com/in/elijah-affi"
  },
  {
    id: 7,
    name: "Nkaru Darlington",
    title: "CEO EmperorCares Int'l",
    bio: "Seasoned businessman based in China with years of experience in entrepreneurship and international business development.",
    fullBio: `Nkaru Darlington is a bilingual entrepreneur and the CEO of EMPERORCARES INT'L LTD. Based in China, he brings years of robust experience in entrepreneurship and strategic business development.

He specializes in bridging markets between Asia and Africa, leveraging his deep understanding of cross-cultural business dynamics to foster international trade relationships. His leadership at EmperorCares Int'l focuses on delivering quality solutions and expanding operational footprints across borders.

Nkaru is dedicated to empowering businesses to navigate the complexities of the global market, providing insights into supply chain management, sourcing, and market entry strategies for companies looking to expand internationally.

I possess 10 years experience in agro farming, International importation and exportation of several products and mining(Solid minerals and Gemstones). I have an extensive knowledge of solid minerals and gemstones and have the ability to connect key players in each of these industry to various opportunities that exist within these fields.

As a business consultant, I help corporate organizations and individuals evaluate their business model, highlighting key opportunities, which when implemented yields business success. Also, I provide consulting services to offer business clarity to individuals or organizations hoping to venture into agro farming, import and export and mining of solid minerals.`,
    skills: ["International Trade", "Entrepreneurship", "Business Development", "Cross-cultural Business", "Supply Chain Management", "Agro Farming", "Mining Consulting"],
    price: 180, // KEEP
    image: men7,
    rating: 4.7,
    sessions: 110,
    location: "China",
    email: "nkaru@example.com",
    category: "CEO",
    linkedin: "https://www.linkedin.com/in/darlington-nkaru-2a5a86247"
  },
  {
    id: 8,
    name: "Hamzat Lawal",
    title: "Activist & Founder, CODE",
    bio: "An activist who has successfully led grassroots campaigns in over 40 African countries focusing on Climate Change and Open Data.",
    fullBio: `Hamzat Lawal (Hamzy!) is an activist who has successfully led grassroots campaigns in over 40 African countries with over nine years experience in the non-profit sector and specializes in practical issues associated with Climate Change, Open Data, advocacy campaigns and development policies as it affects rural and deprived grassroots communities.

Hamzy! is also the Founder of Follow The Money, a Pan-African grassroots data-driven movement and leads a team of technology & innovation driven campaigners to amplify voices of marginalized communities in promoting accountability as it affects utilization of public funds focusing on specific communities across Africa.

He is currently the Founder/Chief Executive of Connected Development (CODE), under his leadership CODE won the ONE Africa 2016 Award which recognizes, rewards, and advances the exceptional work of Africa based organisations; dedicated to helping the continent achieve the Sustainable Development Goals (SDGs).

Hamzy! seats on the Executive Board of the largest Youth Movement in Africa: African Youth Initiative on Climate Change (AYICC), advising on communications strategies and campaigns using technology tools in shaping and actualizing the Sustainable Development Goals (SDGs) and has joined his voice on different platforms and policy influencing coalitions across Africa such as the Not Too Young To Run movement which drives youth political inclusion.

Before his role at CODE, he was an Executive with the International Centre For Energy, Environment & Development (ICEED) working on high level advocacy for Nigeria's energy needs and climate actions.

Hamzat was honored and recognized on the 2018 list of the world's 100 most influential people in digital government by Apolitical.`,
    skills: ["Activism", "Climate Change", "Open Data", "Grassroots Campaigns", "Policy Advocacy", "Non-Profit Leadership"],
    price: 0, // REMOVED
    image: men8,
    rating: 4.9,
    sessions: 85,
    location: "Abuja, Nigeria",
    email: "hamzat@example.com",
    category: "Operations",
    linkedin: "https://www.linkedin.com/in/hamzat-lawal-85409129"
  },
  {
    id: 10,
    name: "Oliver Hack",
    title: "Director, Social Good Fund",
    bio: "Seasoned nonprofit and public sector manager focused on helping start-up nonprofits launch and achieve success.",
    fullBio: `I still believe that a small group of thoughtful, committed citizens can change the world. Though cynicism and narcissism seem to be the currency of the day, I refuse to be discouraged.

I am a seasoned nonprofit and public sector manager with a focus on helping start-up nonprofits launch and achieve success. As the Director of Fiscal Sponsorship at Social Good Fund and Supporting Director of Social Good Fund Africa, I leverage decades of experience to empower social entrepreneurs and changemakers.

My work involves guiding organizations through the complex landscape of fiscal sponsorship, compliance, and operational sustainability. I am passionate about structuring organizations for long-term impact, ensuring that visionary leaders have the financial and administrative infrastructure they need to focus on their mission.

Whether it's a grassroots initiative or a scalable social enterprise, I provide the strategic oversight necessary to turn good intentions into tangible outcomes. My goal is to lower the barriers to entry for social good, allowing innovation and compassion to flourish in the nonprofit sector.`,
    skills: ["Non-profit Management", "Fiscal Sponsorship", "Strategic Planning", "Public Sector Management", "Leadership Development", "Social Entrepreneurship"],
    price: 400, // KEEP
    image: men10,
    rating: 4.8,
    sessions: 75,
    location: "San Francisco, California",
    email: "oliver@example.com",
    category: "Operations",
    linkedin: "https://www.linkedin.com/in/oliver-hack-3988a448"
  },
  {
    id: 11,
    name: "John Obidi",
    title: "Keynote Speaker & Thought Leader",
    bio: "Award-winning Host of Headstart Africa Masterclass Podcast and Consultant in Growth & Partnerships.",
    fullBio: `I am a Keynote Speaker, Thought Leadership Consultant, and the Award-winning Host of the Headstart Africa Masterclass Podcast. My work centers on empowering individuals and organizations to navigate the evolving landscape of digital media, growth, and strategic partnerships.

Currently, I direct Growth and Partnerships at AbitNetworks, a Blockchain and Cryptocurrency solutions company, where I bridge the gap between innovative technology and market adoption. My expertise lies in crafting compelling narratives that drive engagement and foster meaningful connections in the digital age.

With a background in media and technology, I have cultivated a deep understanding of how to leverage platforms for personal and professional growth. I consult for corporate organizations on thought leadership strategies, helping executives and brands position themselves as authorities in their respective fields.

My mission is to equip the next generation of African leaders and entrepreneurs with the insights and tools they need to thrive in a global economy.`,
    skills: ["Public Speaking", "Thought Leadership", "Podcasting", "Growth Strategy", "Partnerships", "Blockchain Consulting"],
    price: 0, // REMOVED
    image: men11,
    rating: 4.9,
    sessions: 140,
    location: "Jacksonville, Florida",
    email: "john@example.com",
    category: "Expert",
    linkedin: "https://www.linkedin.com/in/johnobidi"
  },
  {
    id: 12,
    name: "Funke Adeoye",
    title: "Human Rights Lawyer & Social Innovator",
    bio: "International human rights lawyer working to reimagine how people in the Global South access justice.",
    fullBio: `Funke Adeoye is an international human rights lawyer and systems-focused social innovator working to reimagine how people in the Global South access justice and opportunity within imperfect systems.

She is the Founder and Executive Director of Hope Behind Bars Africa, where she leads data-driven, people-centred interventions to strengthen civic space and advance justice reforms across Nigeria. Her work focuses on the protection of civil and political rights particularly freedom of expression, freedom of religion or belief, and the right to peaceful assembly with a strong emphasis on preventing arbitrary arrests and unlawful detention within the criminal justice system.

She also engages critically with the responsible use of technology and artificial intelligence in governance and justice systems. As part of this work, Funke leads the development of JusticePadi.ai, Africa's first responder for legal emergencies.

Funke has led landmark justice-focused projects, including Nigeria's first comprehensive research on gender and capital punishment, supported by Agence Française de Développement (AFD). Previously, she worked at Global Rights as Programs Manager, implementing human rights initiatives supported by the Ford Foundation, Open Society Foundations, and others.

An alumna of the MSc in International Human Rights Law Course at the University of Oxford, where she studied as a Commonwealth Scholar, Funke also holds executive education qualifications in Civic Engagement from the University of Georgia and Non-Profit Leadership and Management from Lagos Business School. She is a Mandela Washington Fellow, an Acumen West Africa Fellow, and an Ashoka Fellow.

In recognition of her work, Funke has been listed by The Attic London among the Top 50 Lawyers Changing the World for the Better (2020), received the $75,000 Waistliz Global Citizen Prize (2023), and was honoured with the International Bar Association's Outstanding Young Lawyer of the Year Award (2025).`,
    skills: ["Human Rights Law", "Justice Reform", "Social Innovation", "Non-profit Consulting", "Legal Consulting", "AI in Governance", "Leadership Development"],
    price: 0, // REMOVED
    image: men12,
    rating: 5.0,
    sessions: 95,
    location: "Abuja, Nigeria",
    email: "funke@example.com",
    category: "Expert",
    linkedin: "https://www.linkedin.com/in/funkeadeoye"
  },
  {
    id: 13,
    name: "Slava",
    title: "Serial Tech Entrepreneur | Founder, Eligent Club",
    bio: "Serial tech entrepreneur working on highly-scalable SaaS digital projects, mentor & advisor in the field of digital tech.",
    fullBio: `Slava is a serial tech entrepreneur working on highly-scalable SaaS digital projects, founder of Eligent Club for startup founders, course leader of Eligent Tech Accelerator, Eligent TV channel for tech entrepreneurs, CEO of Eligent tech development company providing high-end bespoke tech solutions for businesses, mentor & advisor in the field of digital tech, film director/producer and founder of Eligent Film Festival - first international film festival about startups.

He believes that one should never stop learning and look for any chance to improve oneself.

By having an engineering and business degree with solid 15+ years of working experience across industries, he always tries to find optimal digital tech solutions for business and industry needs (e-commerce, finance, transport, telecommunications, food, retail and others).

At present, he is working on Eligent Club and Tech Accelerator expansion across Europe, tech projects, new book called 'How to build a tech startup' and film based on real stories.

He is also passionate about helping others on their entrepreneurial journeys and running a series of workshops and lectures about startups to share his knowledge and experience (90+ events in 2018-2021).

Currently, he is an Entrepreneur/Executive In Residence at Brunel Business School, a mentor at Hult Founder Lab, an International speaker at conferences, multiple business schools, entrepreneurial and tech communities across Europe.`,
    skills: ["Custom Software Development", "Business Analytics", "SaaS Development", "iOS Development", "Business Consulting", "Project Management", "Leadership Development", "Educational Consulting", "Team Building", "Application Development"],
    price: 200, // KEEP
    image: men13,
    rating: 4.9,
    sessions: 200,
    location: "Europe",
    email: "slava@example.com",
    category: "Expert",
    linkedin: "https://www.linkedin.com/in/slavatheline"
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