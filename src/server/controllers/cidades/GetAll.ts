import { Request,  Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
 

interface IQueryProps {
    page?: number | null;
    limit?: number | null;
    filter?: string | null;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().notRequired().moreThan(0),
        limit: yup.number().notRequired().moreThan(0),
        filter: yup.string().notRequired(),
    })),
}));




// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const getAll = async (req: Request<{},{},{},IQueryProps>, res: Response) => {

    console.log(req.query);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};