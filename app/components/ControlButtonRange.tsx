"Use client";
import { useContext } from "react";
import { GridContext } from "../page";
interface Props {
  ParameterToChange: "Row" | "Col";
}
type setterFunction = (n: number) => void;
import Styles from "./controlls.module.css";
function ControlButtonRange({ ParameterToChange }: Props) {
  const GridInfo = useContext(GridContext);
  const value =
    ParameterToChange === "Col"
      ? (GridInfo?.cols as number)
      : (GridInfo?.rows as number);
  const handler =
    ParameterToChange === "Col"
      ? (GridInfo?.setCols as setterFunction)
      : (GridInfo?.setRows as setterFunction);
  return (
    <div className={`${Styles.ControlRangePanel} ${Styles.ControlButton}`}>
      <span className={Styles.ControlRangeLabel}>
        {ParameterToChange}: {value}
      </span>
      <button
        onClick={() => {
          handler(1);
        }}
        className={`${Styles.ControlRangeButton} ${Styles.ControlRangeButtonMore}`}
      >
        +
      </button>
      <button
        onClick={() => {
          handler(-1);
        }}
        className={`${Styles.ControlRangeButton} ${Styles.ControlRangeButtonLess}`}
      >
        -
      </button>
    </div>
  );
}

export default ControlButtonRange;
