import { Link } from "react-router-dom";
import useProyectos from "../../hooks/useProyectos";
import useAuth from "../../hooks/useAuth";
import Busqueda from "../Busqueda";
import { removeAuthToken } from "../../helpers/authToken";

export default function Header() {
  const { handleBuscador, cerrarSesionProyectos } = useProyectos();
  const { cerrarSesionAuth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesionProyectos();
    removeAuthToken();
  };

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-center text-3xl font-black text-sky-600 md:text-left">
          UpTask
        </h2>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold uppercase text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            onClick={handleBuscador}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 104.383 8.823l2.147 2.147a.75.75 0 101.06-1.06l-2.147-2.147A5.5 5.5 0 009 3.5zM5 9a4 4 0 118 0 4 4 0 01-8 0z"
                clipRule="evenodd"
              />
            </svg>
            Buscar
          </button>
          <Link
            to="/proyectos"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-bold uppercase text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Proyectos
          </Link>

          <button
            type="button"
            className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-bold uppercase text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesión
          </button>

          <Busqueda />
        </div>
      </div>
    </header>
  );
}
