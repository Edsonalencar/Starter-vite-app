import { theme, ThemeConfig } from "antd";

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm, // Tema Claro
  token: {
    fontSize: 16,
    colorPrimary: "#5D9C59",
    borderRadius: 8,
    colorTextBase: "#474d5a",
  },
  components: {
    Menu: {
      iconSize: 15,
      fontSize: 15,
      colorBgBase: "transparent",
      colorBgContainer: "transparent",
    },
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
    },
    Layout: {
      headerBg: "#fff",
      headerColor: "#000",
      bodyBg: "#fff",
    },
    Table: {
      fontSize: 15,
    },
    Typography: {
      colorText: "#000",
    },
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm, // Tema Escuro
  token: {
    fontSize: 16,
    colorPrimary: "#5D9C59",
    borderRadius: 8,
    colorTextBase: "#E0E0E0",
    colorBgContainer: "#1a1a1a",
  },
  components: {
    Menu: {
      iconSize: 15,
      fontSize: 15,
      colorBgBase: "transparent",
      colorBgContainer: "transparent",
    },
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
    },
    Layout: {
      headerBg: "#222",
      headerColor: "#FFF",
      bodyBg: "#1a1a1a",
    },
    Table: {
      fontSize: 15,
    },
    Typography: {
      colorText: "#E0E0E0",
    },
  },
};
