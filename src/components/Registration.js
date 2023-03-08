import React, { useEffect ,useState} from 'react'
import { useAppData } from '../AppContext/AppContext'
import {displayRazorpay} from '../Razorpay/Razorpay'
import { useNavigate } from 'react-router-dom'

import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './Registration.css'

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
    <div className='reg'>
      <form className='form' onSubmit={handleSubmit(proceedtoPay)}>
        <input className='i1' type="text" value={e.name} />
        <input type="text" value={e.eventid}/>
        <input type="text" placeholder='Do you have a referral code?'{...register('ref')}/>
        <p></p>
        <ul className="pay-alerts">
          <li>Alert: Please do not refresh the page after you hit pay</li>
          <li>There wont be any refunds after you have paid the registration fee</li>
          <li>You will be charged extra 2% as payment gateway charges</li>
          <li>Wait for the payment window to close automatically after the payment is done</li>
        </ul>
        <input className='i-sub' type="submit" value={`Pay ₹${e.regfee}`}/>
      </form>
    </div>
  )
}
