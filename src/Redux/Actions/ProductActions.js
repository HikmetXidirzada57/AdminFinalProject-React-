import axios from "axios";
import { BASE_URL } from "../../api/BaseConfig";
import { PRODUCT_ADD_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../Constants/ProductConstants"

export const productAdd=(productData)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_ADD_REQUEST});
        const config={
            headers:{
                "Content-Type": "application/json",
            }
        }
        const {data} = await axios.post(`${BASE_URL}/product`,JSON.stringify(productData),config)
        dispatch({type:PRODUCT_ADD_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:PRODUCT_ADD_FAIL,payload:error});
    }
}

export const productUpdateAction=(productEditData)=>async(dispatch)=>{
    try {
        const config={
            headers:{
                "Content-Type": "application/json",
            }
        }
        dispatch({type:PRODUCT_UPDATE_REQUEST});
        const {data} =await axios.put(`${BASE_URL}/product/${productEditData.id}`,
        JSON.stringify(productEditData), config
        )
        dispatch({type:PRODUCT_UPDATE_SUCCESS,payload:data});
        dispatch({type:PRODUCT_EDIT_SUCCESS,payload:data.data});

    } catch (error) {
        dispatch({type:PRODUCT_UPDATE_FAIL,payload:error});
    }
}

export const productListAction=()=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data} = await axios.get(`${BASE_URL}/product/getAll`)
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:PRODUCT_LIST_FAIL,payload:error});
    }
}

export const productEditAction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_EDIT_REQUEST});
        const {data} = await axios.get(`${BASE_URL}/product/${id}`)
        dispatch({type:PRODUCT_EDIT_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:PRODUCT_EDIT_FAIL,payload:error});
    }
}

export const productDelete=(id)=>async(dispatch)=>{ 
    try {
        dispatch({type:PRODUCT_DELETE_REQUEST})
        const {data} = await axios.delete(`${BASE_URL}/product/${id}`)
        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload:error
        })
    }
}
