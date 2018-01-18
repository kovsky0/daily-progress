const request = require('supertest');
const app = require('../app')
const iconv = require('iconv-lite');

const User = require('../models/User.js')
const newUser = {
    "email": "tests@test.com",
    "password": "testtesttest"
}

afterAll(() => {
    User.remove({ email: newUser.email })
        .exec()
        .then()
        .catch(err => {
            console.log(err)
        })
})

it('should register a new user', () => {
    return request(app)
        .post('/api/user/signup')
        .set('Content-Type', 'application/json')
        .send(newUser)
        .then(response => {
            expect(response.body.message).toBe('User created')
        })
})

it('should be able to find newly created user in the database', () => {
    return User.find({ email: newUser.email })
        .exec()
        .then(result => {
            expect(result.length).toBeGreaterThan(0)
        })
})

it.skip('displays all users in db', () => {
    User.find()
        .exec()
        .then(result => {
            console.log(result)
        })
})


it('should be able to login using newly created user\'s credentials', () => {
    return request(app)
        .post('/api/user/signin')
        .set('Content-Type', 'application/json')
        .send(newUser)
        .then(response => {
            expect(response.body.message).toBe('Authentication successful')
            expect(response.body.token).toBeDefined()
        })
})