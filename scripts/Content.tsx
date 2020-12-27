import styles from '../styles/general.module.css';

export default function Content({ children }: {
  children: React.ReactNode,
}) {
  return (
    <div className={styles.contentContainer}>
      {children}
    </div>
  );
}
