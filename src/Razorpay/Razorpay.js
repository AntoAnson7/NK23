const loadScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const displayRazorpay = async (token, remarks) => {
  const res = await loadScript();

  if (!res) {
    alert("Payment Failed");
    return;
  }

  const eventFee = {
    amount: parseInt(token.amount) * 100,
  };
  const data = await fetch(
    "https://asia-south1-nk23-a5689.cloudfunctions.net/app/razorpay",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventFee),
    }
  )
    .then((t) => t.json())
    .catch((error) => {
      console.log(error);
    });

  const options = {
    key: process.env.REACT_APP_RZP_TEST_APIKEY,
    amount: data.amount,
    currency: data.currency,
    name: "Nakshatra23",
    description: "Event Registration",

    order_id: data.id,

    notes: {
      eventid: token.eventid,
      eventname: token.eventname,
      username: token.username,
      userid: token.uid,
      amount: token.amount,
      referral: token.ref,
      remarks: remarks,
    },

    theme: {
      color: "#1E1E1E",
    },

    handler: function (res) {},
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
