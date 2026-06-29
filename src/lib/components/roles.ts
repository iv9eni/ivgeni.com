// roles.ts — content + the color arc that the 3D scene lerps through.
// `progress` is where each panel sits on the 0..1 scroll timeline.

export type Role = {
  idx: string;
  dates: string;
  company: string;
  desc: string;
  accent: string;
  progress: number;
  // optional animated stat
  count?: number;
  countSuffix?: string;
  statText?: string;
  statLabel: string;
  tags?: string;
};

export const accentArc = ['#6b7a8f', '#3b6ea5', '#2f9e7d', '#d9b25f', '#c98a4b'];

export const roles: Role[] = [
  {
    idx: '01',
    dates: '2019 — 2025',
    company: 'Intact',
    desc: 'Making it easy to sell commercial insurance products to millions of people.',
    accent: '#3b6ea5',
    progress: 0.25,
    count: 5_000_000,
    countSuffix: '+',
    statLabel: 'people reached',
    tags: 'Angular · Java · Spring · SQL',
  },
  {
    idx: '02',
    dates: 'Jan — Aug 2025',
    company: 'Teranet',
    desc: "Providing all of Canada's estate and property analysis to a growing base of users.",
    accent: '#2f9e7d',
    progress: 0.5,
    count: 100_000,
    countSuffix: '+',
    statLabel: 'users served',
  },
  {
    idx: '03',
    dates: 'Aug 2025 — now',
    company: 'Tactable',
    desc: 'Building full-stack financial applications for institutional clients.',
    accent: '#d9b25f',
    progress: 0.75,
    statText: 'Two Sigma · TD Securities',
    statLabel: 'clients',
  },
];
