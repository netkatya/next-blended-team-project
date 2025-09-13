import styled from './Container.module.css';

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className={styled.container}>{children}</div>;
}
