import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { getAuthToken, removeAuthToken } from "../helpers/authToken";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = getAuthToken();
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);
        // navigate('/proyectos')
      } catch {
        setAuth({});
        removeAuthToken();
      }

      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({});
    removeAuthToken();
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
