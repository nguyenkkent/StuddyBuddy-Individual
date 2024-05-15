import { useLocation, useNavigate } from "react-router-dom";
import "../../css/Overlay.css";

function Overlay() {
  const navigate = useNavigate();
  const location = useLocation();

  const showOverlay = ["/create-group", "/add-friend"].includes(location.pathname);
  const groupPage = location.pathname === "/create-group";

  return (
    showOverlay &&
      <div className="overlay-wrapper">
        <div className="overlay-container">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
          {groupPage &&
            <button>Create Group</button>
          }
        </div>
      </div>
  );
}
export default Overlay;