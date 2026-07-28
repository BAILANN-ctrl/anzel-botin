export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  description: string;
  stack: string[];
  role?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  color: string;
  images?: string[]; // paths under /public, e.g. "/projects/studio-kosmos/1.png"
  heroVideo?: string; // path to a video file under /public, e.g. "/projects/my-project/demo.mp4"
}
export const projects: Project[] = [
 {
  slug: "studio-kosmos-website",
  name: "Studio Kosmos Website",
  oneLiner: "Full-stack booking platform replacing manual scheduling and photo delivery for a photography studio.",
  description:
    "Spearheaded the production and full-stack development of a web platform to modernize Studio Kosmos's operations, built with a team to solve slow bookings, delayed client responses, and manual scheduling. Implemented Google-based authentication, online payments, a booking calendar, and a secure client portal for digital photo delivery. Also built an admin dashboard with sales analytics and media management, plus a QR-code flow letting walk-in clients access their photos without an account. Continue to build and maintain the REST APIs (Node.js) and manage the MySQL schema powering the site, focused on data integrity and query performance as traffic grows.",
  stack: ["React", "Next.js", "Tailwind CSS", "Node.js", "MySQL"],
  role: "Full-stack Lead",
  featured: true,
  color: "#7A1F2B",
  images: ["/projects/studio-kosmos/1.webp",
           "/projects/studio-kosmos/2.png",
           "/projects/studio-kosmos/3.png",],
  heroVideo: "/projects/studio-kosmos/hero.mp4",
  liveUrl: "https://www.studiokosmos.me"
},
  {
  slug: "studio-kosmos-photo-selection",
  name: "Studio Kosmos Photo Selection System",
  oneLiner: "Digitized manual photo-selection queue, cutting customer wait time by an estimated 30–40%.",
  description:
    "Independently designed and shipped a photo-selection system for Studio Kosmos, replacing a manual, in-person queue workflow. Digitizing the process cut estimated customer wait time by 30–40%, streamlining how clients review and select their photos.",
  stack: ["React", "Next.js", "Tailwind CSS", "Node.js", "MySQL"],
  role: "Solo Developer",
  featured: false,
  color: "#9C3B48",
    images: ["/projects/kosmospickr/1.png",
           "/projects/kosmospickr/2.png",
           "/projects/kosmospickr/3.png"],
  heroVideo: "/projects/kosmospickr/hero.mp4",
},
  {
  slug: "library-management-system",
  name: "Library Management Information System",
  oneLiner: "Admin panel for digital archiving of 5,000+ books and publications for a government library.",
  description:
    "Built during a Web Development internship (OJT, Feb–Jun 2026) with the Dept. of Economy, Planning and Development (DEPDev Region V) — Development Research Division. Developed the LMIS admin panel to support digital archiving of 5,000+ books and publications, including handling large file sizes (80MB+) for high-resolution scanned materials. Designed and managed the MySQL database supporting cataloging, acquisitions, accessioning, user management, and reporting — replacing a library that had no digital record of its growing physical collection. Solved a real accessibility gap: staff and patrons previously had to visit in person to find or view any material.",
  stack: ["React", "Next.js", "Tailwind CSS", "Node.js", "MySQL"],
  role: "Full-stack (Intern)",
  featured: true,
  color: "#0F3D3E",
  images: ["/projects/lmis/1.png",
           "/projects/lmis/2.png",
           "/projects/lmis/3.png"],
  heroVideo: "/projects/lmis/hero.mp4",
},
  {
  slug: "bicol-sepp-system",
  name: "Bicol SEPP System",
  oneLiner: "Full-stack platform publishing Bicol's Socio-Economic and Physical Profile data from 2015–present.",
  description:
    "Built during a Web Development internship (OJT) with DEPDev Region V — Development Research Division. Developed full-stack, from MySQL schema to Admin UI, for a system presenting the Bicol Socio-Economic and Physical Profile from 2015 to present, covering population, GDP/GRDP, labor force, employment, and income/expenditure statistics for public access. Designed and managed the MySQL database to accurately store, retrieve, and organize structured government data across multiple years.",
  stack: ["React", "Node.js", "MySQL", "Full-stack Development"],
  role: "Full-stack (Intern)",
  featured: true,
  color: "#1E3A24",
  images: ["/projects/sepp/1.png",
           "/projects/sepp/2.png",
           "/projects/sepp/3.png",],
  heroVideo: "/projects/sepp/hero.mp4",
},
  {
  slug: "soulfm-website",
  name: "SoulFM Website",
  oneLiner: "Live radio streaming platform with event ticketing and payment integration — built with a partner.",
  description:
    "Built with one other developer for SoulFM, an online radio station. Features a live streaming audio player, DJ and show schedule pages, and an event ticketing system with integrated payments, backed by an admin panel for managing content and sales. Handled frontend development (React, Tailwind CSS) across the platform.",
  stack: ["React", "Tailwind CSS", "Node.js"],
  role: "Frontend",
  featured: true,
  color: "#3B2358",
    images: ["/projects/soulfm/1.png",
           "/projects/soulfm/2.png",
           "/projects/soulfm/3.png",],
  heroVideo: "/projects/soulfm/hero.mp4",
  liveUrl: "https://www.soulfmlive.com",
},
  {
    slug: "spot-the-ai",
    name: "Spot The AI",
    oneLiner: "Quiz game challenging players to spot AI-tampered images vs. real ones — built for National Innovation Day 2026.",
    description:
      "Built a full-stack quiz game for National Innovation Day 2026 that challenges players to distinguish AI-tampered images from real ones, exploring perception and media literacy in the age of generative AI.",
    stack: ["React", "Tailwind CSS", "HTML"],
    role: "Full-stack",
    color: "#1C2541",
    images: ["/projects/ai-or-real/1.png",
           "/projects/ai-or-real/2.png",
           "/projects/ai-or-real/3.png",],
    heroVideo: "/projects/ai-or-real/hero.mp4",
    repoUrl: "https://github.com/BAILANN-ctrl/spot-the-ai"
  },
];