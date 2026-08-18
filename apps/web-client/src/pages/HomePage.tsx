import HomeScreen from "Screens/Home";
import React from "react";
import { Helmet } from "react-helmet-async";

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Web Client — Portfolio Demo</title>
      </Helmet>
      <HomeScreen />
    </>
  );
};

export default HomePage;
