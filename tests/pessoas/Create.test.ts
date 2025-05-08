import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - Create', () => {
    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste' });

        cidadeId = resCidade.body;
    });

    it('Cria registro', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidadeId,
                email: 'tt@gmail.com',
                nomeCompleto: 'tteste',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Cria registro 2', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidadeId,
                email: 'tt2@gmail.com',
                nomeCompleto: 'tteste',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Tenta criar registro com email duplicado', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidadeId,
                email: 'ttduplicado@gmail.com',
                nomeCompleto: 'tteste',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer
            .post('/pessoas')
            .send({
                cidadeId,
                email: 'ttduplicado@gmail.com',
                nomeCompleto: 'duplicado',
            });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        //expect(res2.body).toHaveProperty('errors.default');
    });

    it('Cria registro com nomeCompleto muito curto', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidadeId,
                email: 'tt@gmail.com',
                nomeCompleto: 'tt',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
    });

    it('Tenta criar registro sem nomeCompleto', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidadeId,
                email: 'tt@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
    });

    it('Tenta criar um registro sem email', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidadeId,
                nomeCompleto: 'tteste',});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Tenta criar um registro com email inválido', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidadeId,
                email: 'tt gmail.com',
                nomeCompleto: 'tteste',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Tenta criar um registro sem cidadeID', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                email: 'tt@gmail.com',
                nomeCompleto: 'tteste',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cidadeId');
    });

    it('Tenta criar um registro com cidadeID inválido', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                cidadeId: 'teste',
                email: 'tt@gmail.com',
                nomeCompleto: 'tteste',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cidadeId');
    });

    it('Tenta criar um registro sem enviar nenhuma propriedade', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({

            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
        expect(res1.body).toHaveProperty('errors.body.cidadeId');
        expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
    });

});