"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _NovosClientes = require('../models/NovosClientes'); var _NovosClientes2 = _interopRequireDefault(_NovosClientes);
var _moment = require('moment'); var _moment2 = _interopRequireDefault(_moment);
let data = new Date()
let formatData = _moment2.default.call(void 0, data).format('MM/YYYY');
 //id(automatico), nome,; email, senha(criptografar), data nascimento, ultimo_agendamento 
class CadastroController {

    async store(req,res){
        
        

        const { nome , email, senha, nascimento} = req.body;
        const { filename } = req.file;

            let user = await _User2.default.findOne({email});


            if(!user){
                user = await _User2.default.create({
                    thumbnail: filename,
                    nome,
                    email,
                    senha,
                    nascimento,
                    ultimo_agendamento:''
                });

                let resNovos = await _NovosClientes2.default.find({data:formatData});
                if(resNovos.length < 1){ 
                    await _NovosClientes2.default.create({ data:formatData},{ count: 0 });
                    }
                await _NovosClientes2.default.updateOne({ data:formatData},{$inc:{ count: 1 }});

                        
                    return res.json(user);

                
            }

            return res.json({
                error:"email ja existe"
            })


           
    }

}

exports. default = new CadastroController();