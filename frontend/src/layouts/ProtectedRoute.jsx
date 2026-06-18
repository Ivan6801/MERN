import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";
import { getAuthToken } from "../helpers/authToken";

const cookieIsTrue = (name) => {
  if (typeof document === "undefined") return false;

  return document.cookie
    .split("; ")
    .some((cookie) => {
      const [cookieName, value] = cookie.split("=");
      return cookieName === name && decodeURIComponent(value) === "true";
    });
};

export default function ProtectedRoute({
  requireAcceptedTerms = false,
  requireCompleteProfile = false,
  requiredProfileFields = [],
  redirectTo = "/",
}) {
  const { auth, cargando } = useAuth();
  const location = useLocation();
  const token = getAuthToken();

  if (cargando) {
    return <p className="p-10 text-center text-gray-600">Cargando...</p>;
  }

  if (!token || !auth._id) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  const acceptedTerms =
    !requireAcceptedTerms ||
    auth.terminosAceptados ||
    auth.termsAccepted ||
    cookieIsTrue("terminosAceptados") ||
    cookieIsTrue("termsAccepted");

  const hasRequiredProfileFields =
    requiredProfileFields.length > 0 &&
    requiredProfileFields.every((field) => Boolean(auth[field]));

  const completeProfile =
    !requireCompleteProfile ||
    auth.perfilCompleto ||
    auth.profileComplete ||
    cookieIsTrue("perfilCompleto") ||
    cookieIsTrue("profileComplete") ||
    hasRequiredProfileFields;

  if (!acceptedTerms || !completeProfile) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return (
    <div className="bg-gray-100">
      <Header />

      <div className="md:flex md:min-h-screen">
        <Sidebar />

        <main className="flex-1 p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
