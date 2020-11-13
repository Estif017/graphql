import { LOGIN, LOGOUT, REGISTER } from "../Types"

const AuthReducer = (state,action) => {
    switch (action.type){
        case REGISTER:
        case LOGIN:
            return{
                ...state,
                user:action.payload
            }
        case LOGOUT:
            return{
                ...state,
                user:null
            }
        default:
            return state
    }
}

export default AuthReducer
