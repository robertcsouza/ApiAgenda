import User from '../models/User';
import NovosClientes from '../models/NovosClientes';
import moment from 'moment';
let data = new Date()
let formatData = moment(data).format('MM/YYYY');
 //id(automatico), nome,; email, senha(criptografar), data nascimento, ultimo_agendamento 
class CadastroController {

    async store(req,res){
        
        

        const { nome , email, senha, nascimento} = req.body;
        const { filename } = req.file;

            let user = await User.findOne({email});


            if(!user){
                user = await User.create({
                    thumbnail: filename,
                    nome,
                    email,
                    senha,
                    nascimento,
                    ultimo_agendamento:''
                });

                let resNovos = await NovosClientes.find({data:formatData});
                if(resNovos.length < 1){ 
                    await NovosClientes.create({ data:formatData},{ count: 0 });
                    }
                await NovosClientes.updateOne({ data:formatData},{$inc:{ count: 1 }});

                        
                    return res.json(user);

                
            }

            return res.json({
                error:"email ja existe"
            })


           
    }

}

export default new CadastroController();