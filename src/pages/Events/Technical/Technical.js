import { EventID } from "../eventDeets";
import { RenderSubPage } from "../../../components/RenderSubPage";
import { useAppData } from "../../../AppContext/AppContext";
import { useEffect } from "react";

export function Technical() {
  const [{}, dispatch] = useAppData();

  useEffect(() => {
    dispatch({
      type: "SET_REND",
      rend: "",
    });
  }, []);

  const Events = EventID.technical_competitions;

  return <RenderSubPage subEvent={Events} />;
}
