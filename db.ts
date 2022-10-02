import * as admin from "firebase-admin";
import * as key from "./key.json";

const serviceAccount = key as any;


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dwf-m6-4c327-default-rtdb.firebaseio.com",
});
export {admin}




