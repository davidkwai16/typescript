import { Request, Response } from "express";

interface ICidade{
    nome: string;
}



// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const create = (req: Request<{},{},ICidade>, res: Response) => {

    const data: ICidade = req.body;

    console.log(data.nome);

    return res.send('Create!');
}