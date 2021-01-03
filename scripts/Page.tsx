import Head from 'next/head';

import styles from '../styles/general.module.css';
import Menu from './Menu';

const Page: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sam Roberts&apos; personal website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export default Page;
