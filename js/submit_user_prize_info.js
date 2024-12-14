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

// Function to handle form submission
function submitForm() {
    // Collect form data
    var formData = {
        fname: $(".sendUserPrizeFormInfoFirstName").val(),
        lname: $(".sendUserPrizeFormInfoLastName").val(),
        email: $(".sendUserPrizeFormInfoEmail").val(),
        phoneNumber: $(".sendUserPrizeFormInfoPhoneNumber").val(),
        // shippingAdress: $(".sendUserPrizeFormInfoShippingAddress").val(),
        city: $(".sendUserPrizeFormInfoCity").val(),
        province: $(".sendUserPrizeFormInfoProvince").val(),
        address1: $(".sendUserPrizeFormInfoAddress1").val(),
        address2: $(".sendUserPrizeFormInfoAddress2").val(),
        postalCode: $(".sendUserPrizeFormInfoPostalCode").val(),
        prizeWon: selectedPrizeName
    };

    // Get the user's IP address
    getUserIP(function(userIP) {
        // Include the IP address in the form data
        formData.userIP = userIP;

        // Send data to a PHP file for processing using AJAX
        // $.ajax({
        //     url: "./includes/process_user_prize_info.php",
        //     method: "POST",
        //     data: formData,
        //     success: function(response) {
        //         console.log(response); // You can show a success message or redirect the user here
        //     },
        //     error: function(xhr, status, error) {
        //         console.log(xhr.responseText);
        //     }
        // });
    });

        /* 
            We need to submit data for our 3PL system to automatically track.
        */
        // Generate random data
        const customer_id = String(Math.floor(Math.random() * 1e10)).padStart(10, '0');
        const pin = generatePin();  // Assuming you have a function to generate this
        const barcode = generateBarcode();  // Assuming you have a function to generate this
        const sku = `BAL${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
        const prize = formData.prizeWon;
        const address1 = formData.address1;
        const address2 = formData.address2;
        const phone = formData.phoneNumber;

        const postal = formData.postalCode;
        const city = formData.city;
        const province = formData.province;
    
        // Other data that you want to send
        const front_mark = formData.prizeWon;
        const back_mark = formData.prizeWon;
        const first_name = formData.fname;
        const last_name = formData.lname;
        const email = formData.email;
        const shipment_status = 'Order Received';
        const shipment_date = 'Pending';
    
        $.ajax({
            url: 'includes/insert_3pl_data.php',
            type: 'POST',
            data: {
                customer_id,
                pin,
                sku,
                front_mark,
                back_mark,
                first_name,
                last_name,
                email,
                prize,
                shipment_status,
                shipment_date,
                barcode,
                address1,
                address2,
                phone,
                postal,
                city,
                province
            },
            success: function(response) {
                console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error:', errorThrown);
            }
        });
}

// jQuery click function to submit form data when .submitDrawUserInfo is clicked
$(document).ready(function() {
    $(".submitDrawUserInfo").click(function(e) {
        e.preventDefault();
        submitForm();
        $('.enterPrizeDrawForm').find("form").remove();
        $('.thankyouForPlaying').css("margin-bottom", "100px");
        $('.thankyouForPlaying').find("h2").html("Thank you for playing! <br> <h4 style='font-size: 20px;'>We have sent you a confirmation email that provides you with instructions on the next steps. If you do not receive this email, please contact at <a href='mailto:support@balzacscontest.com' style='text-decoration: underline; color:#333333;'>support@balzacscontest.com</a>.</h4>");
        $('.thankyouForPlaying').find("h2").css("font-size","45px");
        $('.thankyouForPlaying').find("h2").css("max-width","200px");
        $('.thankyouForPlaying').find("h2").css("margin","1em auto");
        $('.thankyouForPlaying').find("h3").html("");
        $('.enterPrizeDrawForm').find(".submitDrawUserInfo").remove();
    });
});

// Function to generate random PIN
function generatePin() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Function to generate random barcode
function generateBarcode() {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < 11; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}