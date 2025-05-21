import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Cidades - UpdatebyId', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'create-cidades@gmail.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567'});
        const signInRes = await testServer.post('/entrar').send({ email, senha: '1234567'}); 

        accessToken = signInRes.body.accessToken;

    });

    it('Atualiza registro por id', async () => {
        const res1 = await testServer
            .post('/cidades')
            .set({authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Caxias do Sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Caxias'});

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);

    });

    it('Tenta atualizar registro que não existe', async () => {
        const res1 = await testServer
            .put(`/cidades/99999`)
            .set({authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Caxias' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty(`error.default`)
    });
});