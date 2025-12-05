import { productModel } from "../models/product.model.js";

export const getAllProductsService = async () => {
    const snapshot = await productModel.getAll();
    //limpieza de datos
    const cleanProducts = snapshot.docs.map(doc => {
        const data = doc.data();
        return{
            id: doc.id,
            nombre: data.nombre,
            precio: data.precio,
            stock: data.stock,
            categoria: data.categoria
        };
    });

    return cleanProducts;
};

export const getProductByIdService = async (id) => {
    const snapshot = await productModel.getById(id);

    //validacion
    if(!snapshot.exists()){
        return null;
    }
    return{
        id:snapshot.id,
        ...snapshot.data()
    };
};


//nuevo ID para el producto q estamos creando
export const createProductService = async (productData)=>{
    //validacion con datos obligatorios
    if(!productData.nombre || !productData.precio){
        throw new Error("Faltan datos: nombre y precio son obligatorios")
    }

    //se crea el obj SOLO con las claves q queremos guardar
    const productToSave ={
        nombre: productData.nombre,
        precio: productData.precio,
        stock: productData.stock || 0,
        categoria: productData.categoria || "General"
    };
    const newId = await productModel.create(productToSave);
    return{
        id: newId,
        ...productToSave
    };
};

export const deleteProductService = async (id)=>{
    //valid. si existe el prod.
    const snapshot = await productModel.getById(id);
    if(!snapshot.exists()){
        return null;
    };
    //si existe...
    await productModel.delete(id);
    return{
        message: "Producto eliminado correctamente",
        idEliminado: id
    };
};

export const updateProductService = async (id, productData)=>{
    //validamos si existe el prod
    const snapshot = await productModel.getById(id);
    if(!snapshot.exists()){
        return null;
    };


    await productModel.update(id,productData);
    return{
        id: id,
        ...productData
    };
}