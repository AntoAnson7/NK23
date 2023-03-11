const functions = require("firebase-functions");
const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const shortid = require("shortid");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

const admin = require("firebase-admin");
app.use(bodyParser.json());

const serviceAccount = require("./service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const razorpay = new Razorpay({
  key_id: "rzp_test_b2ZGEzmaegiFWh", //"rzp_live_pA1PKHzjMTGnSs"
  key_secret: "JWBTv8IPioNgjegheBZZMDGs", //"xK8D5VFYYWFYvzljId2NQEkR"
});

app.get("/", (req, res) => {
  res.send("RAZORPAY VER");
});

app.post("/razorpay", async (req, res) => {
  const amount = req.body.amount;
  try {
    const response = await razorpay.orders.create({
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
      amount: amount,
    });

    res.json({
      id: response.id,
      currency: "INR",
      amount: response.amount,
    });
  } catch (e) {
    console.log("cant get order id");
  }
});

app.post("/verification", (req, res) => {
  try {
    const secret = "2234172";

    const crypto = require("crypto");

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      if (req.body.payload.payment.entity?.notes?.app !== "isApp") {
        try {
          db.collection("Events")
            .doc(req.body.payload.payment.entity?.notes?.eventid)
            .update({
              spots: admin.firestore.FieldValue.increment(-1),
            });
        } catch (e) {
          console.log("Failed to update spots: " + e);
        }

        try {
          db.collection("users")
            .doc(req.body.payload.payment.entity?.notes?.userid)
            .update({
              registered: admin.firestore.FieldValue.arrayUnion(
                req.body.payload.payment.entity.notes.eventid
              ),
            });
        } catch (e) {
          console.log("failedToAdduserEvent: " + e);
        }

        try {
          if (req.body.payload.payment.entity.notes?.referral !== "nor") {
            db.collection("users")
              .where(
                "refcode",
                "==",
                req.body.payload.payment.entity.notes?.referral
              )
              .get()
              .then((docu) => {
                docu.forEach((_doc) => {
                  if (_doc.exists) {
                    db.collection("users")
                      .doc(_doc.data().uid)
                      .update({
                        refcount: admin.firestore.FieldValue.increment(1),
                      });
                  }
                });
              });
          }
        } catch (e) {
          console.log(e);
        }

        try {
          console.log(req.body.payload.payment.entity?.notes);
          db.collection("Registrations")
            .doc(
              `${req.body.payload.payment.entity?.notes.userid}${req.body.payload.payment.entity?.notes.eventid}`
            )
            .set({
              eventid: req.body.payload.payment.entity?.notes.eventid,
              eventname: req.body.payload.payment.entity?.notes.eventname,
              userid: req.body.payload.payment.entity?.notes.userid,
              username: req.body.payload.payment.entity?.notes.username,
              refcode: req.body.payload.payment.entity?.notes.referral,
              payment_id: req.body.payload.payment.entity?.id,
              order_id: req.body.payload.payment.entity?.order_id,
              method: req.body.payload.payment.entity?.method,
              amount: req.body.payload.payment.entity?.notes.amount,
              remarks: req.body.payload.payment.entity?.notes.remarks,
            });
        } catch (e) {
          console.log("addingFail: " + e);
        }
      }
      try {
        db.collection("EventRegs")
          .doc(req.body.payload.payment.entity?.notes.eventid)
          .update({
            registrations: admin.firestore.FieldValue.arrayUnion(
              req.body.payload.payment.entity.notes.userid
            ),
          });
      } catch (e) {
        console.log("eventRegPushFail: " + e);
      }
    } else {
      console.log("invalid");
    }
    console.log(req.body.payload.payment.entity?.notes);
    res.json({ status: "ok" });
  } catch (e) {
    console.log("Verification fail");
  }
});

app.listen(1591, () => {
  console.log("Listening on port 1337");
});

exports.app = functions.region("asia-south1").https.onRequest(app);
