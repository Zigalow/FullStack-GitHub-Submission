const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body

    if (!body.title || !body.url) {
        return response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ?? 0
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { likes } = request.body

    if (likes === undefined) {
        return response.status(400).end()
    }

    const blogToBeUpdated = await Blog.findById(request.params.id)

    if (!blogToBeUpdated) {
        return response.status(404).end()
    }

    blogToBeUpdated.likes = likes

    await blogToBeUpdated.save()

    response.status(200).json(blogToBeUpdated)
})

module.exports = blogsRouter 