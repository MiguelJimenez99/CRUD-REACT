import { useEffect, useState } from "react";

import MostrarUsuario from "./InfoUsuario";

import "../styles/listaUsuarios.css";
import Navbar from "./navbar";
import EditarUsuario from "./EditarUsuarios";

interface User {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  isActive: boolean;
  document: number;
}

interface Respose {
  message: string;
  data: User[];
}
const ListaUsuarios = () => {
  const [search, setSearch] = useState("");
  const [userSelect, setUserSelect] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  //funcion que contiene la logica para realizar la peticion al back-end
  const fetchUsers = async () => {
    const Url = "http://localhost:3000/api/usuarios";
    try {
      setLoading(true);
      const res = await fetch(Url);
      const data: Respose = await res.json();

      if (res.status === 200) {
        setUsers(data.data);
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  //funcion para eliminar un usuario
  const handlerDelete = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      const res = await fetch(
        `http://localhost:3000/api/eliminarUsuario/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "Application/json" },
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        alert(data.message);
        setUsers(users.filter((u) => u._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      setError(error as string);
    }
  };

  //funcion para cambiar el estado del usuario [Activo o innactivo]
  const handlerState = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/editarEstado/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.status === 200) {
        setUsers(
          users.map((user) =>
            user._id === id ? { ...user, isActive: !user.isActive } : user
          )
        );
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Trae todos los usuarios apenas el input queda vacío
  useEffect(() => {
    if (search === "") {
      fetchUsers();
    }
  }, [search]);

  //funcion para buscar un usuario desde la barra de busqueda
  const searchUserDoc = async (e?: React.FormEvent) => {
    e?.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3000/api/usuario?document=${search}`
      );

      const data = await res.json();

      if (res.status === 200) {
        // Si la respuesta es exitosa, actualizo el estado
        setUsers(Array.isArray(data.data) ? data.data : [data.data]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //hock para mostrar el mensaje que viene del back cuando se realiza la peticion
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 2000);
    return () => clearInterval(timer);
  }, [message]);

  //hoks que mustra la informacion obtenida del back-end
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center" id="loading-state">
        Cargando...
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <div>Error al cargar los datos</div>;
  }

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        handleSubmit={searchUserDoc}
      />
      <div className="container-list-users">
        <h2 className="text-center">Lista Usuarios</h2>

        <div className="container-alert-message">
          {error && <p>{error}</p>}
          {message && (
            <div
              className="alert alert-success"
              role="alert"
              id="message-alert"
            >
              {message}
            </div>
          )}
        </div>
        <div className="container-fluid" id="container-table">
          <div className="table-responsive">
            <table className="table table">
              <thead className="text-center">
                <tr>
                  <th scope="col">Documento</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Email</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {users.map((element) => (
                  <tr key={element._id} id="tr-table-info">
                    <td scope="row">{element.document}</td>
                    <td>{element.name}</td>
                    <td>{element.lastname}</td>
                    <td>{element.email}</td>
                    <td className="td-check-box">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={element.isActive}
                        onChange={() => handlerState(element._id)}
                      />

                      {element.isActive ? <p>Activo</p> : <p>Inactivo</p>}
                    </td>
                    <td>
                      <div className="container-options-table">
                        <button
                          className="btn btn-success"
                          onClick={() => setUserInfo(element)}
                        >
                          ver
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handlerDelete(element._id)}
                        >
                          Eliminar
                        </button>

                        <button
                          onClick={() => setUserSelect(element)}
                          type="button"
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <EditarUsuario
              user={
                userSelect
                  ? {
                      id: userSelect._id,
                      name: userSelect.name,
                      lastname: userSelect.lastname,
                      email: userSelect.email,
                    }
                  : null
              }
            />
          </div>

          <MostrarUsuario
            user={
              userInfo
                ? {
                    _id: userInfo._id,
                    name: userInfo.name,
                    lastname: userInfo.lastname,
                    document: userInfo.document,
                    email: userInfo.email,
                    isActive: userInfo.isActive,
                  }
                : null
            }
            onClose={() => setUserInfo(null)}
          />
        </div>
      </div>
    </>
  );
};

export default ListaUsuarios;
