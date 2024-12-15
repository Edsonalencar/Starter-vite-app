import { LoginForm } from "@/components/organisms/LoginForm";

export const LoginPage = () => {
  return (
    <>
      <div className="h-screen flex">
        <div className="flex flex-col my-auto mx-auto xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-2/3  ">
          <h1 className="font-bold text-2xl">Bem vindo(a) de volta!</h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
};
