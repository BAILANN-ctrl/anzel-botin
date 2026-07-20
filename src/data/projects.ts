export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  color: string; // accent color for the pinned strip panel
}

export const projects: Project[] = [
  {
    slug: "studio-kosmos-website",
    name: "Studio Kosmos Website",
    oneLiner: "Company website with a photo selection system built to replace a manual queue.",
    description:
      "Full-stack work on Studio Kosmos's website, including a photo selection system that digitized a manual queue workflow — cutting estimated customer wait time by 30–40%. Covers frontend UI, backend APIs, and MySQL database design.",
    stack: ["React", "Next.js", "Tailwind CSS", "Node.js", "MySQL"],
    featured: true,
    color: "#3D5A80",
  },
  {
    slug: "library-management-system",
    name: "Library Management Information System",
    oneLiner: "Admin panel for digitizing and publishing library archives.",
    description:
      "Built during a Web Development internship with the Department of Economy, Planning and Development. An admin panel for digital archiving that organizes storage and enables public accessibility of digitized library resources for preservation.",
    stack: ["Node.js", "MySQL", "Backend Development"],
    featured: true,
    color: "#9C6644",
  },
  {
    slug: "bicol-sepp-system",
    name: "Bicol SEPP System",
    oneLiner: "Regional development data platform for the Bicol Socio-Economic and Physical Profile.",
    description:
      "A system managing regional development data across different time periods, with structured data presentation for public-facing access. Includes MySQL database design supporting accurate storage, retrieval, and organization.",
    stack: ["Node.js", "MySQL", "Backend Development"],
    featured: true,
    color: "#5B7553",
  },
  {
    slug: "soulfm-website",
    name: "SoulFM Website",
    oneLiner: "Responsive UI for an online radio platform.",
    description:
      "Frontend build for SoulFM, an online radio platform, focused on a clean, responsive interface.",
    stack: ["React", "Tailwind CSS"],
    featured: true,
    color: "#84594E",
  },
  {
    slug: "spot-the-ai",
    name: "Spot The AI",
    oneLiner: "Built for National Innovation Day 2026.",
    description:
      "A web application developed for National Innovation Day 2026, exploring how well people can distinguish AI-generated content.",
    stack: ["React", "Tailwind CSS", "HTML"],
    color: "#6B5B95",
  },
];
