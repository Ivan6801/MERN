import { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import useProyectos from "../../hooks/useProyectos";

export default function ModalEliminarTarea() {
  const { modalEliminarTarea, handleModalEliminarTarea, eliminarTarea, tarea } =
    useProyectos();

  return (
    <Transition.Root show={modalEliminarTarea} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={handleModalEliminarTarea}
      >
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
              <DialogPanel className="relative w-full max-w-lg transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all">
                <div className="px-6 py-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 006 3.75V4H3.75a.75.75 0 000 1.5h.3l.86 10.33A2.75 2.75 0 007.65 18h4.7a2.75 2.75 0 002.74-2.17l.86-10.33h.3a.75.75 0 000-1.5H14v-.25A2.75 2.75 0 0011.25 1h-2.5zM7.5 4v-.25c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25V4h-5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <DialogTitle className="text-xl font-black text-gray-900">
                          Eliminar tarea
                        </DialogTitle>

                        <button
                          type="button"
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                          onClick={handleModalEliminarTarea}
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

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        Esta accion no se puede deshacer. La tarea se eliminara
                        del proyecto de forma permanente.
                      </p>

                      {tarea?.nombre && (
                        <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3">
                          <p className="text-xs font-bold uppercase text-red-500">
                            Tarea seleccionada
                          </p>
                          <p className="mt-1 truncate font-bold text-red-900">
                            {tarea.nombre}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold uppercase text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={handleModalEliminarTarea}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold uppercase text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={eliminarTarea}
                  >
                    Eliminar tarea
                  </button>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
