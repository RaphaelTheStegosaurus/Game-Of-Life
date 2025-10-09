"use client";
interface Props {
  cols: number;
  rows: number;
}
import { useEffect, useState } from "react";
import Cell from "./cell";
import styles from "./cell.module.css";
function Cell_Grid_Manager({ cols, rows }: Props) {
  const nElements = cols * rows;
  const [GridCellState, setGridCellState] = useState<boolean[]>(
    new Array(nElements).fill(false)
  );
  const handleButtonStateChange = (id: number, newState: boolean) => {
    setGridCellState((prevStates) => ({
      ...prevStates,
      [id]: newState,
    }));
  };
  const cells = new Array(nElements).fill(null).map((_, index) => {
    return (
      <Cell
        onStatusChange={handleButtonStateChange}
        index={index}
        key={index}
      />
    );
  });
  const CheckGrid = () => {};
  useEffect(() => {
    console.log(GridCellState);
    
  }, [GridCellState]);

  return (
    <main
      className={`${styles.board}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {cells}
    </main>
  );
}

export default Cell_Grid_Manager;
