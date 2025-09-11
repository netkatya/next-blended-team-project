import style from './Grid.module.css';

interface GridProps {
  children: React.ReactNode;
}

export default function Grid({ children }: GridProps) {
  return <ul className={style.list}>{children}</ul>;
}
