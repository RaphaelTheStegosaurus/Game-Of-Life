interface Props {
  cols: number;
  rows: number;
}
import Cell from "./cell";
import styles from "./cell.module.css";
function Cell_Grid_Manager({ cols, rows }: Props) {
  const nElements = cols * rows;
  const cells = new Array(nElements).fill(null).map((_, index) => {
    return (
      <Cell index={index} key={index}/>
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

export default Cell_Grid_Manager;
