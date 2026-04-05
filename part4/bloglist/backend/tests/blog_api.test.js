const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


test('correct amount of notes are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs has id as an unique identifier', async () => {
    const blogs = await helper.blogsInDb()

    const ids = blogs.map(b => b.id)

    assert(!ids.some(i => i === undefined))
})

test('a valid blog can be added and correctly created in database', async () => {

    const newBlog = {
        title: "This is how I created a new note in test!!!",
        author: "Zig Zag",
        url: "https://createdNoteInTest.fakecom/",
        likes: 9000,
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert.deepEqual(newBlog.title, response.body.title)
    assert.deepEqual(newBlog.author, response.body.author)
    assert.deepEqual(newBlog.url, response.body.url)
    assert.deepEqual(newBlog.likes, response.body.likes)
})

test('when adding a blog without a \'likes\' property, the value of will default to 0', async () => {

    const newBlog = {
        title: "This is how I created a new note in test with no LIKES!!!!!",
        author: "Zig Zag",
        url: "https://createdNoteInTest.fakecom/",
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    console.log('response',)


    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert.deepEqual(newBlog.title, response.body.title)
    assert.deepEqual(newBlog.author, response.body.author)
    assert.deepEqual(newBlog.url, response.body.url)
    assert.deepEqual(0, response.body.likes)
})


test('when adding a blog without a \'title\' property, server responds with 400', async () => {

    const newBlog = {
        author: "Zig Zag",
        url: "https://createdNoteInTest.fakecom/",
        likes: 9000
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)


    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('when adding a blog without a \'url\' property, server responds with 400', async () => {

    const newBlog = {
        title: "This won't get created hehe",
        author: "Zig Zag",
        likes: 9000
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)


    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})


test('deletion of a blog succeeds with status code 204 if id is valid', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToBeDeleted = blogsAtStart[0]


    await api.delete(`/api/blogs/${blogToBeDeleted.id}/`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()


    const ids = blogsAtEnd.map(b => b.id)

    assert(!ids.includes(blogToBeDeleted.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})


after(async () => [
    await mongoose.connection.close()
])