import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

const Blog = (props) => {
    const dispatch = useDispatch()
    
    const {blog}=props;
    
    // const deleteHandler=(id)=>{
    //   let result = window.confirm("Are you sure?")
    //   if(result){
    //    dispatch(productDelete(id))
    //   }
    // }

  return (
    <div className="col-md-6 col-sm-6 col-lg-3 mb-6">
    <div className="card card-product-grid shadow-sm">
      <Link to="#" className="img-wrap">
        <img className='img-fluid' src={blog.blogPicture} alt="Blog"/>
      </Link>
      <div className="info-wrap">
        <Link to="#" className="title text-truncate"
        style={{textDecoration:"none"}}
        >
          {blog.name}
        </Link>
        <p style={{fontWeight:"500"}}>{blog.description}</p>
        <div className="row">
          <Link
            to={`/blog/${blog.id}/edit`}
            className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
          >
            <i className="fas fa-pen"></i>
          </Link>
          <Link
            to="#"
            // onClick={() => deleteHandler(blog.id)}
            className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
          >
            <i className="fas fa-trash-alt"></i>
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Blog
