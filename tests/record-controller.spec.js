const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('./../app');
const request = supertest(app);
const config = require('./../config');


beforeAll(async () => {
  await mongoose.connect(config.dbUrl, config.dbOptions);
});

describe('Records Controller', () => {

    it('Gets all records matching criteria', async () => {
        const res = await request.post('/records').send({
            startDate: "2016-01-26",
            endDate: "2018-02-02",
            minCount: 2700,
            maxCount: 3000
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.msg).toBe('Success');
        expect(res.body.records);
    });

    it('should get invalid startDate error', async () => {
        const res = await request.post('/records').send({
            startDate: "2016-01-35",
            endDate: "2018-02-12",
            minCount: 2700,
            maxCount: 3000
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.msg).toBe("Invalid Start Date '2016-01-35'");
    });

    it('should get invalid endDate error', async () => {
        const res = await request.post('/records').send({
            startDate: "2016-01-12",
            endDate: "2018-02-35",
            minCount: 2700,
            maxCount: 3000
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.msg).toBe("Invalid End Date '2018-02-35'");
    });

    it('should get invalid minCount error', async () => {
        const res = await request.post('/records').send({
            startDate: "2016-01-12",
            endDate: "2018-02-12",
            minCount: "2700",
            maxCount: 3000
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.msg).toBe("Min Count should be integer");
    });

    it('should get invalid maxCount error', async () => {
        const res = await request.post('/records').send({
            startDate: "2016-01-12",
            endDate: "2018-02-23",
            minCount: 2700,
            maxCount: "3000"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.msg).toBe("Max Count should be integer");
    });
});

afterAll(() => {
    mongoose.disconnect();
});
