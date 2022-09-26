import axios from "axios";
import { BASE_URL } from "../../api/BaseConfig";
import { BLOG_ADD_FAIL, BLOG_ADD_REQUEST, BLOG_ADD_SUCCES, BLOG_DELETE_FAIL, BLOG_DELETE_REQUEST, BLOG_DELETE_SUCCES, BLOG_EDIT_FAIL, BLOG_EDIT_REQUEST, BLOG_EDIT_SUCCES, BLOG_LIST_FAIL, BLOG_LIST_REQUEST, BLOG_LIST_SUCCES, BLOG_UPDATE_FAIL, BLOG_UPDATE_REQUEST, BLOG_UPDATE_SUCCES } from "../Constants/BlogConstants";

export const blogAddAction=(blogData)=>async(dispatch)=>{
    try {
        dispatch({type:BLOG_ADD_REQUEST});
        const config={
            headers:{
                "Content-Type": "application/json",
            }
        }
        const {data} = await axios.post(`${BASE_URL}/blog/add`,JSON.stringify(blogData),config)
        dispatch({type:BLOG_ADD_SUCCES,payload:data});
    } catch (error) {
        dispatch({type:BLOG_ADD_FAIL,payload:error});
    }
}

export const blogListAction=()=>async(dispatch)=>{
  try {
    dispatch({type:BLOG_LIST_REQUEST});
    const {data}= await axios.get(`${BASE_URL}/blog/getAll`);
    dispatch({type:BLOG_LIST_SUCCES,payload:data});
  } catch (error) {
    dispatch({type:BLOG_LIST_FAIL,payload:error});
  }
}

export const blogEditAction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:BLOG_UPDATE_REQUEST});
        const {data} = await axios.get(`${BASE_URL}/blog/${id}`)
        dispatch({type:BLOG_UPDATE_SUCCES,payload:data});
    } catch (error) {
        dispatch({type:BLOG_UPDATE_FAIL,payload:error});
    }
}
export const blogUpdateAction=(blogEditData)=>async(dispatch)=>{
    try {
        const config={
            headers:{
                "Content-Type": "application/json",
            }
        }
        dispatch({type:BLOG_EDIT_REQUEST});
        const {data} =await axios.put(`${BASE_URL}/blog/${blogEditData.id}`,
        JSON.stringify(blogEditData), config
        )
        dispatch({type:BLOG_UPDATE_SUCCES,payload:data});
        dispatch({type:BLOG_EDIT_SUCCES,payload:data.data});

    } catch (error) {
        dispatch({type:BLOG_EDIT_FAIL,payload:error});
    }
}
export const blogDelete=(id)=>async(dispatch)=>{ 
    try {
        dispatch({type:BLOG_DELETE_REQUEST})
        const {data} = await axios.delete(`${BASE_URL}/blog/${id}`)
        dispatch({
            type:BLOG_DELETE_SUCCES,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:BLOG_DELETE_FAIL,
            payload:error
        })
    }
}