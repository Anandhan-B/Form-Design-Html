function update() {
  let navTitle = document.getElementById('nav-title');
  let title = document.getElementById('title').value;
  if (title === "") {
    navTitle.innerText = "Untitled Form"
    document.title = "Untitled Form"
  }
  else {
    navTitle.innerText = title;
    document.title = title
  }
}



$(document).ready(function () {
  let i = 2;
  $("#add").click(function () {
    let newElement = $(`<div class="q-bar" id="q-bar-${i}">
      <div class="q-section">
          <div class="q">
              <textarea name="q-box-${i}" id="q-box-${i}" required placeholder="Question" class="q-box" cols="30" rows="10"></textarea>
          </div>
          <div class="q-type">
              <select id="q-types-${i}" class="q-types" name="q-types-${i}" required onchange="">
                  <option value="radio">Single Choice</option>
                  <option value="checkbox">Checkbox</option>
              </select>
          </div>
          <div class="total-mark">
              <label for="mark"> Total Mark : 
              <input class="total" id="mark-${i}" name="mark-${i}" type="number" required>
          </label>
          </div>
      </div>
      <div class="ans-section">
          <div class="choices" id="choices-${i}">
              <div id="choice-row-1" class="choice-row">
                  <div class="choice-inputs">
                    <input class="input-icon" type="radio" disabled>
                  </div>
                  <div class="choice-inputs">
                    <input name="option-1" id="option-1" type="text" value="Option">
                  </div>
                  <div class="choice-inputs">
                    <input type="number" id="mark-1" name="mark-1" placeholder="Mark" required>
                  </div>
                  <div class="choice-inputs">
                                    <label for="">
                                  <input name="ans-1" id="ans-1" type="checkbox"> Ans
                                </label>
                                </div>
                  <div class="add-choice" id="add-choice-${i}"><abbr title="Add Choice"><i class="fa-solid fa-plus"></i></abbr></div>

                </div>
                
              
          </div>
      </div>
      
  </div>
  <div class="current-total-container">
      <div class="current-total">Total: <span class="c-total" id="current-total-${i}" name="current-total-${i}" for="current-total"></span></div> 
    </div>`);

    $("#q-container").append(newElement);
    var targetOffset = $(`#q-bar-${i}`).offset().top;

    $("html, body").animate({
      scrollTop: targetOffset
    }, 1000);
    ++i;
  });


  let j = 2;
  let store = '';
  let ids = {};
  $('#q-container').on('click', '[id^="add-choice"]', function () {

    let choiceSection = this.id;
    console.log(choiceSection);
    let num = choiceSection.charAt(choiceSection.length - 1);
    console.log(num);
    let questionType = $(`#q-types-${num}`).val() === 'checkbox' ? 'checkbox' : 'radio';
    console.log(questionType);


    this.id !== store ? j = ids[this.id] + 1 || 2 : '';
    store = this.id;

    let newChoice = $(`<div id="choice-row-${j}" class="choice-row">
      <div class="choice-inputs">
        <input class="input-icon" type="${questionType}" disabled>
      </div>
      <div class="choice-inputs">
        <input name="option-${j}" id="option-${j}" type="text" value="Option">
      </div>
      <div class="choice-inputs">
        <input type="number" id="mark-${j}" name="mark-${j}" placeholder="Mark" required>
      </div>
      <div class="choice-inputs">
       <label for="">
          <input name="ans-${j}" id="ans-${j}" type="checkbox"> Ans
            </label>
        </div>
    </div>
     `);
    var ansSection = $(this).closest('.ans-section');

    ansSection.find('.choices').append(newChoice);
    ids[this.id] = j;
    ++j;
  });



  $('#q-container').on('change', '[id^="q-types"]', function () {
    let choiceSection = this.id;
    console.log(choiceSection);
    let num = choiceSection.charAt(choiceSection.length - 1);
    console.log(num);
    let questionType = $(`#q-types-${num}`).val() === 'checkbox' ? 'checkbox' : 'radio';
    console.log(questionType);

    $(`#choices-${num} .choice-row`).each(function () {
      $(this).find('.choice-inputs .input-icon').attr('type', questionType)
    })
  });


  /* $('#q-types').on('change', function () {
    var questionType = getQuestionType();

    $('.choices .choice-row').each(function () {
        $(this).find('.choice-inputs .input-icon').attr('type', questionType);
    });
});

function getQuestionType() {
    return $('#q-types').val() === 'option2' ? 'checkbox' : 'radio';
} */






});