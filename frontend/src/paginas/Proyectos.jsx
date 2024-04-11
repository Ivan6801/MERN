import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export function Proyectos() {
  const { auth } = useContext(AuthContext);

  console.log(auth);

  return (
    <div>
      <h1 className="text-red-400">Proyectos</h1>
      <p>{auth._id}</p>
      <p>{auth.nombre}</p>
      <p>{auth.email}</p>
    </div>
  );
}
