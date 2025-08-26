import { useNavigate } from "react-router-dom";

interface Promps {
  search: string;
  setSearch: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const Navbar = ({ search, setSearch, handleSubmit }: Promps) => {
  const navigate = useNavigate();

  return (
    <>
      <nav
        className="navbar bg-dark navbar-expand-lg  bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container">
          <a className="navbar-brand" href="#" onClick={() => navigate("/")}>
            Gestor de Usuarios
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={() => navigate("/")}
                >
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => navigate("/agregarusuario")}
                >
                  Agregar usuario
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                type="number"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
