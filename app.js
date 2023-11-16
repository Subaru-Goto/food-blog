import { reviewData } from './data/data.js'

const popularArticles = document.querySelector('.articles')
const searchIcon = document.querySelector('.fa-magnifying-glass')

document.addEventListener('click', function(event) {
  if(event.target.dataset.like) {
    handleLikes(event.target.dataset.like)
  }
  else if (event.target.dataset.share) {
    handleShare(event.target.dataset.share)
  }
  else if (event.target.classList.contains('hamburger')) {
    const hamburgerIcon = event.target.querySelector('.hamburger')
    openHamburger(event)
  }
  else if (event.target.classList.contains('fa-magnifying-glass')) {
    searchArticles(event)
  }
})

function openHamburger(event) {
  event.target.style.color = 'tomato'
}

function searchArticles(event) {
  console.log('clicked!')
}

function handleLikes(articleId) {
  const targetArticleObj = reviewData.filter(
    (review) => review.uuid === articleId)[0]
    //[0] takes object out of an array
  if (targetArticleObj.isLiked) {
    // Remove likes if it is already liked
    targetArticleObj.likes--
  } else {
    targetArticleObj.likes++
  }
  // Update object data if it is false then to true, true then to false
  targetArticleObj.isLiked = !targetArticleObj.isLiked
  // ReinsertHTML to update
  render()
}

function handleShare(articleId) {
  const targetArticleObj = reviewData.filter(
    (review) => review.uuid === articleId)[0]
    //[0] takes object out of an array
  
  if (targetArticleObj.isShared) {
    // Remove share if it is already shared
    targetArticleObj.shares--
  } else {
    targetArticleObj.shares++
  }

  // Update object data if it is false then to true, true then to false
  targetArticleObj.isShared = !targetArticleObj.isShared
  // ReinsertHTML to update
  render()
}

function getArticleHTML() {
  let articleHtml = ''
  // Sort based on likes
  let sortedReviewData = reviewData.sort(
    (a, b) => {
      if(a.likes < b.likes) {
        return 1
      }
      else if (a.likes > b.likes) {
        return -1
      } else {
        return 0
      }
    }
  )

  sortedReviewData.forEach((review)=>{
    // Like function
    let  likeIconClass = review.isLiked && 'liked'
    // share function
    let shareIconClass = review.isShared && 'shared'

  articleHtml += `
    <div class="article-preview">
      <div class="article-preview__inner">
        <img 
          class="author__img"
          src=${review.profilePic}
          alt="author picture">
        <div class="article-preview__content">
          <p class="author__name">${review.author}</p>
          <img
            class="author__food-img"
            src=${review.foodPic}
            alt="food image from the author">
          <p class="review-txt">${review.reviewText}</p>
          <div class="article__likes">
            <span class="article__like">
              <i class="fa-solid fa-heart ${likeIconClass}"
              data-like="${review.uuid}"
              ></i>
              ${review.likes}
            </span>
            <span class="article__like">
            <i class="fa-solid fa-share ${shareIconClass}" 
              data-share="${review.uuid}"
              ></i>
              ${review.shares}
            </span>
          </div>
      </div>
      </div>
    </div>
  `  
  })
return articleHtml
}

function render(){
  popularArticles.innerHTML = getArticleHTML()
}

render()
