import { format } from 'date-fns';
import React from 'react';

import styles from '../styles/general.module.css';

const PostTitle: React.FC<{
  title: string;
  date: string;
  useH1: boolean;
}> = ({ title, date, useH1 }) => {
  return (
    <>
      {useH1 ? <h1>{title}</h1> : <h2>{title}</h2>}
      <div className={styles.date}>{format(new Date(date), 'yyyy MMMM d')}</div>
    </>
  );
};
export default PostTitle;
