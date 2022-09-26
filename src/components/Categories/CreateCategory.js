import { useState } from "react";
import { useDispatch } from "react-redux";
import { categoryAdd } from "../../Redux/Actions/CategoryActions";


const CreateCategory = ({categories}) => {
  const [parentId,setParentId]=useState(0);
  const [name,setName]=useState("");
  const dispatch=useDispatch();
  const sumbitHandler=(e)=>{
    e.preventDefault()
      dispatch(categoryAdd({parentCategoryId:parentId,name}))
  }
   
  return (
    <div className="col-md-12 col-lg-4">
      <form onSubmit={sumbitHandler}>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Name
          </label>
          <input
            // {...register("name",{required:true})}
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            value={name}
            onChange={c=>setName(c.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Parent Category</label>
          <select className="form-control" 
          name="parentCategoryId"
          onChange={c=>setParentId(c.target.value)}
          //  {...register("parentCategoryId")}
          >
            <option value={0}>None</option>
            {categories?.map(cate=>(
              <option
               value={Number(cate.categoryId)}
                key={cate.categoryId}
                >
                  {cate.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="d-grid">
          <button className="btn btn-primary py-3">Create category</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
