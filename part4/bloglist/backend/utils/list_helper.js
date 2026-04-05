const dummy = (blogs) => {

    return 1;
}

const totalLikes = (blogs) => {


    let totalLikes = 0;


    blogs.forEach(b => {
        totalLikes = totalLikes + b.likes
    });

    return totalLikes;
}

const favoriteBlog = (blogs) => {
    let favoriteBlog = blogs[0];


    blogs.forEach(b => {
        if (b.likes > favoriteBlog.likes) {
            favoriteBlog = b
        }
    })

    return favoriteBlog;
}

const mostBlogs = (blogs) => {

    let aggregatedBlogsWithAuthors = [];


    blogs.forEach(b => {
        if (aggregatedBlogsWithAuthors.some(obj => obj.author === b.author)) {

            aggregatedBlogsWithAuthors = aggregatedBlogsWithAuthors.map(obj =>
                obj.author === b.author
                    ? { author: obj.author, blogs: obj.blogs + 1 }
                    : obj
            )
        }
        else {
            aggregatedBlogsWithAuthors = aggregatedBlogsWithAuthors.concat({ author: b.author, blogs: 1 })
        }

    })
    let authorWithMostBlogs = aggregatedBlogsWithAuthors[0];



    naggregatedBlogsWithAuthors.forEach(e => {
        if (e.blogs > authorWithMostBlogs.blogs) {
            authorWithMostBlogs = e;
        }
    });


    return authorWithMostBlogs;
}


const mostLikes = (blogs) => {

    let aggregatedBlogsWithAuthors = [];


    blogs.forEach(b => {
        if (aggregatedBlogsWithAuthors.some(obj => obj.author === b.author)) {
            aggregatedBlogsWithAuthors = aggregatedBlogsWithAuthors.map(obj =>
                obj.author === b.author
                    ? { author: obj.author, likes: obj.likes + b.likes }
                    : obj
            )
        }
        else {
            aggregatedBlogsWithAuthors = aggregatedBlogsWithAuthors.concat({ author: b.author, likes: b.likes })
        }
    })
    let authorWithMostBlogs = aggregatedBlogsWithAuthors[0];


    aggregatedBlogsWithAuthors.forEach(e => {
        if (e.likes > authorWithMostBlogs.likes) {
            authorWithMostBlogs = e;
        }
    });


    return authorWithMostBlogs;
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,

}