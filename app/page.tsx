"use client";
import styles from "./page.module.css";
import Cell_Grid_Manager from "./components/cell-manager";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import Controls from "./components/controls";
interface ManagerRef {
  checkGrid: () => void;
  resetGrid: () => void;
}
interface GridSize {
  cols: number;
  rows: number;
}
interface GridContextType extends GridSize {
  setCols: (n: number) => void;
  setRows: (n: number) => void;
}
const ROWS = 5;
const COLS = 10;
const N_ELEMENTS = ROWS * COLS;
export const GridContext = createContext<GridContextType | null>(null);
export default function Home() {
  const [gridSize, setGridSize] = useState<GridSize>({ cols: 10, rows: 5 });
  const HandleChangeRows = (value: number) => {
    setGridSize((prev) => {
      return { ...prev, rows: value };
    });
  };
  const HandleChangeCols = (value: number) => {
    setGridSize((prev) => {
      return { ...prev, cols: value };
    });
  };
  const [CurrentGenerationCell, setCurrentGenerationCell] = useState<boolean[]>(
    new Array(N_ELEMENTS).fill(false)
  );
  const [isRunning, setIsRunning] = useState(false);
  const handleCellToggle = useCallback((id: number, newState: boolean) => {
    setCurrentGenerationCell((prevStates) => {
      const newStates = [...prevStates];
      newStates[id] = newState;
      return newStates;
    });
  }, []);
  const handleGenerationComplete = useCallback((newGrid: boolean[]) => {
    setCurrentGenerationCell(newGrid);
  }, []);
  const gridManagerRef = useRef<ManagerRef | null>(null);
  useEffect(() => {
    let simulationInterval: NodeJS.Timeout | null = null;

    if (isRunning && gridManagerRef.current) {
      simulationInterval = setInterval(() => {
        gridManagerRef.current?.checkGrid();
      }, 500);
    }

    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [isRunning, gridManagerRef]);
  return (
    <>
      <GridContext.Provider
        value={{
          cols: gridSize.cols,
          rows: gridSize.rows,
          setCols: HandleChangeCols,
          setRows: HandleChangeRows,
        }}
      >
        <h1 className={`${styles.title}`}>Game of Life - John Conway</h1>
        <Cell_Grid_Manager
          onGenerationComplete={handleGenerationComplete}
          ref={gridManagerRef}
          cols={COLS}
          rows={ROWS}
          currentGeneration={CurrentGenerationCell}
          onStatusChange={handleCellToggle}
        />
        <Controls
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          onNextStep={() => gridManagerRef.current?.checkGrid()}
        />
      </GridContext.Provider>
    </>
  );
}
