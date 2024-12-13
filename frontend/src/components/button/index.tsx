import "./index.css";
export const Button = ({
  text,
  action,
  color,
  show = true,
  width,
}: {
  text: String;
  action: () => void;
  color?: string;
  show?: boolean;
  width?: number;
}) => {
  return (
    <button
      onClick={action}
      style={{
        backgroundColor: color ?? "#1a1a1a",
        visibility: show ? "visible" : "hidden",
        width: width ? `${width}px` : "fit-content",
      }}
    >
      {text}
    </button>
  );
};
