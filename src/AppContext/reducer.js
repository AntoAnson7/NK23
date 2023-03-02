export const initial={
    user:{},
    isVerified:false,
    userLocal:{    
        name:null,
        email:null,
        sem:null,
        branch:null,
        college:null,
        uid:null,
    },
    isCA:false,
    CA:null,
    code:null
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
        
        case 'SET_NEW_LOCAL_USER':
            return{
                ...state,userLocal:action.userLocal
            }
            
        case 'SET_CA':
            return{
                ...state,isCA:action.isCA
            }

        case 'SET_CA_CODE':
            return{
                ...state,code:action.code
            }

        case 'SET_CA_DOC':
            return{
                ...state,CA:action.doc
            }

        default :return state
    }
}