import bcryptf from "bcryptjs"
import models from "../models"
import token from "../services/token";

export default {
    register: async (req, res) => {
        try {
            const contrasenia = req.body.password;

            // Hasheo de la contraseña
            const hashedPassword = await bcryptf.hash(contrasenia, 10);
            req.body.password = hashedPassword;  // Asignar la contraseña hasheada

            // Crear el usuario
            const user = await models.User.create(req.body);
            res.status(200).json(user);
        } catch (error) {
            // Mostrar el mensaje de error
            console.error(error);  // Muestra el error en consola para depuración
            res.status(500).send({
                message: 'OCURRIO UN PROBLEMA 1',
                error: error.message || error // Incluye el mensaje de error en la respuesta
            });
        }
    },

    login: async(req, res) => {
        try {
            const user = await models.User.findOne({email: req.body.email, state:1});
            if(user){
                let compare = await bcryptf.compare(req.body.password, user.password);
                if(compare){
                    let tokenT = await token.encode(user._id, user.rol, user.email);

                    const USER_FRONTED = {
                        token:tokenT,
                        user: {
                            name: user.name,
                            email: user.email,
                            surname: user.surname,
                            avatar: user.avatar,
                        },
                    }

                    res.status(200).send({
                        USER_FRONTED:USER_FRONTED,
                    });
                }else{
                    res.status(500).send({
                        message: 'USUARIO NO EXISTE'
                    });        
                }
            } else {
                res.status(500).send({
                    message: 'USUARIO NO EXISTE'
                });    
            }
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIO UN PROBLEMA 2'
            });
            console.log(error);
        }
    },

    update: async(req, res) => {
        try {
            if(req.files){
                var img_path = req.files.avatar.path;
                var name = img_path.split('//');
                var avatar_name = name[2];
                console.log(avatar_name);
            }
            if(req.body.password) {
                req.body.password = await bcryptf.hash(req.body.password, 10);
            }
            const UserT = await models.User.findByIdAndUpdate({_id: req.body._id}, req.body);
            res.status(200).send({
                message: 'EL USUARIO SE HA MODIFICADO CORRECTAMENTE',
                user:UserT
            });
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIO UN PROBLEMA 3'
            });
            console.log(error);
        }
    },

    list: async(req, res) => {
        try {
            var search = req.body.search;

            const Users = await models.User.find({
                $or:[
                    {"name": new RegExp(search, "i")},
                    {"surname": new RegExp(search, "i")},
                    {"email": new RegExp(search, "i")},
                ]

            })        

            res.status(200).send({
                users: Users
            });
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIO UN PROBLEMA 4'
            });
        }
    },

    remove: async(req, res) => {
        try{
            const User= await models.User.findByIdAndDelete({_id: req.body._id});
            res.status(200).send({
                message: 'SE ELIMINO CORRECTAMENTE'
            });
        } catch(error){
            res.status(500).send({
                message: 'OCURRIO UN PROBLEMA 5'
            });
        }
    }
}