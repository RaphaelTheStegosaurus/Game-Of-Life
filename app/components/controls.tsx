interface Props {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  onNextStep: () => void;
}
type ParameterToChange = "Row" | "Col";
import ControlButtonRange from "./ControlButtonRange";
import Styles from "./controlls.module.css";
export default function Controls({
  isRunning,
  setIsRunning,
  onNextStep,
}: Props) {
  const HandleChangeValue = (Parameter: ParameterToChange, Value: number) => {};
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
        <span className={Styles.Icon}>↺</span> Reset
      </button>
      <ControlButtonRange ParameterToChange="Col" />
      <ControlButtonRange ParameterToChange="Row" />
    </aside>
  );
}
