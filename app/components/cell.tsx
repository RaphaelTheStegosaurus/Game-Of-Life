"use client";
interface Props {
  index: number;
  onStatusChange: (index: number, status: boolean) => void;
}
import { useState } from "react";
import styles from "./cell.module.css";
function Cell({ index, onStatusChange }: Props) {
  const [IsAlive, setIsAlive] = useState(false);
  const handleClick = () => {
    const newState = !IsAlive;
    setIsAlive(newState);
    onStatusChange(index, newState);
  };

  return (
    <button
      onClick={() => handleClick()}
      id={`n${index}`}
      className={`${styles.cell} ${IsAlive ? styles.alive : ""}`}
    >
      {IsAlive ? "1" : "0"}
    </button>
  );
}

export default Cell;
