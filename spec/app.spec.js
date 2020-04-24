var Request = require('request')

describe('Server', () => {
  var server
  beforeAll(() => {
    server = require('../server')
  })
  afterAll(() => {
    server.close()
  })

  describe('GET /', () => {
    var data = {}
    beforeAll((done) => {
      Request.get('http://localhost:5000/', (error, response, body) => {
        data.status = response.statusCode
        data.body = body
        done()
      })
    })
    it('Status 200', () => {
      expect(data.status).toBe(200)
    })
    it('Body', () => {
      expect(data.body).toBe('API RUNNING')
    })
  })

  describe('POST /', function () {
    it('if username and password match, response status = 200', function (done) {
      Request.post(
        'http://localhost:5000/api/auth',
        {
          json: true,
          body: { email: 'thuyxuan.nguyen81@gmail.com', password: '123456' },
        },
        function (error, response) {
          expect(response.statusCode).toEqual(200)
          done()
        }
      )
    })
    it('if username and password does not match, response status = 400', function (done) {
      Request.post(
        'http://localhost:5000/api/auth',
        { json: true, body: {} },
        function (error, response) {
          expect(response.statusCode).toEqual(400)
          done()
        }
      )
    })
    /*it('if username and password does not match, response status = 400', function (done) {
            Request.post("http://localhost:5000/api/auth", {json: true, body: {email: "thuyxuan.nguyen81@gmail.com",
            password: "11111"}}, function (error, response) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });*/

    it('if user successfully registered, response status = 200', function (done) {
      Request.post(
        'http://localhost:5000/api/users',
        {
          json: true,
          body: { email: 'thuyxuan.nguyen@gmail.com', password: '123456' },
        },
        function (error, response) {
          expect(response.statusCode).toEqual(200)
          done()
        }
      )
    })
    it('if user unsuccessfully registered, response status = 400', function (done) {
      Request.post(
        'http://localhost:5000/api/users',
        {
          json: true,
          body: { email: 'thuyxuan.nguyen@gmail.com', password: '123456' },
        },
        function (error, response) {
          expect(response.statusCode).toEqual(400)
          done()
        }
      )
    })
    /*it('if user unsuccessfully registered, response status = 400', function (done) {
            Request.post("http://localhost:5000/api/users", {json: true, body: {email: "thuyxuan.nguyen@gmail.com",
            password: "123456"}}, function (error, response) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });*/
  })
})
