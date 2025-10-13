interface Props {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  onNextStep: () => void;
}

export default function Controls({
  isRunning,
  setIsRunning,
  onNextStep,
}: Props) {
  return (
    <div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "⏸️ Detener" : "▶️ Iniciar"}
      </button>
      <button onClick={onNextStep} disabled={isRunning}>
        ➡️ Siguiente Paso
      </button>
    </div>
  );
}
