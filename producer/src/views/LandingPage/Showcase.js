import React from "react";
import { moviesData } from "../../services/moviesData";
import MovieCard from "../../components/MovieCard";
import Slider from "react-slick";

import "./styles/Showcase.scss";

const Showcase = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
        },
      },
    ],
  };
  return (
    <section className="showcase">
      <div className="container">
        <div className="movie-list">
          <h2 className="title">Top Movies</h2>
          <Slider {...settings}>
            {moviesData.map((movie) => {
              return (
                <MovieCard
                  movieImg={movie.image}
                  movieTitle={movie.title}
                  movieViews={movie.views}
                  movieLikes={movie.likes}
                  movieDislikes={movie.dislike}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
