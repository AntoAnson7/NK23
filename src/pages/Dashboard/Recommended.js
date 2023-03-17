import "./styles/Reccomended.css";

export const Recommended = () => {
  const Events = [
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FtechnicalBanner.webp?alt=media&token=8b73d36f-c299-49dc-9347-9d3de35202e7",
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fgeneral.webp?alt=media&token=b268a72d-640e-40ce-84d5-8f00e34ea766",
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fmusic.webp?alt=media&token=0342cfee-814f-4084-a9c0-df3e4888b7b3",
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fdance.webp?alt=media&token=9bd773db-dc22-47b0-8ad8-f69247c153a0",
  ];

  return (
    <div className="rec-events">
      {Events?.map((e, i) => (
        <div className="rec-sub" key={i}>
          <img src={e} alt="" />
        </div>
      ))}
    </div>
  );
};
