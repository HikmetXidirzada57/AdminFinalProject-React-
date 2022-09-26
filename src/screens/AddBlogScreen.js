import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddBlog from "../components/Blogs/AddBlog";

const  AddBlogScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddBlog />
      </main>
    </>
  );
};

export default AddBlogScreen;
