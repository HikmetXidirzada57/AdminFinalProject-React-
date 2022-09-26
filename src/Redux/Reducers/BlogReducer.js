import { BLOG_ADD_FAIL, BLOG_ADD_REQUEST, BLOG_ADD_SUCCES, BLOG_DELETE_FAIL, BLOG_DELETE_REQUEST, BLOG_DELETE_SUCCES, BLOG_EDIT_FAIL, BLOG_EDIT_REQUEST, BLOG_EDIT_SUCCES, BLOG_LIST_FAIL, BLOG_LIST_REQUEST, BLOG_LIST_SUCCES, BLOG_UPDATE_FAIL, BLOG_UPDATE_REQUEST, BLOG_UPDATE_RESET, BLOG_UPDATE_SUCCES } from "../Constants/BlogConstants"

export const blogAddReducers=(state={blogInfo:{}},action)=>{
    switch (action.type) {
        case BLOG_ADD_REQUEST:
            return {loading:true}
        case BLOG_ADD_SUCCES:
            return {loading:false,blogInfo:action.payload}
            case BLOG_ADD_FAIL:
                return {loading:false,error:action.payload}
        default:
            return state;
    }
}

export const blogListReducers=(state={blogs:[]},action)=>{
    switch (action.type) {
        case BLOG_LIST_REQUEST:
            return {loading:true}
        case BLOG_LIST_SUCCES:
            return {loading:false,blogs:action.payload}
            case BLOG_LIST_FAIL:
                return {loading:false,error:action.payload}
        default:
            return state;
    }
}

export const blogEditReducers=(state={blog:{}},action)=>{
    switch (action.type) {
        case BLOG_EDIT_REQUEST:
            return {...state,loading:true}
        case BLOG_EDIT_SUCCES:
            return {loading:false,blog:action.payload}
            case BLOG_EDIT_FAIL:
                return {loading:false,error:action.payload}
        default:
            return state;
    }
}

export const blogUpdateReducer=(state={blog:{}},action)=>{
    switch (action.type) {
        case BLOG_UPDATE_REQUEST:
            return {...state,loading:true}
        case BLOG_UPDATE_SUCCES:
        return {loading:false,succes:true,blog:action.payload} 
        case BLOG_UPDATE_FAIL:
            return {loading:false, blog:action.payload}
         case BLOG_UPDATE_RESET:
                return {blog:{}}       
        default:
        return state;
    }
}

export const blogDeleteReducer=(state={blog:{}},action)=>{
 switch (action.payload) {
    case BLOG_DELETE_REQUEST:
        return {loading:true}
    case BLOG_DELETE_SUCCES:
        return {loading:false,blog:action.payload}    
    case BLOG_DELETE_FAIL:
        return {loading:false, blog:action.payload}
    default:
        return state;
 }
}