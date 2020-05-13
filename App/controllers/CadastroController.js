import User from '../models/User';
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

                

                //return res.json({ok:"usuario cadastrado com sucesso"});
                return res.json(user);

                
            }

            return res.json({
                error:"email ja existe"
            })


           
    }

}

export default new CadastroController();