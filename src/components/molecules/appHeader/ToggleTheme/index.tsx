import { Button, Tooltip } from "antd";
import { useAuthContext } from "@/contexts/AuthContext";
import { BsMoonStarsFill, BsMoonStars } from "react-icons/bs";

export const ToggleTheme: React.FC = () => {
  const { toggleTheme, darkMode } = useAuthContext();

  return (
    <Tooltip title="Atualiza o tema">
      <Button
        className="size-8 rounded-full"
        icon={
          darkMode ? <BsMoonStarsFill size={16} /> : <BsMoonStars size={16} />
        }
        type="text"
        onClick={toggleTheme}
      />
    </Tooltip>
  );
};
