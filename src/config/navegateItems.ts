import { MenuProps } from "antd";

import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";

interface NavegateItems {
  signOut: () => void;
}

export const getNavegateItems = ({
  signOut,
}: NavegateItems): MenuProps["items"] => {
  return [
    {
      key: "/app",
      label: "Home",
      icon: React.createElement(MdHome), // Corrigido com React.createElement
    },
    {
      key: "/login",
      label: "Sair",
      icon: React.createElement(FaSignOutAlt),
      onClick: signOut,
      style: { position: "absolute", bottom: 0 },
    },
  ];
};
