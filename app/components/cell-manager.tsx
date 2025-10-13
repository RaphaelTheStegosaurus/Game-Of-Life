"use client";
import { forwardRef, useImperativeHandle } from "react";
import Cell from "./cell";
import styles from "./cell.module.css";
interface Props {
  cols: number;
  rows: number;
  currentGeneration: boolean[];
  onStatusChange: (id: number, newState: boolean) => void;
  onGenerationComplete: (newGrid: boolean[]) => void;
}
interface ManagerRef {
  checkGrid: () => void;
}
const Cell_Grid_Manager = forwardRef<ManagerRef, Props>(
  (
    { cols, rows, currentGeneration, onStatusChange, onGenerationComplete },
    ref
  ) => {
    const nElements = cols * rows;
    const findIndexIntoTheGrid = (col: number, row: number) => {
      return row * cols + col;
    };

    const ToroidalGrid = (value: number, SizeAxis: number) => {
      if (value < 0) return SizeAxis - 1;
      if (value >= SizeAxis) return 0;
      return value;
    };

    const checkNeighborsCells = (col: number, row: number) => {
      const MAP_NEIGHBOR = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
      const listOfNeghbors = MAP_NEIGHBOR.map((value) => {
        const colPointer = ToroidalGrid(col + value[0], cols);
        const rowPoiter = ToroidalGrid(row + value[1], rows);
        return [colPointer, rowPoiter];
      });
      return listOfNeghbors;
    };

    const applyConwayRules = (
      isCurrentlyAlive: boolean,
      countOfCellsNeighborsIsAlive: number
    ) => {
      if (isCurrentlyAlive) {
        return (
          countOfCellsNeighborsIsAlive === 2 ||
          countOfCellsNeighborsIsAlive === 3
        );
      } else {
        return countOfCellsNeighborsIsAlive === 3;
      }
    };
    const CheckGrid = () => {
      const prevGeneration = currentGeneration;
      const nextGenArray = [...prevGeneration];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const myIndex = findIndexIntoTheGrid(c, r);
          const listNeighbors = checkNeighborsCells(c, r);
          const countOfCellsNeighborsIsAlive = listNeighbors.reduce(
            (total, [colNeighbor, rowNeighbor]) => {
              const neighborIndex = findIndexIntoTheGrid(
                colNeighbor,
                rowNeighbor
              );
              return total + (prevGeneration[neighborIndex] ? 1 : 0);
            },
            0
          );
          const isCurrentlyAlive = prevGeneration[myIndex];
          const willBeAlive = applyConwayRules(
            isCurrentlyAlive,
            countOfCellsNeighborsIsAlive
          );
          nextGenArray[myIndex] = willBeAlive;
        }
      }
      onGenerationComplete(nextGenArray);
    };
    useImperativeHandle(ref, () => ({
      checkGrid: CheckGrid,
    }));
    const cells = new Array(nElements).fill(null).map((_, index) => {
      return (
        <Cell
          statusLife={currentGeneration[index]}
          onStatusChange={onStatusChange}
          index={index}
          key={index}
        />
      );
    });
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
);
Cell_Grid_Manager.displayName = "Cell_Grid_Manager";
export default Cell_Grid_Manager;
