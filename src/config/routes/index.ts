import { LoginPage } from "@/components/pages/Login";
import { StarterPage } from "@/components/pages/StarterPage";
import { LayoutTemplate } from "@/components/templates/LayoutTemplate";
import { RenderRouter } from "@/types";

export const routes: RenderRouter[] = [
  { path: "/login", component: LoginPage },
  {
    path: "/app",
    component: LayoutTemplate,
    children: [{ path: "/app", component: StarterPage }],
  },
];
