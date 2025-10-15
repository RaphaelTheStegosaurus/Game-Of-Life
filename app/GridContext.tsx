"use client";
import { createContext } from "react";

interface GridSize {
  cols: number;
  rows: number;
}
interface GridContextType extends GridSize {
  setCols: (n: number) => void;
  setRows: (n: number) => void;
}
export const GridContext = createContext<GridContextType | null>(null);
