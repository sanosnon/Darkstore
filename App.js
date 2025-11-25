import { db } from './firebase-init.js';

console.log("Firebase working…", db);





import { db } from './firebase-init.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

console.log("Firebase working…", db);

async function testDB() {
  try {
    const querySnapshot = await getDocs(collection(db, "testCollection")); // أنشئ مجموعة testCollection في Firebase
    console.log("Firestore is connected. Documents:");
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  } catch (error) {
    console.error("Error connecting to Firestore:", error);
  }
}

testDB();
