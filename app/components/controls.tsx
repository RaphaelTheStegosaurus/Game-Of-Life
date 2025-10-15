interface Props {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  onNextStep: () => void;
  onResetGeneration: (newGrid: boolean[]) => void;
  nElements: number;
}
import ControlButtonRange from "./ControlButtonRange";
import Styles from "./controlls.module.css";
export default function Controls({
  isRunning,
  setIsRunning,
  onNextStep,
  onResetGeneration,
  nElements,
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
      <button
        className={Styles.ControlButton}
        onClick={() => {
          onResetGeneration(new Array(nElements).fill(false));
        }}
      >
        <span className={Styles.Icon}>↺</span> Reset
      </button>
      <ControlButtonRange ParameterToChange="Col" />
      <ControlButtonRange ParameterToChange="Row" />
    </aside>
  );
}
