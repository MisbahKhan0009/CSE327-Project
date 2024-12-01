const request = require('supertest');
const express = require('express');
const db = require('../../config/db');
const feedbackRoutes = require('../../routes/touhid/feedback.routes');

jest.mock('../../config/db', () => ({
    query: jest.fn()
}));

describe('Feedback API', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/api/feedback', feedbackRoutes);

        jest.clearAllMocks();
    });

    describe('POST /api/feedback', () => {
        const validFeedbackData = {
            guest_id: 'tohid@ferdoush.com',
            description: 'Great stay!',
            date: '2024-11-27',
            rating: 5
        };

        test('should successfully submit feedback', async () => {
            db.query.mockImplementation((query, params, callback) => {
                callback(null, { insertId: 1 });
            });

            const response = await request(app)
                .post('/api/feedback')
                .send(validFeedbackData)
                .expect(201);

            expect(response.body).toEqual({ 
                message: 'Thank you for your feedback!' 
            });
        });

        test('should return 400 if required fields are missing', async () => {
            const testCases = [
                { ...validFeedbackData, guest_id: undefined },
                { ...validFeedbackData, description: undefined },
                { ...validFeedbackData, date: undefined },
                { ...validFeedbackData, rating: undefined }
            ];

            for (const testCase of testCases) {
                const response = await request(app)
                    .post('/api/feedback')
                    .send(testCase)
                    .expect(400);

                expect(response.body).toEqual({ 
                    error: 'All fields are required' 
                });
            }
        });

        test('should handle database insertion error', async () => {
            db.query.mockImplementation((query, params, callback) => {
                callback(new Error('Database insertion failed'), null);
            });

            const response = await request(app)
                .post('/api/feedback')
                .send(validFeedbackData)
                .expect(500);

            expect(response.body).toEqual({ 
                error: 'Unable to submit feedback. Please try again later.' 
            });
        });
    });

    describe('GET /api/feedback', () => {
        test('should successfully retrieve all feedback', async () => {
            const mockFeedbackData = [
                { 
                    feedback_id: 1, 
                    guest_id: 'tohid@ferdoush.com', 
                    description: 'Great stay!', 
                    date: '2024-11-27', 
                    rating: 5 
                },
                { 
                    feedback_id: 2, 
                    guest_id: 'kuddus@ali.com', 
                    description: 'Needs improvement', 
                    date: '2024-11-26', 
                    rating: 3 
                }
            ];

            db.query.mockImplementation((query, callback) => {
                callback(null, mockFeedbackData);
            });

            const response = await request(app)
                .get('/api/feedback')
                .expect(200);

            expect(response.body).toEqual(mockFeedbackData);
            expect(response.body.length).toBe(2);
        });

        test('should handle database query error', async () => {
            db.query.mockImplementation((query, callback) => {
                callback(new Error('Database connection failed'), null);
            });

            const response = await request(app)
                .get('/api/feedback')
                .expect(500);

            expect(response.body).toEqual({ error: 'Failed to fetch feedback' });
        });

        test('should return empty array when no feedback exists', async () => {
            db.query.mockImplementation((query, callback) => {
                callback(null, []);
            });

            const response = await request(app)
                .get('/api/feedback')
                .expect(200);

            expect(response.body).toEqual([]);
            expect(response.body.length).toBe(0);
        });
    });
});