import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditProductMain from "../components/products/EditproductMain";
import EditBlog from "../components/Blogs/EditBlog";

const BlogEditScreen = ({ match }) => {
  const blogId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditBlog blogId={blogId} />
      </main>
    </>
  );
};
export default BlogEditScreen;
