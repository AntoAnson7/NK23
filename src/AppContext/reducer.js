export const initial={
    user:{},
    isVerified:false
}

export const reducer=(state,action)=>{
    console.log(action) //TESTING

    switch (action.type){

        case 'SET_USER':
            return{
                ...state,user:action.user
            }
        
        case 'SET_VERIFICATION':
            return{
                ...state,isVerified:action.status
            }


        default :return state
    }
}