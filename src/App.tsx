import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import AuthGuard from "./auth/AuthGuard";

function App() {
  return (
    <Routes>
      {routes.map((route, idx) =>
        route.permissions ? (
          <Route
            key={idx}
            element={<AuthGuard authRoles={route.permissions.join(" ")} />}
          >
            <Route {...route} />
          </Route>
        ) : (
          <Route key={idx} {...route} />
        )
      )}
    </Routes>
  );
}

export default App;
