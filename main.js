
//Retrieve notes from local Storage or create a new array if no notes exist. 
let savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];

//retrieve current user theme from local storage
let currentTheme = localStorage.getItem('userTheme') || 'lightblue';


//Function to Check if device is a phone or a bigger screen   
function checkDeviceWidth() {
  let elemWidth = window.innerWidth;
  //console.log(elemWidth);

  if (elemWidth >= 750) {
    toggleDrawerOn();
  }
  else {
    toggleDrawerOff();
  }
}

//Define text style default states
let underline = false;
let italics = false;
let bold = false;

//render the saved notes on the page
renderNotes();

//get user theme
getTheme();

//Check if device is a phone or a bigger screen
checkDeviceWidth();


function getTheme() {

  let selection =  document.getElementById('themes');
  selection.value = currentTheme;
  toggleTheme();
}


let noteIndex = 0;

//Function to save the new note by a user
function saveNotes() {
  //get the note title and content from the page
  let title = document.getElementById('title').value;
  let content =  document.getElementById('content').value;

  //check if title exists
  if (title == '' || title.trim == '') {
    // alert('Current note does not have a title');
    Modal('titleModal');  
  }
  else
  //check if a note with the same name exists already
  if (checkDuplicate()) {
    Modal('duplicateModal')
  } 
  else 
  //Save the note in an array as a new object
  {
    savedNotes.push(    
      {
        title,
        content
      }
    );

    updateNotes();

    renderNotes();
  }


  function checkDuplicate() {

    for (let i = 0; i < savedNotes.length; i++) {
      let noteItemTitle = savedNotes[i].title;
  
      if (title == noteItemTitle) {
        return true;
      }
    }
  
    return false;
  }
}



function renderNotes() {
  let totalHtml = '';
  let noteBox = document.getElementById('notes');

  for (let i = 0; i < savedNotes.length;  i++ ) {
    let noteItem = savedNotes[i];
    let noteTitle = savedNotes[i].title; 
    let notePreview = savedNotes[i].content;

      if (notePreview.split(' ').length > 12 || notePreview.length >= 50 ) {
        notePreview = notePreview.split(' ').splice(0, 12).join(' ') + '...';
      }
    
    let noteHTML = `<div class="note" onclick="
      noteIndex = ${i};

      editNotes();
    ">
    <div class="note-title">${noteTitle}</div>
    <div class="note-preview">
      ${notePreview}
    </div>
    <button class="delete"
      onclick="
      noteIndex = ${i};
      Modal('deleteModal');
      "><p>&times;</p>
    </button>
  </div>`;

    totalHtml += noteHTML;

  }
  noteBox.innerHTML = totalHtml;
}

function deleteNote() {
  savedNotes.splice(noteIndex,  1 );

  updateNotes();
  renderNotes();
}


function updateNotes () {
  localStorage.setItem( 'savedNotes', JSON.stringify(savedNotes));
}

function search() {
  let searchValue = document.getElementById('search').value.toLowerCase();
  let noteItems = document.querySelectorAll('.note');
  let noteTitles = document.querySelectorAll('.note-title');

  for (let i =0; i < noteTitles.length; i++) {
    let match = noteTitles[i].innerHTML.toLowerCase();
    let noteItem = noteItems[i];

    if (match.includes(searchValue)) {
      noteItem.classList.remove('none');
      noteItem.classList.add('block');    
    }

    else {
      noteItem.classList.remove('block');
      noteItem.classList.add('none');
    }
  }

}

function toggleTheme() {
 let selection =  document.getElementById('themes').value;
 
 
 let root = document.querySelector(':root');
  //console.log(root);

  let stylez = getComputedStyle(root);
  //console.log(stylez);

  stylez.getPropertyValue('--primary');
  stylez.getPropertyValue('--secondary');
  stylez.getPropertyValue('--tertiary');
  stylez.getPropertyValue('--outline');
  stylez.getPropertyValue('--menu');

 if (selection == 'lightblue') {
  
  root.style.setProperty('--primary', '#b2d7f5');
  
  root.style.setProperty('--secondary', '#6582ff');
  root.style.setProperty('--outline', '#3c60ff');

  root.style.setProperty('--tertiary', 'rgb(31, 31, 31)');
  root.style.setProperty('--menu', 'black');
  document.getElementById('themes').style.border = 'none';

 }

 if (selection == 'dark' ) {

  root.style.setProperty('--primary', 'rgb(42, 42, 42)');
  root.style.setProperty('--secondary', 'rgb(81, 81, 81)');
  root.style.setProperty('--tertiary', 'rgb(31, 31, 31)');
  root.style.setProperty('--outline', 'rgb(0,0, 0)');


  root.style.setProperty('--menu', 'white');
  
  document.getElementById('themes').style.border = 'none';

 }

 if (selection == 'black' ) {
 
  root.style.setProperty('--primary', 'black');
  root.style.setProperty('--secondary', 'rgb(11, 11, 11)');
  root.style.setProperty('--tertiary', 'rgb(41, 41, 41)');
  root.style.setProperty('--outline', 'rgb(90,90,90)');

  document.getElementById('themes').style.border = '1px solid white';

  root.style.setProperty('--menu', 'white');


 }

 if (selection == 'pink' ) {
  
  root.style.setProperty('--primary', 'pink');
  root.style.setProperty('--secondary', 'rgb(240, 88, 113)');
  root.style.setProperty('--tertiary', 'rgb(31, 31, 31)');
  root.style.setProperty('--outline', 'rgb(240, 88, 113)');
  document.getElementById('themes').style.border = 'none';

  root.style.setProperty('--menu', 'black');

 }
  

 if (selection == 'sunset' ) {
  
  root.style.setProperty('--primary', 'rgb(255, 229, 112)');
  root.style.setProperty('--secondary', 'rgb(248, 157, 37) ');
  root.style.setProperty('--outline', 'rgb(248, 157, 37)');
  root.style.setProperty('--tertiary', 'rgb(31, 31, 31)');
  
  document.getElementById('themes').style.border = 'none';

  root.style.setProperty('--menu', 'black');


 }
  

 if (selection == 'midnight-blue' ) {

  root.style.setProperty('--primary', 'rgb(0, 42, 97)');
  root.style.setProperty('--secondary', 'rgb(1, 28, 63)');
  root.style.setProperty('--tertiary', 'rgb(1, 7, 14)');
  root.style.setProperty('--outline', 'rgb(0, 42, 97)');
  
  document.getElementById('themes').style.border = 'none';

  root.style.setProperty('--menu', 'white');


 }


 localStorage.setItem('userTheme', selection);
}

function Modal(element) {

  let overlay = document.getElementById('overlay');

  let Modal = document.getElementById(element);

  overlay.style.display = 'block';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  Modal.style.transform = 'translate(-50%, -50%)';


}



function closeModal(element) {
  let overlay = document.getElementById('overlay');

  let Modal = document.getElementById(element);

  overlay.style.display = 'none';
  overlay.style.backgroundColor = 'transparent';
  Modal.style.transform = 'translate(-50%, -300%)';


}


function editNotes() {
  let title = document.getElementById('title');
  let content = document.getElementById('content');

  let currentNote =  savedNotes[noteIndex];
 

  //let save changes button appear
  document.getElementById('save').style.display = 'none';
  document.getElementById('saveChanges').style.display = 'inline-block';
  document.getElementById('newNote').style.display = 'inline-block';

  //change the values inside the HTML elements

  title.value = currentNote.title;
  content.value = currentNote.content;

}

  
function newNote() {
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';

  document.getElementById('newNote').style.display = 'none';
  document.getElementById('save').style.display = 'inline-block';
  document.getElementById('saveChanges').style.display = 'none';
}

function saveChanges() {
  
  let title = document.getElementById('title').value;


  if (title == '' || title.trim == '') {
    // alert('Current note does not have a title');
    Modal('titleModal');
  }
  else {
    let title = document.getElementById('title').value;
    let content = document.getElementById('content').value;


    let currentNote =  savedNotes[noteIndex];

    currentNote.title = title;
    currentNote.content = content;

    updateNotes();
    renderNotes();
  }
}



function toggleDrawerOff() {
  

  document.querySelector('input#search').style.opacity = '0';
  document.querySelector('.header p ').style.opacity = '0';

  document.querySelector('.header div').style.opacity = '0';


  let noteItems = document.querySelectorAll('div.note');

  for (let i =0; i < noteItems.length; i++ ) {
    noteItems[i].style.opacity = '0'
  }
  setTimeout(disappearUseless, 500);
  
}

function toggleDrawerOn() {
  
  document.querySelector('.header div').style.display = 'block';

  document.querySelector('.header p').style.display = 'block';

  document.querySelector('div.sidebar').style.width = '270px';


  setTimeout(appearUseless, 500);
  
}

function disappearUseless() {
  document.querySelector('.header div').style.display = 'none';

  document.querySelector('.header p').style.display = 'none';

  document.querySelector('div.sidebar').style.width = '0px';
}



function appearUseless() {

  let noteItems = document.querySelectorAll('div.note');

  for (let i =0; i < noteItems.length; i++ ) {
    noteItems[i].style.opacity = '1';
  }

  document.querySelector('input#search').style.opacity = '1';
  document.querySelector('.header p ').style.opacity = '1';

  document.querySelector('.header div').style.opacity = '1';
}


function toggleBold() {
  let Bbutton =  document.getElementById('bold');
  let textarea = document.querySelector('textarea');
  

  if (bold == false) {
    bold = true;
    Bbutton.style.color = 'white';
    Bbutton.style.backgroundColor = 'var(--secondary)';
    textarea.style.fontWeight = 'bold';
  }
  else {
    bold = false;
    Bbutton.style.color = 'black';
    Bbutton.style.backgroundColor = 'rgba(224, 224, 224, 0.4)';
    textarea.style.fontWeight = 'normal';

  };
}

function toggleUnderline() {
  
  let uButton =  document.getElementById('underline');
  let textarea = document.querySelector('textarea');
  
  if (underline == false) {
    underline = true;
    uButton.style.color = 'white';
    uButton.style.backgroundColor = 'var(--secondary)';
    textarea.style.textDecoration = 'underline';
  }
  else {
    underline = false;
    uButton.style.color = 'black';
    uButton.style.backgroundColor = 'rgba(224, 224, 224, 0.4)';
    textarea.style.textDecoration = 'none';

  };

}

function toggleItalics() {
  let Ibutton =  document.getElementById('italics');
  let textarea = document.querySelector('textarea');

  if (italics == false) {
    italics = true;
    Ibutton.style.color = 'white';
    Ibutton.style.backgroundColor = 'var(--secondary)';
    textarea.style.fontStyle = 'italic';
  }
  else {
    italics = false;
    Ibutton.style.color = 'black';
    Ibutton.style.backgroundColor = 'rgba(224, 224, 224, 0.4)';
    textarea.style.fontStyle = 'normal';

  };
}

function clearText() {
  document.querySelector('textarea').value = '';
}


function editFontSize() {
  let fontsize = document.getElementById('fontSize').value;
  let textarea = document.querySelector('textarea');
  textarea.style.fontSize = `${fontsize}px`;
}