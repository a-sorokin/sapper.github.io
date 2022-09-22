import React from 'react';
import style from './GridSizeSelector.module.scss';
import { useGridStore } from 'store/store';

const GRID_SIZES_TEXT = ['5x5', '10x10', '20x20'];
const GRID_SIZES = [5, 10, 20];

const SizeButton: React.FC<{ sizeText: string; size: number }> = ({
  sizeText,
  size,
}) => {
  const minSize = size;
  const maxSize = size ** 2 - size;
  const setGrid = useGridStore(state => state.setGrid);
  const [bombsCount, setBombsCount] = React.useState(size);
  const changeHandler = React.useCallback(
    (count: number) => {
      count = count > maxSize ? maxSize : count;
      count = count < minSize ? minSize : count;
      setBombsCount(count);
    },
    [maxSize, minSize]
  );

  return (
    <div key={sizeText}>
      <div className={style.size} onClick={() => setGrid(size, bombsCount)}>
        {sizeText}
      </div>
      <div className={style.bombs}>
        <span>Bombs:</span>
        <div>
          <input
            className={style.input}
            type="number"
            value={bombsCount}
            min={minSize}
            max={maxSize}
            onChange={e => changeHandler(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export const GridSizeSelector = () => (
  <div className={style.container}>
    {GRID_SIZES_TEXT.map((sizeText, i) => (
      <SizeButton key={sizeText} sizeText={sizeText} size={GRID_SIZES[i]} />
    ))}
  </div>
);
