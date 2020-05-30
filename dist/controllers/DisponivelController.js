"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Agendamento = require('../models/Agendamento'); var _Agendamento2 = _interopRequireDefault(_Agendamento);

class DisponivelController{

    async index(req,res){

            const { data , tipo, horario, user_id }  = req.body;
            
            const documents = await _Agendamento2.default.find({data,tipo,horario});
    
            if(documents.length < 20){

                return res.json({disponivel:true});
            
            }

                return res.json({disponivel:false});
            
        }
    }
    

    exports. default = new DisponivelController();




