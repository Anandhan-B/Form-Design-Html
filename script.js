
const bannedKeys = ['e','E','+']
function keyCheck(key) {
    return !bannedKeys.includes(key)
}

$(document).ready(function () {

  // To Change Title 
  $(`#title`).on('input', function () {
    let title = $.trim(this.value) === "" ? "Untitled Form" : this.value;
    $(`#nav-title`).html(title);
    document.title = title;
  });

  // To Add Question
  let i = 2;
  $("#add").click(function () {
    let totalMark = $(`#t-mark-1`).val() || "";
    let newQbar = $(`<div class="q-bar" id="q-bar-${i}">
      <div class="q-section">
          <div class="q">
             <span class="q-no">${i}</span> <textarea name="q-box-${i}" id="q-box-${i}" required placeholder="Question" class="q-box" cols="30" rows="10"></textarea>
          </div>
          <div class="q-type">
              <select id="q-types-${i}" class="q-types" name="q-types-${i}" required>
                  <option value="radio">Single Choice</option>
                  <option value="checkbox">Checkbox</option>
              </select>
          </div>
          <div class="total-mark">
              <label for="t-mark-${i}"> Total Mark : 
              <input class="total" id="t-mark-${i}" name="t-mark-${i}" value="${totalMark}" onkeydown="return keyCheck(event.key)" type="number" required>
          </label>
          </div>
      </div>
      <div class="ans-section">
          <div class="choices" id="choices-${i}">
              <div id="choice-row-${i}-1" class="choice-row">
                  <div class="choice-inputs">
                    <input class="input-icon" type="radio" disabled>
                  </div>
                  <div class="choice-inputs">
                    <input name="option-${i}-1" id="option-${i}-1" type="text" value="Option 1">
                  </div>
                  
                  <div class="choice-inputs">
                    <input type="number" class="mark" id="mark-${i}-1" onkeydown="return keyCheck(event.key)" name="mark-${i}-1" placeholder="Mark" required>
                  </div>
                  <div class="choice-inputs">
                      <label for="ans-${i}-1">
                    <input class="ans-box" name="ans-${i}-1" id="ans-${i}-1" type="checkbox"> Ans
                  </label>
                  </div>
                  <div class="add-choice" id="add-choice-${i}"><abbr title="Add Choice"><i class="fa-solid fa-plus"></i></abbr></div>
                </div>
          </div>
      </div>
      <div class="current-total-container">
          <div class="err" id="err-${i}"></div>
          <div class="current-total">Total: <span class="c-total" id="current-total-${i}" name="current-total-${i}" for="current-total-${i}"></span></div> 
        </div>
  </div>`);


    $("#q-container").append(newQbar);
    var targetOffset = $(`#q-bar-${i}`).offset().top;

    $("html, body").animate({
      scrollTop: targetOffset
    }, 1000);
    ++i;
  });

  // To Add Choice Row
  let j = 2;
  let store = '';
  let ids = {};
  $('#q-container').on('click', '[id^="add-choice"]', function () {

    let choiceSection = this.id;
    // console.log(choiceSection);
    let num = getFinal(choiceSection);
    //  console.log(num);
    let questionType = $(`#q-types-${num}`).val() === 'checkbox' ? 'checkbox' : 'radio';
    // console.log(questionType);


    this.id !== store ? j = ids[this.id] + 1 || 2 : '';
    store = this.id;
    let newChoiceRow = $(`<div id="choice-row-${num}-${j}" class="choice-row">
        <div class="choice-inputs">
          <input class="input-icon" type="${questionType}" disabled>
        </div>
        <div class="choice-inputs">
          <input name="option-${num}-${j}" id="option-${num}-${j}" type="text" value="Option ${j}">
        </div>
        
        <div class="choice-inputs">
          <input type="number" class="mark" id="mark-${num}-${j}" onkeydown="return keyCheck(event.key)" name="mark-${num}-${j}" placeholder="Mark" required>
        </div>
        <div class="choice-inputs">
            <label for="ans-${num}-${j}">
          <input class="ans-box" name="ans-${num}-${j}" id="ans-${num}-${j}" type="checkbox"> Ans
        </label>
        </div>
        <div class="add-choice" id="add-choice-${num}"><abbr title="Add Choice"><i
        class="fa-solid fa-plus"></i></abbr></div>
      </div>`);
    var ansSection = $(this).closest('.ans-section');
    $(`#choice-row-${num}-${j-1} #add-choice-${num}`).remove();
    ansSection.find('.choices').append(newChoiceRow);

    // Add Choice Animation
    /* let choiceOffset = $(`#choice-row-${num}-${j}`).offset().top;
    let ansOffset = $(`#ans-${num}-${i}`).offset()
    let parentOffset = $(`#add-choice-${num}`).offset().top;
    let distance = choiceOffset - parentOffset;
    let previous = $(`#add-choice-${num}`).css("transform")
   // console.log(choiceOffset, parentOffset, distance, previous);
    
    if (previous && previous !== "none") {
      let match = previous.match(/^matrix\((-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)\)$/);
      if (match) {
        let translateY = parseFloat(match[6]);
        $(`#add-choice-${num}`).css("transform", `translateY(${translateY+distance}px)`)
      }
    }
    else{
      $(`#add-choice-${num}`).css("transform", `translateY(${distance}px)`)
    }
 */
    let choiceOffset = $(`#choice-row-${num}-${j}`).offset().top;
    let offset = choiceOffset-(($(window).height() / 2) - ($(`#choice-row-${num}-${j}`).height() / 2));
    $("html, body").animate({
       scrollTop: offset
     }, 1000);
    ids[this.id] = j;
    ++j;
  });


  // To update Choice Type
  $('#q-container').on('change', '[id^="q-types"]', function () {
    let choiceSection = this.id;
    let num = getFinal(choiceSection);
    let questionType = $(`#q-types-${num}`).val() === 'checkbox' ? 'checkbox' : 'radio';

    $(`#choices-${num} .choice-row`).each(function () {
      $(this).find('.choice-inputs .input-icon').attr('type', questionType)
    })
  });

  // To Calculate Total
  $('#q-container').on('input', '[id^="choice-row"]', function () {
    let parent = $(this).parent().attr("id");
    let num = getFinal(parent);
    let total = 0;
    //  console.log("Change Detected on : ", id, getFinal(id), parent, num);

    $(`#choices-${num} .choice-row`).each(function (n) {
      let val = +$(this).find(`.choice-inputs #mark-${num}-${n + 1}`).val() || 0;
      //console.log(`val ${n + 1} : ${val}`);
      total += val;
      //  console.log(total);
    });

    $(`#current-total-${num}`).html(total)
    checkTotal(num);

  });

  

  // To Toggle Answer

  $(`#q-container`).on('change', '.ans-box', function () {
    let id = this.id;
    let idNum = getFinal(id);
    let parentId = this.closest(`.choices`).id;
    let parentNum = getFinal(parentId);
    if ($(this).prop('checked')) {
      $(`#mark-${parentNum}-${idNum}`).show();
    }
    else {
      let total = $(`#current-total-${parentNum}`).html();
      let mark = $(`#mark-${parentNum}-${idNum}`).val();
      $(`#current-total-${parentNum}`).html(total - mark);
      $(`#mark-${parentNum}-${idNum}`).hide().val("");
    }
  })

});

function getFinal(s) {
  const match = s.match(/(\d+)$/);

  if (match && match[1]) {
    return match[1];
  } else {
    return undefined;
  }

}

function checkTotal(n) {
  let Mark = parseInt($(`#t-mark-${n}`).val()) || 0;
  let Total = parseInt($(`#current-total-${n}`).html()) || 0;
  console.log(Mark,Total);
  if(Total > Mark){
    $(`#err-${n}`).html("* Total can't be greater than Mark");
    $(`#current-total-${n}`).css("color","red");
  }
  else{
    $(`#err-${n}`).html("");
    $(`#current-total-${n}`).css("color","black");
  }
}
