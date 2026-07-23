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
    "Designed and built a full-stack web platform to modernize Studio Kosmos's operations — solving slow bookings, delayed client responses, and manual scheduling. Implemented Google-based authentication, online payments, a booking calendar, and a secure client portal for digital photo delivery. Also built an admin dashboard with sales analytics and media management, plus a QR-code flow letting walk-in clients access their photos without an account.",
  stack: ["React", "Next.js", "Tailwind CSS", "Node.js", "MySQL"],
  role: "Full-stack",
  featured: true,
  color: "#7A1F2B",
  images: ["/projects/studio-kosmos/1.webp"],
  heroVideo: "/projects/studio-kosmos/hero.mp4",
},
  {
  slug: "library-management-system",
  name: "Library Management Information System",
  oneLiner: "Digital cataloging and access system built for a government library, replacing a fully manual, in-person-only process.",
  description:
    "Built during a Web Development internship with DEPDev Region V. Designed the backend and MySQL schema for a system handling cataloging, acquisitions, accessioning, user management, and reporting — replacing a library that had no digital record of its growing physical collection. Solved a real accessibility gap: staff and patrons previously had to visit in person to find or view any material.",
  stack: ["Node.js", "MySQL", "Backend Development"],
  role: "Backend",
  featured: true,
  color: "#0F3D3E",
  images: ["/projects/lmis/lmis.webp"],
},
  {
  slug: "bicol-sepp-system",
  name: "Bicol SEPP System",
  oneLiner: "Full-stack platform for publishing the Bicol region's Socio-Economic and Physical Profile data.",
  description:
    "Built full-stack — from MySQL schema to UI — for a system managing the Bicol Socio-Economic and Physical Profile across multiple time periods. Designed the database to accurately store and organize multi-year regional data, and built the frontend to present it clearly for public-facing access.",
  stack: ["React", "Node.js", "MySQL", "Full-stack Development"],
  role: "Full-stack",
  featured: true,
  color: "#1E3A24",
  images: [],
},
  {
  slug: "soulfm-website",
  name: "SoulFM Website",
  oneLiner: "Radio platform with live audio streaming, event ticketing, and payments — built with a partner.",
  description:
    "Built with one other developer for SoulFM, an online radio station. Features a live streaming audio player, DJ and show schedule pages, and an event ticketing system with integrated payments, backed by an admin dashboard for managing content and sales. Handled [your specific pieces — frontend? payments? both?] across the stack.",
  stack: ["React", "Tailwind CSS", "Node.js"],
  role: "Full-stack",
  featured: true,
  color: "#3B2358",
  images: [],
},
  {
    slug: "spot-the-ai",
    name: "Spot The AI",
    oneLiner: "Full-stack web app testing how well people can tell AI content from real content — built for National Innovation Day 2026.",
    description:
      "Built a full-stack web app for National Innovation Day 2026 that challenges users to distinguish AI-generated content from human-made content, exploring perception and media literacy in the age of generative AI.",
    stack: ["React", "Tailwind CSS", "HTML"],
    role: "Full-stack",
    color: "#1C2541",
    images: [],
  },
];