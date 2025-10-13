"Use client";
import { useContext } from "react";
import { GridContext } from "../page";
interface Props {
  ParameterToChange: "Row" | "Col";
}
import Styles from "./controlls.module.css";
function ControlButtonRange() {
  const GridInfo = useContext(GridContext);

  return (
    <div className={`${Styles.ControlRangePanel} ${Styles.ControlButton}`}>
      <span className={Styles.ControlRangeLabel}>10</span>
      <button
        className={`${Styles.ControlRangeButton} ${Styles.ControlRangeButtonMore}`}
      >
        +
      </button>
      <button
        className={`${Styles.ControlRangeButton} ${Styles.ControlRangeButtonLess}`}
      >
        -
      </button>
    </div>
  );
}

export default ControlButtonRange;
