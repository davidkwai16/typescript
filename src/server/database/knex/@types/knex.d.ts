import { ICidade } from '../../models';
import { IPessoa } from '../../models';
import { IUsuario } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        cidade: ICidade;
        pessoa: IPessoa;
        usuario: IUsuario;
    }
}