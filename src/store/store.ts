import create from 'zustand';
import { cellClick, createGrid, TGrid } from 'store/gridUtils';

export type TGridStore = {
  grid: TGrid;
  bombsCount: number;
  isInitialized: boolean;
  isStopped: boolean;
  setGrid: (gridSize: number, bombsCount: number) => void;
  cellClick: (rowId: number, cellId: number) => void;
  restart: () => void;
  changeField: () => void;
};

export const useGridStore = create<TGridStore>((set, get) => ({
  grid: [],
  bombsCount: 0,
  isInitialized: false,
  isStopped: false,
  setGrid: (gridSize: number, bombsCount: number) =>
    set(() => ({
      grid: createGrid(gridSize, bombsCount),
      bombsCount: bombsCount,
      isInitialized: true,
      isStopped: false,
    })),
  cellClick: (rowId, cellId) =>
    set(state => {
      const { grid, isStopped } = cellClick(state.grid, rowId, cellId);
      return { grid, isStopped };
    }),
  restart: () => {
    const state = get();
    state.setGrid(state.grid.length, state.bombsCount);
  },
  changeField: () => set({ isInitialized: false }),
}));
