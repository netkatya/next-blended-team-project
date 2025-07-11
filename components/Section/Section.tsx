import { ReactNode } from 'react';

import style from './Section.module.css';

interface SectionProps {
  children: ReactNode;
}

export default function Section({ children }: SectionProps) {
  return <section className={style.section}>{children}</section>;
}
