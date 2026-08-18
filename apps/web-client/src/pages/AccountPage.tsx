import AccountScreen from "Screens/Account";
import React from "react";
import { Helmet } from "react-helmet-async";

const AccountPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Account — Portfolio Demo</title>
      </Helmet>
      <AccountScreen />
    </>
  );
};

export default AccountPage;
