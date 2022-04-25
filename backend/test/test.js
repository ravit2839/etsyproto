var chai = require('chai');
var chaiHttp = require('chai-http');
const { expect } = chai
chai.use(chaiHttp);
const auth="JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InJhdml0ZWphIiwiZW1haWwiOiJoYXBwaWVlZTIwMTZAZ21haWwuY29tIiwiaWF0IjoxNjQ3ODI1NTkwfQ.z5bu7HQbY-_gkdWIQFWXTGiXU4ZWc9C9UKDuQYjQ3H4";

describe('Test group', function() {
  var host = "http://localhost:8000";
  var path = "/";

  it('Accessing Homepage different status code ', function(done) {
  chai
  .request(host)
  .get(path)
  .set('content-type', 'application/x-www-form-urlencoded')

  .send({myparam: 'test'})
  .end(function(error, response, body) {
  const result = response.statusCode
  expect(result).to.equal(400)
  done()

  });
  });
  })
