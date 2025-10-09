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
  const CheckGrid = () => {
    /* 
    18 que van del 0*17
    6 col y  3 row 
        0   1   2   3   4   5
    0   
    1               z
    2       x
    
    x= (1,2) = 13 = 6+6+(1+1+0+0+0+0)-1
    z=(3,1) = 09 = 6+(1+1+1+1+0+0)-1


        0   1   2   3   4
    0
    1
    2               x
    3
    4
    x=(3,2) = 5+5+(1+1+1+1+0)-1 = 13
    */
   
  };
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
