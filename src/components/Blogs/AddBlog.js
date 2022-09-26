import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { BASE_URL } from '../../api/BaseConfig'
import { blogAddAction } from '../../Redux/Actions/BlogAction'
import Message from '../LoadingError/Error'
import Loading from '../LoadingError/Loading'

const AddBlog = () => {
  const [blogName, setblogName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [categoryId, setCategoryId] = useState(null)  
  const [category, setCategory] = useState([])
  const dispatch=useDispatch();
  
  useEffect(() => {
    const {data} = fetch(`${BASE_URL}/blogCategories/getAllBlogCategories`)
    .then(res=>res.json())
    .then((cat)=>setCategory(cat))
  }, [])
  

  const {blogInfo, loading,error}=useSelector(state=>state.blogAddRed)
  const navigate=useHistory();

  useEffect(() => {
   if (blogInfo && blogInfo.status===200){
    navigate.replace("/blogs")
   }
   }, [blogInfo,navigate])
  
  const submitHandler=(e)=>{
  e.preventDefault();
  const newBlog={
    name:blogName,
    description,
    BlogPicture:image,
    BlogCategoryId:parseInt(categoryId)
  }
  dispatch(blogAddAction(newBlog))
  }
  return (
    <section className="content-main" style={{ maxWidth: "1200px" }}>
    <form onSubmit={submitHandler}>
      <div className="content-header">
        <Link to="/blogs" className="btn btn-danger text-white">
          Go to blogs
        </Link>
        <h2 className="content-title">Add blog</h2>
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
               {error && <Message variant="alert-danger">{error}</Message>}
               {loading && <Loading />}
              <div className="mb-4">
                <label htmlFor="product_title" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="form-control"
                  id="product_title"
                  required
                  value={blogName}
                  onChange={e=>setblogName(e.target.value)}
                />
              </div>
              {category&& category.length>0 && (
                   <div className="mb-4">
                   <label htmlFor="product_categories" className="form-label">
                     Categories
                   </label>
                   <select id="product_categories" 
                      onChange={e=>setCategoryId(e.target.value)}
                      className="form-control" defaultValue="-">
                    <option option disabled value="-">select categories...</option>
                     {category?.map(cate=>(
                       <option key={cate.id}
                         value={cate.id}>{cate.name}</option>
                     ))}
                   </select>
                 </div>
              )}

              <div className="mb-4">
                <label className="form-label">Description</label>
                <textarea
                  placeholder="Type here"
                  className="form-control"
                  rows="7"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="form-label">Images</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Image URL"
                  onCanPlay={(img)=>setImage(img.target.value)}
                />
                <input className="form-control mt-3"
                 type="file"
                  onCanPlay={(img)=>setImage(img.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
  )}
 export default AddBlog
