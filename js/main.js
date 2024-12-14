$(document).ready(function() {
    $('.introClickToPlayFrame, .newUserDataFormIntake, .pageFrame').addClass("closePrograms");

    var currentDate = new Date();
    var targetDate = new Date(currentDate.getFullYear(), 2, 29); // March 29th of the current year. Months are 0-indexed.
    $('.contestHomepageClosed').show();

});


$(document).ready(function() {
    $(document).dblclick(function(e){
        e.preventDefault();
    });
});

$(document).ready(function() {
    // Assuming the duration of the GIF is 5000 milliseconds (5 seconds)
    const gifDuration = 7000;
  
    setTimeout(function() {
        $('.clickHeretoPlayBtn').slideDown(400, function() {
            
            // Calculate the position of the button relative to the top of the document
            var buttonPosition = $('.clickHeretoPlayBtn').offset().top;
            
            // Calculate the height of the viewport
            var windowHeight = $(window).height();
            
            // Calculate the desired scroll position to center the button on the screen
            var scrollPosition = buttonPosition - (windowHeight / 2);
            
            // Scroll the page smoothly to the desired position
            $('html, body').animate({
                scrollTop: scrollPosition
            }, 800); // You can adjust the duration (800 milliseconds) for a slower or faster scroll
        });
    }, gifDuration);
  });
  

  
  
  

$(document).ready(function() {
    var currentPageIndex = 0; // Index of the currently visible page

    // Show the first page frame by default
    $(".pageFrame").hide();
    $(".pageFrame").eq(currentPageIndex).show();

    // Handle the "Next" button click
    $("#nextButton").on("click", function() {
      $(".pageFrame").eq(currentPageIndex).hide();
      currentPageIndex++;
      if (currentPageIndex >= $(".pageFrame").length) {
        // If there's no next page, go to the first page
        currentPageIndex = 0;
      }
      $(".pageFrame").eq(currentPageIndex).show();
    });

    // Handle the "Previous" button click
    $("#prevButton").on("click", function() {
      $(".pageFrame").eq(currentPageIndex).hide();
      currentPageIndex--;
      if (currentPageIndex < 0) {
        // If there's no previous page, go to the last page
        currentPageIndex = $(".pageFrame").length - 1;
      }
      $(".pageFrame").eq(currentPageIndex).show();
    });

    // Handle the "Toggle All Pages" button click
    $("#toggleAllButton").on("click", function() {
      $(".pageFrame").toggle(); // Toggles the visibility of all page frames
    });
  });


  /* Scripts to toggle menu buttons */
  $(document).ready(function(){
    $("#mainMenuDropDownOptionPrizes").click(function(){
        $("#myDropdown").toggle();
    });
    $("#mainMenuDropDownOptionHow").click(function(){
        if ($('#howToPlayDropdown').is(':visible')) {
            $('#howToPlayDropdown').hide().css('display', '');
        } else {
            $('#howToPlayDropdown').show().css('display', 'flex');
        }
    });
    $("#mainMenuDropDownOptionFAQ").click(function(){
        $("#FAQDropdown").toggle();
    });
});

$('.gameCompleteBtn').click(function(){
    $('#overlay').hide();
})

/* This code distributes prizing based on whether person won or lost */
function distributePrize(){
    $(".pageFrame").hide();
    // $('.ComebackTomorrowMsg').fadeIn(500);
    selectedPrizeName = "entryTicketToParis";

    // console.log("User has won the game.");
    $(".pageFrame").hide();
    $('.prizePage').fadeIn(500);
    // $('.ComebackTomorrowMsg').fadeIn(500);

    /* Submit users data into the players table no matter the prize won  */
    var firstName;
    var lastName;
    var email;
    var points;
    var guesses;
    var gameDuration;
    var visits;
    var totalGames;

    points = userPoints;
    guesses = totalGuesses;
    gameDuration = totalGameTime;
    visits = 1 + 1;
    totalGames = 1 + 1;

    /* Check if user exists */
    if($(".newUserFirstName").val() != ''){
        console.log("This is a brand new user.");
        firstName = $('.newUserFirstName').val();
        lastName = $('.newUserLastName').val();
        email = $('.newUserEmail').val();
    } else{
        /* User already exists and logs in */
        console.log("This is a returning user.");

        firstName = existingUserFirstName;
        lastName = existingUserLastName;
        email = existingUserEmail;
    }

    // Send data to the PHP file for processing using AJAX
    $.ajax({
        url: "./includes/update_players_data.php",
        method: "POST",
        data: {
        firstName: firstName,
        lastName: lastName,
        points: points,
        guesses: guesses,
        gameDuration: gameDuration,
        visits: visits,
        totalGames: totalGames,
        gameStatus: gameStatus,
        email: email
        },
        success: function(response) {
        console.log(response); // You can handle the response as needed
        // Optionally, you can show a success message or redirect the user here
        },
        error: function(xhr, status, error) {
        console.log(xhr.responseText);
        console.log(error.responseText);
        console.log(error);
        }
    });

    /*
        We need to listen for when the video ends.
        If the prize is a entry ticket, do not show the shipping form.

        Entry Ticket = Thanks for playing
        All other prizes = Display prize that user has won
    */

    // Show prize that user has won
    if(selectedPrizeName == "onlineOrder"){ // $5 off online orders
        console.log("onlineorderwin");

        /* Hide Video Animation for code prizes */
        $('.nonMajorPrize').hide();
        $('.instantPrizeWinText').text("$5 OFF ONLINE ORDERS (Use on balzacs.com)");

        // Use AJAX to retrieve and process the code name
        setTimeout(() => {
            $.ajax({
                url: './includes/getOnlineCode.php',
                type: 'GET',
                dataType: 'json',
                success: function(response) {
                    if (response.status === 'success') {
                        var selectedCode = response.codeName;
                        // Show prize that user has won
                        $('.codeForOnlineRedemption').text(selectedCode);
    
                        $.ajax({
                            url: './mail/prizeEmail.php', // The URL of the PHP script you want to call
                            type: 'POST', // HTTP method
                            data: {
                                prize: selectedPrizeName,
                                code: selectedCode, // Changed 'code' to 'selectedCode'
                                cEmail: email
                              },
                            success: function(response) {
                                var data = JSON.parse(response);
                                // console.log(`Code SELECTED: ${selectedCode}`);
    
                                if (data.status === 'success') {
                                //   console.log("Prize sent:", data.message);
                                } else {
                                //   console.log("Error:", data.message);
                                }
                              },
                              error: function(err) {
                                console.log("Error:", err);
                              }
                        });
    
                    } else if (response.status === 'no_entries') {
                        console.log('No codes with "uses" greater than or equal to 1 found.');
                        // Update selectedPrizeName to "entryTicketToParis" here if needed
                    } else {
                        console.log('Error updating code:', response.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.log('AJAX Error:', error);
                }
            });
        }, 10000);
    } 
    
    else if(selectedPrizeName == "giftCard"){
        console.log("giftcardwin");
        /* Hide Video Animation for code prizes */
        $('.nonMajorPrize').hide();
        $('.instantPrizeWinText').text("$5 GIFT CARD (Go to account from the top right corner, go down to promo code and enter it there.)");

        // Use AJAX to retrieve and process the code name
        setTimeout(() => {
            $.ajax({
                url: './includes/getGiftCardCode.php',
                type: 'GET',
                dataType: 'json',
                success: function(response) {
                    if (response.status === 'success') {
                        var selectedCode = response.codeName;
                        // Show prize that user has won
                        $('.codeForOnlineRedemption').text(selectedCode);
    
                        $.ajax({
                            url: './mail/prizeEmail.php', // The URL of the PHP script you want to call
                            type: 'POST', // HTTP method
                            data: {
                            prize: selectedPrizeName,
                            code: selectedCode,
                            cEmail: email // The email you want to pass
                            },
                            success: function(response) {
                                var data = JSON.parse(response);
                                if (data.status === 'success') {
                                //   console.log("Prize sent:", data.message);
                                } else {
                                //   console.log("Error:", data.message);
                                }
                              },
                              error: function(err) {
                                console.log("Error:", err);
                              }
                        });
                    } else if (response.status === 'no_entries') {
                        console.log('No codes with "uses" greater than or equal to 1 found.');
                        // Update selectedPrizeName to "entryTicketToParis" here if needed
                    } else {
                        console.log('Error updating code:', response.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.log('AJAX Error:', error);
                }
            });
        }, 10000);
    }

    else{
        $('.majorPrizeWinContainer').hide();

        setTimeout(() => {
            $.ajax({
                url: './mail/prizeEmail.php', // The URL of the PHP script you want to call
                type: 'POST', // HTTP method
                data: {
                    prize: selectedPrizeName,
                    cEmail: email
                  },
                success: function(response) {
                    var data = JSON.parse(response);
    
                    if (data.status === 'success') {
                    //   console.log("Prize sent:", data.message);
                    } else {
                    //   console.log("Error:", data.message);
                    }
                  },
                  error: function(err) {
                    console.log("Error:", err);
                  }
            });
        }, 10000);
    }
}

/* User won and clicked Next on result screen */
$('.gameWinnerCompleteBtn').click(function(){
    // selectedPrizeName = "entryTicketToParis"; remove when wanting to revert
    selectedPrizeName = "entryTicketToParis";
    distributePrize();
})

/* User lost and clicked Next on result screen */
$('.gameLoserCompleteBtn').click(function(){
    console.log("User has lost the game.");
    selectedPrizeName = "entryTicketToParis";
    distributePrize();

    // $(".pageFrame").hide();
    // $('.ComebackTomorrowMsg').fadeIn(500);
})

/* User fills out Personal Information and clicks submit */
$(".submitDrawUserInfo").click(function(e) {
    e.preventDefault();

    // Get the form data
    var firstName = $(".sendUserPrizeFormInfoFirstName").val();
    var lastName = $(".sendUserPrizeFormInfoLastName").val();
    var email = $(".sendUserPrizeFormInfoEmail").val();
    var points = userPoints;
    var guesses = totalGuesses;
    var gameDuration = totalGameTime;
    var visits = 1 + 1;
    var totalGames = 1 + 1;

    // Send data to the PHP file for processing using AJAX
    $.ajax({
      url: "./includes/update_players_data.php",
      method: "POST",
      data: {
        firstName: firstName,
        lastName: lastName,
        points: points,
        guesses: guesses,
        gameDuration: gameDuration,
        visits: visits,
        totalGames: totalGames,
        gameStatus: gameStatus,
        email: email
      },
      success: function(response) {
        console.log(response); // You can handle the response as needed
        // Optionally, you can show a success message or redirect the user here
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
        console.log(error.responseText);
        console.log(error);
      }
    });

    /* 
        We need to submit data for our 3PL system to automatically track.
    */
    
  });

  /* User clicks on prize video */
  $(document).ready(function () {
    var video = $(".animationPrizeVideo")[0];
    var isLooping = true;

    // Function to loop through the first 2 seconds of the video
    function loopVideo() {
        if (isLooping && video.currentTime >= 0.17) {
            video.currentTime = 0;
        }
    }

    // Start looping through the first 2 seconds when the page loads
    video.play();
    video.playbackRate = 0.6; // Set the playback rate to 0.5x (half speed)

    // Listen for the "timeupdate" event and control the looping behavior
    $(video).on("timeupdate", function () {
        loopVideo();
    });

    // Listen for the "click" event and play the whole video
    var isLooping = false;

    $(".video-container").on("click", function () {
        isLooping = false;
        video.play();
        video.playbackRate = 1.0; // Reset the playback rate to 1.0x (normal speed)

        /* Play Prize Sound Animation Sequence */
        var prizeAudio = document.getElementById("prize-audio");
        prizeAudio.play();
    });

    $(".video-container").on("click", function () {
        $('#arrowAnimation').hide().css('display', 'none');
    });
    
    // Listen for the "ended" event and log to the console
    $(video).on("ended", function () {
        $(".pageFrame").hide();

        if(selectedPrizeName !== 'entryTicketToParis'
        && selectedPrizeName !== 'onlineOrder'
        && selectedPrizeName !== 'giftCard' 
        ){
            $('.enterPrizeDrawForm').fadeIn(500);
        } else{
            $('.ComebackTomorrowMsg').fadeIn(500);
        }

        // $('.enterPrizeDrawForm').fadeIn(500); // THIS IS FOR PHYSICAL PRIZE WINS
    });
});


$(".gamePage").click(function(){
    // Open modal on page load
    $(".gameHintPopup").show();

});

    // Close modal on button click
    $(".gameHintCloseBtn").click(function(){
        $(".gameHintPopup").hide();
    });


$(document).ready(function() {
    // This code executes when the document is ready

    if ($('.LandingPageContent').length > 0) {
        // Trigger a click on the #mainMenuDropDownOptionHow element
        $('#mainMenuDropDownOptionHow').click();
    }
});


$(document).ready(function () {
    var introVideoSequence = $(".introAnimationSequence")[0];
    $(introVideoSequence).on("ended", function () {
        $('.clickHeretoPlayBtn').slideDown(400, function() {
            // Calculate the position of the button relative to the top of the document
            var buttonPosition = $('.clickHeretoPlayBtn').offset().top;
            
            // Calculate the height of the viewport
            var windowHeight = $(window).height();
            
            // Calculate the desired scroll position to center the button on the screen
            var scrollPosition = buttonPosition - (windowHeight / 2);
            
            // Scroll the page smoothly to the desired position
            $('html, body').animate({
                scrollTop: scrollPosition
            }, 800); // You can adjust the duration (800 milliseconds) for a slower or faster scroll
        });
    });
});



/* User clicks play now */
$('.beginGameBtn').click(function(){
    $(".pageFrame").hide();
    $('.gamePage').fadeIn(500);
})




/* Linking of all navigation menu list */
$('.faqMenuBtn').click(function(){
    $(".pageFrame").hide();
    $('.faqPageFrame').fadeIn(500);
})
$('.termsMenuBtn').click(function(){
    $(".pageFrame").hide();
    $('.termsPageFrame').fadeIn(500);
})
// $('.privacyMenuBtn').click(function(){
//     $(".pageFrame").hide();
//     $('.termsPageFrame').fadeIn(500);
// })
$('.leaderBoardBtn').click(function(){
    $(".pageFrame").hide();
    $('.leaderboardPageFrame').fadeIn(500);
})

/* Grab the personal rank for the current active user */
$(document).ready(function() {
    // Function to update the personal rank using fetched data
    function updatePersonalRank(data) {
        // Select the personalRank <ul> element
        const personalRankList = $('.personalRank ul');

        // Clear any existing entries
        personalRankList.empty();

        // Append the user's personal rank data to the personalRank <ul> element
        const playerName = data.first_name + ' ' + data.last_name;
        const playerPoints = data.points;
        const timestamp = data.timestamp;
        const wins = data.wins;
        const losses = data.losses;

        const personalRankItem = `<li class="pt" style="margin-bottom:-1em;"><p>${data.rank}.&nbsp;&nbsp;${playerName}</p><p>${playerPoints}</p></li>`;
        const personalRankStats = `<li><p style="margin:0;padding:0;">Wins/Losses &nbsp;&nbsp;<p style="margin:0;padding:0;">${wins}/${losses}</p></li>`;
        personalRankList.append(personalRankItem);
        $('.pt').after(personalRankStats);
    }

    // Fetch the personal rank data from the PHP script
    $.ajax({
        url: './includes/personal_rank.php',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Call the updatePersonalRank function with the fetched data
            updatePersonalRank(response);
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

/* Dynamically pull leaderboard data */
$(document).ready(function() {
    // Function to update the leaderboard using fetched data
    function updateLeaderboard(data) {
        // Select the leaderboard <ul> element
        const leaderboardList = $('.leaderList ul');

        // Clear any existing entries
        leaderboardList.empty();

        // Loop through the fetched data and append <li> elements to the leaderboard
        $.each(data, function(index, player) {
            const playerName = player.first_name + ' ' + player.last_name.charAt(0) + '.';
            const playerPoints = player.points;
            const listItem = `<li><p>${index + 1}.&nbsp;&nbsp;${playerName}</p><p>${playerPoints}</p></li>`;
            leaderboardList.append(listItem);
        });
    }

    // Fetch the leaderboard data from the PHP script
    $.ajax({
        url: './includes/leaderboard_data.php',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Call the updateLeaderboard function with the fetched data
            updateLeaderboard(response);
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

/* Get the date for the current month and update the header for leaderboard date */
$(document).ready(function() {
    // Function to get the current date range for the current month
    function getCurrentMonthDateRange() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based, so we add 1
        const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

        // Format the date range string
        const startDay = "1st";
        const endDay = (lastDayOfMonth === 31) ? "31st" : "30th";
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const dateRange = months[currentMonth - 1] + ' ' + startDay + ' - ' + months[currentMonth - 1] + ' ' + endDay;

        return dateRange;
    }

    // Update the <h3> element with the current month date range
    $('.dates').text(getCurrentMonthDateRange());
});

/* Return to main menu */
$('.returnToHome').click(function(){
    $(".pageFrame").hide();
    $('.landingPageView').fadeIn(500);
})

/* Scroll to top of page */
$('.clickHeretoPlayBtn').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    /* Show contest extension notice */
    // if (sessionStorage.getItem("notificationClosed") !== "true") {
    //     $('.contestExtensionNotification').css("opacity","1");
    //     $('.contestExtensionNotification').css("display","block");
    //     }
    
    //     // Handle the close button click event
    //     $("#closeBtn").click(function() {
    //     $("#contestNotification").hide();
    //     sessionStorage.setItem("notificationClosed", "true");
    //     });
});



// we'll store our animations here
var animations = {};

$(document).ready(function(){
    var step = 1;
    var stepsText = {
        1: "Your goal is to guess a five letter word",
        2: "You will have six attempts",
        3: "Incorrect letters are grey",
        4: "Correct letters with correct placement are yellow",
        5: "Correct letters with incorrect placement are green"
    };

    // Initialize with first animation
    loadAnimation(step);

    $("#leftArrow").click(function(){
        if(step > 1){
            step--;
            changeStep(step);
        }
    });

    $("#rightArrow").click(function(){
        if(step < 6){
            step++;
            changeStep(step);
        }
    });

    function changeStep(step){
        loadAnimation(step);
        $("#sliderText").text(stepsText[step]);
    }

    function loadAnimation(step) {
        $("#lottieContainer").empty(); // Remove previous animation
        
        var animationElement = document.createElement('div');
        document.getElementById('lottieContainer').appendChild(animationElement);
        
        var animation = lottie.loadAnimation({
            container: animationElement, // the DOM element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './images/howtoplay/BTLCAP_Balzaq_ETW_HowToPlay_step' + step + '.json' // the path to the animation json
        });
    }
    
});

/* Automatically show specific pages depending on the URL ending */
$(document).ready(function() {
    var pathname = window.location.pathname;
    
    if (pathname.endsWith('/termsandconditions')) {
        $(".pageFrame").hide();
        $('.termsPageFrame').fadeIn(500);
        $('.onlyOnTermsPage').fadeIn();
    }
});

/* Remove duplicate footers */
function checkFooterVisibility() {
    // Count visible '.footer' elements
    const footerCount = $('.footer:visible').length;

    // If more than 1 '.footer' elements are visible, hide one
    if (footerCount > 1) {
        $('.footer:visible').last().hide();
    }
}

$(document).ready(function() {
    // Initial check when the document is ready
    checkFooterVisibility();

    // Attach event listeners to 'button' and 'a' elements
    $("button, a").click(function() {
        setTimeout(() => {
            checkFooterVisibility();
        }, 1000);
    });
});


/* Keep footer at bottom */
$(document).ready(function() {
    function adjustFooterPosition() {
      // Get the height of .PhoneSizeView and .footer
      var phoneSizeViewHeight = $('.pageFrame').height();
      var footerHeight = $('.footer').height();
  
      // Calculate the top position for .footer within .PhoneSizeView
      var footerTop = phoneSizeViewHeight - footerHeight - 600;
  
      // Set the top position for .footer
      $('.footer').css('top', footerTop + 'px');
    }
  
    // Call the function initially
    adjustFooterPosition();
  
    // Update the footer position on window resize
    $(window).resize(function() {
      adjustFooterPosition();
    });
  });
  