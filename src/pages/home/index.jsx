import React from "react";
import MainSlider from "../../components/mainslider";
import Live from "../../components/live";
import Today from "../../components/today";
import Recommend from "../../components/recommend";
import LoginRending from "../../components/loginrending";
import Review from '../../components/review';

const Home = () => {

  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <div>
          <MainSlider />
          <Live />
          <Today />
          <Review />
          <Recommend />
        </div>
      ) : (
        <LoginRending />
      )}
    </>
  );
};

export default Home;
