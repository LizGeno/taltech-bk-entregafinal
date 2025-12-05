import { loginService, registerService } from '../service/auth.service.js';

export const loginCtrl = async (req,res)=>{
    try{

        const {email,password} = req.body;
        const result = await loginService(email, password);
        
        return res.status(200).json({
                message: "Login exitoso",
                token: result.token,
                user: result.user
            });
    } catch (error){
        res.status(401).json({message: error.message});
    }
};

export const registerCtrl = async (req,res) =>{
    try{
        const { email, password } = req.body;
        const newUser = await registerService(email, password);

        res.status(201).json({
            message: "Usuario registrado con éxito",
            user: newUser
        });
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};