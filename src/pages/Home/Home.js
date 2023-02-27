import { useAppData } from "../../AppContext/AppContext"

export const Home=()=>{
    const [{user},dispatch]=useAppData()
    return (
        <div>

            <h1>HOME</h1>
            
            <button onClick={()=>{
                dispatch({
                    type:'SET_USER',
                    user:{}
                })

            }}>Logout</button>

            {user.uid?<h3>{user.displayName}</h3>:<h3>Not signed in</h3>}

        </div>
    )
}