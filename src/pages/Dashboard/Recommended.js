import { event_banner_path } from "../Events/eventDeets";
import "./styles/Reccomended.css";

export const Recommended = () => {
  const Events = ["NK011", "NK065", "NK054", "NK010", "NK014"];

  return (
    <div className="rec-events">
      <h3>Recommeded Events</h3>
      {Events?.map((e, i) => (
        <div className="rec-sub" key={i}>
          <img src={event_banner_path[e]} alt="" />
        </div>
      ))}
    </div>
  );
};
