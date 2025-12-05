import {db} from '../config/firebase.js';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const usersCollection = collection(db, 'users');

export const userModel = {
    async findOneByEmail(email){
        const q = query(usersCollection, where("email", "==", email));
        const snapshot = await getDocs(q);

        if (snapshot.empty) return null;
        
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    },
    async create(userData) {
        const docRef = await addDoc(usersCollection, userData);
        return docRef.id;
    }
};