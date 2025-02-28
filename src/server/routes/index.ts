import { Router } from 'express';
//import { StatusCodes } from 'http-status-codes';

import { CidadesController } from './../controllers';


const router = Router();

router.get('/', (req , res) => {
  return res.send('olá, DEV!');
});

router.post(
    '/cidades', 
     CidadesController.createValidation, 
    CidadesController.create
);

export { router };