const dummy = (blogs) => {
  if (blogs) {
    return 1
  }
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const maxLikeBlog = blogs.reduce(function(acc, currentVal){
    // return acc.likes < currentVal.likes ? {
    //   title: currentVal.title,
    //   author: currentVal.author,
    //   likes: currentVal.likes
    // } :  {
    //   title: acc.title,
    //   author: acc.author,
    //   likes: acc.likes
    // }

    return acc.likes < currentVal.likes ? currentVal : acc
  })

  return maxLikeBlog
}

module.exports = { dummy, totalLikes, favoriteBlog }