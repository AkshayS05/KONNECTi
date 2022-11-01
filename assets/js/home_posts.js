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
          console.log(data);
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };
  //   method to create a post in DOM
  createPost();
}
