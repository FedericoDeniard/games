import "./index.css";
export const Button = ({
  text,
  action,
}: {
  text: String;
  action: () => void;
}) => {
  return <button onClick={action}>{text}</button>;
};
