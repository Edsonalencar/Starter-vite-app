import { Button, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MenuNavigate } from "../molecules/MenuNavigate";

export const LayoutTemplate: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  return (
    <Layout hasSider className="h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: colorPrimary }}
      >
        <div className="flex items-center w-full truncate justify-center p-4 mb-3">
          <span className="font-extrabold text-xl text-[#FFF]">
            {collapsed ? "SP" : "Starter App"}
          </span>
        </div>
        <MenuNavigate />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <section className="p-4">
          {/* Renderiza as paginas do react router dom */}
          <Outlet />
        </section>
      </Layout>
    </Layout>
  );
};
