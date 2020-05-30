"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


const UserSchema = new (0, _mongoose.Schema) ({
    thumbnail:String,
    id: String,
    nome: String,
    email: String,
    senha:String,
    nascimento: String,
    ultimo_agendamento:String,
    admin:Boolean
},{
    toJSON:{
        virtuals:true
    }
});


UserSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`;
});



exports. default = _mongoose.model.call(void 0, 'User',UserSchema);