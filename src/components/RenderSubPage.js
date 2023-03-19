import { RenderEvents } from "./RenderEvents";
import { event_banner_path } from "../pages/Events/eventDeets";
import { useAppData } from "../AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import "./styles/Subpage.css";

export function RenderSubPage({ subEvent }) {
  const navigate = useNavigate();
  const [{ rend }, dispatch] = useAppData();
  const list = subEvent.map((event, index) => (
    <a href="#re">
      <motion.div
        className="image-text-wrap"
        key={index}
        initial={{ x: -150, scale: 0.6 }}
        animate={{ x: 0, scale: 1 }}
      >
        <img
          className="sub-page-event-banner"
          src={
            event_banner_path[event]
              ? event_banner_path[event]
              : event_banner_path["test"]
          }
          key={index}
          onClick={() => {
            dispatch({
              type: "SET_REND",
              rend: event,
            });
          }}
        />
        <p>View Details...</p>
      </motion.div>
    </a>
  ));

  return (
    <div className="render-sub-main">
      <button className="back" onClick={() => navigate("/events")}>
        <IoArrowBack />
      </button>
      <div id="re"></div>
      {rend ? (
        <div className="render-true">
          <RenderEvents />
        </div>
      ) : (
        <></>
      )}
      <div className="sub-page-events">{list}</div>
    </div>
  );
}
