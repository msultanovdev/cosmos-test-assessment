import { Route, Routes } from "react-router-dom";
import "./app.css";
import { rootRoutes } from "./routes";

function App() {
  return (
    <>
      <Routes>
        {rootRoutes.map((route) => {
          return <Route Component={route.Component} path={route.path} />;
        })}
      </Routes>
    </>
  );
}

export default App;
