import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { useAppData } from '../../AppContext/AppContext'
import * as yup from 'yup'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {addDoc,collection} from 'firebase/firestore'
import {getCollection} from '../../Firebase/connection'
import {db} from '../../Firebase/config'

export const Signup=()=>{

    const usersDatabase=collection(db,"users")

    const navigate=useNavigate()
    useEffect(()=>{
        if(user.uid==null){
            navigate("/")
        }
    },[])

    const schema=yup.object().shape({
        display_name:yup.string().max(25).required(),
        email:yup.string().email().required(),
        college:yup.string().required().max(50),
        branch:yup.string().required().max(30),
        sem:yup.number().min(1).max(8).required()
    })

    const [{user},dispatch]=useAppData()

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })

    const formSubmit=async(data)=>{
        console.log(data)
        await addDoc(usersDatabase,{
            branch:data.branch,
            college:data.college,
            email:data.email,
            id:user.uid,
            name:data.display_name,
            sem:data.sem
        })


        const newLocalUser={
            name:data.display_name,
            email:data.email,
            sem:data.sem,
            branch:data.branch,
            college:data.college,
            id:user.uid
        }

        dispatch({
            type:'SET_NEW_LOCAL_USER',
            userLocal:newLocalUser
        })

        dispatch({
            type:'SET_VERIFICATION',
            status:true
        })



        navigate("/")
    }

    return (
        <div className="signup">
            <form className='signup-form' onSubmit={handleSubmit(formSubmit)}>
                <p>Note : The display name you choose will be your name in certificates</p>
                <input type="text" placeholder='Display name' {...register("display_name")}/>
                <input type="text" placeholder='Email' defaultValue={user.email} {...register("email")}/>
                <input type="text" placeholder='College name' {...register("college")}/>
                <input type="text" placeholder='Branch' {...register("branch")}/>
                <input type="number" placeholder='Semester' {...register("sem")}/>
                <input type="submit" value="Sign Up"/>
            </form>
        </div>
    )
}