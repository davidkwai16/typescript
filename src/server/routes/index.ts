import { Router } from 'express';
//import { StatusCodes } from 'http-status-codes';

import { CidadesController, PessoasController, UsuariosController } from './../controllers';


const router = Router();

router.get('/', (req , res) => {
  return res.send('olá, DEV!');
});

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);

router.get('/pessoas', PessoasController.getAllValidation, PessoasController.getAll);
router.post('/pessoas', PessoasController.createValidation, PessoasController.create);
router.get('/pessoas/:id', PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoas/:id', PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById);

router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn);
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp);

export { router };