const request = require('supertest');
const app = require('../app')
const iconv = require('iconv-lite');

it('should register a new user', () => {
    const newUser = {
        "email": "tests@test.com",
        "password": "testtesttest"
    }

    //not entirely sure why, but without this line the api returns 415... 
    iconv.encode(newUser, 'utf8')

    return request(app)
        .post('/api/user/signup')
        .set('Content-Type', 'application/json')
        .send(newUser)
        .then(response => {
            expect(response.body.message).toBe('User created')
        })
})