// Function to get user's IP address using ipify API
function getUserIP(callback) {
  $.ajax({
      url: 'https://api.ipify.org?format=json',
      method: 'GET',
      dataType: 'json',
      success: function(response) {
          var userIP = response.ip;
          callback(userIP);
      },
      error: function(xhr, status, error) {
          console.log('Failed to get user IP:', error);
          callback(null);
      }
  });
}

// jQuery script to handle form submission
$(document).ready(function() {
  $(".submitInfoNewUserBtn").click(function(e) {
      e.preventDefault();

      // Collect form data
      var firstName = $(".newUserFirstName").val();
      var lastName = $(".newUserLastName").val();
      var email = $(".newUserEmail").val();

      // Get the user's IP address
      getUserIP(function(userIP) {
          // Send data to a PHP file for processing using AJAX
          $.ajax({
              url: "./includes/process_new_user.php",
              method: "POST",
              data: {
                  fname: firstName,
                  lname: lastName,
                  email: email,
                  user_ip: userIP
              },
              success: function(response) {
                  console.log(response); // You can show a success message or redirect the user here
                  if(response.includes("playerExistsNewIP")){
                    $(".pageFrame").hide(0);
                    $('.landingPageView').fadeIn(500);
                    $('.newUserInstance').fadeIn(500);
                    $('.toggleNewOrExistingThumb').attr("src", "./images/welcomeBackText.svg");
        
                    setTimeout(() => {
                        $('.newUserInstance').fadeOut(500);
                    }, 2000);
                  } else{
                    $(".pageFrame").hide(0);
                    $('.newUserInstance').fadeOut(500);
                    $('.landingPageView').fadeIn(500);
                    $('.toggleNewOrExistingThumb').attr("src", "./images/welcomeNewUser.svg");
                  }
              },
              error: function(xhr, status, error) {
                  console.log(xhr.responseText);
              }
          });
      });
  });
});
