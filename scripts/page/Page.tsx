import Head from 'next/head';

import NavBar from './NavBar';
import styles from './page.module.css';

/**
 * General page layout containing NavBar and page-specific content.
 */
const Page: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className={styles.page}>
      <Head>
        <title>Sam Roberts&apos; personal website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Page;
