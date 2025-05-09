import { AuthContext } from "@/contexts/AuthContext";
import { Button, Layout, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export const LayoutAdminTemplate: React.FC = () => {
  const { signOut } = useContext(AuthContext);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      <Header
        style={{
          padding: `0 1rem`,
          background: colorPrimary,
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
          color: `#FFF`,
        }}
      >
        <span className="font-extrabold text-xl">Painel administrativo</span>
        <Button
          onClick={signOut}
          icon={<FaSignOutAlt />}
          type="text"
          className="text-white"
        >
          Sair
        </Button>
      </Header>
      <section className="p-4">
        {/* Renderiza as paginas do react router dom */}
        <Outlet />
      </section>
    </Layout>
  );
};
