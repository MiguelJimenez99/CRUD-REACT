import { useState } from "react";

import "../styles/agregarUsuario.css";
import Navbar from "./navbar";

const AgregarUsuario = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const peticion = await fetch("http://localhost:3000/api/nuevoUsuario", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ name, lastname, email, document }),
      });

      if (!name || !lastname || !email || !document) {
        return alert("Todos los datos son necesarios");
      }
      const data = await peticion.json();

      if (peticion.status === 201) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      setError(error as string);
    }
  };

  if (error) {
    return <div>UPS!, Ha ocurrido un error</div>;
  }

  return (
    <>
      <Navbar search="" setSearch={() => {}} handleSubmit={() => {}} />
      <div>
        <h2 className="text-center" id="title-page">
          Agregar Usuario
        </h2>

        <div className="container" id="container-form">
          <form onSubmit={handleForm}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el apellido"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Ingresa el correo electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Ingrese el numero de documento"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
              />
            </div>
            <div className="container-button">
              <button className="btn btn-success" type="submit">
                Guardar Registro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AgregarUsuario;
