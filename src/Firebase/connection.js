import {collection} from 'firebase/firestore'
import {db,auth} from './config'

export const getCollection=(coll)=>{
    return collection(db,coll)
}