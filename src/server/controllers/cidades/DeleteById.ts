import { Request,  Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

import { CidadesProvider } from "../../database/providers/cidades";
 

interface IParamProps {
    id?: number | null;
}

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'    
            }
        });
    }

    const result = await CidadesProvider.deleteById(req.params.id);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};