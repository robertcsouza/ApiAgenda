"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

exports. default = {
    storage: _multer2.default.diskStorage({
    destination: _path2.default.resolve(__dirname,'..','uploads'),
    filename: (req,file,cb) =>{
        const ext = _path2.default.extname(file.originalname);
        const name = _path2.default.basename(file.originalname,ext);
        cb(null,`${name}-${Date.now()}${ext}`);
    },    
    })

};