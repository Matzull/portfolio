import type { Locale } from '../i18n/ui';

export const profile = {
  name: 'Marcos Alonso Campillo',
  role: {
    en: 'Software Commissioning Engineer',
    es: 'Ingeniero de Comisionado de Software',
  },
  location: 'Madrid, Spain',
  email: 'm.alonso.bs@protonmail.com',
  github: 'https://github.com/matzull',
  linkedin: 'https://www.linkedin.com/in/marcos-alonso-campillo/',
  about: {
    en: 'Software engineer focused on reliable systems, observability, and production ownership. I work across Rust, Python, C++, cloud-native tooling, and deployment pipelines.',
    es: 'Ingeniero de software enfocado en sistemas fiables, observabilidad y ownership en produccion. Trabajo con Rust, Python, C++, tooling cloud-native y pipelines de despliegue.',
  },
  skills: {
    languages: ['Python', 'C++', 'Rust', 'Java'],
    cloud: ['AWS Serverless', 'Docker', 'Kubernetes', 'CI/CD', 'IaC'],
    systems: ['Distributed Systems', 'gRPC', 'SQL', 'NoSQL', 'Grafana'],
    soft: ['Communication', 'Teamwork', 'Problem Solving', 'Adaptability', 'Ownership'],
  },
  certifications: [
    'Endpoint Security - Cisco',
    'Networking Devices and Initial Configuration - Cisco',
  ],
} as const;

export const getAbout = (locale: Locale) => profile.about[locale];
export const getRole = (locale: Locale) => profile.role[locale];
