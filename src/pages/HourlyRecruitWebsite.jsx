// export default function HourlyRecruitWebsite() {
//   const roles = [
//     "Frontend Developers",
//     "Backend Developers",
//     "Full Stack Developers",
//     "Mobile App Developers",
//     "UI/UX Designers",
//     "DevOps Engineers",
//     "QA/Test Engineers",
//     "AI & Automation Developers",
//     "React Developers",
//     "Node.js Developers",
//     "Python Developers",
//     "Java Developers",
//   ];

//   const technologies = {
//     Frontend: ["React.js", "Angular", "Vue.js", "HTML/CSS", "Tailwind CSS"],
//     Backend: ["Node.js", "Python", "Java", "PHP", ".NET"],
//     Mobile: ["Flutter", "React Native", "Android", "iOS"],
//     "Cloud & DevOps": ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
//   };

//   const industries = [
//     "SaaS Platforms",
//     "E-Commerce",
//     "FinTech",
//     "Healthcare",
//     "Logistics",
//     "EdTech",
//     "Hospitality",
//     "Enterprise Applications",
//   ];

//   const whyChoose = [
//     "Flexible Hiring",
//     "Faster Project Execution",
//     "Scalable Teams",
//     "Startup Friendly",
//     "Transparent Communication",
//   ];

//   const startupBenefits = [
//     "Build MVPs",
//     "Develop SaaS products",
//     "Create mobile apps",
//     "Maintain existing products",
//     "Add new features faster",
//   ];

//   const steps = [
//     {
//       title: "Share Your Requirement",
//       desc: "Tell us your technology stack, project scope, and developer needs.",
//     },
//     {
//       title: "Select Developers",
//       desc: "Choose from pre-screened developers based on your requirements.",
//     },
//     {
//       title: "Start Development",
//       desc: "Begin work immediately with flexible engagement options.",
//     },
//     {
//       title: "Scale Anytime",
//       desc: "Increase or reduce team size based on project demands.",
//     },
//   ];

//   const testimonials = [
//     {
//       name: "Rahul Mehta",
//       role: "Founder, SaaSFlow",
//       review:
//         "HourlyRecruit helped us hire experienced developers within days. Their flexible engagement model allowed us to scale quickly without long-term hiring commitments.",
//     },
//     {
//       name: "Priya Sharma",
//       role: "CTO, FinEdge",
//       review:
//         "We successfully launched our platform faster with HourlyRecruit’s dedicated engineering team. Communication and delivery quality were outstanding.",
//     },
//   ];

//   return (
//     <div className="bg-[#f8f5f0] text-gray-900 min-h-screen font-sans">
//       {/* Navbar */}
//       <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-200 sticky top-0 bg-[#f8f5f0]/90 backdrop-blur z-50">
//         <h1 className="text-2xl font-black text-[#3d2c1e]">HourlyRecruit</h1>

//         <div className="hidden md:flex gap-8 text-sm font-medium">
//           <a href="#about" className="hover:text-[#8b5e34]">About</a>
//           <a href="#services" className="hover:text-[#8b5e34]">Services</a>
//           <a href="#technologies" className="hover:text-[#8b5e34]">Technologies</a>
//           <a href="#industries" className="hover:text-[#8b5e34]">Industries</a>
//           <a href="#contact" className="hover:text-[#8b5e34]">Contact</a>
//         </div>

//         <button className="bg-[#3d2c1e] text-white px-5 py-2 rounded-xl hover:bg-[#5c4631] transition">
//           Hire Developers
//         </button>
//       </nav>

//       {/* Hero Section */}
//       <section className="grid lg:grid-cols-2 gap-12 items-center px-8 lg:px-20 py-20 min-h-[90vh]">
//         <div>
//           <span className="bg-[#e8dfd2] text-[#5c4631] px-4 py-2 rounded-full text-sm font-semibold">
//             Flexible Hourly Hiring Solutions
//           </span>

//           <h1 className="text-5xl lg:text-7xl font-black leading-tight mt-6 text-[#2b1f15]">
//             Hire Skilled Developers on <span className="text-[#8b5e34]">Hourly Basis</span>
//           </h1>

//           <p className="text-lg text-gray-600 mt-6 leading-relaxed max-w-xl">
//             Scale your projects faster with dedicated developers, UI engineers,
//             backend experts, and complete tech teams available on flexible,
//             cost-effective hourly engagement models.
//           </p>

//           <div className="flex flex-wrap gap-4 mt-8">
//             <button className="bg-[#3d2c1e] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#5c4631] transition">
//               Hire Developers
//             </button>
//             <button className="border border-[#3d2c1e] text-[#3d2c1e] px-6 py-3 rounded-2xl font-semibold hover:bg-[#ece3d8] transition">
//               Book Free Consultation
//             </button>
//             <button className="bg-[#8b5e34] text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition">
//               Start Your Project
//             </button>
//           </div>

//           <div className="grid grid-cols-2 gap-4 mt-10 text-sm text-gray-700">
//             <div>✔ Flexible Hiring Models</div>
//             <div>✔ Remote Dedicated Teams</div>
//             <div>✔ Startup Friendly Pricing</div>
//             <div>✔ Transparent Communication</div>
//           </div>

//           <p className="mt-8 text-gray-600 leading-relaxed max-w-2xl">
//             Whether you are building a startup MVP, scaling an enterprise
//             platform, modernizing systems, or launching a mobile application,
//             HourlyRecruit provides trusted professionals who seamlessly
//             integrate with your team.
//           </p>
//         </div>

//         <div>
//           <div className="bg-gradient-to-br from-[#f0e7dc] to-[#d8c3aa] rounded-[40px] p-8 shadow-2xl">
//             <img
//               src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
//               alt="Developer"
//               className="rounded-3xl object-cover w-full h-[550px]"
//             />
//           </div>
//         </div>
//       </section>

//       {/* About */}
//       <section id="about" className="px-8 lg:px-20 py-24 bg-white">
//         <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
//           <div>
//             <p className="uppercase tracking-[4px] text-sm text-[#8b5e34] font-bold">
//               About HourlyRecruit
//             </p>

//             <h2 className="text-4xl font-black mt-4 text-[#2b1f15] leading-tight">
//               Helping Businesses Build Faster with Reliable Developers
//             </h2>

//             <p className="text-gray-600 mt-6 leading-relaxed text-lg">
//               HourlyRecruit helps startups, agencies, and enterprises hire
//               skilled developers on flexible hourly engagement models. From
//               frontend engineering and backend architecture to DevOps,
//               automation, and mobile app development — we provide experienced
//               professionals who can work independently or alongside your
//               internal team.
//             </p>

//             <p className="text-gray-600 mt-5 leading-relaxed">
//               Whether you need one developer for a quick task or a complete
//               engineering team for a large-scale project, our process makes tech
//               hiring simple, fast, transparent, and scalable.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div className="bg-[#f7efe5] rounded-3xl p-6 shadow-sm">
//               <h3 className="text-3xl font-black text-[#8b5e34]">120+</h3>
//               <p className="mt-2 text-gray-600">Developers across modern technologies.</p>
//             </div>

//             <div className="bg-[#f7efe5] rounded-3xl p-6 shadow-sm">
//               <h3 className="text-3xl font-black text-[#8b5e34]">40+</h3>
//               <p className="mt-2 text-gray-600">Successful startup and enterprise projects.</p>
//             </div>

//             <div className="bg-[#f7efe5] rounded-3xl p-6 shadow-sm">
//               <h3 className="text-3xl font-black text-[#8b5e34]">24/7</h3>
//               <p className="mt-2 text-gray-600">Collaboration and support availability.</p>
//             </div>

//             <div className="bg-[#f7efe5] rounded-3xl p-6 shadow-sm">
//               <h3 className="text-3xl font-black text-[#8b5e34]">100%</h3>
//               <p className="mt-2 text-gray-600">Transparent engagement process.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services */}
//       <section id="services" className="px-8 lg:px-20 py-24 bg-[#f8f5f0]">
//         <div className="text-center max-w-3xl mx-auto">
//           <p className="uppercase tracking-[4px] text-sm text-[#8b5e34] font-bold">
//             What We Offer
//           </p>

//           <h2 className="text-4xl font-black mt-4 text-[#2b1f15]">
//             Hire Developers Across Every Major Technology
//           </h2>

//           <p className="mt-6 text-gray-600 leading-relaxed text-lg">
//             Access highly skilled professionals for web applications, mobile
//             apps, enterprise systems, cloud infrastructure, automation, and
//             modern SaaS platforms.
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
//           {roles.map((role, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition duration-300 border border-[#eee5db]"
//             >
//               <div className="w-14 h-14 rounded-2xl bg-[#f3e7d9] flex items-center justify-center text-2xl mb-5">
//                 💻
//               </div>

//               <h3 className="text-xl font-bold text-[#2b1f15]">{role}</h3>

//               <p className="mt-3 text-gray-600 leading-relaxed text-sm">
//                 Experienced professionals ready to contribute to your projects
//                 with flexible hourly or dedicated engagement models.
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Engagement Models */}
//       <section className="px-8 lg:px-20 py-24 bg-white">
//         <div className="text-center max-w-3xl mx-auto">
//           <p className="uppercase tracking-[4px] text-sm text-[#8b5e34] font-bold">
//             Engagement Models
//           </p>

//           <h2 className="text-4xl font-black mt-4 text-[#2b1f15]">
//             Flexible Hiring Models for Every Business Need
//           </h2>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8 mt-16">
//           <div className="bg-[#f7efe5] p-8 rounded-3xl">
//             <h3 className="text-2xl font-bold text-[#2b1f15]">Hourly Hiring</h3>
//             <p className="mt-5 text-gray-600 leading-relaxed">
//               Hire developers only for the exact number of hours you need.
//               Perfect for feature development, bug fixing, maintenance, and
//               consulting.
//             </p>
//           </div>

//           <div className="bg-[#efe5d8] p-8 rounded-3xl">
//             <h3 className="text-2xl font-bold text-[#2b1f15]">Dedicated Developers</h3>
//             <p className="mt-5 text-gray-600 leading-relaxed">
//               Build a reliable remote team with full-time developers working
//               exclusively on your product and business goals.
//             </p>
//           </div>

//           <div className="bg-[#f4ede4] p-8 rounded-3xl">
//             <h3 className="text-2xl font-bold text-[#2b1f15]">Project-Based Teams</h3>
//             <p className="mt-5 text-gray-600 leading-relaxed">
//               Create complete teams for SaaS products, enterprise software,
//               e-commerce platforms, and mobile applications.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Technologies */}
//       <section id="technologies" className="px-8 lg:px-20 py-24 bg-[#f8f5f0]">
//         <div className="text-center max-w-3xl mx-auto">
//           <p className="uppercase tracking-[4px] text-sm text-[#8b5e34] font-bold">
//             Technologies We Work With
//           </p>

//           <h2 className="text-4xl font-black mt-4 text-[#2b1f15]">
//             Modern Technologies. Expert Developers.
//           </h2>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 mt-16">
//           {Object.entries(technologies).map(([category, techs]) => (
//             <div key={category} className="bg-white p-8 rounded-3xl shadow-sm">
//               <h3 className="text-2xl font-bold text-[#2b1f15] mb-6">{category}</h3>

//               <div className="flex flex-wrap gap-4">
//                 {techs.map((tech, i) => (
//                   <span
//                     key={i}
//                     className="bg-[#f3e7d9] px-4 py-2 rounded-full text-sm font-medium text-[#5c4631]"
//                   >
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Why Choose */}
//       <section className="px-8 lg:px-20 py-24 bg-[#2b1f15] text-white">
//         <div className="text-center max-w-3xl mx-auto">
//           <p className="uppercase tracking-[4px] text-sm text-[#cba67d] font-bold">
//             Why Choose HourlyRecruit
//           </p>

//           <h2 className="text-4xl font-black mt-4">
//             Build Faster. Scale Smarter.
//           </h2>
//         </div>

//         <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mt-16">
//           {whyChoose.map((item, i) => (
//             <div key={i} className="bg-[#3d2c1e] rounded-3xl p-6 text-center">
//               <h3 className="font-bold text-xl">{item}</h3>
//               <p className="text-gray-300 mt-3 text-sm leading-relaxed">
//                 Professional solutions designed to help businesses accelerate
//                 development and reduce hiring complexity.
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Industries */}
//       <section id="industries" className="px-8 lg:px-20 py-24 bg-white">
//         <div className="text-center max-w-3xl mx-auto">
//           <p className="uppercase tracking-[4px] text-sm text-[#8b5e34] font-bold">
//             Industries We Support
//           </p>

//           <h2 className="text-4xl font-black mt-4 text-[#2b1f15]">
//             Trusted by Startups and Businesses Across Industries
//           </h2>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
//           {industries.map((industry, i) => (
//             <div
//               key={i}
//               className="border border-[#eee5db] rounded-3xl p-8 text-center hover:shadow-lg transition"
//             >
//               <div className="text-4xl mb-4">🏢</div>
//               <h3 className="font-bold text-lg text-[#2b1f15]">{industry}</h3>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Startup Section */}
//       <section className="px-8 lg:px-20 py-24 bg-[#f8f5f0]">
//         <div className="grid lg:grid-cols-2 gap-14 items-center">
//           <div>
//             <p className="uppercase tracking-[4px] text-sm text-[#8b5e34] font-bold">
//               For Startups
//             </p>

//             <h2 className="text-4xl font-black mt-4 text-[#2b1f15]">
//               Launch Products Faster with Flexible Tech Teams
//             </h2>

//             <p className="mt-6 text-gray-600 leading-relaxed text-lg">
//               Startups move fast, and so do we. Our hourly developers help you
//               build, launch, maintain, and scale products efficiently while
//               keeping development costs under control.
//             </p>

//             <div className="space-y-4 mt-8">
//               {startupBenefits.map((item, i) => (
//                 <div key={i} className="flex items-center gap-4">
//                   <span className="w-8 h-8 rounded-full bg-[#3d2c1e] text-white flex items-center justify-center">
//                     ✓
//                   </span>
//                   <p className="text-gray-700 font-medium">{item}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <img
//               src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
//               alt="Startup Team"
//               className="rounded-[40px] shadow-xl"
//             />
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="px-8 lg:px-20 py-24 bg-white">
//         <div className="text-center max-w-3xl mx-auto">
//           <p className="uppercase tracking-[4px] text-sm text-[#8b5e34] font-bold">
//             How It Works
//           </p>

//           <h2 className="text-4xl font-black mt-4 text-[#2b1f15]">
//             A Simple Process Designed for Faster Hiring
//           </h2>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
//           {steps.map((step, i) => (
//             <div key={i} className="bg-[#f7efe5] p-8 rounded-3xl text-center">
//               <div className="w-16 h-16 mx-auto rounded-full bg-[#3d2c1e] text-white flex items-center justify-center text-2xl font-bold mb-6">
//                 {i + 1}
//               </div>

//               <h3 className="text-xl font-bold text-[#2b1f15]">
//                 {step.title}
//               </h3>

//               <p className="mt-4 text-gray-600 leading-relaxed text-sm">
//                 {step.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="px-8 lg:px-20 py-24 bg-[#2b1f15] text-white">
//         <div className="text-center max-w-3xl mx-auto">
//           <p className="uppercase tracking-[4px] text-sm text-[#cba67d] font-bold">
//             Testimonials
//           </p>

//           <h2 className="text-4xl font-black mt-4">
//             What Our Clients Say
//           </h2>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8 mt-16">
//           {testimonials.map((item, i) => (
//             <div key={i} className="bg-[#3d2c1e] rounded-3xl p-8">
//               <p className="text-gray-300 leading-relaxed italic">
//                 “{item.review}”
//               </p>

//               <div className="mt-6">
//                 <h3 className="font-bold text-xl">{item.name}</h3>
//                 <p className="text-[#cba67d] text-sm">{item.role}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Contact */}
//       <section id="contact" className="px-8 lg:px-20 py-24 bg-white">
//         <div className="grid lg:grid-cols-2 gap-16 items-start">
//           <div>
//             <p className="uppercase tracking-[4px] text-sm text-[#8b5e34] font-bold">
//               Let’s Build Something Great
//             </p>

//             <h2 className="text-5xl font-black mt-4 text-[#2b1f15] leading-tight">
//               Ready to Start Your Next Project?
//             </h2>

//             <p className="mt-6 text-gray-600 leading-relaxed text-lg">
//               Hire expert developers on hourly basis and accelerate your product
//               development with trusted engineering talent.
//             </p>

//             <div className="mt-10 space-y-5 text-gray-700">
//               <p>📍 Bangalore, India</p>
//               <p>✉ hr@hourlyrecruit.com</p>
//               <p>🌐 www.hourlyrecruit.com</p>
//             </div>
//           </div>

//           <div className="bg-[#f8f5f0] rounded-[40px] p-8 shadow-sm">
//             <form className="space-y-5">
//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 className="w-full p-4 rounded-2xl border border-gray-300 outline-none"
//               />

//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="w-full p-4 rounded-2xl border border-gray-300 outline-none"
//               />

//               <textarea
//                 rows="5"
//                 placeholder="Tell us about your project"
//                 className="w-full p-4 rounded-2xl border border-gray-300 outline-none"
//               ></textarea>

//               <button className="bg-[#3d2c1e] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#5c4631] transition w-full">
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
