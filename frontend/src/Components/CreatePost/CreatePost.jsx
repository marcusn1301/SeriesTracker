import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { CreatePostOuter, Gridcontainer, SearchOuter } from "./CreatePostStyles";

import Loading from "../../Pages/LoadingPage/Loading";

import AnimeCard from "../Cards/AnimeCard/AnimeCard";

import { useScroll } from "../../Hooks/useScroll";

const CreatePost = () => {
  const [topAnime, setTopAnime] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(false);

  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [filtered, setFiltered] = useState([]);

  const scrollPosition = useScroll();

  let fixed = false;

  if (scrollPosition > 30) {
    fixed = true;
  }

  const GetTopAnime = () => {
    setLoading(true);
    axios
      .get(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
      //https://api.jikan.moe/v3/top/type/page/subtype
      .then(({ data }) => {
        setTopAnime(data.top.slice(0, 50));
        setFiltered(data.top.slice(0, 50));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("Fetched anime");
    GetTopAnime();
  }, []);

  useEffect(() => {
    let animeFilter = topAnime.filter((anime) => {
      return anime?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFiltered(animeFilter);
  }, [searchTerm]);

  if (loading) {
    return <Loading />;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CreatePostOuter>
        <SearchOuter isFixed={fixed}>
          <input type="text" placeholder="serach" onChange={(e) => setSearchTerm(e.target.value)} />
        </SearchOuter>
        <Gridcontainer>
          {filtered?.map((anime, index) => {
            return (
              <>
                <AnimeCard
                  title={anime.title}
                  episodes={anime.episodes ? anime.episodes : 0} //TODO: Rather pass something else
                  image={anime.image_url}
                  key={index}
                  setOpen={setOpen}
                />
              </>
            );
          })}
        </Gridcontainer>
      </CreatePostOuter>
    </>
  );
};

export default CreatePost;
