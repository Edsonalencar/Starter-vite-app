import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { getNavegateItems } from "../../../config/navegateItems";

export const MenuNavigate: React.FC<MenuProps> = ({ ...rest }) => {
  const { signOut, hasRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key); // Navega para a rota correspondente
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={getNavegateItems({ signOut, hasRole })}
      onClick={handleMenuClick}
      style={{ borderInlineEnd: "none" }}
      {...rest}
    />
  );
};
