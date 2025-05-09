import { DashboardPage } from "@/components/pages/Dashboard";
import { LoginPage } from "@/components/pages/Login";
import { LayoutTemplate } from "@/components/templates/LayoutTemplate";
import { RenderRouter } from "@/types";

export const routes: RenderRouter[] = [
  { path: "/login", component: LoginPage },
  {
    path: "/app",
    component: LayoutTemplate,
    children: [{ path: "dashboard", component: DashboardPage }],
  },
];
