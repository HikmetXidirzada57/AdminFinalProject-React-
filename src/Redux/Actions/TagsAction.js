import axios from "axios";
import { BASE_URL } from "../../api/BaseConfig";
import { TAG_ADD_FAIL, TAG_ADD_REQUEST, TAG_ADD_SUCCES, TAG_DELETE_FAIL, TAG_DELETE_REQUEST, TAG_DELETE_SUCCES, TAG_EDIT_FAIL, TAG_EDIT_REQUEST, TAG_EDIT_SUCCES, TAG_LIST_FAIL, TAG_LIST_REQUEST, TAG_LIST_SUCCES, TAG_UPDATE_FAIL, TAG_UPDATE_REQUEST, TAG_UPDATE_SUCCES } from "../Constants/TagConstants";

export const tagListAction=()=>async(dispatch)=>{
    try {
        dispatch({type:TAG_LIST_REQUEST});
        const {data} = await axios.get(`${BASE_URL}/tag/getAll`)
        console.log("Tags action",data);
        dispatch({type:TAG_LIST_SUCCES,payload:data});
    } catch (error) {
        dispatch({type:TAG_LIST_FAIL,payload:error});
    }
}
 export const tagAddAction=(tagData)=>async(dispatch)=>{
    try {
        dispatch({type:TAG_ADD_REQUEST});
        const config={
            headers:{
                "Content-Type":"application/json",
            }
        }
        const {data}= await axios.post(`${BASE_URL}/tag/add`,JSON.stringify(tagData),config)
        dispatch({type:TAG_ADD_SUCCES,payload:data});
    } catch (error) {
        dispatch({type:TAG_ADD_FAIL,payload:error});
    }
 }


 export const tagEditAction=(id)=>async(dispatch)=>{
   try {
    dispatch({type:TAG_EDIT_REQUEST});
    const {data}=await axios.get(`${BASE_URL}/tag/${id}`)
    dispatch({type:TAG_EDIT_SUCCES,payload:data});
   } catch (error) {
    dispatch({type:TAG_EDIT_FAIL,payload:error})
   }
 }

 export const tagUpdateAction=(tagEditData)=>async(dispatch)=>{
    try {
        const config={
            headers:{
                "Content-Type": "application/json",
            }
        }
        dispatch({type:TAG_UPDATE_REQUEST});
        const {data} =await axios.put(`${BASE_URL}/tag/${tagEditData.id}`,
        JSON.stringify(tagEditData), config
        )
        // console.log(data)
        dispatch({type:TAG_UPDATE_SUCCES,payload:data});
        dispatch({type:TAG_EDIT_SUCCES,payload:data.data});

    } catch (error) {
        dispatch({type:TAG_UPDATE_FAIL,payload:error});
    }
}

export const tagDelete=(id)=>async(dispatch)=>{
    try {
        dispatch({type:TAG_DELETE_REQUEST});
         const {data}=await axios.delete(`${BASE_URL}/tag/${id}`);

        dispatch({type:TAG_DELETE_SUCCES,
        payload:data
        })
    } catch (error) {
        dispatch({type:TAG_DELETE_FAIL,payload:error})
    }
}