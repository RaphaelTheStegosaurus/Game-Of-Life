import styles from "./page.module.css";
import Cell_Grid_Manager from "./components/cell-manager";

export default function Home() {
  return (
    <>
      <h1 className={`${styles.title}`}>Game of Life - John Conway</h1>
      <Cell_Grid_Manager cols={6} rows={3} />
      <section className={`${styles.panel}`}></section>
    </>
  );
}
