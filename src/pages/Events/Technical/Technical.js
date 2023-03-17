// import { useNavigate } from "react-router-dom";
// import { useAppData } from "../../../AppContext/AppContext";
// import { useEffect } from "react";
// import { motion } from "framer-motion";
// import "./Technical.css";

// export const Technical = () => {
//   const [{}, dispatch] = useAppData();

//   useEffect(() => {
//     dispatch({
//       type: "SET_REND",
//       rend: "",
//     });
//   }, []);
//   const navigate = useNavigate();
//   return (
//     <div className="technical-events-main">
//       <div className="vector-technical"></div>

//       <motion.div
//         initial={{ y: 50, scale: 0.8 }}
//         animate={{ y: 0, scale: 1 }}
//         className="technical-events-sub"
//       >
//         <div className="workshops" id="workshops">
//           <button onClick={() => navigate("/events/technical/workshops")}>
//             Workshops
//           </button>
//         </div>

//         <div className="competitions" id="competitions">
//           <button onClick={() => navigate("/events/technical/competitions")}>
//             Competitions
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };
import { EventID } from "../eventDeets";
import { RenderSubPage } from "../../../components/RenderSubPage";

export function Technical() {
  const Events = EventID.technical_competitions;

  return <RenderSubPage subEvent={Events} />;
}
