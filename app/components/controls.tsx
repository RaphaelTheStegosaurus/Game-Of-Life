interface Props {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  onNextStep: () => void;
}
import Styles from "./controlls.module.css";
export default function Controls({
  isRunning,
  setIsRunning,
  onNextStep,
}: Props) {
  return (
    <aside className={Styles.Panel}>
      <button
        className={Styles.ControlButton}
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? "⏸️ Stop" : "▶️ Start"}
      </button>
      <button
        className={Styles.ControlButton}
        onClick={onNextStep}
        disabled={isRunning}
      >
        ➡️ Next Step
      </button>
      <button className={Styles.ControlButton}>
        {" "}
        <span className={Styles.Icon}>↺</span> Reset
      </button>
      <input type="numeric" step={1} max={20} min={5} value={12} />
      <input type="numeric" step={1} max={20} min={5} value={6} />
    </aside>
  );
}
