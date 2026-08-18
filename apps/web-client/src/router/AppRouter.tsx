import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ThemeProvider from "providers/ThemeProvider";
import HomePage from "pages/HomePage";
import AccountPage from "pages/AccountPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default AppRouter;
