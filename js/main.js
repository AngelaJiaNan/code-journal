/* global data */
/* exported data */
var url = document.querySelector('#user-url');
var uploadedPicture = document.querySelector('#placeholder');
var title = document.querySelector('#user-title');
var notes = document.querySelector('#user-notes');
var formTitle = document.querySelector('.formTitle');

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
  var newEntry = {};
  newEntry.title = form.elements[0].value;
  newEntry.url = form.elements[1].value;
  newEntry.notes = form.elements[2].value;
  if (data.editing) {
    newEntry.entryId = data.editing.entryId;
  } else {
    newEntry.entryId = data.nextEntryId++;
    data.entries.unshift(newEntry);
  }
  var renderedEntry = renderEntries(newEntry);
  entryList.prepend(renderedEntry);
  uploadedPicture.src = 'images/placeholder-image-square.jpg';
  entry.className = 'hidden';
  entryList.className = ' ';
  entriesList.style.display = 'block';
  entriesHeader.className = 'row entries-header';
  form.reset();
}

function renderEntries(currentEntries) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row');
  li.setAttribute('data-entry-id', currentEntries.entryId);
  li.addEventListener('click', function (event) {
    if (event.target.className === 'fas fa-pen') {
      entry.className = ' ';
      entryList.className = 'hidden';
      entriesHeader.className = 'row entries-header hidden';
      var closestLi = event.target.closest('li');
      var entryId = parseInt(closestLi.getAttribute('data-entry-id'));
      formTitle.textContent = 'Edit Entry';
      findEntry(entryId);
    }
  });

  var columnHalf = document.createElement('div');
  columnHalf.setAttribute('class', 'column-half');

  var image = document.createElement('img');
  image.setAttribute('src', currentEntries.url);

  columnHalf.appendChild(image);
  li.appendChild(columnHalf);

  var columnRightHalf = document.createElement('div');
  columnRightHalf.setAttribute('class', 'column-half');
  li.appendChild(columnRightHalf);

  var editBtn = document.createElement('i');
  editBtn.setAttribute('class', 'fas fa-pen');
  columnRightHalf.appendChild(editBtn);

  var titleText = document.createElement('h3');
  titleText.textContent = currentEntries.title;
  columnRightHalf.appendChild(titleText);

  var textOne = document.createElement('p');
  textOne.textContent = currentEntries.notes;
  columnRightHalf.appendChild(textOne);
  return li;
}

var entryList = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length > 0) {
    for (var i = 0; i < data.entries.length; i++) {
      var renderedEntry = renderEntries(data.entries[i]);
      entryList.appendChild(renderedEntry);
    }
  } else {
    var li = document.createElement('li');
    li.textContent = 'No entries have been recorded.';
    entryList.appendChild(li);
  }
});

var newButton = document.querySelector('#newButton');
var entriesHeader = document.querySelector('.entries-header');

newButton.addEventListener('click', function (event) {
  entry.id = 'code-journal show';
  entryList.className = 'hidden';
  entry.className = '';
  formTitle.textContent = 'New Entry';
  entriesHeader.className = 'row entries-header hidden';
});

function findEntry(entryId) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryId) {
      data.editing = data.entries[i];
    }
  }
  title.value = data.editing.title;
  url.value = data.editing.url;
  uploadedPicture.value = data.editing.uploadedPicture;
  notes.textContent = data.editing.notes;
}
