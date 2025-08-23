import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//rutas
import ListaUsuarios from "./components/ListaUsuarios";
import AgregarUsuario from "./components/AgregarUsuarios";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ListaUsuarios />} />
          <Route path="/agregarusuario" element={<AgregarUsuario />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
