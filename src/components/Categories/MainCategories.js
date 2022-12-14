import React, { useEffect } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import {useDispatch, useSelector} from 'react-redux';
import EditCategory from "./EditCategory";

const MainCategories = ({categoryId}) => {
  const dispatch=useDispatch();
  const {categories}=useSelector(state=>state.categoryList);
  const {createSuccess}=useSelector(state=>state.categoryAdd);
  useEffect(()=>{
    dispatch(listCategories())
  },[dispatch])
   
  useEffect(()=>{
    if(createSuccess){
      dispatch(listCategories())
    }
  },[dispatch,createSuccess])
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Categories</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            {categoryId ?(
              <EditCategory categoryId={categoryId}/>
            ):  <CreateCategory categories={categories}/>
          }
            {/* Categories table */}
            <CategoriesTable categories={categories} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
