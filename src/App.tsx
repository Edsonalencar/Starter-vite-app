import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import { theme } from "./config/theme/themeConfig";
import { AuthProvider } from "./contexts/AuthContext";
import { RenderRouter } from "./types";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "./config/routes";

const App: React.FC = () => {
  const renderRoutes = (routes: RenderRouter[]) => {
    return routes.map(({ path, component: Component, children }, index) => (
      <Route key={index} path={path} element={Component && <Component />}>
        {children && renderRoutes(children)}
      </Route>
    ));
  };

  return (
    <Router>
      <ConfigProvider direction="ltr" theme={theme}>
        <AuthProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Controle de rotas do sistema */}
          <Routes>{renderRoutes(routes)}</Routes>
        </AuthProvider>
      </ConfigProvider>
    </Router>
  );
};

export default App;
