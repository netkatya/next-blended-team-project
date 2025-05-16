import style from "./GridItem.module.css";

export default function GridItem({ children }) {
  return <li className={style.item}>{children}</li>;
}
