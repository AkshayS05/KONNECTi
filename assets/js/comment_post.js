{
  let createComment = function (postId) {
    let newCommentForm = $(`#post-${postId}-comments-form`);

    // let newCommentForm = $(postId);
    newCommentForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'post',
        url: '/comments/create',
        data: newCommentForm.serialize(),
        success: function (data) {
          //   calling newCommentDom function

          let newComment = newCommentDom(data.data.comment);
          $(`#post-comments-${postId}`).prepend(newComment);
          new Noty({
            theme: 'relax',
            text: 'Comment published!',
            type: 'success',
            layout: 'topRight',
            timeout: 1500,
          }).show();
          deleteComment($(' .delete-comment-btn', newComment));
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };
  //   display comment on the screen
  //   method to create a comment in dom
  let newCommentDom = function (comment) {
    return $(`<li id="comment-${comment._id}">
    <p class="single-comment">
      <small>
        <a class="delete-comment-btn" href="/comments/destroy/${comment._id}"
          >X</a
        >
      </small>
      ${comment.content}
      <br />
      <small> ${comment.user.name} </small>
    </p>
  </li>`);
  };
  // method to delete a comment
  let deleteComment = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();
          new Noty({
            theme: 'relax',
            text: 'Comment deleted!',
            type: 'success',
            layout: 'topRight',
            timeout: 1500,
          }).show();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };
  let convertPostsToAjax = function () {
    $('.post-comments-list>ul>li').each(function () {
      let self = $(this);

      let deleteLink = $(' .delete-comment-btn', self);
      deleteComment(deleteLink);

      // get the post's id by splitting the id attribute
      let postId = self.prop('id').split('-')[1];
      createComment(postId);
    });
  };
  convertPostsToAjax();
  createComment();
}
