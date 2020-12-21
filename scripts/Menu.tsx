import { TopicItem } from "./blogClient/types";
import Image from 'next/image';
import styles from '../styles/general.module.css';

export default function Menu({ }: {

}) {
  return (
    <div className={styles.menuContainer}>
      <Image src="/headshot.png" alt="In fact, me!" width={140} height={140} />
      <p>I am Sam Roberts</p>
      <p>You can reach me here here and here</p>
    </div>
  );
}