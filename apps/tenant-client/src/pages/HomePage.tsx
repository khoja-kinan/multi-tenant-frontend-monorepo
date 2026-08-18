import HomeScreen from "features/Home";
import React from "react";
import { Helmet } from "react-helmet-async";

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Aurora — Architecture Demo</title>
      </Helmet>
      <HomeScreen />
    </>
  );
};

export default HomePage;
