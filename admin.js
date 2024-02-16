
$(document).ready(function () {
    $(`#form`).submit(function (e) { 
        let Error = false; 
        e.preventDefault();
       
        const email = $(`#email`).val()
        const password = $(`#password`).val()

       
        if (validateEmail(email)) {
            Error=true
            $(`.email-err`).html("Please enter valid email")
        }

        if(!Error){
            $(`.err`).html("") 
            const data = {
                email,password
            }
            $.ajax({
                url: 'http://localhost:8080/api/v1/student/login',
                type: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify(data),
                success: function () {
                  window.location.href = "http://localhost:8080/success"
                },
                error: function (xhr, status, error) {
                  console.error('AJAX error:', status, error);
                    alert("submit error : "+error)
                }
              });
        }

        
    });

    function validateEmail(email) {
        const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !pattern.test(email)
    }
});