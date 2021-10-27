/* global data */
/* exported data */
var url = document.querySelector('#user-url');
var uploadedPicture = document.querySelector('#placeholder');

url.addEventListener('input', function (event) {
  var pictureUrl = event.target.value;
  uploadedPicture.setAttribute('src', pictureUrl);
});

var entry = document.querySelector('#code-journal');
var form = document.forms[0];

entry.addEventListener('submit', noDefault);

function noDefault(event) {
  event.preventDefault();
  var object = {};
  object.title = form.elements[0].value;
  object.url = form.elements[1].value;
  object.notes = form.elements[2].value;
  object.entryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift(object);
  uploadedPicture.src = 'images/placeholder-image-square.jpg';
  form.reset();
}
