const mapathonTimezoneSet = [
  { offset: '-10:00', label: '(GMT-10) Hawaii', tzCode: 'Pacific/Honolulu' },
  { offset: '-07:00', label: '(GMT-7) Los Angeles', tzCode: 'America/Los_Angeles' },
  { offset: '-06:00', label: '(GMT-6) Mexico City', tzCode: 'America/Mexico_City' },
  { offset: '+08:00', label: '(GMT+8) Manila', tzCode: 'Asia/Manila' },
  { offset: '+09:00', label: '(GMT+9) Tokyo', tzCode: 'Asia/Tokyo' },
]; 

// on dom load
document.addEventListener("DOMContentLoaded", function() {
    populateTimezoneSelector();

    let timezoneSelector = document.getElementById("timezone-selector");
    timezoneSelector.addEventListener("change", convertDateTimes);
  });

function convertDateTimes() {
  // Datetime representation of 6pm, April 23
  let datetimesToConvert = document.getElementsByClassName('eventDatetime');
  let timezoneOffset = document.getElementById('timezone-selector').value;

  for (let eventDatetime of datetimesToConvert) {
    let convertedDatetime = new Date(eventDatetime.getAttribute('data-datetime'));
    const options = {
      timeZone: timezoneOffset,
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    eventDatetime.innerText = convertedDatetime.toLocaleString('en-US', options);
  }
}

function populateTimezoneSelector(){
    let select = document.getElementById("timezone-selector");

    // Loop through minimalTimezoneSet and create an option element for each
    mapathonTimezoneSet.forEach((timezone) => {
      let option = document.createElement("option");
      option.value = timezone.tzCode;
      option.selected = timezone.label.includes('Los Angeles');

      option.appendChild(document.createTextNode(timezone.label));
      select.appendChild(option);
    });

    return select;
  }