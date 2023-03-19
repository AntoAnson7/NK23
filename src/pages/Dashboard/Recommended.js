import { useNavigate } from "react-router-dom";
import "./styles/Reccomended.css";

export const Recommended = () => {
  const navigate = useNavigate();
  return (
    <div className="rec-events">
      <div className="rec-sub">
        <div className="tech">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FtechnicalBanner.webp?alt=media&token=8b73d36f-c299-49dc-9347-9d3de35202e7"
            alt=""
            onClick={() => navigate("/events/technical")}
          />
          <img
            className="tech-title"
            src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/2.png?alt=media&token=058e37a8-2b9d-4354-81f1-7c1b46fbda0e"
            alt=""
          />
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fdance.png?alt=media&token=d62c0ab9-05cf-4aa8-b91f-08f60275fc20"
          alt=""
          onClick={() => navigate("/events/cultural/dance")}
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fmusic.png?alt=media&token=c3599b24-6a9c-4bb9-b6f0-94b5b48c26fe"
          alt=""
          onClick={() => navigate("/events/cultural/music")}
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fgeneral.png?alt=media&token=fc445eb2-20a5-4578-b1be-ace0c1ab2d1c"
          alt=""
          onClick={() => navigate("/events/cultural/general")}
        />
      </div>
    </div>
  );
};
