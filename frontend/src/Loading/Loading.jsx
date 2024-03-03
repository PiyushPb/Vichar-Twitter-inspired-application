import { PropagateLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <PropagateLoader color="#0067ff" size={10} />
    </div>
  );
};

export default Loading;
