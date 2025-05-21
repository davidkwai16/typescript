import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - DeletebyId', () => {

    let accessToken = '';
    beforeAll(async () => {
        const email = 'create-cidades@gmail.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567'});
        const signInRes = await testServer.post('/entrar').send({ email, senha: '1234567'}); 

        accessToken = signInRes.body.accessToken;

    });

    it('Tenta apagar um registro sem token de acesso', async () => {
        const res1 = await testServer
            .post('/cidades')
            .set({authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Caxias do Sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resApagada.body).toHaveProperty('error.default');
    });

    it('Apaga registro', async () => {
        const res1 = await testServer
            .post('/cidades')
            .set({authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Caxias do Sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`)
            .set({authorization: `Bearer ${accessToken}`})
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta apagar registro que não existe', async () => {
        const res1 = await testServer
            .delete(`/cidades/99999`)
            .set({authorization: `Bearer ${accessToken}`})
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty(`error.default`);
    });
});