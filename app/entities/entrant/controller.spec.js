process.env.NODE_ENV = 'test';

const EntrantModel = require('./model').model;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');

chai.should();
chai.use(chaiHttp);

describe('Entrants', () => {
    beforeEach((done) => {
        EntrantModel.remove({}, () => {
            done();
        });
    });

    describe('/GET entrant', () => {
        it('should GET all the entrants', (done) => {
            chai.request(server)
                .get('/entrants')
                .end((_, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST entrant', () => {
        it('it should not POST an entrant without required field', (done) => {
            const entrant = { firstName: 'Albert' };
            chai.request(server)
                .post('/entrants')
                .send(entrant)
                .end((_, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.should.have.property('message');
                    done();
                });
        });
    });

});
