"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


const CountSchema = new (0, _mongoose.Schema)({

        count:Number,
        
        }  

);


exports. default = _mongoose.model.call(void 0, 'Count',CountSchema);