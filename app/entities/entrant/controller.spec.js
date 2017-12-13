process.env.NODE_ENV = 'test';

const EntrantModel = require('./model').model;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Entrants', () => {
    const entrants = [
        {
            firstName: 'Albert',
            lastName: 'Einstein',
            patronymic: '',
            sex: true,
            dateOfBirth: new Date('1879-03-14'),
        },
        {
            firstName: 'Anna',
            lastName: 'Johnson',
            patronymic: 'Ivanovna',
            sex: false,
            dateOfBirth: new Date('2002-03-02'),
        },
    ];

    const newEntrant = {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        patronymic: 'Ivanovich',
        sex: true,
        dateOfBirth: new Date('1997-05-05'),
    };

    beforeEach(async () => {
        await EntrantModel.remove({});
        await EntrantModel.create(entrants);
    });

    afterEach(async () => {
        await EntrantModel.remove({});
    });

    function addNewValidEntrant() {
        return EntrantModel.create(newEntrant);
    }

    describe('/GET entrants', () => {
        it('should GET all the entrants', () =>
            chai.request(server)
                .get('/entrants')
                .then(res => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(entrants.length);
                })
                .catch(err => { throw err; })
        );
    });

    describe('/GET:id entrants', () => {
        it('should GET an entrant with given id', async () => {
            const entrant = await addNewValidEntrant();
            return chai
                .request(server)
                .get(`/entrants/${entrant._id}`)
                .then(res => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName', newEntrant.firstName);
                    res.body.should.have.property('lastName', newEntrant.lastName);
                })
                .catch(err => { throw err; });
        });
    });

    describe('/POST entrants', () => {
        it('should not POST an entrant without required field', () => {
            const entrant = { firstName: 'Albert' };
            return chai
                .request(server)
                .post('/entrants')
                .send(entrant)
                .catch(err => err.response)
                .then(res => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.should.have.property('message');
                });
        });

        it('should POST an entrant', async () => {
            const entrant = await addNewValidEntrant();
            return chai.request(server)
                .post('/entrants')
                .send(entrant)
                .then(res => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('firstName', entrant.firstName);
                    res.body.should.have.property('lastName', entrant.lastName);
                })
                .catch(err => { throw err; });
        });
    });

    describe('/PUT/:id entrants', () => {
        it('should UPDATE an entrant with given id', async () => {
            const entrant = await addNewValidEntrant();
            const updatedData = {
                firstName: 'Anton',
                lastName: 'Antonov',
            };
            return chai.request(server)
                .put(`/entrants/${entrant._id}`)
                .send(updatedData)
                .then(res => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName', updatedData.firstName);
                    res.body.should.have.property('lastName', updatedData.lastName);
                })
                .catch(err => { throw err; });
        });
    });

    describe('/DELETE/:id entrants', () => {
        it('should DELETE an entrant with given id', async () => {
            const entrant = await addNewValidEntrant();
            return chai.request(server)
                .delete(`/entrants/${entrant._id}`)
                .then(res => {
                    res.should.have.status(200);
                    return EntrantModel.findById(entrant._id).then(res => {
                        should.not.exist(res);
                    });
                })
                .catch(err => { throw err; });
        });
    });
});
