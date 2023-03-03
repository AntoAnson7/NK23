import {collection} from 'firebase/firestore'
import {db} from './config'
// import { useAppData } from '../AppContext/AppContext'
import React from 'react'
import {doc} from 'firebase/firestore'


// const [{user}]=useAppData()

export const usersDatabase=collection(db,'users')

export const regDatabase=collection(db,"registration")
export const eventsDatabase=collection(db,"events")
export const CADatabase=collection(db,"CAEvent")

