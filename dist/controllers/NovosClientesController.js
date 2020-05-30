"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _NovosClientes = require('../models/NovosClientes'); var _NovosClientes2 = _interopRequireDefault(_NovosClientes);

 //id(automatico), nome,; email, senha(criptografar), data nascimento, ultimo_agendamento 
class CadastroController {

    async show(req,res){
        const  token_id  = req.user_id;
        let user = await  _User2.default.findOne({ _id:token_id});
        const { admin } = user;   
        
        if( ! admin === true ){
            return res.status(401).json({error: "nao foi possivel altenticar o token"});
        }

        let novos = await _NovosClientes2.default.find();

        return res.json(novos);
    }

}

exports. default = new CadastroController();