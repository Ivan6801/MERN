/* eslint-disable react/prop-types */
const Alerta = ({ alerta }) => {
  console.log(alerta);
  return (
    <div
      className={` ${alerta.success && "from-green-400 to-green-600"} ${
        alerta.error ? "from-red-400 to-red-600" : "from-sky-400 to-sky-600"
      } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 `}
    >
      {alerta.msg}
    </div>
  );
};

export { Alerta };
