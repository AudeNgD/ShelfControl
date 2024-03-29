import { db } from "../firebaseConfig";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";

const declineFriendship = (uid1, uid2) => {
  const docRef1 = doc(db, "users", uid1, "friendships", uid2);
  const docRef2 = doc(db, "users", uid2, "friendships", uid1);
  //return deleteDoc(docRef1);

  Promise.all([
    deleteDoc(docRef1), deleteDoc(docRef2)
  ])
  .then(() => {
    alert("Friend request declined")
  })
  .catch((err) => {
    alert("Friend request cannot be declined at this time, please try again later")
  })
};

export default declineFriendship;
