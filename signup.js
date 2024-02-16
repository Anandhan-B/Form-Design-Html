
$(document).ready(function () {
    $(`#form`).submit(function (e) { 
        let Error = false; 
        e.preventDefault();

        const email = $(`#email`).val()
        const password = $(`#password`).val()
        const university = $(`#university`).val()

        if (validateEmail(email)) {
            Error=true
            $(`.email-err`).html("Please enter valid email")
            console.log("email error");
        }
        if(password.length <4){
            Error=true
            $(`.pass-err`).html("Password is very short ")
            console.log("email error");
        }

        if(!Error){
            $(`.err`).html("") 
            const data = {
                name,email,password,university
            }
            $.ajax({
                url: 'http://localhost:8080/api/v1/student/new',
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