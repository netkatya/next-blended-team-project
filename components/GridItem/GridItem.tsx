import style from './GridItem.module.css';

export default function GridItem({ children }: GridItemProps) {
  return <li className={style.item}>{children}</li>;
}
