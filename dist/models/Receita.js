"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


const ReceitaSchema = new (0, _mongoose.Schema)({
        data:String,
        receita:Number

        }  

);


exports. default = _mongoose.model.call(void 0, 'Receita',ReceitaSchema);