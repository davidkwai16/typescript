import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Pessoas - UpdatebyId', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'create-pessoas@gmail.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567'});
        const signInRes = await testServer.post('/entrar').send({ email, senha: '1234567'}); 

        accessToken = signInRes.body.accessToken;

    });

    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .set({authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Teste' });

        cidadeId = resCidade.body;
    });

    it('Atualiza registro por id', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${accessToken}`})
            .send({ 
                cidadeId,
                email: 'ttgetall@gmail.com',
                nomeCompleto: 'ttest',
             });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .set({authorization: `Bearer ${accessToken}`})
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
            .set({authorization: `Bearer ${accessToken}`})
            .send({
                cidadeId,
                email: 'ttgetall@gmail.com',
                nomeCompleto: 'ttest',
             });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty(`error.default`)
    });
});