import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Index";
import Notes from "../pages/Notes/Index";
import NotesCreate from "../pages/Notes/Create";
import NotesEdit from "../pages/Notes/Edit";
import Categories from "../pages/Categories/Index";
import CategoriesCreate from "../pages/Categories/Create";
import CategoriesEdit from "../pages/Categories/Edit";
const AppRouter = () => {
  return (
    <Router>
      <Routes path="/" element={<MainLayout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/create" element={<NotesCreate />} />
        <Route path="/notes/:id/edit" element={<NotesEdit />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/create" element={<CategoriesCreate />} />
        <Route path="/categories/:id/edit" element={<CategoriesEdit />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
