import { useAppData } from "../../AppContext/AppContext"

export const Home=()=>{
    const [{user,userLocal},dispatch]=useAppData()
    return (
        <div>

            <h1>HOME</h1>
            
            <button onClick={()=>{
                dispatch({
                    type:'SET_VERIFICATION',
                    status:false
                })
                dispatch({
                    type:'SET_USER',
                    user:{}
                })
                dispatch({
                    type:'SET_NEW_LOCAL_USER',
                    userLocal:{    
                        name:null,
                        email:null,
                        sem:null,
                        branch:null,
                        college:null,
                        id:null
                    }
                })

            }}>Logout</button>

            {user.uid?(

            <div className="user-info">
                <h3>{user.displayName}</h3>
                <h3>{userLocal.name}</h3>
                <h3>{userLocal.email}</h3>
                <h3>{userLocal.college}</h3>
                <h3>{userLocal.branch}</h3>
                <h3>{userLocal.sem}</h3>
                <h3>{userLocal.id}</h3>
            </div>
            ):<h3>Not signed in</h3>}

        </div>
    )
}