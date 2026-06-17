import { Fragment, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Busqueda() {
  const [busqueda, setBusqueda] = useState("");
  const { buscador, handleBuscador, proyectos } = useProyectos();
  const navigate = useNavigate();

  const termino = busqueda.trim().toLowerCase();
  const proyectosFiltrados =
    termino === ""
      ? proyectos.slice(0, 5)
      : proyectos.filter((proyecto) =>
          proyecto.nombre.toLowerCase().includes(termino),
        );

  const seleccionarProyecto = (proyecto) => {
    if (!proyecto) return;

    handleBuscador();
    navigate(`/proyectos/${proyecto._id}`);
  };

  return (
    <Transition.Root
      show={buscador}
      as={Fragment}
      afterLeave={() => setBusqueda("")}
    >
      <Dialog as="div" className="relative z-20" onClose={handleBuscador}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5">
              <Combobox as="div" onChange={seleccionarProyecto}>
                <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4 sm:px-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 flex-none text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 104.383 8.823l2.147 2.147a.75.75 0 101.06-1.06l-2.147-2.147A5.5 5.5 0 009 3.5zM5 9a4 4 0 118 0 4 4 0 01-8 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <ComboboxInput
                    autoFocus
                    className="h-11 w-full border-0 bg-transparent text-base text-gray-900 placeholder-gray-400 outline-none focus:ring-0"
                    placeholder="Buscar proyecto por nombre"
                    onChange={(e) => setBusqueda(e.target.value)}
                    displayValue={(proyecto) => proyecto?.nombre || ""}
                  />
                  <button
                    type="button"
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    onClick={handleBuscador}
                  >
                    <span className="sr-only">Cerrar buscador</span>
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

                <div className="px-4 py-3 sm:px-5">
                  <p className="text-xs font-bold uppercase text-gray-400">
                    {termino ? "Resultados" : "Proyectos recientes"}
                  </p>
                </div>

                {proyectosFiltrados.length > 0 ? (
                  <ComboboxOptions
                    static
                    className="max-h-80 scroll-py-2 overflow-y-auto pb-3 text-sm text-gray-800"
                  >
                    {proyectosFiltrados.map((proyecto) => (
                      <ComboboxOption
                        key={proyecto._id}
                        value={proyecto}
                        className={({ active }) =>
                          classNames(
                            "mx-3 flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 transition",
                            active
                              ? "bg-sky-50 text-sky-900"
                              : "text-gray-700 hover:bg-gray-50",
                          )
                        }
                      >
                        {({ active }) => (
                          <>
                            <div className="min-w-0">
                              <p className="truncate font-bold">
                                {proyecto.nombre}
                              </p>
                              {proyecto.cliente && (
                                <p
                                  className={classNames(
                                    "mt-0.5 truncate text-xs",
                                    active ? "text-sky-700" : "text-gray-500",
                                  )}
                                >
                                  Cliente: {proyecto.cliente}
                                </p>
                              )}
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={classNames(
                                "h-5 w-5 flex-none",
                                active ? "text-sky-600" : "text-gray-300",
                              )}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 10a.75.75 0 01.75-.75h6.69L9.22 6.03a.75.75 0 111.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H5.75A.75.75 0 015 10z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </>
                        )}
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                ) : (
                  <div className="px-6 py-12 text-center">
                    <p className="font-bold text-gray-900">
                      No se encontraron proyectos
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Revisa el nombre o intenta con otro término.
                    </p>
                  </div>
                )}
              </Combobox>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
