{
  // method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/posts/create-post',
        // the serialize will convert the data to the json
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $('#posts-list-container>ul').prepend(newPost);
          // defines newPost has a class delete-post-btn
          deletePost($(' .delete-post-btn', newPost));
          new Noty({
            theme: 'mint',
            text: 'Post published!',
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
  //   method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<li class="single-post" id="post-${post._id}">
      <div class="main-post">
        <p class="main-post-content">
       
        ${post.content}
          <br />
          <small class="main-post-username"> ${post.user.name} </small>
          </p>
          <small>
            <a class="delete-post-btn" href="/posts/destroy/${post._id}">X</a>
          </small>
      </div>
      <div class="post-comments">
       
        <form action="/comments/create" method="POST" class="under-post-comment">
          <input
            type="text"
            name="content"
            placeholder="Type Here to add comment..."
            required
          />
          <input type="hidden" name="post" value="${post._id}" />
          <input type="submit" value="Add Comment" />
        </form>
    
      
    
        <div class="post-comments-list">
          <ul id="post-comments-${post._id}">
           
          </ul>
        </div>
      </div>
    </li>
    `);
  };
  // method to delete a post
  // a tag will be passed to it, thus named deleteLink
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'get',
        // in order to read href link value, we use prop
        url: $(deleteLink).prop('href'),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: 'nest',
            text: 'Post Deleted!',
            type: 'success',
            layout: 'topRight',
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
  let convertPostsToAjax = function () {
    $('#posts-list-container>ul>li').each(function () {
      let self = $(this);
      let deleteButton = $(' .delete-post-btn', self);
      deletePost(deleteButton);
    });
  };

  convertPostsToAjax();
  createPost();
}
