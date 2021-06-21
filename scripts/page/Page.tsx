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
      <NavBar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Page;
