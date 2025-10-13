"use client";
import styles from "./page.module.css";
import Cell_Grid_Manager from "./components/cell-manager";
import { useCallback, useEffect, useRef, useState } from "react";
import Controls from "./components/controls";
interface ManagerRef {
  checkGrid: () => void;
  resetGrid: () => void;
}
const ROWS = 5;
const COLS = 10;
const N_ELEMENTS = ROWS * COLS;
export default function Home() {
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
    </>
  );
}
