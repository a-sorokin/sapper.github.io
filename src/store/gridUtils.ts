export type TCell = {
  bomb: boolean;
  isClicked: boolean;
  value: string | number;
};
export type TRow = TCell[];
export type TGrid = TRow[];

const placeBombs = (
  grid: TGrid,
  gridSize: number,
  bombsCount: number
): TGrid => {
  const getRandomIndex = () =>
    Math.floor(Math.random() * (gridSize ** 2 - 1) + 1);
  const bombIndexes = new Set<number>();
  while (bombIndexes.size < bombsCount) {
    bombIndexes.add(getRandomIndex());
  }
  const bombsArr = Array.from(bombIndexes);
  bombsArr.forEach(index => {
    const row = index <= gridSize ? 1 : Math.ceil(index / gridSize);
    const cell = grid[row - 1][index % gridSize];
    cell.bomb = true;
  });
  return grid;
};

export const createGrid = (gridSize: number, bombsCount: number): TGrid => {
  const grid = [];
  const emptyCell = {
    bomb: false,
    isClicked: false,
    value: '',
  };
  for (let i = 0; i < gridSize; i++) {
    const row = new Array(gridSize);
    row.fill('');
    grid.push(row.map(() => ({ ...emptyCell })));
  }
  return placeBombs(grid, gridSize, bombsCount);
};

const getNearCells = (grid: TGrid, rowId: number, cellId: number) => {
  const filterFunc = (r: number) => r >= 0 && r < grid.length;
  const rowsForCheck = [rowId - 1, rowId, rowId + 1].filter(filterFunc);
  const columnsForCheck = [cellId - 1, cellId, cellId + 1].filter(filterFunc);
  return { rowsForCheck, columnsForCheck };
};

const checkNearCells = (grid: TGrid, rowId: number, cellId: number): number => {
  const { rowsForCheck, columnsForCheck } = getNearCells(grid, rowId, cellId);
  let bombsCount = 0;
  rowsForCheck.forEach(row => {
    columnsForCheck.forEach(index => {
      if (grid[row][index].bomb) bombsCount++;
    });
  });
  return bombsCount;
};

export const cellClick = (
  grid: TGrid,
  rowId: number,
  cellId: number
): { grid: TGrid; isStopped?: boolean } => {
  const cell = grid[rowId][cellId];

  if (cell.bomb || cell.isClicked) {
    return { grid, isStopped: cell.bomb };
  }

  cell.isClicked = true;
  cell.value = checkNearCells(grid, rowId, cellId) || '';

  if (!cell.value) {
    const { rowsForCheck, columnsForCheck } = getNearCells(grid, rowId, cellId);
    rowsForCheck.forEach(row =>
      columnsForCheck.forEach(index => cellClick(grid, row, index))
    );
  }

  return { grid };
};
