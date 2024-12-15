import type { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: "#FFB300",
    borderRadius: 4,
  },
  components:{
    Menu:{
      iconSize:25,
      colorBgContainer: "#FFB300",
      colorPrimary: "#FFB300",
      colorText: "#FFF",
    },
    Button:{
      borderRadius:2,
    },
    Input:{
      borderRadius:2
    },
    Layout:{
      headerBg: "#fff",
      headerColor: "#fff",
    },
  }
};