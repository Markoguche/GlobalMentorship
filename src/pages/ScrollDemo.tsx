// import React, { useRef, useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Lenis from 'lenis';

// // Register GSAP plugins
// gsap.registerPlugin(ScrollTrigger);

// // IMPORT YOUR IMAGES HERE
// // This image acts as the "Cover" for the front of the cards
// import coverImage from '../assets/sec1.jpg'; 

// // These images are revealed on the back after the flip
// import backImg1 from '../assets/men1.jpg'; 
// import backImg2 from '../assets/men2.jpg';
// import backImg3 from '../assets/men3.jpg';

// const ScrollDemo: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const stickySectionRef = useRef<HTMLDivElement>(null);
//   const headerRef = useRef<HTMLHeadingElement>(null);
//   const cardContainerRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     // 1. Initialize Lenis for smooth scrolling
//     const lenis = new Lenis({
//       duration: 1.2,
//       infinite: false,
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     // Connect Lenis to ScrollTrigger
//     lenis.on('scroll', ScrollTrigger.update);
//     gsap.ticker.add((time) => {
//       lenis.raf(time * 1000);
//     });
//     gsap.ticker.lagSmoothing(0);

//     // 2. Animation Context
//     const ctx = gsap.context(() => {
//       ScrollTrigger.matchMedia({
//         // --- DESKTOP ANIMATION ---
//         '(min-width: 768px)': function () {
//           if (!stickySectionRef.current || !cardContainerRef.current || !headerRef.current) return;

//           // Initial States
//           gsap.set(headerRef.current, { opacity: 0, y: 50 });
          
//           const tl = gsap.timeline({
//             scrollTrigger: {
//               trigger: stickySectionRef.current,
//               pin: true,
//               scrub: 1,
//               start: 'top top',
//               end: '+=3000',
//             },
//           });

//           // Sequence 1: Header Reveal
//           tl.to(headerRef.current, {
//             y: 0,
//             opacity: 1,
//             duration: 1,
//             ease: 'power2.out',
//           }, 0);

//           // Sequence 1: Container Expand
//           tl.to(cardContainerRef.current, {
//             width: '80%',
//             duration: 1,
//             ease: 'power2.out',
//           }, 0);

//           // Sequence 2: Split Cards (Gap Animation)
//           tl.to(cardContainerRef.current, {
//             gap: '40px',
//             duration: 0.5,
//             ease: 'power2.out',
//           }, 1.5);

//           // Animate border radius for individual card look
//           cardsRef.current.forEach((card) => {
//             if (card) {
//               tl.to(card, {
//                 borderRadius: '20px',
//                 duration: 0.5,
//               }, 1.5);
//             }
//           });

//           // Sequence 3: Flip Cards
//           cardsRef.current.forEach((card, index) => {
//             if (card) {
//               tl.to(card, {
//                 rotateY: 180,
//                 duration: 1,
//                 ease: 'power2.inOut',
//               }, 3.0 + index * 0.1); // Stagger effect
//             }
//           });

//         },

//         // --- MOBILE FALLBACK ---
//         '(max-width: 767px)': function () {
//           // Reset any inline styles applied by GSAP on mobile
//           if (cardContainerRef.current) {
//             gsap.set(cardContainerRef.current, { clearProps: 'all' });
//           }
//           cardsRef.current.forEach((card) => {
//             if (card) gsap.set(card, { clearProps: 'all' });
//           });
//           if(headerRef.current) gsap.set(headerRef.current, { clearProps: 'all' });
//         },
//       });
//     }, containerRef);

//     // Cleanup
//     return () => {
//       ctx.revert();
//       lenis.destroy();
//     };
//   }, []);

//   const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
//     cardsRef.current[index] = el;
//   };

//   return (
//     <div ref={containerRef} className="bg-[#0f0f0f] text-white font-sans overflow-x-hidden">
//       {/* Intro Section */}
//       <section className="h-screen flex items-center justify-center">
//         <h1 className="text-4xl md:text-6xl font-bold text-center px-4">
//           Scroll Down to See the Magic
//         </h1>
//       </section>

//       {/* Sticky Animation Section */}
//       <section 
//         ref={stickySectionRef} 
//         className="h-screen relative overflow-hidden flex flex-col items-center justify-center"
//       >
//         <div className="flex flex-col items-center justify-center w-full px-4">
          
//           {/* HEADER - Positioned Above Cards */}
//           <h2 
//             ref={headerRef} 
//             className="text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center opacity-0 z-10"
//           >
//             Our Creative Process
//           </h2>

//           {/* CARD CONTAINER */}
//           {/* Mobile: flex-col, Desktop: flex-row */}
//           <div 
//             ref={cardContainerRef}
//             className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0 w-full md:w-[60%] max-w-[1500px] perspective-[1000px]"
//           >
            
//             {/* Card 1 */}
//             <div 
//               ref={setCardRef(0)}
//               className="card relative w-[80%] md:w-1/3 h-[300px] md:h-[500px] transform-style-3d transition-all duration-500 rounded-t-[40px] md:rounded-tl-[40px] md:rounded-tr-none md:rounded-bl-[40px] md:rounded-br-none"
//             >
//               {/* Front Face: Unified Image Part 1 */}
//               <div 
//                 className="card-face absolute inset-0 backface-hidden overflow-hidden rounded-[20px] md:rounded-tl-[40px] md:rounded-bl-[40px]"
//                 style={{
//                   backgroundImage: `url(${coverImage})`,
//                   backgroundSize: 'cover',
//                   // Position for the first third of the image
//                   backgroundPosition: '0% 50%' 
//                 }}
//               />
//               {/* Back Face: Individual Image 1 */}
//               <div 
//                 className="card-face card-back absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden"
//               >
//                  <img src={backImg1} alt="Discovery" className="w-full h-full object-cover" />
//                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6">
//                     <span className="text-6xl font-bold opacity-30 mb-4">01</span>
//                     <p className="text-xl font-semibold text-center">Discovery Phase</p>
//                  </div>
//               </div>
//             </div>

//             {/* Card 2 */}
//             <div 
//               ref={setCardRef(1)}
//               className="card relative w-[80%] md:w-1/3 h-[300px] md:h-[500px] transform-style-3d transition-all duration-500 rounded-[20px] md:rounded-none"
//             >
//               {/* Front Face: Unified Image Part 2 */}
//               <div 
//                 className="card-face absolute inset-0 backface-hidden overflow-hidden rounded-[20px] md:rounded-none"
//                 style={{
//                   backgroundImage: `url(${coverImage})`,
//                   backgroundSize: 'cover',
//                   // Position for the center of the image
//                   backgroundPosition: '50% 50%' 
//                 }}
//               />
//               {/* Back Face: Individual Image 2 */}
//               <div 
//                 className="card-face card-back absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden"
//               >
//                  <img src={backImg2} alt="Development" className="w-full h-full object-cover" />
//                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6">
//                     <span className="text-6xl font-bold opacity-30 mb-4">02</span>
//                     <p className="text-xl font-semibold text-center">Development</p>
//                  </div>
//               </div>
//             </div>

//             {/* Card 3 */}
//             <div 
//               ref={setCardRef(2)}
//               className="card relative w-[80%] md:w-1/3 h-[300px] md:h-[500px] transform-style-3d transition-all duration-500 rounded-b-[40px] md:rounded-tr-[40px] md:rounded-tl-none md:rounded-br-[40px] md:rounded-bl-none"
//             >
//               {/* Front Face: Unified Image Part 3 */}
//               <div 
//                 className="card-face absolute inset-0 backface-hidden overflow-hidden rounded-[20px] md:rounded-tr-[40px] md:rounded-br-[40px]"
//                 style={{
//                   backgroundImage: `url(${coverImage})`,
//                   backgroundSize: 'cover',
//                   // Position for the last third of the image
//                   backgroundPosition: '100% 50%' 
//                 }}
//               />
//               {/* Back Face: Individual Image 3 */}
//               <div 
//                 className="card-face card-back absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden"
//               >
//                  <img src={backImg3} alt="Delivery" className="w-full h-full object-cover" />
//                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6">
//                     <span className="text-6xl font-bold opacity-30 mb-4">03</span>
//                     <p className="text-xl font-semibold text-center">Delivery</p>
//                  </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* Outro Section */}
//       <section className="h-screen flex items-center justify-center">
//         <h1 className="text-4xl md:text-6xl font-bold text-center px-4">
//           End of Animation
//         </h1>
//       </section>
//     </div>
//   );
// };

// export default ScrollDemo;