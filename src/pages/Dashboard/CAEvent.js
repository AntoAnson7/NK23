import { useAppData } from '../../AppContext/AppContext'
import '../../Styles_temp/ca.css'
import {v4} from 'uuid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CAEvent=()=>{
    const navigate=useNavigate()
    const [{user},dispatch]=useAppData()
    const [refCode,setrefCode]=useState("")

    const generateCode=()=>{
        let code=""

        for(let i=0;i<4;i++){
            code+=user?.displayName[i]
        }
        for(let i=0;i<6;i++){
            code+=user?.uid[i]
        }
        setrefCode(code)
    }

    const setReferral=()=>{

        dispatch({
            type:'SET_CA',
            isCA:true
        })

        dispatch({
            type:'SET_CA_CODE',
            code:refCode.toUpperCase()
        })
    }

    useEffect(()=>{
        if(user?.uid==null){
            navigate("/")
        }
        else{
            generateCode()
        }
        
    },[])

    return (
        <div className="ca-registration">
            <button onClick={setReferral}>Register as Campus Ambassador</button>
        </div>
    )
}