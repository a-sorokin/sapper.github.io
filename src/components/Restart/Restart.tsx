import React from 'react';
import style from './Restart.module.scss';
import { useGridStore } from 'store/store';

export const Restart = () => {
  const { restart, isStopped } = useGridStore();
  if (!isStopped) return null;
  return (
    <div className={style.btnContainer}>
      <div className={style.btn} onClick={restart}>
        Restart
      </div>
    </div>
  );
};
