import style from './Grid.module.css';

export default function Grid({ children }: GridProps) {
  return <ul className={style.list}>{children}</ul>;
}
