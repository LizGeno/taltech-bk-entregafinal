import {db} from '../config/firebase.js';
//herr. firestore
import {
    collection, 
    getDocs,
    addDoc,
    getDoc,
    doc,
    deleteDoc,
    updateDoc
} from "firebase/firestore";

const productsCollection = collection(db, 'products');

export const productModel = {

    //Traer todos los productos
    async getAll(){
        const snapshot = await getDocs(productsCollection);
        return snapshot;
    },

    //Trae por ID
    async getById(id){
        const docRef = doc(db, 'products', id);
        const snapshot = await getDoc(docRef);
        return snapshot;
    },

    //Crear productos
    async create(productData){
        const docRef = await addDoc(productsCollection, productData);
        return docRef.id;
    },

    //Eliminar producto
    async delete(id){
        const docRef = doc(db, 'products',id);
        await deleteDoc(docRef);
        return true;
    },

    async update(id, productData){
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, productData);
        return true;
    }
};