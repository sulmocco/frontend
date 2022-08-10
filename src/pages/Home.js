import React from "react";
import MainSlider from "../components/MainSlider";
import Live from "../components/Live/Live";
import Today from "../components/Today";
import Recommend from "../components/Recommend";

const Home = () => {
  return (
    <div>
      <MainSlider />
      <Live />
      <Today />
      <Recommend />
    </div>
  );
};

export default Home;
