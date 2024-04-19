import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <HashLoader color="#3DADF2" size={50} />
    </div>
  );
};

export default Loading;
