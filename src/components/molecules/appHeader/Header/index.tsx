import { NotificationsHeader } from "@/components/molecules/appHeader/NotificationsHeader";
import { Flex, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { ConfigHeader } from "../ConfigHeader";
import { SelectActiveGarage } from "../SelectActiveGarage";
import { ToggleTheme } from "../ToggleTheme";

export const AppHeader: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ background: colorBgContainer }} className="px-4 h-14">
      <Flex justify="end" align="center" gap={8} className=" h-full w-full">
        <NotificationsHeader />
        <ToggleTheme />
        <ConfigHeader />
        <SelectActiveGarage />
      </Flex>
    </Header>
  );
};
