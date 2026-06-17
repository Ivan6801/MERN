import { Fragment, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import useProyectos from "../../hooks/useProyectos";
import { Alerta } from "../Alerta";
import { useParams } from "react-router-dom";

const PRIORIDAD = ["Baja", "Media", "Alta"];

function ContenidoModalTarea({
  alerta,
  handleModalTarea,
  modalFormularioTarea,
  mostrarAlerta,
  params,
  submitTarea,
  tareaInicial,
}) {
  const [id, setId] = useState(tareaInicial?._id || "");
  const [nombre, setNombre] = useState(tareaInicial?.nombre || "");
  const [descripcion, setDescripcion] = useState(
    tareaInicial?.descripcion || "",
  );
  const [fechaEntrega, setFechaEntrega] = useState(
    tareaInicial?.fechaEntrega?.split("T")[0] || "",
  );
  const [prioridad, setPrioridad] = useState(tareaInicial?.prioridad || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, prioridad].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    await submitTarea({
      id,
      nombre,
      descripcion,
      fechaEntrega,
      prioridad,
      proyecto: params.id,
    });

    setId("");
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setPrioridad("");
  };

  const { msg } = alerta;
  const titulo = id ? "Editar tarea" : "Nueva tarea";
  const descripcionModal = id
    ? "Actualiza los datos clave para mantener el proyecto alineado."
    : "Define el alcance, fecha y prioridad de la siguiente actividad.";
  const inputClass =
    "mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100";
  const labelClass = "text-sm font-bold uppercase tracking-wide text-gray-700";

  return (
    <Transition.Root show={modalFormularioTarea} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleModalTarea}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all">
                <div className="border-b border-gray-200 px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <DialogTitle className="text-2xl font-black text-gray-900">
                        {titulo}
                      </DialogTitle>
                      <p className="mt-1 text-sm text-gray-500">
                        {descripcionModal}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      onClick={handleModalTarea}
                    >
                      <span className="sr-only">Cerrar</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-5 px-6 py-6">
                    {msg && <Alerta alerta={alerta} />}

                    <div>
                      <label className={labelClass} htmlFor="nombre">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        placeholder="Ej. Preparar propuesta comercial"
                        className={inputClass}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="descripcion">
                        Descripción
                      </label>
                      <textarea
                        id="descripcion"
                        placeholder="Describe el resultado esperado y cualquier detalle relevante"
                        className={`${inputClass} min-h-32 resize-y`}
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass} htmlFor="fecha-entrega">
                          Fecha de entrega
                        </label>
                        <input
                          type="date"
                          id="fecha-entrega"
                          className={inputClass}
                          value={fechaEntrega}
                          onChange={(e) => setFechaEntrega(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className={labelClass} htmlFor="prioridad">
                          Prioridad
                        </label>
                        <select
                          id="prioridad"
                          className={inputClass}
                          value={prioridad}
                          onChange={(e) => setPrioridad(e.target.value)}
                        >
                          <option value="">Seleccionar prioridad</option>

                          {PRIORIDAD.map((opcion) => (
                            <option key={opcion}>{opcion}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold uppercase text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      onClick={handleModalTarea}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-bold uppercase text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    >
                      {id ? "Guardar cambios" : "Crear tarea"}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default function ModalFormularioTarea() {
  const params = useParams();

  const {
    modalFormularioTarea,
    handleModalTarea,
    mostrarAlerta,
    alerta,
    submitTarea,
    tarea,
  } = useProyectos();

  return (
    <ContenidoModalTarea
      key={tarea?._id || "nueva-tarea"}
      alerta={alerta}
      handleModalTarea={handleModalTarea}
      modalFormularioTarea={modalFormularioTarea}
      mostrarAlerta={mostrarAlerta}
      params={params}
      submitTarea={submitTarea}
      tareaInicial={tarea}
    />
  );
}
