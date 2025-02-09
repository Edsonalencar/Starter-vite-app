export type ArgsError = {
  errors?: object;
  message?: string;
};

export interface ResponseDTO<T> {
  data?: T | any;
  time: string;
}

export const apiAnchorTo = async (absolutPath: string) => {
  window.parent.location.href = absolutPath;
};
