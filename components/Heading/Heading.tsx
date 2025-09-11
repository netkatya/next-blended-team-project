import styles from './Heading.module.css';

interface HeadingProps {
  title: string | React.ReactNode;
  top?: boolean;
  bottom?: boolean;
  error?: boolean;
  info?: boolean;
}

export default function Heading({ title, top, bottom, error, info }: HeadingProps) {
  let className = styles.title;

  if (top) className += ` ${styles.top}`;
  if (bottom) className += ` ${styles.bottom}`;
  if (error) className += ` ${styles.error}`;
  if (info) className += ` ${styles.info}`;

  return <h2 className={className}>{title}</h2>;
}
