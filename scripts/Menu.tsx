import Image from 'next/image';
import styles from '../styles/general.module.css';

export default function Menu({ }: {

}) {
  return (
    <div className={styles.menuContainer}>
      <a href="/" className={styles.headshotLink}>
        <Image src="/headshot.png" alt="In fact, me!" width={140} height={140} />
      </a>
      <a href="https://twitter.com/samgqroberts">twitter.com/samgqroberts</a>
      <a href="https://github.com/samgqroberts">github.com/samgqroberts</a>
      <a href="https://www.linkedin.com/in/samgqroberts">linkedin.com/in/samgqroberts</a>
    </div>
  );
}