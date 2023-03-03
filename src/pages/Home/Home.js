import { useAppData } from "../../AppContext/AppContext"
import { Link } from "react-router-dom"
export const Home=()=>{
    const [{user,userLocal,isCA}]=useAppData()
    return (
        <div>

            <h1>HOME</h1>

            {user.uid?(

            <div className="user-info">
                <h3>{user.displayName}</h3>
                <h3>{userLocal.name}</h3>
                <h3>{userLocal.email}</h3>
                <h3>{userLocal.college}</h3>
                <h3>{userLocal.branch}</h3>
                <h3>{userLocal.sem}</h3>
                <h3>{userLocal.id}</h3>
                <h3>{isCA?"CA":"Not CA"}</h3>
            </div>
            ):<h3>Not signed in</h3>}

            <Link to="/events/cultural">Cultural Events</Link>
            <Link to="/events/technical">Technical Events</Link>

        </div>
    )
}