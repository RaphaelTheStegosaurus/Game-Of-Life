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
  const [CurrentGenerationCell, setCurrentGenerationCell] = useState<boolean[]>(
    new Array(nElements).fill(false)
  );
  const [NextGenerationCell, setNextGenerationCell] = useState<boolean[]>(
    new Array(nElements).fill(false)
  );
  const handleButtonStateChange = (id: number, newState: boolean) => {
    setCurrentGenerationCell((prevStates) => ({
      ...prevStates,
      [id]: newState,
    }));
  };
  const handleNextGenerationStateChange = (id: number, newState: boolean) => {
    setNextGenerationCell((prevStates) => ({
      ...prevStates,
      [id]: newState,
    }));
  };
  const cells = new Array(nElements).fill(null).map((_, index) => {
    return (
      <Cell
        statusLife={CurrentGenerationCell[index]}
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
    
    00 01 02 03 04 05 
    10 11 12 13 14 15
    20 21 22 23 24 25
    
    [r-1,c-1]   [r-1,c+0]   [r-1,c+1] 
    [r+0,c-1]   [r+0,c+0]   [r+0,c+1] 
    [r+1,c-1]   [r+1,c+0]   [r+1,c+1] 

    */
  };
  const findIndexIntoTheGrid = (col: number, row: number) => {
    const COUNT_OF_COLUMNS = col - (col == 0 ? 0 : 1);
    const newIndex: number = cols * row + COUNT_OF_COLUMNS;
    return newIndex;
  };
  const checkNeighborsCells = (col: number, row: number) => {
    const MAP_NEIGHBOR = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      //   [0, 0], es el mismo
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    const listOfNeghbors = MAP_NEIGHBOR.map((value, index) => {
      const colPointer = ToroidalGrid(col + value[0], cols);
      const rowPoiter = ToroidalGrid(row + value[1], rows);
      return [colPointer, rowPoiter];
    });
    return listOfNeghbors;
  };
  const ToroidalGrid = (value: number, SizeAxis: number) => {
    if (value < 0) {
      return SizeAxis - 1;
    } else if (value >= SizeAxis) {
      return 0;
    } else {
      return value;
    }
  };
  const checkIsWillAliveToNextGeneration = (_CountOfNeigbors: number) => {
    if (_CountOfNeigbors >= 4) {
      return false;
    } else if (_CountOfNeigbors <= 1) {
      return false;
    } else {
      return true;
    }
  };
  const checkCellIsAlive = (col: number, row: number) => {
    const myIndex = findIndexIntoTheGrid(col, row);
    const listNeighbors = checkNeighborsCells(col, row);
    const listIndexByNeighbors = listNeighbors.map((value) => {
      return findIndexIntoTheGrid(value[0], value[1]);
    });
    const countOfCellsNeighborsIsAlive = listIndexByNeighbors.reduce(
      (total, value) => {
        return total + (CurrentGenerationCell[value] ? 1 : 0);
      },
      0
    );
    const isAliveForNextGeneration = checkIsWillAliveToNextGeneration(
      countOfCellsNeighborsIsAlive
    );
    console.log(`[${col},${row}] = ${myIndex}`);
    console.log(`Neighbors =`);
    console.log(listIndexByNeighbors);
    console.log(
      `De esta celula viven ${countOfCellsNeighborsIsAlive} vecinas vivas`
    );
    if (!CurrentGenerationCell[myIndex]) {
      if (countOfCellsNeighborsIsAlive == 3) {
        handleNextGenerationStateChange(myIndex, true);
        console.log("Esta revive");
      }
    } else {
      console.log(`Entonces esta celula estara ${isAliveForNextGeneration}`);
      handleNextGenerationStateChange(myIndex, isAliveForNextGeneration);
    }
  };

  useEffect(() => {
    checkCellIsAlive(2, 0);
  }, [CurrentGenerationCell]);
  useEffect(() => {
    console.log(NextGenerationCell);
  }, [NextGenerationCell]);

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
