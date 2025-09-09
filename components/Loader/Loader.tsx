import style from './Loader.module.css';

export default function Loader() {
  return (
    <div className={style.backdrop}>
      <div className={style.container}>
        <div className={style.loader}>
          <span></span>
        </div>
        <div className={style.loader}>
          <span></span>
        </div>
        <div className={style.loader}>
          <i></i>
        </div>
        <div className={style.loader}>
          <i></i>
        </div>
      </div>
    </div>
  );
}
