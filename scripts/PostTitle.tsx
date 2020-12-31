import { format } from 'date-fns';
import React from 'react';

import styles from '../styles/general.module.css';

const PostTitle: React.FC<{
  title: string;
  date: string;
}> = ({ title, date }) => {
  return (
    <>
      <h1>{title}</h1>
      <div className={styles.date}>{format(new Date(date), 'yyyy MMMM d')}</div>
    </>
  );
};
export default PostTitle;
