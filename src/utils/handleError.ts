import { AbstractException } from "@/services/handler/AbstractException";
import { toast } from "react-toastify";

interface TypeErrors {
  e: unknown;
}

export const handleError = ({ e }: TypeErrors) => {
  if (e instanceof AbstractException) {
    toast.error(e.describe());
  } else {
    console.log(e);
  }
};
