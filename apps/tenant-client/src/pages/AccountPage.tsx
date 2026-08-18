import AccountScreen from "features/Account";
import React from "react";
import { Helmet } from "react-helmet-async";

const AccountPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Account — Aurora Demo</title>
      </Helmet>
      <AccountScreen />
    </>
  );
};

export default AccountPage;
