/* global data */
/* exported data */
var url = document.querySelector('#user-url');
var uploadedPicture = document.querySelector('#placeholder');
var title = document.querySelector('#user-title');
var notes = document.querySelector('#user-notes');
var formTitle = document.querySelector('.formTitle');
var saveclass = document.querySelector('.save-action');

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
      var deleteEntry = document.createElement('div');
      deleteEntry.setAttribute('class', 'delete');
      saveclass.appendChild(deleteEntry);
      deleteEntry.textContent = 'Delete Entry';

      var modal = document.createElement('div');
      modal.setAttribute('class', 'modal');

      var modalContent = document.createElement('div');
      modalContent.setAttribute('class', 'modal-content');
      modal.appendChild(modalContent);

      var msgModal = document.createElement('p');
      msgModal.textContent = 'Are you sure you want to delete this entry?';
      modalContent.appendChild(msgModal);

      var modalBtn = document.createElement('div');
      modalBtn.setAttribute('class', 'modal-button');
      modalContent.appendChild(modalBtn);

      var cancelBtn = document.createElement('button');
      cancelBtn.setAttribute('id', 'cancelBtn');
      cancelBtn.textContent = 'CANCEL';
      modalContent.appendChild(cancelBtn);

      var confirmBtn = document.createElement('button');
      confirmBtn.setAttribute('id', 'confirmBtn');
      confirmBtn.textContent = 'CONFIRM';
      modalContent.appendChild(confirmBtn);
      deleteEntry.appendChild(modal);

      deleteEntry.onclick = function () {
        modal.style.display = 'block';
      };

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
