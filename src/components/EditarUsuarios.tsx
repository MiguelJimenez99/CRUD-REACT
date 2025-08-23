import React, { useEffect, useState } from "react";

interface Props {
  user: {
    id: string;
    name: string;
    lastname: string;
    email: string;
  } | null;
}

const EditarUsuario = ({ user }: Props) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setLastname(user.lastname);
      setEmail(user.email);
    }
  }, [user]);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/editarUsuario/${user?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify({ name, lastname, email }),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        alert(data.message);
        
      } else {
        alert(data.message);
      }
    } catch (error) {
      setError(error as string);
    }
  };

  if (error) {
    return <div>UPS!, Error al realizar la solicitud</div>;
  }

  return (
    <>
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Editar Usuario
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form action="" onSubmit={handleForm}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <br />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Guardar cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarUsuario;
