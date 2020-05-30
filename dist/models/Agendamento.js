"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


const AgendamentoSchema = new (0, _mongoose.Schema)({
        thumbnail_url:String,
        data:String,
        tipo:String,
        horario:String,
        nome:String,
        email:String,    
        user_id:String,
        aberto:Boolean,
        
        usuario:{
                type: _mongoose.Schema.Types.ObjectId,
                ref:'User'
        }

        }  

);


exports. default = _mongoose.model.call(void 0, 'Agendamento',AgendamentoSchema);