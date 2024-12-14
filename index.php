<?php
// Start the session
session_start();

// Set headers to prevent caching
header('Cache-Control: no-cache, no-store, must-revalidate'); // HTTP 1.1.
header('Pragma: no-cache'); // HTTP 1.0.
header('Expires: 0'); // Proxies.

// Check if the session ID is already set in the cookie
if (isset($_COOKIE['gameplay_session_id'])) {
    // Reset the session cookie by setting its expiration time to a past value
    setcookie('gameplay_session_id', '', time() - 3600, '/');
}

// Generate a new temporary session ID
$sessionId = bin2hex(random_bytes(16)); // Generate a 32-character random string (16 bytes converted to hex)

// Append a unique timestamp to the session ID
$sessionId .= time(); // Append the current timestamp

// Set the new session ID as a cookie that expires at the end of the session (when the browser is closed)
setcookie('gameplay_session_id', $sessionId, 0, '/');

// Store the session ID in the session for later use
$_SESSION['gameplay_session_id'] = $sessionId;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="https://use.typekit.net/nen8xqs.css">
    <title>Balzac's Coffee</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" type="text/css" href="./src/pages/Game/style.css">
    <link rel="stylesheet" type="text/css" href="/src/pages/DataCapture/style.css">
</head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-PRQ2B5DHPD"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-PRQ2B5DHPD');
</script>
<body>
    <div class="app">
    <!-- Add a button to toggle all pages visible -->
    <!-- <button id="toggleAllButton">Toggle All Pages</button> -->

    <!-- Add next and previous buttons for navigation -->
    <!-- <button id="prevButton">Previous</button> -->
    <!-- <button id="nextButton">Next</button> -->

    <!-- Add the page frames -->
    <!-- <div class="PhoneSizeView pageFrame">Page 1</div> -->
    <!-- <div class="PhoneSizeView pageFrame">Page 2</div> -->
    <!-- <div class="PhoneSizeView pageFrame">Page 3</div> -->
    <!-- Add more page frames as needed -->

        <!-- Iniitialize Welcome -->
        <?php require('src/pages/WelcomeAnimation/index.php'); ?>
        
        <!-- Iniitialize Analyze User -->
        <?php require('src/pages/ReturningUser/index.php'); ?>

        <!-- Iniitialize Landing page -->
        <?php require('src/pages/LandingPage/index.php'); ?>

        <!-- Iniitialize Game -->
        <?php require('src/pages/Game/index.php'); ?>

        <!-- Iniitialize Prize Selection -->
        <?php require('src/pages/Prize/index.php'); ?>

        <!-- Iniitialize Data capture -->
        <?php require('src/pages/DataCapture/index.php'); ?>

        <!-- Iniitialize FAQ page -->
        <?php require('src/pages/FAQ/index.php'); ?>

        <!-- Iniitialize Leaderboard page -->
        <?php require('src/pages/Leaderboard/index.php'); ?>

        <!-- Iniitialize Prizing page -->
        <?php require('src/pages/Prizing/index.php'); ?>
    
        <!-- Iniitialize Terms & Conditions page -->
        <?php require('src/pages/TermandCondition/index.php'); ?>
    
        <!-- Iniitialize How To Play page -->
        <?php require('src/pages/HowToPlay/index.php'); ?>

          <!-- Iniitialize ComebackTomorrowMsg page -->
          <?php require('src/pages/ComebackTomorrowMsg/index.php'); ?>

    </div>

    <!-- Contest Extension -->
    <!-- <div class="contestExtensionNotification" id="contestNotification">
        <span class="close" id="closeBtn">&times;</span>
        <h3>By popular demand the contest has been extended to December 29th!</h3>
    </div> -->

    <!-- Contest Closed Popup -->
    <div class="contestHomepageClosed">
        <div class="contestClosedForeFront">
            <img src="images/closedlogo.svg" width="200"/>
            <h2 class='menupageHead' style="font-size: 62px !important;margin-top: 1.2em;">THANKS FOR<br>PLAYING</h2>
            <img class='dividingImage' src="/images/content_divider.svg"  alt="" height="15">
            <div class="termAndConditionContent contestClosedContent" style="overflow: hidden;">
                <h3 class="TnChead" style="text-align: center;font-size: 32px !important;margin-top: .5m;">THIS CONTEST IS NOW CLOSED. <br />
                    FOLLOW US ON
                    SOCIAL TO<br />  STAY TUNED FOR
                    OUR NEXT PROMOTION!    
                </h3>
            </div>
        </div>
        <img src="images/tower.svg" class="rtower"/>
    </div>


    <!-- 1 day play checker -->
    <div class="dayChecker">
        <p>Thank you for playing.</p>
    </div>

    <!-- Scripts -->
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/check_user_ip.js"></script>
    <script type="text/javascript" src="js/submit_user_prize_info.js"></script>

</body>
</html>