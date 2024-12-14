// Function to check if the user's IP exists in the database
var userExists = true;
var userDoesNotExist = false;
var checkReturningUser;

/* If a user already exists, grab all their information */
var existingUserFirstName;
var existingUserLastName;
var existingUserEmail;

function checkUserIP() {
    // Get the user's IP address
    $.ajax({
        url: "./includes/check_user_ip.php",
        method: "GET",
        dataType: "json", // Changed from "text" to "json"
        success: function(response) {
            checkReturningUser = response.status;

            // Directly check the status without assigning to 'checkReturningUser'
            if (response.status === "userexists") {
                // User's IP exists in the database
                userExists = true;
                userDoesNotExist = false;
                
                // Access additional data like so:
                existingUserFirstName = response.data.first_name;
                existingUserLastName = response.data.last_name;
                existingUserEmail = response.data.email;

                // console.log(response.data);
            } else {
                // User's IP does not exist in the database
                userExists = false;
                userDoesNotExist = true;
            }
        },
        error: function(xhr, status, error) {
            console.log("Error checking user IP:", error);
        }
    });
    
}

// Call the function to check the user's IP when the page loads
$(document).ready(function() {
    checkUserIP();
});

/* Display the appropriate screen based on new or existing when play is clicked */
$(document).ready(function(){
    /* After intro animation, user clicks play button */
    $('.clickHeretoPlayBtn').click(function(){
        console.log(checkReturningUser);
        if(checkReturningUser == "userexists"){
            $(".pageFrame").hide(0);
            $('.landingPageView').fadeIn(500);
            $('.newUserInstance').fadeIn(500);
            $('.toggleNewOrExistingThumb').attr("src", "./images/welcomeBackText.svg");

            setTimeout(() => {
                $('.newUserInstance').fadeOut(500);
            }, 2000);
        } else{
            $(".pageFrame").hide(0);
            $('.newUserDataFormIntake').fadeIn(500);
        }

        /* 
            This script will check if the user already played today.
            If they did, it will present a play again tomorrow screen 
            otherwise it will allow them to play as normal
        */
            $.ajax({
                url: 'includes/check_timestamp.php',
                type: 'GET',
                dataType: 'json',
                success: function(response) {
                    let message = "";
            
                    if(response.status === 'true') {
                        console.log("User has played today");
                        // message = 'Thank you for playing. <br />' + response.time_until_next_game;
                        message = 'Thank you for playing. <br />You can play again tomorrow.';

                        $('.beginGameBtn').hide();
                        $('.playButtonContainer').hide();

                        // Update the dayChecker div
                        $('.dayChecker p').html(message);
                
                        // Update the checkIfUserAlreadyPlayed div with the content of dayChecker
                        $('.checkIfUserAlreadyPlayed').html($('.dayChecker').html());
                    } else {
                        console.log("User has not played today");
                    }
                },
                error: function(xhr, status, error) {
                    console.log("An error occurred: " + status + " - " + error);
                }
            });
            
    })

    /* User is a new user and they fill the form and then click submit */
    $('.submitInfoNewUserBtn').click(function(){

    })
})