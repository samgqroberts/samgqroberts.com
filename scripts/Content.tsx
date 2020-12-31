import styles from '../styles/general.module.css';

const Content: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className={styles.contentContainer}>{children}</div>;
};
export default Content;
