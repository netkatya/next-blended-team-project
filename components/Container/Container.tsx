import styled from './Container.module.css';

export default function Container({ children }) {
  return <div className={styled.container}>{children}</div>;
}
