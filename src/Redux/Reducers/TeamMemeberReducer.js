import { TEAMMEMBER_LIST_REQUEST, TEAMMEMBER_LIST_SUCCESS, TEAMMEMBER_LIST_FAIL } from "../Constants/TeamMemberConstants";

export const teammemberListReducers=(state={teammembers:[]},action)=>{
    switch (action.type) {
        case TEAMMEMBER_LIST_REQUEST:
            return {...state,loading:true}
        case TEAMMEMBER_LIST_SUCCESS:
            return {loading:false,teammembers:action.payload}
            case TEAMMEMBER_LIST_FAIL:
                return {loading:false,error:action.payload}
        default:
            return state;
    }
}