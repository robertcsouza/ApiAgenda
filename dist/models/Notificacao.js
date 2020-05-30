"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


const NotificacaoSchema = new (0, _mongoose.Schema)({

        data:String,
        tipo:String,
        horario:String,
        nome:String,
        thumbnail_url:String,
        }  

);


exports. default = _mongoose.model.call(void 0, 'Notificacao',NotificacaoSchema);