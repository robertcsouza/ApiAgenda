import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import authMiddleware from '../middlewares/auth';

import CadastroController from '../controllers/CadastroController';
import AgendamentoController from '../controllers/AgendamentoController';
import DisponivelController from '../controllers/DisponivelController';
import SessionController from '../controllers/SessionController';
import UsuarioController from '../controllers/UsuarioController';
import NovosClientesController from '../controllers/NovosClientesController';

const routes = new Router();

const upload = multer(uploadConfig);

routes.get('/', (req, res)=>{
  
    return res.json({ ok:true});
});

routes.post('/cadastro', upload.single('thumbnail') ,CadastroController.store);

routes.post('/login', SessionController.store );




routes.put('/usuario',authMiddleware,upload.single('thumbnail'),UsuarioController.update );

routes.get('/usuario',authMiddleware,UsuarioController.show);

routes.post('/agendar',authMiddleware ,AgendamentoController.store);

routes.post('/agendamentos',authMiddleware,AgendamentoController.show);

routes.delete('/agendamentos',authMiddleware, AgendamentoController.destroy);

routes.get('/agendamentos',authMiddleware,AgendamentoController.index);

routes.put('/admin/finalizar',authMiddleware,AgendamentoController.finalizarAgendamento);

routes.get('/admin/receita',authMiddleware,AgendamentoController.showReceita);

routes.get('/admin/novos_clientes',authMiddleware,NovosClientesController.show);

routes.get('/notificacao',authMiddleware,AgendamentoController.notificacao);

routes.delete('/notificacao',authMiddleware,AgendamentoController.destroyNotification);

routes.post('/disponivel',authMiddleware, DisponivelController.index );




export default routes;