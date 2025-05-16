import style from "./Grid.module.css";

export default function Grid({ children }) {
  return <ul className={style.list}>{children}</ul>;
}
