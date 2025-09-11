import style from './GridItem.module.css';

interface GridItemProps {
  children: React.ReactNode;
}

export default function GridItem({ children }: GridItemProps) {
  return <li className={style.item}>{children}</li>;
}
