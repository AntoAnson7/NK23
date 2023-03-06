
const loadScript=()=>{

    return new Promise((resolve)=>{
    const script=document.createElement('script')
    script.src="https://checkout.razorpay.com/v1/checkout.js"
    

    script.onload=()=>{resolve(true)}

    script.onerror=()=>{resolve(false)}
    document.body.appendChild(script)
  })

    

  }

export const displayRazorpay=async(token)=>{
    
    const res=await loadScript()

    if(!res){// http://localhost:1337/razorpay
      alert("Payment Failed")
      return
    }

    const eventFee ={
      amount: parseInt(token.amount)*100
      }

    const data=await fetch("http://localhost:1337/razorpay",{method: 'POST',headers:{
      'Content-Type':'application/json'
    },body:JSON.stringify(eventFee)}).then((t)=>
      t.json()
    )
    console.log(data)

    const options = {
      key: "rzp_test_b2ZGEzmaegiFWh", // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Nakshatra23", //your business name
      description: "Test Transaction",

      // image: "https://example.com/your_logo",

      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      
      // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
      
      notes: {
          eventid:token.eventid,
          eventname:token.eventname,
          username:token.username,
          userid:token.uid,
          amount:token.amount,
          referral:token.ref,
      },

      theme: {
          color: "#1E1E1E"
      },

      handler:function(res){
        console.log(res.razorpay_payment_id)
        console.log(res.razorpay_order_id)
        console.log(res.razorpay_signature)
      },

      prefill: {
        name: "Anto", //your customer's name
        phone_number:"9526075975"
    }
  }
  const paymentObject=new window.Razorpay(options)
  paymentObject.open()
  }
