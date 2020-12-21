import styles from '../styles/general.module.css';

export default function Content({ }: {

}) {
  return (
    <div className={styles.contentContainer}>
      <h1>Some content title</h1>
      <p>Some content paragraph</p>
      <p>Another content paragraph</p>
    </div>
  );
}
