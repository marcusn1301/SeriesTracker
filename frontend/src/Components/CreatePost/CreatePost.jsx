import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { CreatePostOuter, Gridcontainer } from "./CreatePostStyles";

import Loading from "../../Pages/LoadingPage/Loading";

import AnimeCard from "../Cards/AnimeCard/AnimeCard";

import Overlay from "../Overlay/Overlay";

const CreatePost = () => {
  const [topAnime, setTopAnime] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(false);

  const [show, setShow] = useState(false);

  const GetTopAnime = () => {
    setLoading(true);
    axios
      .get(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
      //https://api.jikan.moe/v3/top/type/page/subtype
      .then(({ data }) => {
        setTopAnime(data.top.slice(0, 50));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetTopAnime();
  }, []);

  console.log(topAnime);

  // const fileOnChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  // const sendImage = (e) => {
  //   let formdata = new FormData();

  //   formdata.append("image", image);
  //   formdata.append("_id", "asdaas76345345");

  //   fetch("api/users", {
  //     method: "POST",
  //     body: formdata,
  //   })
  //     .then((res) => res.text())
  //     .then((resBody) => {
  //       console.log(resBody);
  //     });
  // };

  if (loading) {
    return <Loading />;
  }

  console.log(show);
  return (
    <>
      {show ? <Overlay /> : <></>}

      <CreatePostOuter>
        {/* <input type="file" onChange={fileOnChange} />

      <button onClick={sendImage}>Upload</button> */}

        <Gridcontainer>
          {topAnime.map((anime, index) => {
            return (
              <>
                <div>
                  <AnimeCard title={anime.title} episodes={anime.episodes} image={anime.image_url} />
                </div>
              </>
            );
          })}
        </Gridcontainer>
      </CreatePostOuter>
    </>
  );
};

export default CreatePost;
