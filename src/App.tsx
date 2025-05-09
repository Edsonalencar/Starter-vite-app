import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import { RenderRouter } from "./types";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "./config/routes";
import { ThemeProviderConfig } from "./components/organisms/ThemeProviderConfig";

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
      <AuthProvider>
        <ThemeProviderConfig>
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
        </ThemeProviderConfig>
      </AuthProvider>
    </Router>
  );
};

export default App;
