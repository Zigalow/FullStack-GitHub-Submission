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
            console.log(`Author: ${b.author} is in list`);

            aggregatedBlogsWithAuthors = aggregatedBlogsWithAuthors.map(obj =>
                obj.author === b.author
                    ? { author: obj.author, blogs: obj.blogs + 1 }
                    : obj
            )
        }
        else {
            console.log(`Adding author: ${b.author} to list`);
            aggregatedBlogsWithAuthors = aggregatedBlogsWithAuthors.concat({ author: b.author, blogs: 1 })

        }
        console.log("Status of list: ", aggregatedBlogsWithAuthors);

    })
    let authorWithMostBlogs = aggregatedBlogsWithAuthors[0];



    aggregatedBlogsWithAuthors.forEach(e => {
        if (e.blogs > authorWithMostBlogs.blogs) {
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

}