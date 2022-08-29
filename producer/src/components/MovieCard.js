import React from "react";
import { Rate } from "antd";
import { AiOutlineEye, AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

import "./styles/MovieCard.scss";

const MovieCard = ({
  movieImg,
  movieTitle,
  movieLikes,
  movieDislikes,
  movieViews,
}) => {
  return (
    <div className="card-wrapper">
      <img src={movieImg} alt="movie" className="movie-img" />
      <div className="card-footer">
        <h3 className="movie-title">{movieTitle}</h3>
        <div className="flex-row stats">
          <div className="flex-row views">
            <AiOutlineEye className="views-icon" />
            <p className="views-txt">{movieViews} Views</p>
          </div>
          <div className="flex-row likes">
            <p className="likes-txt" style={{ marginRight: "15px" }}>
              <AiOutlineLike className="likes-icon" /> {movieLikes}{" "}
            </p>
            <p className="likes-txt">
              <AiOutlineDislike className="likes-icon" /> {movieDislikes}
            </p>
          </div>
        </div>
        <div className="flex-row ">
          <Rate disabled defaultValue={5} className="rating" />
          <p>12K Reviews</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
