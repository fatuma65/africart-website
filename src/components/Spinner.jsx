import "./SpinnerStyles.css";

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;

