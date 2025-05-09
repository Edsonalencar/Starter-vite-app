import { Layout, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { GiSergeant } from "react-icons/gi";

import { Outlet } from "react-router-dom";
import { MenuNavigate } from "../molecules/MenuNavigate";
import { AppHeader } from "../molecules/appHeader/Header";
import { useAuthContext } from "@/contexts/AuthContext";

export const LayoutTemplate: React.FC = () => {
  const { darkMode } = useAuthContext();

  const {
    token: { colorTextBase },
  } = theme.useToken();

  return (
    <Layout hasSider className="min-h-screen">
      <Sider
        trigger={null}
        theme="light"
        width={256}
        className="border-r border-gray-200 border-solid"
        style={{
          borderColor: darkMode ? "#222" : "#e5e7eb",
        }}
      >
        <div className=" pl-7 p-2.5 my-1">
          <span
            className="font-semibold text-lg flex items-center gap-2"
            style={{ color: colorTextBase }}
          >
            <GiSergeant className="text-primary" />
            Torque Tech
          </span>
        </div>

        <MenuNavigate />
      </Sider>
      <Layout>
        <AppHeader />
        <section className="px-8 py-4">
          {/* Renderiza as paginas do react router dom */}
          <Outlet />
        </section>
      </Layout>
    </Layout>
  );
};
