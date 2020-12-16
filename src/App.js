import axios from "axios";
import React from "react";

function App() {
  const [data, setData] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const token =
    "&access_token=lo8Divul-fdFhQuQbCF-TL6nDRPgajxd80DEoSQoqGTjS5sCn_TCJWXDkGlbLQ1D";

  const url = `https://api.genius.com/search?q=${query}${token}`;
  console.log(url);

  React.useEffect(() => {
    axios.get(url).then((res) => {
      const { hits } = res.data.response;
      // console.log(hits);
      setData(hits);
    });
  }, [url]);

  function downloadImage(src) {
    const img = new Image();
    img.crossOrigin = "anonymous"; // This tells the browser to request cross-origin access when trying to download the image data.
    // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#Implementing_the_save_feature
    img.src = src;
    img.onload = () => {
      // create Canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      // create a tag
      const a = document.createElement("a");
      a.download = "download.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
  }

  function handleChange(event) {
    setQuery(event.target.value);
  }

  return (
    <div style={{ textAlign: "center", padding: "16px" }}>
      <input
        style={{ textAlign: "center", width: "100%", height: "60px" }}
        type="text"
        placeholder="search here"
        onChange={handleChange}
        value={query}
      />
      <div>
        {data &&
          data.map(
            ({ result }) =>
              query && (
                <>
                  <h6 style={{ color: "gray" }}>
                    click on the image to download
                  </h6>
                  <h6>{result.primary_artist.name}</h6>
                  <img
                    src={result.header_image_url}
                    alt={result.primary_artist.name}
                    width="200"
                    height="200"
                    onClick={() => downloadImage(result.header_image_url)}
                  />
                </>
              )
          )}
      </div>
    </div>
  );
}

export default App;
