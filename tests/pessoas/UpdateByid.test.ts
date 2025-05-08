import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Pessoas - UpdatebyId', () => {
    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste' });

        cidadeId = resCidade.body;
    });

    it('Atualiza registro por id', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({ 
                cidadeId,
                email: 'ttgetall@gmail.com',
                nomeCompleto: 'ttest',
             });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({ 
                cidadeId,
                email: 'ttgetall@gmail.com',
                nomeCompleto: 'ttgetall',
            });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);

    });

    it('Tenta atualizar cidade que não existe', async () => {
        const res1 = await testServer
            .put(`/pessoas/99999`)
            .send({
                cidadeId,
                email: 'ttgetall@gmail.com',
                nomeCompleto: 'ttest',
             });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty(`error.default`)
    });
});