import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProyectos from "../../hooks/useProyectos";
import useAdmin from "../../hooks/useAdmin";
import ModalFormularioTarea from "../../components/ModalFormularioTarea";
import ModalEliminarTarea from "../../components/ModalEliminarTarea";
import ModalEliminarColaborador from "../../components/ModalEliminarColaborador";
import Tarea from "../../components/Tarea";
import Colaborador from "../../components/Colaborador";
import io from "socket.io-client";

let socket;

export default function Proyecto() {
  const params = useParams();
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    handleModalTarea,
    submitTareasProyecto,
    eliminarTareaProyecto,
    actualizarTareaProyecto,
    cambiarEstadoTarea,
  } = useProyectos();

  const admin = useAdmin();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, [params.id]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("abrir proyecto", params.id);

    return () => {
      socket.disconnect();
    };
  }, [params.id]);

  useEffect(() => {
    if (!socket || !proyecto?._id) return;

    socket.on("tarea agregada", (tareaNueva) => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva);
      }
    });

    socket.on("tarea eliminada", (tareaEliminada) => {
      if (tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada);
      }
    });

    socket.on("tarea actualizada", (tareaActualizada) => {
      if (tareaActualizada.proyecto._id === proyecto._id) {
        actualizarTareaProyecto(tareaActualizada);
      }
    });

    socket.on("nuevo estado", (nuevoEstadoTarea) => {
      if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
        cambiarEstadoTarea(nuevoEstadoTarea);
      }
    });

    return () => {
      socket.off("tarea agregada");
      socket.off("tarea eliminada");
      socket.off("tarea actualizada");
      socket.off("nuevo estado");
    };
  }, [proyecto?._id]);

  const { nombre } = proyecto;
  if (cargando) return "Cargando...";

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <h1 className="font-black text-3xl text-gray-900 md:text-4xl">{nombre}</h1>

        {admin && (
          <div className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <Link
              to={`/proyectos/editar/${params.id}`}
              className="text-sm uppercase font-bold"
            >
              Editar
            </Link>
          </div>
        )}
      </div>

      {admin && (
        <button
          onClick={handleModalTarea}
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-center text-sm font-bold uppercase text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 md:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Nueva Tarea
        </button>
      )}

      <div className="mt-10 flex flex-col gap-1 border-b border-gray-200 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xl font-bold text-gray-900">Tareas del Proyecto</p>
          <p className="text-sm text-gray-500">
            {proyecto.tareas?.length
              ? `${proyecto.tareas.length} ${proyecto.tareas.length === 1 ? "tarea registrada" : "tareas registradas"}`
              : "Organiza el trabajo pendiente de este proyecto"}
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {proyecto.tareas?.length ? (
          proyecto.tareas?.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-center my-5 p-10">
            No hay tareas en este proyecto
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl">Colaboradores</p>
            <Link
              to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
              className="text-gray-400 hover:text-black uppercase font-bold"
            >
              Añadir
            </Link>
          </div>

          <div className="bg-white shadow mt-10 rounded-lg">
            {proyecto.colaboradores?.length ? (
              proyecto.colaboradores?.map((colaborador) => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))
            ) : (
              <p className="text-center my-5 p-10">
                No hay Colaboradores en este proyecto
              </p>
            )}
          </div>
        </>
      )}

      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  );
}
