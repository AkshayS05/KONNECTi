{
  console.log('Called');
  let uploadAvatar = function (postId) {
    $(`#new-avatar-${postId}`).submit(function (e) {
      e.preventDefault();
      var data = new FormData($(`#new-avatar-${postId}`)[0]);
      $.ajax({
        type: 'post',
        url: `/users/edit/${postId}`,
        data: data,
        success: function (res) {
          // let user = data.data.userData;
          console.log(res);
          // newAvatarDom(user);
          new Noty({
            theme: 'relax',
            text: 'Avatar published!',
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
  const newAvatarDom = function (user) {
    console.log(user.avatar);
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
