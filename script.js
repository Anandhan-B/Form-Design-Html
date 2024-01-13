function update(){
    let navTitle = document.getElementById('nav-title');
    let title = document.getElementById('title').value;
    if(title === ""){
        navTitle.innerText = "Untitled Form"
        document.title = "Untitled Form"
    }
    else{
    navTitle.innerText = title;
    document.title = title
}
}



$(document).ready(function() {
    let i=2;
    $("#add").click(function() {
      let newElement = $(`<div class="q-bar" id="q-bar-${i}">
      <div class="q-section">
          <div class="q">
              <textarea name="q-box" required placeholder="Question" class="q-box" cols="30" rows="10"></textarea>
          </div>
          <div class="q-type">
              <select id="q-types" name="q-types" required onchange="choice()">
                  <option value="" hidden>Select question type</option>
                  <option value="option1">Single Choice</option>
                  <option value="option2">Checkbox</option>
              </select>
          </div>
      </div>
      <div class="ans-section">
          <div class="choices" id="choices">
              <div class="choice-row">
                  <div class="choice-inputs">
                    <input class="input-icon" type="radio" disabled>
                  </div>
                  <div class="choice-inputs">
                    <input type="text" value="Option">
                  </div>
                  <div class="choice-inputs">
                    <input type="number" placeholder="Mark" required>
                  </div>
                  <div class="add-choice" id="add-choice"><abbr title="Add Choice"><i class="fa-solid fa-plus"></i></abbr></div>

                </div>
              
          </div>
      </div>
      
  </div>`);

      $("#q-container").append(newElement);
      var targetOffset = $(`#q-bar-${i}`).offset().top;

      $("html, body").animate({
        scrollTop: targetOffset
      }, 1000); 
      ++i;
    });



    $('#q-container').on('click', '.add-choice', function () {
      let newChoice = $(`<div class="choice-row">
      <div class="choice-inputs">
        <input class="input-icon" type="radio" disabled>
      </div>
      <div class="choice-inputs">
        <input type="text" value="Option">
      </div>
      <div class="choice-inputs">
        <input type="number" placeholder="Mark" required>
      </div>
     `);
      // Find the closest .q-section to the clicked .add-choice button
      var ansSection = $(this).closest('.ans-section');

      // Append a new choice row inside the .choices of the corresponding .q-section
      ansSection.find('.choices').append(newChoice);
  });

  $('#q-types').on('change', function () {
    var questionType = getQuestionType();

    // Update existing choice-row inputs
    $('.choices .choice-row').each(function () {
        $(this).find('.choice-inputs .input-icon').attr('type', questionType);
    });
});

// Function to get the current question type
function getQuestionType() {
    return $('#q-types').val() === 'option2' ? 'checkbox' : 'radio';
}

  });