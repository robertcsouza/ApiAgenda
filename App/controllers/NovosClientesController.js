import User from '../models/User';
import NovosClientes from '../models/NovosClientes';

 //id(automatico), nome,; email, senha(criptografar), data nascimento, ultimo_agendamento 
class CadastroController {

    async show(req,res){
        const  token_id  = req.user_id;
        let user = await  User.findOne({ _id:token_id});
        const { admin } = user;   
        
        if( ! admin === true ){
            return res.status(401).json({error: "nao foi possivel altenticar o token"});
        }

        let novos = await NovosClientes.find();

        return res.json(novos);
    }

}

export default new CadastroController();