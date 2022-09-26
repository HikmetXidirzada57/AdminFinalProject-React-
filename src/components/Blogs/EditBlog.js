import React, { useState } from 'react'
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Toast from "./../LoadingError/Toast";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { blogEditAction, blogUpdateAction } from '../../Redux/Actions/BlogAction';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { useEffect } from 'react';
import { BLOG_UPDATE_RESET } from '../../Redux/Constants/BlogConstants';

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditBlog = (props) => {
  const { id } = useParams();
  // console.log(id);
    const [blogName, setBlogName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [blogCategoryId, setBlogCategoryId] = useState(null)
    const {blogEditInfo}=useSelector(state=>state.blogEditRed)
    const {blog,loading,error}=blogEditInfo;
    const history=useHistory();
    const dispatch=useDispatch();
    const {success:blogUpdate,loading:loadingUpdate,error:errorUpdate}=useSelector(state=>state.blogUpdateRed);
   

  useEffect(() => {
    if(blogUpdate){
      dispatch({ type:BLOG_UPDATE_RESET});
      toast.success("Blog Updated",ToastObjects);
      history.push("/blogs")
    }else{
      if(!blog || blog.id!==Number(id)){
        dispatch(blogEditAction(Number(id)))
      }else{
          setBlogName(blog.name)
          setBlogCategoryId(blog.blogCategoryId)
          setDescription(blog.description)
          setImage(blog.blogPicture)
      }
    }
  console.log(blog);
  }, [blogUpdate,blog,history])
  
    const submitHandler=(e)=>{
       e.preventDefault()
       dispatch(blogUpdateAction({
        id,
        name:blogName,
        description,
        blogPicture:image,
        blogCategoryId
       }))
    }
  return (
    <>
      {/* <Toast /> */}
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/blogs" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Blog</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                <>
                <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Blog Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={blogName}
                      onChange={e=>setBlogName(e.target.value)}
                    />
                  </div>
                  {/* {categories && (
                    <div className="mb-4">
                    <label htmlFor="product_categories" className="form-label">
                      Categories
                    </label>
                    <select id="product_categories" 
                        onChange={e=>setBlogCategoryId(e.target.value)}
                        className="form-control" defaultValue={product.categoryId}>
                      <option option disabled value="-">select categories...</option>
                      {categories?.map(category=>(  
                        <option key={category.categoryId} 
                          value={category.categoryId}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  )} */}
          
                  <div className="mb-4">
                    <label htmlFor="product_trailer" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_trailer"
                      value={description}
                      onChange={e=>setDescription (e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                <label className="form-label">Images</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Image URL"
                  onChange={(img)=>setImage(img.target.value)}
                />
                <input className="form-control mt-3" type="file" />
              </div>
                </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section> 
    </>
  )
}

export default EditBlog
