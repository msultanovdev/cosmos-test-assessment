import { Route, Routes } from "react-router-dom";
import "./app.css";
import { rootRoutes } from "./routes";
import Header from "./layouts/Header/Header";
import Container from "./layouts/Container/Container";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          {rootRoutes.map((route) => {
            return (
              <Route
                Component={route.Component}
                path={route.path}
                key={route.path}
              />
            );
          })}
        </Routes>
      </Container>
    </>
  );
}

export default App;
