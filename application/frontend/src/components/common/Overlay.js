import { useLocation, useNavigate } from "react-router-dom";
import "../../css/Overlay.css";

function Overlay() {
  const navigate = useNavigate();
  const location = useLocation();

  const route = {
    "/create-group": "/my-groups",
    "/add-friend": "/my-friends"
  }
  const showOverlay = Object.keys(route).includes(location.pathname);
  const groupPage = location.pathname === "/create-group";

  return (
    showOverlay &&
      <div className="overlay-wrapper">
        <div className="overlay-container">
          <button
            onClick={() => {
              navigate(route[location.pathname]);
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