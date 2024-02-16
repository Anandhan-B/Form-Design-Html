
$(document).ready(function () {
    $.ajax({
        url: '/api/v1/form/all',
        type: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        success: function (response) {
            
        },
        error: function (xhr, status, error) {
          
            alert("Server Error")
        }
      });
});