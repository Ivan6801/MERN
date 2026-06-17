import { formatearFecha } from "../../helpers/formatearFecha";
import useProyectos from "../../hooks/useProyectos";
import useAdmin from "../../hooks/useAdmin";

export default function Tarea({ tarea }) {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();
  const admin = useAdmin();

  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;
  const prioridadEstilos = {
    Baja: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Media: "bg-amber-50 text-amber-700 ring-amber-200",
    Alta: "bg-red-50 text-red-700 ring-red-200",
  };

  return (
    <div className="flex flex-col gap-5 border-b border-gray-100 p-5 last:border-b-0 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <p className="text-lg font-bold text-gray-900">{nombre}</p>
          <span
            className={`${prioridadEstilos[prioridad] || "bg-gray-50 text-gray-700 ring-gray-200"} rounded-full px-2.5 py-1 text-xs font-bold uppercase ring-1 ring-inset`}
          >
            {prioridad}
          </span>
        </div>
        <p className="mb-3 max-w-3xl text-sm leading-6 text-gray-600">
          {descripcion}
        </p>
        <p className="mb-2 text-sm font-medium text-gray-500">
          Entrega: {formatearFecha(fechaEntrega)}
        </p>
        {estado && (
          <p className="inline-flex rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase text-white">
            Completada por: {tarea.completado.nombre}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
        {admin && (
          <button
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold uppercase text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => handleModalEditarTarea(tarea)}
          >
            Editar
          </button>
        )}

        <button
          className={`${estado ? "bg-sky-600 hover:bg-sky-700" : "bg-gray-700 hover:bg-gray-800"} rounded-lg px-4 py-2.5 text-sm font-bold uppercase text-white transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>

        {admin && (
          <button
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold uppercase text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => handleModalEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
