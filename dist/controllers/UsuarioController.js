"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);


class UsuarioController{

    async show(req,res){

        const  user_id  = req.user_id;

        const user = await _User2.default.find();

        if(!user){
            res.status(400).json({error:'usuario nao encontrado'
            });
        }


        res.json(user);

    }

    async update(req,res){

        const  user_id  = req.user_id;
        const { nome , email, senha, nascimento} = req.body;
        const { filename } = req.file;      

       const  user = await _User2.default.findOneAndUpdate({_id:user_id},
            {
                thumbnail: filename,
                nome,
                email,
                senha,
                nascimento,
            },{
                new:false
            });

        return res.json({ok:'atualizado com sucesso'})
    }

}


exports. default = new UsuarioController();