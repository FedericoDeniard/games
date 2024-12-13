import "./index.css";
export const Button = ({
  text,
  action,
  color,
  show = true,
}: {
  text: String;
  action: () => void;
  color?: string;
  show?: boolean;
}) => {
  return (
    <button
      onClick={action}
      style={{
        backgroundColor: color ?? "#1a1a1a",
        visibility: show ? "visible" : "hidden",
      }}
    >
      {text}
    </button>
  );
};
