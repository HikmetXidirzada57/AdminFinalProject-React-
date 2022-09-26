import { TAG_ADD_FAIL, TAG_ADD_REQUEST, TAG_ADD_SUCCES, TAG_DELETE_FAIL, TAG_DELETE_REQUEST, TAG_DELETE_SUCCES, TAG_EDIT_FAIL, TAG_EDIT_REQUEST, TAG_EDIT_SUCCES, TAG_LIST_FAIL, TAG_LIST_REQUEST, TAG_LIST_SUCCES, TAG_UPDATE_FAIL, TAG_UPDATE_REQUEST, TAG_UPDATE_SUCCES } from "../Constants/TagConstants";

export const tagListReducers=(state={tags:[]},action)=>{
    console.log("Action type", action);
    switch (action.type) {
        case TAG_LIST_REQUEST:
            return {loading:true}
        case TAG_LIST_SUCCES:
            return {loading:false,tags:action.payload}
            case TAG_LIST_FAIL:
                return {loading:false,error:action.payload}
        default:
            return state;
    }
}

export const tagAddRed=(state={tagInfo:{}},action)=>{
    switch (action.payload) {
        case TAG_ADD_REQUEST:
            return {loading:true}
        case TAG_ADD_SUCCES:
            return {loading:false}
        case TAG_ADD_FAIL:
            return {loadin:false}
         default:
            return state;
    }
}


export const tagEditRed=(state={tag:{}},action)=>{
    switch (action.paload){
        case TAG_EDIT_REQUEST:
            return {...state,loading:true}
        case TAG_EDIT_SUCCES:
            return {loading:false,tag:action.payload}
        case TAG_EDIT_FAIL:
            return {loading:false}
        default:
            return state;
    }
}

export const tagUpdateRed=(state={tag:{}},action)=>{
    switch (action.paload){
        case TAG_UPDATE_REQUEST:
            return {...state,loading:true}
        case TAG_UPDATE_SUCCES:
            return {loading:false,succes:true,tag:action.payload}
        case TAG_UPDATE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}

export const tagDeleteRed=(state={tag:{}},action)=>{
    switch (action.payload) {
        case TAG_DELETE_REQUEST:
            return {loading:true}
        case TAG_DELETE_SUCCES:
            return {loading:false,tag:action.payload}
        case TAG_DELETE_FAIL:
            return {loading:false,error:action.paload}
        default:
            return state;
    }
}