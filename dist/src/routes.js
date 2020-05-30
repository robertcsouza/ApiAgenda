"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _upload = require('../config/upload'); var _upload2 = _interopRequireDefault(_upload);

var _auth = require('../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

var _CadastroController = require('../controllers/CadastroController'); var _CadastroController2 = _interopRequireDefault(_CadastroController);
var _AgendamentoController = require('../controllers/AgendamentoController'); var _AgendamentoController2 = _interopRequireDefault(_AgendamentoController);
var _DisponivelController = require('../controllers/DisponivelController'); var _DisponivelController2 = _interopRequireDefault(_DisponivelController);
var _SessionController = require('../controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _UsuarioController = require('../controllers/UsuarioController'); var _UsuarioController2 = _interopRequireDefault(_UsuarioController);
var _NovosClientesController = require('../controllers/NovosClientesController'); var _NovosClientesController2 = _interopRequireDefault(_NovosClientesController);

const routes = new (0, _express.Router)();

const upload = _multer2.default.call(void 0, _upload2.default);

routes.get('/', (req, res)=>{
  
    return res.json({ ok:true});
});

routes.post('/cadastro', upload.single('thumbnail') ,_CadastroController2.default.store);

routes.post('/login', _SessionController2.default.store );




routes.put('/usuario',_auth2.default,upload.single('thumbnail'),_UsuarioController2.default.update );

routes.get('/usuario',_auth2.default,_UsuarioController2.default.show);

routes.post('/agendar',_auth2.default ,_AgendamentoController2.default.store);

routes.post('/agendamentos',_auth2.default,_AgendamentoController2.default.show);

routes.delete('/agendamentos',_auth2.default, _AgendamentoController2.default.destroy);

routes.get('/agendamentos',_auth2.default,_AgendamentoController2.default.index);

routes.put('/admin/finalizar',_auth2.default,_AgendamentoController2.default.finalizarAgendamento);

routes.get('/admin/receita',_auth2.default,_AgendamentoController2.default.showReceita);

routes.get('/admin/novos_clientes',_auth2.default,_NovosClientesController2.default.show);

routes.get('/notificacao',_auth2.default,_AgendamentoController2.default.notificacao);

routes.delete('/notificacao',_auth2.default,_AgendamentoController2.default.destroyNotification);

routes.post('/disponivel',_auth2.default, _DisponivelController2.default.index );




exports. default = routes;