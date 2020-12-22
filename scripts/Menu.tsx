import Image from 'next/image';
import styles from '../styles/general.module.css';

export default function Menu({ }: {

}) {
  return (
    <div className={styles.menuContainer}>
      <a href="/" className={styles.headshotLink}>
        <Image src="/headshot.png" alt="In fact, me!" width={140} height={140} />
      </a>
      <p>I am Sam Roberts</p>
      <p>You can reach me here here and here</p>
    </div>
  );
}