import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import Login from "./pages/Login";
import News from "./layouts/News";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<News />} />
          <Route path="category/:code" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
