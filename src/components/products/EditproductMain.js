import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { productEditAction, productUpdateAction } from "../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useForm } from "react-hook-form";
// import Message from "../LoadingError/Error";
// import Loading from "../LoadingError/Loading";


const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { id } = useParams();
  console.log(id)
  const history=useHistory();
  const dispatch=useDispatch();
  const {categories} = useSelector(state=>state.categoryList)
  const {tags}=useSelector(state=>state.tagList)

  const [productName,setProductName]=useState("")
  const [description, setDescription] = useState("")  
  const [sku, setSku] = useState("")
  const [price,setPrice]=useState(0);
  const [discount, setDiscount] = useState(null)
  const [isSlider,setIsSlider]=useState(false)
  const [isRecommend,setIsRecommend]=useState(false)
  const [inStock, setInStock] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  // const [tag, setTag] = useState(null)  
  const [categoryId, setCategoryId] = useState(null)
  const productEditInfo=useSelector(state=>state.productEdit);
  const {product,loading,error}=productEditInfo;
  const {success:productUpdate,loading:loadingUpdate,error:errorUpdate}=useSelector(state=>state.productUpdate);
  const [tagName, setTagName] = React.useState([]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
    

  useEffect(()=>{
    if(productUpdate){
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product Updated",ToastObjects);
      history.push("/products")
    }else{
      if(!product || product.id!==Number(id)){
        dispatch(productEditAction(Number(id)))
        dispatch(listCategories())
      }else{
          setProductName(product.name)
          setDescription(product.description)
          setSku(product.sku)
          setInStock(product.inStock)
          setDiscount(product.dicount)
          setPrice(product.price)
          setIsSlider(product.isSlider)
          setIsRecommend(product.isRecommend)
          setPhotoUrl(product.photoUrl)
          setCategoryId(product.categoryId)
      }
    }
  },[id,dispatch,product,productUpdate,history])
  
  const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(productUpdateAction({
      id,
      name:productName,
      sku,
      inStock,
      description,
      price,
      dicount:discount,
      photoUrl,
      isRecommend,
      isSlider,
      categoryId,
    }))
  }

  const handleChangeTag=(option)=>{
    setTagName(option)
   }
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
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
                  {categories && (
                    <div className="mb-4">
                    <label htmlFor="product_categories" className="form-label">
                      Categories
                    </label>
                    <select id="product_categories" 
                        onChange={e=>setCategoryId(e.target.value)}
                        className="form-control" defaultValue={product.categoryId}>
                      <option option disabled value="-">select categories...</option>
                      {categories?.map(category=>(  
                        <option key={category.categoryId} 
                          value={category.categoryId}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  )}
                  <div className="mb-4">
                  <FormControl sx={{ m: 1, width: 300 }}>
                   <label className="form-label">Tags</label>
                      <Select
                        onChange={handleChangeTag}
                        isMulti={true}
                        options={tags}
                        getOptionLabel={(opt)=>opt.name}
                        getOptionValue={(opt)=>opt.id}
                        />
                   </FormControl>
                  </div>
                 
                  <div className="mb-4">
                    <label htmlFor="product_trailer" className="form-label">
                      Sku
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_trailer"
                      value={sku}
                      onChange={e=>setSku(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_summary" className="form-label">
                      In Stock
                    </label>
                    <textarea
                      type="text"
                      rows={1}
                      placeholder="Type here"
                      className="form-control"
                      id="product_summary"
                      value={inStock}
                      onChange={e=>setInStock(e.target.value)}
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
                    <label htmlFor="product_featured" className="form-label">
                      Is Slider?
                    </label>
                    <input
                      type="checkbox"
                      id="product_price"
                      value={isSlider}
                      checked={isSlider?"checked":""}
                      onChange={(e)=>
                        {setIsSlider(e.target.checked ? true : false)}}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_featured" className="form-label">
                      Is Recommend?
                    </label>
                    <input
                      type="checkbox"
                      id="product_price"
                      value={isRecommend}
                      checked={isRecommend?"checked":""}
                      onChange={(e)=>
                        {setIsRecommend(e.target.checked ? true : false)}}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      value={description}
                      onChange={e=>setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={photoUrl}
                      onChange={(e)=>setPhotoUrl(e.target.value)}
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
  );
};

export default EditProductMain;
