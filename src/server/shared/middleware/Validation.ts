import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TPropety = 'body' | 'header' | 'params' | 'query';

type TGetschema = <T>(schema: Schema<T>) => Schema;

type TAllSchemas = Record<TPropety, Schema>;

type TGetAllSchemas = (getSchema: TGetschema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas(schema => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {    

        try {
            schema.validateSync(req[key as TPropety], { abortEarly: false });

        } catch (err) {
            const yupError = err as ValidationError;
            const errors: Record<string, string> = {};
    
            yupError.inner.forEach(error => {
                if (error.path === undefined) return;
                errors[error.path] = error.message;
            })

            errorsResult[key]= errors;
    
            
        };
    });

    if (Object.entries(errorsResult).length === 0) {
        return next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult }); 
    }
};
