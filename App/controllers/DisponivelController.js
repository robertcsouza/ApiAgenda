import Agendamento from '../models/Agendamento';

class DisponivelController{

    async index(req,res){

            const { data , tipo, horario, user_id }  = req.body;
            
            const documents = await Agendamento.find({data,tipo,horario});
    
            if(documents.length < 20){

                return res.json({disponivel:true});
            
            }

                return res.json({disponivel:false});
            
        }
    }
    

    export default new DisponivelController();




