import { darkTheme, lightTheme } from "@/config/theme/themeConfig";
import { useAuthContext } from "@/contexts/AuthContext";
import { ConfigProvider } from "antd";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const ThemeProviderConfig = ({ children }: Props) => {
  const { darkMode } = useAuthContext();

  return (
    <ConfigProvider direction="ltr" theme={darkMode ? darkTheme : lightTheme}>
      {children}
    </ConfigProvider>
  );
};
