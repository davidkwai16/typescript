import { Request,  Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
 
import { CidadesProvider } from "../../database/providers/cidades";
interface IQueryProps {
    id?: number | null;
    page?: number | null;
    limit?: number | null;
    filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().notRequired().moreThan(0),
        limit: yup.number().notRequired().moreThan(0),
        id: yup.number().integer().notRequired().default(0),
        filter: yup.string().optional(),
    })),
}));

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const getAll = async (req: Request<{},{},{},IQueryProps>, res: Response) => {
    const result = await CidadesProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '', Number(req.query.id));
    const count = await CidadesProvider.count(req.query.filter);

    console.log('idUsuario', req.headers.idUsuario);
    
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message}
        });
    } else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message}
        });
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(StatusCodes.OK).json(result);
};