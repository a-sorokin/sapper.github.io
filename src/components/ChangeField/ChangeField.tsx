import React from 'react';
import style from './ChangeField.module.scss';
import { useGridStore } from 'store/store';

export const ChangeField = () => {
  const { changeField } = useGridStore();
  return (
    <div className={style.arrow} onClick={changeField}>
      <span>&#8592;</span>
    </div>
  );
};
