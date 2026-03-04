export interface Project {
  title: string;
  description: string;
  tech: readonly string[];
  impact: string;
  github: string;
  live: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
  count?: number;
  suffix?: string;
  link?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NavLink {
  label: string;
  href: string;
}
