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
const MIN_SIZE = 5;
const MAX_SIZE = 50;
export const GridContext = createContext<GridContextType | null>(null);
export default function Home() {
  const [gridSize, setGridSize] = useState<GridSize>({ cols: 10, rows: 5 });
  const [NElements, setNElements] = useState<number>(
    gridSize.cols * gridSize.rows
  );
  useEffect(() => {
    setNElements(gridSize.cols * gridSize.rows);
  }, [gridSize]);
  useEffect(() => {
    if (CurrentGenerationCell.length !== NElements) {
      setCurrentGenerationCell(new Array(NElements).fill(false));
    }
  }, [NElements]);

  const HandleChangeRows = (value: number) => {
    setGridSize((prev) => {
      const newRows = prev.rows + value;
      if (newRows < MIN_SIZE || newRows > MAX_SIZE) {
        return prev;
      }
      return { ...prev, rows: newRows };
    });
  };
  const HandleChangeCols = (value: number) => {
    setGridSize((prev) => {
      const newCols = prev.cols + value;
      if (newCols < MIN_SIZE || newCols > MAX_SIZE) {
        return prev;
      }
      return { ...prev, cols: newCols };
    });
  };

  const [CurrentGenerationCell, setCurrentGenerationCell] = useState<boolean[]>(
    new Array(NElements).fill(false)
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
    const allAreDead = newGrid.every((value) => !value);
    if (allAreDead) {
      setIsRunning(false);
    }
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
          cols={gridSize.cols}
          rows={gridSize.rows}
          currentGeneration={CurrentGenerationCell}
          onStatusChange={handleCellToggle}
        />
        <Controls
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          onNextStep={() => gridManagerRef.current?.checkGrid()}
          onResetGeneration={handleGenerationComplete}
          nElements={NElements}
        />
      </GridContext.Provider>
    </>
  );
}
