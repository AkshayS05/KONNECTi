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
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };
  //   method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<link rel="stylesheet" href="/css/post.css" />

    <li class="single-post" id="post-${post._id}">
      <div class="main-post">
        <p class="main-post-content">
       
        ${post.content}
          <br />
          <small class="main-post-username"> ${post.user.name} </small>
          </p>
          <small>
            <a class="delete-post-btn" href="/posts/destroy/${post.id}">X</a>
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
  createPost();
}
