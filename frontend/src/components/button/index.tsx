import "./index.css";
export const Button = ({
  text,
  action,
  color,
}: {
  text: String;
  action: () => void;
  color?: string;
}) => {
  return (
    <button onClick={action} style={{ backgroundColor: color ?? "#1a1a1a" }}>
      {text}
    </button>
  );
};
