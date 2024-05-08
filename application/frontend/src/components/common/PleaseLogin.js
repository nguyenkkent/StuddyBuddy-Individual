import { Navigate } from "react-router-dom";

function PleaseLogin() {
  sessionStorage.setItem("redirectTo", window.location.pathname + window.location.search);

  return (
    <Navigate to="/login" />
  );
}

export default PleaseLogin;