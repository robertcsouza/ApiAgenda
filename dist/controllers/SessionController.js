"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _auth = require('../config/auth'); var _auth2 = _interopRequireDefault(_auth);

class SessionController{

    async store(req,res){

        const {email, senha} = req.body;

        const user = await _User2.default.findOne({email,senha});
        
        if(!user){
           
            return res.status(401).json({error:"falha ao fazer login"});
         
        }

        const {_id,nome} = user;
        
        return res.json({
            user:{
                _id,
                nome,
                email
            },
            token: _jsonwebtoken2.default.sign({_id},_auth2.default.secret,{
                expiresIn:_auth2.default.expiresIn
            })
        });

    }


}

exports. default = new SessionController();