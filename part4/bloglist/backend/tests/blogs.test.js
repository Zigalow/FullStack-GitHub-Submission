const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
]


const listWithManyBlogs = [
    { ...listWithOneBlog[0], likes: 10 },
    { ...listWithOneBlog[0], likes: 15 },
    { ...listWithOneBlog[0], likes: 20 },
    { ...listWithOneBlog[0], likes: 25 },
    { ...listWithOneBlog[0], likes: 30 },
    { ...listWithOneBlog[0], likes: 35 },
    { ...listWithOneBlog[0], likes: 40 },
    { ...listWithOneBlog[0], likes: 45 },
    { ...listWithOneBlog[0], likes: 50 }
]


test('dummy returns one', () => {
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})


describe('total likes', () => {


    test('when list has only one blog, equals the like of that', () => {

        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)

    })

    test('when total likes of blogs is 0, equals 0', () => {


        const listWithZeroLikesBlogs = [
            { ...listWithOneBlog[0], likes: 0 },
            { ...listWithOneBlog[0], likes: 0 },
            { ...listWithOneBlog[0], likes: 0 }
        ]

        const result = listHelper.totalLikes(listWithZeroLikesBlogs)
        assert.strictEqual(result, 0)

    })

    test('calculates total likes of list with many blogs correclty', () => {




        const result = listHelper.totalLikes(listWithManyBlogs)
        assert.strictEqual(result, 270)
    })

    describe('favorite blog', () => {
        test('equals blog with most likes from list with many blogs')

        const result = listHelper.favoriteBlog(blogs);
        assert.deepStrictEqual(result, blogs[2])
    })


    describe('most likes', () => {
        test('equals author and number of blogs for author with most amount of blogs from lits with many blogs')

        const result = listHelper.mostLikes(blogs);
        const expectedResult = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        assert.deepStrictEqual(result, expectedResult)
    })


})