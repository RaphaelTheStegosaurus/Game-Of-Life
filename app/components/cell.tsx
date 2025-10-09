"use client";
interface Props {
  index: number;
}
import { useState } from "react";
import styles from "./cell.module.css";
function Cell({ index }: Props) {
  const [IsAlive, setIsAlive] = useState(false);
  const setAliveStatus = () => {
    setIsAlive(!IsAlive);
  };
  return (
    <button
      onClick={() => setAliveStatus()}
      id={`n${index}`}
      className={`${styles.cell} ${IsAlive ? styles.alive : ""}`}
    >
        {IsAlive ? "1" : "0"}
    </button>
  );
}

export default Cell;
