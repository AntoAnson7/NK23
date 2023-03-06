import React, { useEffect ,useState} from 'react'
import { useAppData } from '../AppContext/AppContext'
import {displayRazorpay} from '../Razorpay/Razorpay'
import { useNavigate } from 'react-router-dom'

import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

export function Registration() {
  const navigate=useNavigate()

  const schema=yup.object().shape({
    ref:yup.string().min(10)
  })

  const [{user,eventTemp,RegEvent:e}]=useAppData()

  const {handleSubmit,register,formState:{errors}}=useForm({
    resolver:yupResolver(schema)
  })

  useEffect(()=>{
    if(user?.uid==null){
      navigate("/")
    }
  },[])

  const proceedtoPay=(data)=>{
    const token={
      uid:user.uid,
      username:user.displayName,
      amount:e.regfee,
      eventid:e.eventid,
      eventname:e.name,
      ref:data.ref==null?"nor":data.ref
    }
    displayRazorpay(token)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(proceedtoPay)}>
        <input type="text" value={e.name} />
        <input type="text" value={e.eventid}/>
        <input type="text" placeholder='Do you have a referral code?'{...register('ref')}/>
        <p></p>
        <p>Alert: Please do not refresh the page after you hit pay</p>
        <p>There wont be any refunds after you have paid the registration fee</p>
        <p>You will be charged extra 2% as payment gateway charges</p>
        <p>Wait for the payment window to close automatically after the payment is done</p>
        <input type="submit" value={`Pay rs ${e.regfee}`}/>
      </form>
    </div>
  )
}
