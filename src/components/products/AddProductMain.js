import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import { productAdd } from "../../Redux/Actions/ProductActions";
import { PRODUCT_CLEAR } from "../../Redux/Constants/ProductConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import FormControl from '@mui/material/FormControl';
import Select from  'react-select'
import { tagListAction } from "../../Redux/Actions/TagsAction";
import { useForm } from "react-hook-form";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddProductMain = () => {
  const dispatch=useDispatch();
  const [productName,setProductName]=useState("")
  const [description, setDescription] = useState("")
  const [sku, setSku] = useState("")
  const [price,setPrice]=useState(0);
  const [discount, setDiscount] = useState(null)
  const [isSlider,setIsSlider]=useState(false)
  const [isRecommend,setIsRecommend]=useState(false)
  const [inStock, setInStock] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [categoryId, setCategoryId] = useState(null)
  const [tagName, setTagName] = React.useState([]);


  const handleChange=(option)=>{
   setTagName(option)
  }
  
  const {tags}=useSelector(state=>state.tagList)
  const {categories} = useSelector(state=>state.categoryList)
  const {productInfo, loading,error}=useSelector(state=>state.addedProductRed)
  const navigate=useHistory();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  useEffect(()=>{
    dispatch(tagListAction())
    if(productInfo && productInfo.status===200){
      navigate.replace("/products");
      dispatch({type:PRODUCT_CLEAR})
    }else{
      dispatch(listCategories())
    }
  },[productInfo,navigate,dispatch])
  const submitHandler= (e)=>{
    e.preventDefault();
    const newProduct={
      name:productName,
      sku,
      description,
      price:parseFloat(price),
      dicount:parseFloat(discount), 
      inStock,
      isSlider,
      productTags:tagName.map(c=>c.id),
      isRecommend,
      photoUrl,
      categoryId:parseInt(categoryId),
      rating:0
    }
    dispatch(productAdd(newProduct))
  }
  console.log(categories)

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
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
                      value={productName}
                      onChange={e=>setProductName(e.target.value)}
                    />
                  </div>
                  {categories && categories.length>0 && (
                       <div className="mb-4">
                       <label htmlFor="product_categories" className="form-label">
                         Categories
                       </label>
                       <select id="product_categories" 
                          onChange={e=>setCategoryId(e.target.value)}
                          className="form-control" defaultValue="-">
                        <option option disabled value="-">select categories...</option>
                         {categories?.map(cate=>(
                           <option key={cate.categoryId}
                             value={cate.categoryId}>{cate.name}</option>
                         ))}
                       </select>
                     </div>
                  )}
                   <FormControl sx={{ m: 1, width: 400 }}>
                   <label className="form-label">Tags</label>
                      <Select
                        onChange={handleChange}
                        isMulti={true}
                        options={tags}
                        getOptionLabel={(opt)=>opt.name}
                        getOptionValue={(opt)=>opt.id}
                        />
                   </FormControl>
                  <div className="mb-4">
                    <label htmlFor="product_summary" className="form-label">
                      SKU
                    </label>
                    <textarea
                      type="text"
                      rows={1}
                      placeholder="Type here"
                      className="form-control"
                      id="product_summary"
                      value={sku}
                      onChange={e=>setSku(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e)=>setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_discount" className="form-label">
                      Discount
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_discount"
                      value={discount}
                      onChange={(e)=>setDiscount(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_discount" className="form-label">
                      In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_discount"
                      value={inStock}
                      onChange={(e)=>setInStock(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_featured" className="form-label">
                      Is Slider?
                    </label>
                    <input
                      type="checkbox"
                      id="isSlider"
                      name="isSlider"
                      {...register("isSlider",{required:false})}
                      
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_featured" className="form-label">
                      Is Recommend?
                    </label>
                    <input
                      type="checkbox"
                      id="isRecommend"
                      name="isRecommend"
                      {...register("isRecommend",{required:false})}
                    
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_featured" className="form-label">
                      Is BestSeller?
                    </label>
                    <input
                      type="checkbox"
                      id="isBestSeller"
                      name="isBestSeller"
                      {...register("isBestSeller",{required:false})}
                    
                    />
                  </div>
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
                      onChange={(img)=>setPhotoUrl(img.target.value)}
                    />
                    <input className="form-control mt-3"
                     type="file"
                     onChange={(img)=>setPhotoUrl(img.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
