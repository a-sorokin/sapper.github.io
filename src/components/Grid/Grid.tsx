import React from 'react';
import style from './Grid.module.scss';
import { useGridStore } from 'store/store';

export const Grid = () => {
  const { grid, isStopped, cellClick } = useGridStore();

  return (
    <div className={style.gridContainer}>
      <div className={style.grid}>
        {grid.map((row, i) => (
          <div key={i} className={style.row}>
            {row.map((cell, ii) => (
              <div
                key={ii}
                className={`${style.cell} ${
                  cell.isClicked ? style.cellClicked : ''
                } ${isStopped && cell.bomb ? style.cellGameOver : ''}`}
                onClick={() => !isStopped && cellClick(i, ii)}
              >
                {isStopped && cell.bomb ? '💣' : cell.value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
