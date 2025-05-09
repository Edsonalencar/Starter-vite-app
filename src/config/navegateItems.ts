import { MenuProps } from "antd";

import React from "react";
import { MdLogout } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { IconBaseProps } from "react-icons";
import { HiOutlineHome } from "react-icons/hi2";

export interface NavegateItem {
  key: string;
  label: string;
  icon: React.FunctionComponentElement<IconBaseProps>;
  children?: NavegateItem[];
  show?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

interface NavegateItems {
  signOut: () => void;
  hasRole: (role: string) => boolean;
}

export const getNavegateItems = ({
  signOut,
  hasRole,
}: NavegateItems): MenuProps["items"] => {
  const items: NavegateItem[] = [
    {
      key: "/app/dashboard",
      label: "Dashboard",
      icon: React.createElement(HiOutlineHome),
    },
    {
      key: "/app/config",
      label: "Configurações",
      icon: React.createElement(BsGear),
    },
    {
      key: "/login",
      label: "Sair",
      icon: React.createElement(MdLogout),
      onClick: signOut,
    },
  ];

  return items.filter((item) => item.show !== false);
};
