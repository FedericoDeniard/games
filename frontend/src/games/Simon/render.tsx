import "./index.css";

export const SimonRender = () => {
  return (
    <div className="container">
      <div className="simon-board">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`simon-cell simon-cell-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};
