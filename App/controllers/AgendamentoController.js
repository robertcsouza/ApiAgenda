import app from '../src/app';
import User from '../models/User';
import Agendamento from '../models/Agendamento';
import Notificacao from '../models/Notificacao';
import Count from '../models/Count';


class AgendamentoController {

   // data tipo horario user_id

    async index(req,res){
        
        const search = req.body;

        let agendamentos = await Agendamento.find(search);
        
        return res.json({agendamentos});
           }


    async show(req,res){
       
        const search = req.body;

        let agendamentos = await Agendamento.find(search);
        
        return res.json({agendamentos});
 
    }

    async notificacao(req,res){

        let notificacoes = await Notificacao.find();
  
        return res.json({notificacoes});

    }

     async destroyNotification(req,res){
       await Notificacao.remove({});
        return res.json({ok: "Notificacoes deletada"});

     }

    async store(req,res){
        
        const { data , tipo, horario }  = req.body;
        const user_id = req.user_id;
        const user = await User.findOne({_id:user_id});
        const { nome, email, thumbnail_url } = user;
        const documents = await Agendamento.find({data,tipo,horario,user_id});
        
        
        if(documents.length < 20){
        let agendar = await Agendamento.create({data,tipo,horario,nome,email,user_id,aberto:true});
           
            await User.findOneAndUpdate({_id:user_id},{ultimo_agendamento:data},{new:false});
            
            await Notificacao.create({nome,tipo,horario,data,thumbnail_url});
            
            app.serverIO.emit('insert', agendar);
            return res.json({agendar});
        }
        
        return res.json({"error":"agendamento nao disponivel"});
        
    }


    async destroy(req,res){

        const  token_id  = req.user_id;
        const {agendamento_id} = req.headers;
        console.log(agendamento_id);
        let user = await  User.findOne({ _id:token_id});
        const { nome, thumbnail_url } = user;
        let agendamentos = await Agendamento.findOne({"_id":agendamento_id});
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

        await Agendamento.deleteOne({ _id:agendamento_id});
        await Notificacao.create({nome,tipo,horario,data,thumbnail_url});
        
        app.serverIO.emit('delete',agendamentos);

        

        return res.json({ok: "agendamento deletado"});

    }
}

export default new  AgendamentoController();