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
var entriesList = document.querySelector('#entriesList');

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
  entry.style.display = 'none';
  entriesList.style.display = 'block';
  entriesHeader.className = 'row entries-header';
  form.reset();
}

function renderEntries(entry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row');

  var columnHalf = document.createElement('div');
  columnHalf.setAttribute('class', 'column-half');

  var image = document.createElement('img');
  image.setAttribute('src', entry.url);

  columnHalf.appendChild(image);
  li.appendChild(columnHalf);

  var columnRightHalf = document.createElement('div');
  columnRightHalf.setAttribute('class', 'column-half');
  li.appendChild(columnRightHalf);

  var titleText = document.createElement('h3');
  titleText.textContent = entry.title;
  columnRightHalf.appendChild(titleText);

  var textOne = document.createElement('p');
  textOne.textContent = entry.notes;
  columnRightHalf.appendChild(textOne);

  var textTwo = document.createElement('p');
  textTwo.textContent = entry.notes;
  columnRightHalf.appendChild(textTwo);
  return li;
}

var entryList = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntry = renderEntries(data.entries[i]);
    entryList.appendChild(renderedEntry);
  }
});

var newButton = document.querySelector('#newButton');
var entriesHeader = document.querySelector('.entries-header');

newButton.addEventListener('click', function (event) {
  entry.id = 'code-journal show';
  entriesHeader.className = 'row entries-header hidden';
});
