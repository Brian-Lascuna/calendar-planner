// Necessary DOM elements
var saveBtn = $('.saveBtn');
var eventModal = $('#eventSaved');
var currentDate = $('#currentDay');
var clearBtn = $('#clearBtn');
var clearModal = $('#clearPlannerModal');

// Saves event in corresponding time block to local storage
// Allows planned events to persist even after refresh
function saveEvent() {
  var timeBlock = $(this).parent();
  var timeBlockText = $(this).parent().children('textarea');

  localStorage.setItem(timeBlock.attr('id'), timeBlockText.val());
  console.log("Saved to local storage");
  eventModal.modal('show');
}

// Controls the color coded time blocks
// Also loads the saved events from local storage to their respective time block
function timeBlockData() {
  var currentHour = dayjs().format('H');
  for (var i = 9; i < 22; i++) {
    var currentBlock = $('#hour-' + i)
    var currentBlockHour = currentBlock.attr('id').substring(5);
    console.log(parseInt(currentBlockHour));
    console.log(parseInt(currentHour));

    if (parseInt(currentBlockHour) < parseInt(currentHour)) {
      currentBlock.addClass('past');
    }
    else if (parseInt(currentBlockHour) == parseInt(currentHour)) {
      currentBlock.addClass('present');
    }
    else {
      currentBlock.addClass('future');
    }

    var storageTraversal = "hour-" + i;
    var savedData = localStorage.getItem(storageTraversal);
    currentBlock.children('textarea').val(savedData);
  }
}

// Displays the current date with correct suffix
function realTime() {
  var currentDay = dayjs().format('dddd, MMMM D');
  var currentDayInt = dayjs().format('D');

  if (parseInt(currentDayInt) == 1) {
    currentDate.text(currentDay + "st");
  }
  else if (parseInt(currentDayInt) == 2) {
    currentDate.text(currentDay + "nd");
  }
  else if (parseInt(currentDayInt) == 3) {
    currentDate.text(currentDay + "rd");
  }
  else {
    currentDate.text(currentDay + "th");
  }
}

// Clears events from all time blocks
function clearPlanner() {
  for (var j = 0; j < 22; j++) {
    var clearBlock = $('#hour-' + j);

    clearBlock.children('textarea').val('');
    localStorage.removeItem('hour-' + j);
    clearModal.modal('hide');
  }
}

// Runs all functions once DOM is fully loaded
$( document ).ready(function () {
  
  saveBtn.on("click", saveEvent);

  timeBlockData();
  realTime();

  clearBtn.on("click", clearPlanner);
});
