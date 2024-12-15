import { Spin } from "antd";
import { twMerge } from "tailwind-merge";
interface loadingProps {
  isLoading?: boolean;
}

export const LoadingContent = ({ isLoading }: loadingProps) => {
  return (
    <div
      hidden={true}
      className={twMerge(
        "absolute top-0 left-0  h-full w-full bg-black bg-opacity-10 z-50 flex justify-center items-center",
        isLoading ? "flex" : "hidden"
      )}
    >
      <Spin />
    </div>
  );
};
