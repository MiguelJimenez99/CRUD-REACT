/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

interface Promps {
  user: {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    document: number;
    isActive: boolean;
  } | null;
  onClose: () => void;
}

interface Data {
  name: string;
  lastname: string;
  email: string;
  document: number;
  isActive: boolean;
}

const MostrarUsuario = ({ user, onClose }: Promps) => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  const fetchDataUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/usuario/${user?._id}`,
        {
          method: "GET",
          headers: { "Content-Type": "Application/json" },
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        console.log(data.message);
        setData(data);
      } else {
        console.log(data.mensaje);
      }
    } catch (error) {
      setError(error as string);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchDataUser();
    } else {
      setData(null);
    }
  }, [user?._id]);

  if (error) {
    return (
      <p className="text-center">
        UPS! Error al obtener la informacion del usuario
      </p>
    );
  }

  return (
    <>
      <div>
        <h4 className="text-center">Informacion de usuario</h4>
        {data ? (
          <div className="card mt-3 p-3 shadow">
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            <ul className="list-group mt-2">
              <li className="list-group-item">Nombres: {data.name}</li>
              <li className="list-group-item">Apellidos: {data.lastname}</li>
              <li className="list-group-item">Documento: {data.document}</li>
              <li className="list-group-item">Email: {data.email}</li>
              <li className="list-group-item">
                Estado: {data.isActive ? "Activo" : "Inactivo"}
              </li>
            </ul>
          </div>
        ) : (
          <p className="text-center">No ha seleccionado ningún usuario</p>
        )}
      </div>
    </>
  );
};

export default MostrarUsuario;
