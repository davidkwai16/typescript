import { Request,  Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
 

interface ICidade{
    nome: string;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        nome: yup.string().required().min(3),
    })),
}));


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const create = async (req: Request<{},{},ICidade>, res: Response) => {

    console.log(req.body);

    return res.status(StatusCodes.CREATED).json(1);
};