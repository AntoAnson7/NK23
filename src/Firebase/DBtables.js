import {collection} from 'firebase/firestore'
import {db} from './config'

export const usersDatabase=collection(db,"users")
export const regDatabase=collection(db,"registration")
export const eventsDatabase=collection(db,"events")