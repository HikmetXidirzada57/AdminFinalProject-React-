import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Blog from "../components/Blogs/Blog";
import MainBlogs from "../components/Blogs/MainBlogs";

const BlogScreen = () => {
  return (
    <>
      <Sidebar />
       <main className="main-wrap">
        <Header />
        <MainBlogs />
      </main>
    </>
  );
};

export default BlogScreen;
