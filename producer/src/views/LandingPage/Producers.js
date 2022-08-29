import React from "react";
import { producersData } from "../../services/producersData";

import "./styles/Producers.scss";

const Producers = () => {
  return (
    <section className="producers">
      <div className="container">
        <h2 className="title">Top Producers</h2>
        <div className="producer-wrapper">
          {producersData.map((producer) => {
            return (
              <div className="producer-card">
                <img
                  src={producer.image}
                  alt="producer"
                  className="producer-img"
                />
                <div className="producer-footer">
                  <h3 className="producer-name">{producer.name}</h3>
                  <p className="producer-year">Joined {producer.joined_year}</p>
                  <p className="producer-movies">
                    {producer.total_movies} movies posted
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Producers;
