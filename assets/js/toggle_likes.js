function toggleLike(toggleBtn) {
  // here toggle btn has a whole 'a' element from toggle like class
  $(toggleBtn).click(function (event) {
    event.preventDefault();
    $.ajax({
      type: 'GET',
      //   here we are getting the url value
      url: $(toggleBtn).attr('href'),
      success: function (data) {
        // getting the initial value of likes from data attribute
        let likesCount = $(toggleBtn).attr('data-likes');
        //if deleted is true,it means user has already liked the post/comment
        if (data.deleted) {
          likesCount--;
        } else {
          likesCount++;
        }

        $(toggleBtn).attr('data-likes', likesCount);
        let newLike;
        // the below conditions will call as per the match of type
        if (data.type === 'Post') {
          if (data.deleted === true) {
            newLike = newUnLikeDomPost(likesCount, data.likeableType);
          } else {
            newLike = newLikeDomPost(likesCount, data.likeableType);
          }
        }

        if (data.type === 'Comment') {
          if (data.deleted === true) {
            newLike = newUnLikeDomComment(likesCount, data.likeableType);
          } else {
            newLike = newLikeDomComment(likesCount, data.likeableType);
          }
        }

        $(toggleBtn).html(newLike);
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  });
}

$('.toggle-like-button').each(function () {
  toggleLike($(this));
});

let newLikeDomPost = function (likesCount, post) {
  console.log(post);
  return $(`
    <a class="toggle-like-button"data-likes='${likesCount}'href="/likes/toggle/?id=${post._id}&type=Post">
    ${likesCount}Likes</a>

  `);
};

let newUnLikeDomPost = function (likesCount, post) {
  console.log('new unlike dom post');
  return $(` <a data-likes=${likesCount} class="toggle-btn" href="/likes/toggle?id=${post._id}&type=Post">
       
      </a>
        <span>${likesCount}</span>`);
};

let newLikeDomComment = function (likesCount, comment) {
  return $(` <a data-likes=${likesCount} class="toggle-btn" href="/likes/toggle?id=${comment._id}&type=Comment">
       
      </a>
        <span>${likesCount}</span>`);
};

let newUnLikeDomComment = function (likesCount, comment) {
  return $(` <a data-likes=${likesCount} class="toggle-btn" href="/likes/toggle?id=${comment._id}&type=Comments">
       
      </a>
        <span>${likesCount}</span>`);
};
