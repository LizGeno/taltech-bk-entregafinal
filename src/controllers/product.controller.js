import { 
    getAllProductsService,
    getProductByIdService,
    createProductService,
    deleteProductService,
    updateProductService 

} from "../service/product.service.js";

//GET PRODUCTS (ALL)
export const getProductsCtrl = async (req, res)=>{
    try{
        const products = await getAllProductsService();
        res.status(200).json(products);
    }catch (error){
        console.error(error);
        res.status(500).json({message:"Error al traer productos",
            error: error.message
        });
    }
};

//GET PRODUCT BY ID
export const getProductByIdCtrl = async (req,res)=>{
    try{
        const {id} = req.params;
        const product = await getProductByIdService(id);

        if(!product){
            return res.status(404).json({message: "producto no encontrado"});
        }
        res.status(200).json(product);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Error",
            error: error.message  
        })
    }
}

//POST PRODUCT
export const createProductCtrl = async (req,res)=>{
    try{
        const productData = req.body;
        const newProduct = await createProductService(productData);
        res.status(201).json({
            message: "Producto creado exitosamente",
            product: newProduct
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Error al crear producto",
            error: error.message        
        });
    };
};

//DELETE PRODUCT
export const deleteProductCtrl = async (req,res)=>{
    try{
        const{id} = req.params;
        const product = await deleteProductService(id);

        if(!product){
            return res.status(404).json({message: "producto no encontrado"});
        }
        res.status(200).json(product);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"error",
            error:error.message
        })
    };
};

//ACTUALIZAR PRODUCTO
export const updateProductCtrl = async (req, res)=>{
    try{
        const {id} = req.params;
        console.log("ID recibido en Controller:", id);
        const productData = req.body;
        const updatedProduct = await updateProductService(id, productData);

        if(!updatedProduct){
            return res.status(404).json({
                message:"Producto no encontrado"
            });
        };
        res.status(200).json({
            message: "Producto actualizado",
            product: updatedProduct
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Error al actualizar",
            error:error.message
        });
    };
};