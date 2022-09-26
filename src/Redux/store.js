import { configureStore,combineReducers } from '@reduxjs/toolkit'
import { LoginReducers, RegisterReducers } from './Reducers/UserReducers';
import thunk from 'redux-thunk';
import { categoryAddReducers, categoryDeleteReducers, categoryEditReducers, categoryListReducers, categoryUpdateReducer } from './Reducers/CategoryReducers';
import { productDeleteReducers, productEditReducers, productListReducers, productReducers, productUpdateReducer } from './Reducers/ProductReducers';
import { teammemberListReducers } from './Reducers/TeamMemeberReducer';
import { tagAddRed, tagEditRed, tagListReducers, tagUpdateRed } from './Reducers/TagsReducer';
import { blogAddReducers, blogEditReducers, blogListReducers, blogUpdateReducer } from './Reducers/BlogReducer';


const userFromLocalStorage=localStorage.getItem("userInfo")?
 JSON.parse(localStorage.getItem("userInfo")): null

const reducer=combineReducers({
    loginUser:LoginReducers,
    registerUser:RegisterReducers,
    teamMemberList:teammemberListReducers,
    addedProductRed:productReducers,
    productList:productListReducers,
    productDeleted:productDeleteReducers,
    productEdit:productEditReducers,
    productUpdate:productUpdateReducer,
    categoryList:categoryListReducers,
    categoryDeleted:categoryDeleteReducers,
    categoryEdit:categoryEditReducers, 
    categoryUpdate:categoryUpdateReducer,
    categoryAdd:categoryAddReducers,
    tagAdd:tagAddRed,
    tagEdit:tagEditRed,
    tagUpdate:tagUpdateRed,
    tagList:tagListReducers,
    blogAddRed:blogAddReducers,
    blogEditRed:blogEditReducers,
    blogUpdateRed:blogUpdateReducer,
    blogList:blogListReducers,
    
})

const initialState={
    loginUser:{
        userInfo:userFromLocalStorage
    }
}
const store=configureStore({reducer,initialState,middleware:[thunk]});

export default store;

