process.env.NODE_ENV = 'test';

const FacultyModel = require('./model').model;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Faculties', () => {
    const faculties = [
        {
            name: 'FCSN',
            fullName: 'Faculty of computer systems and networks',
            description: 'The best faculty of computer sciences in Belarus',
            capacity: 10,
        },
        {
            name: 'FRE',
            fullName: 'Faculty of radioengineering and electronics',
            description: '',
            capacity: 2,
        },
    ];

    const newFaculty = {
        name: 'FI',
        fullName: 'Faculty of infocommunications',
        description: '',
    };

    const credentials = {
        username: 'test',
        password: 'test',
    };

    let token = '';

    function signin() {
        return chai
            .request(server)
            .post('/user/signin/')
            .send(credentials)
            .then(res => {
                token = res.body.token;
            });
    }

    before(async () => {
        await signin();
    });

    beforeEach(async () => {
        await FacultyModel.remove({});
        await FacultyModel.create(faculties);
    });

    afterEach(async () => {
        await FacultyModel.remove({});
    });

    function addNewValidFaculty() {
        return FacultyModel.create(newFaculty);
    }

    describe('/GET faculty', () => {
        it('should GET all the faculties', () =>
            chai.request(server)
                .get('/faculty')
                .then(res => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(faculties.length);
                })
                .catch(err => { throw err; })
        );
    });

    describe('/GET:id faculty', () => {
        it('should GET a faculty with given id', async () => {
            const faculty = await addNewValidFaculty();
            return chai
                .request(server)
                .get(`/faculty/${faculty._id}`)
                .then(res => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('name', newFaculty.name);
                    res.body.should.have.property('fullName', newFaculty.fullName);
                })
                .catch(err => { throw err; });
        });
    });

    describe('/POST faculty', () => {
        it('should not POST a faculty without required field', () => {
            const faculty = { name: 'FI' };
            return chai
                .request(server)
                .post('/faculty')
                .set('Authorization', token)
                .send(faculty)
                .catch(err => err.response)
                .then(res => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.should.have.property('message');
                });
        });

        it('should POST a faculty', async () => {
            const faculty = await addNewValidFaculty();
            return chai.request(server)
                .post('/faculty')
                .set('Authorization', token)
                .send(faculty)
                .then(res => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name', faculty.name);
                    res.body.should.have.property('fullName', faculty.fullName);
                })
                .catch(err => { throw err; });
        });
    });

    describe('/PUT/:id faculty', () => {
        it('should UPDATE a faculty with given id', async () => {
            const faculty = await addNewValidFaculty();
            const updatedData = {
                name: 'FTC',
                fullName: 'Faculty of telecommunication',
            };
            return chai.request(server)
                .put(`/faculty/${faculty._id}`)
                .set('Authorization', token)
                .send(updatedData)
                .then(res => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('name', updatedData.name);
                    res.body.should.have.property('fullName', updatedData.fullName);
                })
                .catch(err => { throw err; });
        });
    });

    describe('/DELETE/:id faculty', () => {
        it('should DELETE a faculty with given id', async () => {
            const faculty = await addNewValidFaculty();
            return chai.request(server)
                .delete(`/faculty/${faculty._id}`)
                .set('Authorization', token)
                .then(res => {
                    res.should.have.status(200);
                    return FacultyModel.findById(faculty._id).then(res => {
                        should.not.exist(res);
                    });
                })
                .catch(err => { throw err; });
        });
    });
});
