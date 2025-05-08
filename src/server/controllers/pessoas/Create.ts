import { Request,  Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";
 

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email(),
        cidadeId: yup.number().integer().required(),
        nomeCompleto: yup.string().required().min(3),
    })),
}));


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const create = async (req: Request<{},{},IBodyProps>, res: Response) => {
    const result = await PessoasProvider.create(req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};