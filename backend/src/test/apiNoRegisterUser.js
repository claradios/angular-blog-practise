const initApp = require('../server');
const supertest = require('supertest');

let request;

beforeAll(async () => {
    const app = await initApp();
    request = supertest(app);
});

describe('My API tests with UNREGISTERED USER', function () {

    // BLOG-POST ENDPOINTS
    test('when get all POSTS then get test posts', async (done) => {
        
        const { body } = await request.get('/posts')
            .expect('Content-type', /json/)
            .expect(200)

        expect(body[0].author).toBeTruthy();
        expect(body[0].content).toBeTruthy();
        expect(body[0]._id).toBeTruthy();
        done();
    });


    test('when create new POST then canT', async (done) => {
        var newPost = {
            title: 'Learn About Something',
            content: 'Lets learn guys. Im going to explain you how.',
            urlToImage: 'www.kittens.org'
        };

        const { body } = await request.post('/posts')
            .send(newPost)
            .expect(401)

        done();

    });
  
    //POST-comment
    test('when create new COMMENT then  canT ', async (done) => {
        const post = await request.get('/posts');
        const lastPostId = post.body[post.body.length - 1]._id;

        var newComment = {
            text: 'Learn About Something'
        };

        const { body } = await request.post('/posts/' + lastPostId + '/comments')
            .send(newComment)            
            .expect(401)

        done();
    });

    // OFFENSIVE WORDS ENDPOINTS
    test('when get all OFFENSIVEWORDS then canT get OFFENSIVEWORDS list', async (done) => {

        const { body } = await request.get('/offensivewords')            
            .expect(401)

        done();
    });

    test('when create new OFFENSIVE WORD then this OFF. W. canT be created', async (done) => {

        var newOffensiveWord = {
            word: 'testing',
            level: 2
        };

        const { body } = await request.post('/offensivewords')
            .send(newOffensiveWord)           
            .expect(401)


        done();

    });

    test('non registered user CANNOT SIGN UP with an existent USER', async (done) => {
        const user = {
            password: 'tombola3',
            username:'Pepa Flores',
            nickname:'marsiol'
        }
        const {body} = await request.post('/signup')
        .send(user)
        .expect(400)
        done();
    });

});