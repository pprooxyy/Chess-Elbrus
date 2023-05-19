import React from "react";
import History from "../../organisms/History/History";
import Navbar from "../../organisms/Navbar/Navbar";

import "./HistoryPage.css";

export default function HistoryPage() {
  return (
    <div className="history-page-wrapper">
      <Navbar />
      <History />
    </div>
  );
}
