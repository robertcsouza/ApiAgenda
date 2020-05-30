"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');



const CancelamentoSchema = new (0, _mongoose.Schema)({
        data:String,
        count:Number

        }  

);


exports. default = _mongoose.model.call(void 0, 'Cancelamento',CancelamentoSchema);