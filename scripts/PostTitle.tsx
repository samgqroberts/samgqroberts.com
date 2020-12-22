import React from "react";
import styles from '../styles/general.module.css';
import { format } from 'date-fns';

export default function PostTitle({ title, date }: {
  title: string
  date: string
 }) {
  return (
    <React.Fragment>
      <h1>{title}</h1>
      <div className={styles.date}>
        {format(new Date(date), 'yyyy MMMM d')}
      </div>
    </React.Fragment>
  )
}