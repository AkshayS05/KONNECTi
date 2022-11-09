{
  let uploadAvatar = function (postId) {
    let userPic = $(`#new-avatar-${postId}`).submit(function (e) {
      e.preventDefault();
      // var formData = new FormData(this);
      // console.log(formData);
      // var data = new FormData($(`#new-avatar-${postId}`));
      // console.log(data[0]);
      $.ajax({
        type: 'post',
        url: `/users/edit/${postId}`,
        // contentType: false,
        // processData: false,
        // cache: false,
        data: userPic.serialize(),
        success: function (data) {
          // let user = data.data.userData;
          console.log(data);
          // newAvatarDom(user);
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };
  const newAvatarDom = function (user) {
    return $(`<img src="${user.avatar}" alt="${user.name}" width="100" />
    <div id="user-profile">
    <% if(locals.${user.id}==${user.id}){ %>
    <!-- If user matches then show the form -->
    
      <form
        action="/users/edit/${user.id}"
        enctype="multipart/form-data"
        method="POST"
        id="new-avatar-${user.id}"
      >
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value="${user.name}"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value="${user.email}"
          required
        />
        <input type="file" name="avatar" placeholder="Profile Picture" />
        <input type="submit" value="Submit" />
      </form>
      <%}else{%>
        <!-- otherwise only show the profile info -->
        <p>${user.name}</p>
        <p>${user.email}</p>
        
        <%}%>
        </div>
    <script src="/js/user_profile.js"></script>
    `);
  };
  let convertAvatarToAjax = function () {
    $('#user-profile>form').each(function () {
      // console.log(this);
      let self = $(this);
      // get the post's id by splitting the id attribute
      let postId = self.prop('id').split('-')[2];
      uploadAvatar(postId);
    });
  };
  convertAvatarToAjax();
  uploadAvatar();
}
