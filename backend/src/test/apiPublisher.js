const initApp = require('../server');
const supertest = require('supertest');


let request;


beforeAll(async () => {
    const app = await initApp();
    request = supertest(app);

});

describe('My API tests with PUBLISHER USER', function () {

    let token = null;
    
    beforeEach((done) => {
        request
            .post('/login/')
            .auth('Carmen Sevilla', 'ovejitas')
            .end(function (err, res) {

                token = res.body.token;

                done();
            });
    });

    test('token has been generated', () => {
        expect(token).toBeTruthy();
        expect(token).not.toBeUndefined();
        expect(typeof token).toBe('string');
    });

    test('when PUBLISHER you canT access to ALL users registration info', async (done) => {
        const { body } = await request.get('/users')
            .set('Authorization', 'bearer ' + token)        
            .expect(401)
            
        done();
    });

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


    test('when create new POST then this post can be obtained', async (done) => {

        var newPost = {
            title: 'Learn About Something',
            content: 'Lets learn guys. Im going to explain you how.',
            urlToImage: 'www.kittens.org'
        };

        const { body } = await request.post('/posts')
            .send(newPost)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        const post = await request.get('/posts');
        const lastPostId = post.body[post.body.length - 1]._id

        const { body: getBody } = await request.get('/posts/' + lastPostId)
            .set("Accept", "text/plain")
            .expect('Content-type', /json/)
            .expect(200)

        expect(getBody.author).toEqual('Carmen Sevilla');
        expect(getBody.nickname).toEqual('carmencita');

        done();

    });

    test('when update a POST then is effectively updated', async (done) => {
        const post = await request.get('/posts');
        const lastPostId = post.body[post.body.length - 1]._id;
        const updatedPost = { content: 'new content', title: 'new title', urlToImage: "www.nada.com" };

        await request.put(`/posts/${lastPostId}`)
            .send(updatedPost)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        var { body } = await request.get(`/posts/${lastPostId}`)
            .expect('Content-type', /json/)
            .expect(200)

        expect(body.title).toEqual(updatedPost.title);
        expect(body.content).toEqual(updatedPost.content);
        done();

    });

    //POST-comment
    test('when create new COMMENT then this comment can be obtained', async (done) => {
        const post = await request.get('/posts');
        const lastPostId = post.body[post.body.length - 1]._id;

        var newComment = {
            text: 'Learn About Something'
        };

        const { body } = await request.post('/posts/' + lastPostId + '/comments')
            .send(newComment)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)

        expect(body._id).toBeTruthy();
        expect(body.nickname).toEqual('carmencita');
        expect(body.text).toEqual(newComment.text);

        done();
    });

      //PUT-comment
    test('when modify COMMENT of its own then this comment is updated', async (done) => {
        const post = await request.get('/posts');
        const lastPostId = post.body[post.body.length - 1]._id;
        const {body:getBody} = await request.get('/posts/'+lastPostId);
        const comments = getBody.comments;
        const lastCommentId = comments[comments.length-1]._id;
             

        var updatedComment = {
            text: 'new text'
        };

        const { body } = await request.put('/posts/' + lastPostId + '/comments/' + lastCommentId)
            .send(updatedComment)
            .set('Authorization', 'bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)
      
        expect(body.text).toEqual(updatedComment.text);

        done();
    });
  
    //DELETE-comment
    test('when delete COMMENT then cannot delete comment', async (done) => {
        const post = await request.get('/posts');
        const lastPostId = post.body[post.body.length - 1]._id;
        const {body:getBody} = await request.get('/posts/'+lastPostId);
        const comments = getBody.comments;
        const lastCommentId = comments[comments.length-1]._id;    
      

        const { body } = await request.delete('/posts/' + lastPostId + '/comments/' + lastCommentId)            
            .set('Authorization', 'bearer ' + token)
            //.expect('Content-type', /json/)
            .expect(400)

    

        done();
    });

    // OFFENSIVE WORDS ENDPOINTS
    test('when get all OFFENSIVEWORDS then canT get OFFENSIVEWORDS list', async (done) => {

        const { body } = await request.get('/offensivewords')
            .set('Authorization', 'bearer ' + token)            
            .expect(400)

        done();
    });

    test('when create new OFFENSIVE WORD then this OFF. W. canT be created', async (done) => {

        var newOffensiveWord = {
            word: 'testing',
            level: 2
        };

        const { body } = await request.post('/offensivewords')
            .send(newOffensiveWord)
            .set('Authorization', 'bearer ' + token)           
            .expect(400)

        
        done();

    });
   

});