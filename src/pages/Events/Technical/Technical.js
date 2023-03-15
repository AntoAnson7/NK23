import "./Technical.css";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../../../AppContext/AppContext";
import { useEffect } from "react";

export const Technical = () => {
  const [{}, dispatch] = useAppData();

  useEffect(() => {
    dispatch({
      type: "SET_REND",
      rend: "",
    });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="technical-events-main">
      <div className="vector-technical"></div>

      <div className="technical-events-sub">
        <div className="workshops" id="workshops">
          <button onClick={() => navigate("/events/technical/workshops")}>
            Workshops
          </button>
        </div>

        <div className="competitions" id="competitions">
          <button onClick={() => navigate("/events/technical/competitions")}>
            Competitions
          </button>
        </div>
      </div>
    </div>
  );
};
