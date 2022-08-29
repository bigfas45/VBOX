import React from "react";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Rating from "@mui/material/Rating";

import previewImg1 from "../../../../assets/movies-previews/movie-preview1.png";
import "./Movies.scss";
const Movies = () => {
  return (
    <div className="movies-wrapper">
      <div className="movies-header">
        <h2>My Movies</h2>
        <Pagination
          className="pagination"
          count={11}
          defaultPage={6}
          siblingCount={0}
        />
      </div>
      <div className="movies-grid">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Card>
              <CardHeader
                style={{ backgroundImage: `url(${previewImg1})` }}
                className="movie-preview"
              >
                card header
              </CardHeader>
              <CardContent className="card-content">
                <div className="card-content-left">
                  <h3 className="movie-title">Five&Six</h3>
                  <p className="movie-genre">Genre: Drama</p>
                  <p className="movie-comments">125k comments</p>
                </div>
                <div className="card-content-right">
                  <div className="movie-views">
                    <p>1.5M Views</p>
                    <button></button>
                  </div>
                  <div className="movie-likes">
                    <p className="likes">2.6K</p>
                    <p className="likes">200</p>
                  </div>
                  <Rating name="read-only" value="4" readOnly />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Movies;
