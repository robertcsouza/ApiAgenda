"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('../src/app'); var _app2 = _interopRequireDefault(_app);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Agendamento = require('../models/Agendamento'); var _Agendamento2 = _interopRequireDefault(_Agendamento);
var _Notificacao = require('../models/Notificacao'); var _Notificacao2 = _interopRequireDefault(_Notificacao);
var _Receita = require('../models/Receita'); var _Receita2 = _interopRequireDefault(_Receita);
var _moment = require('moment'); var _moment2 = _interopRequireDefault(_moment);

class AgendamentoController {

   // data tipo horario user_id

    async index(req,res){
        
        const search = req.body;

        let agendamentos = await _Agendamento2.default.find(search);
        
        return res.json({agendamentos});
           }


    async show(req,res){
       
        const search = req.body;

        let agendamentos = await _Agendamento2.default.find(search);
        
        return res.json({agendamentos});
 
    }

    async notificacao(req,res){

        let notificacoes = await _Notificacao2.default.find();
  
        return res.json({notificacoes});

    }

     async destroyNotification(req,res){
       await _Notificacao2.default.remove({});
        return res.json({ok: "Notificacoes deletada"});

     }

    async finalizarAgendamento(req,res){

        const  token_id  = req.user_id;
        const {agendamento_id} = req.headers;
        
        let data = new Date()
        let formatData = _moment2.default.call(void 0, data).format('MM/YYYY');
        let user = await  _User2.default.findOne({ _id:token_id});
        let agendamentos = await _Agendamento2.default.findOne({"_id":agendamento_id});

        if(agendamentos === null){
            return res.status(401).json({error: "agendamento nao encontrado"});
        }

        if(agendamentos.length < 1){
            return res.status(401).json({error: "agendamento nao encontrado"});
        }
            const { admin } = user;
            

        if( ! admin === true ){
            return res.status(401).json({error: "nao foi possivel altenticar o token"});
        }

        await _Agendamento2.default.updateOne({ _id:agendamento_id},{aberto:false});
        let resReceita = await _Receita2.default.find({data:formatData});
        
        if(resReceita.length < 1){ 
            await _Receita2.default.create({ data:formatData},{ receita: 0 });
         }
        await _Receita2.default.updateOne({ data:formatData},{$inc:{ receita: 50 }});

       
        


        return res.json({ok:true});

    }

    async showReceita(req,res){
        let receita = await _Receita2.default.find();
  
        return res.json({receita});
    }
    async store(req,res){
        
        const { data , tipo, horario }  = req.body;
        const user_id = req.user_id;
        const user = await _User2.default.findOne({_id:user_id});
        const { nome, email, thumbnail_url } = user;
        const documents = await _Agendamento2.default.find({data,tipo,horario,user_id});
        
        
        if(documents.length < 20){
        let agendar = await _Agendamento2.default.create({thumbnail_url,data,tipo,horario,nome,email,user_id,aberto:true});
           
            await _User2.default.findOneAndUpdate({_id:user_id},{ultimo_agendamento:data},{new:false});
            
            await _Notificacao2.default.create({nome,tipo,horario,data,thumbnail_url});
            
            _app2.default.serverIO.emit('insert', agendar);
            _app2.default.serverIO.emit('notificacao', 'nova notificacao');
            return res.json({agendar});
        }
        
        return res.json({"error":"agendamento nao disponivel"});
        
    }


    async destroy(req,res){

        const  token_id  = req.user_id;
        const {agendamento_id} = req.headers;
        console.log(agendamento_id);
        let user = await  _User2.default.findOne({ _id:token_id});
        const { nome, thumbnail_url } = user;
        let agendamentos = await _Agendamento2.default.findOne({"_id":agendamento_id});
        const { data , tipo, horario } = agendamentos;
       
        if(agendamentos === null){
            return res.status(401).json({error: "agendamento nao encontrado"});
        }

        if(agendamentos.length < 1){
            return res.status(401).json({error: "agendamento nao encontrado"});
        }
         const {user_id} = agendamentos;
            const { admin } = user;
            

        if( ! (user_id === token_id || admin === true) ){
            return res.status(401).json({error: "nao foi possivel altenticar o token"});
        }

        await _Agendamento2.default.deleteOne({ _id:agendamento_id});
        await _Notificacao2.default.create({nome,tipo,horario,data,thumbnail_url});
        
        _app2.default.serverIO.emit('delete',agendamentos);
        _app2.default.serverIO.emit('notificacao', 'nova notificacao');
        

        

        return res.json({ok: "agendamento deletado"});

    }
}

exports. default = new  AgendamentoController();