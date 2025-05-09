import { LoginForm } from "@/components/organisms/LoginForm";
import { theme, Typography } from "antd";

export const LoginPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <div
        className="h-screen flex"
        style={{ backgroundColor: colorBgContainer }}
      >
        <div className="flex flex-col my-auto mx-auto xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-2/3  ">
          <Typography.Title level={4}>Bem vindo(a) de volta!</Typography.Title>
          <LoginForm />
        </div>
      </div>
    </>
  );
};
