import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <h1 className={`${styles.title}`}>Game of Life - John Conway</h1>
      <main className={`${styles.board}`}></main>
      <section className={`${styles.panel}`}></section>
    </>
  );
}
