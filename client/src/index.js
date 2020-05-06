document.addEventListener('DOMContentLoaded', () => {
  const navBtn = document.querySelector(".navbar-brand")
navBtn.addEventListener("click", () => renderForm())

fetchAll()

})
//=========================================================================================================
function fetchAll(){

  const url = ("http://localhost:3000/api/v1/notes")
  fetch(url)
  .then(response => response.json())
  .then(data => data.forEach(noteArray => renderNote(noteArray)))
  // .then(noteArray => renderNote(noteArray[0]))
  // .then(()=> search())
  
}

function renderNote(note){
  const ul = document.querySelector(".sidenav")
  const li = document.createElement("li")
         li.id = note.id
  const secondA = document.createElement("a")
        


secondA.innerText = note.title 
li.append(secondA)
ul.append(li)

li.addEventListener("click", () => renderDescription(note))

}

//=====================================================================================================
function renderDescription(note){
  
  const mainDiv = document.querySelector("#admin-main-control"),
    
             h1 = document.createElement("h1"),
              p = document.createElement("p"),
            btn = document.createElement("button")
            btn.id = "delete-btn"
            btn.addEventListener("click", () => deleteNote(note))
            btn.innerText="Delete"
            editBtn = document.createElement("button")
            editBtn.addEventListener("click", () => editNote(note))
            editBtn.id = "delete-btn"
            editBtn.innerText="Edit"


p.classList.add("p-tag")
h1.classList.add("h1-tag")

mainDiv.innerHTML = ""
h1.innerText= note.title
p.innerText = note.body

mainDiv.append(h1, p, btn, editBtn)


// const mainDiv = document.querySelector("#admin-main-control"),
//              h1 = document.createElement("h1"),
//               p = document.createElement("p"),
//             btn = document.createElement("button")
//             btn.id = "delete-btn"
//             btn.addEventListener("click", () => deleteNote(note))
//             btn.innerText="Delete"
//             editBtn = document.createElement("button")
//             editBtn.addEventListener("click", () => editNote(note))
//             editBtn.id = "delete-btn"
//             editBtn.innerText="Edit"


// p.classList.add("p-tag")
// h1.classList.add("h1-tag")

// mainDiv.innerHTML = ""
// h1.innerText= note.title
// p.innerText = note.body

// mainDiv.append(h1, p, btn, editBtn)

}
//======================================================================================================
function renderForm(){

const targetDiv = document.querySelector("#admin-main-control")
targetDiv.innerHTML= ""

     createDiv1 = document.createElement("div")
     createDiv1.classList.add("container")

     h2 = document.createElement("h2")
     h2.id = "createnote-tag"
     h2.innerText = "Create Your Note"

const createForm = document.createElement("form")
    
    insideDiv1 = document.createElement("div")
    insideDiv1.classList.add("question")

    firstLabel = document.createElement("label")
    firstLabel.classList.add("first-label")
   

    firstInput = document.createElement("input")
    firstInput.setAttribute("type", "text")
    firstInput.setAttribute("placeholder", "Type note title here")
    firstInput.id = "first-input"
    
    
   


    insideDiv2 = document.createElement("div")
    insideDiv2.classList.add("form-group")

    secondLabel = document.createElement("label")
    
    secondLabel.id = "body-label"
    
    secondInput = document.createElement("input")
    secondInput.setAttribute("placeholder", "Type note body here")
    secondInput.id = "second-input"

    document.createElement("br")

    submitBtn = document.createElement("button")
    submitBtn.innerText = "Submit"
    submitBtn.id = "delete-btn"
    submitBtn.addEventListener("click", createNote)


createDiv1.append(h2, createForm, insideDiv2)    
createForm.append(insideDiv1)
insideDiv1.append(firstLabel, firstInput)
insideDiv2.append(secondLabel, secondInput)

targetDiv.append(createDiv1, createForm, insideDiv1, insideDiv2, submitBtn)

}

//==============================================================================================
function createNote(event){  //when u create it s a post 
  
  var createTitle = document.getElementById("first-input").value
  var createBody = document.getElementById("second-input").value

const url = "http://localhost:3000/api/v1/notes"

  const obj ={
    title: createTitle,
    body: createBody
  }
  fetch(url, {
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(response => response.json())
    .then(note => {
      renderNote(note)
      renderDescription(note)
    })
}
//=================================================================================================================
function deleteNote(note){ 
  
//  const id = note.id

const deleteDiv = document.getElementById("admin-main-control")
const deleteLi = document.getElementById(note.id) // it will delete by it s id

 fetch(`http://localhost:3000/api/v1/notes/${note.id}`,{
   method: "DELETE"
 }).then( () => {
  deleteDiv.innerHTML = ""
  deleteLi.remove() //what u wanna do to that element remove it right
 }
 )
}

//1- we need to get the ul
//2- we need to access all the li
//3- we need to get the value from the search 
//4- 



function search(){
  let a;
  let input = document.querySelector(".form-control") // access the input for the search
  
  
  let value = input.value.toUpperCase()// couldnt able to get the value so we called the function in the html
  let ul = document.querySelector(".sidenav")
  let li = ul.getElementsByTagName("li"); //the li is an html content 
   
  
  
  for (let i = 0; i < li.length; i++) {
  
    a = li[i].getElementsByTagName("a")[0]; // a is to get th a tag  
    //console.log(li[i]);                  // this is the li with id and a tag
    // console.log(a);
    
  
    txtValue = a.textContent || a.innerText; // either or
    //console.log( a.textContent );
    //console.log(a.innerText);
    //console.log(filter)
    
    console.log(txtValue.toUpperCase().indexOf(value))// if this value on the list it will give a num

    if (txtValue.toUpperCase().indexOf(value) > -1) { //indexOf(filter) > -1 
        li[i].style.display = "";
    } else {
        li[i].style.display = "none";
    }
  }

}



// function myFunction() {
//   var input, filter, ul, li, a, i, txtValue;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   ul = document.getElementById("myUL");
//   li = ul.getElementsByTagName("li");
//   for (i = 0; i < li.length; i++) {
//       a = li[i].getElementsByTagName("a")[0];
//       txtValue = a.textContent || a.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//           li[i].style.display = "";
//       } else {
//           li[i].style.display = "none";
//       }
//   }
// }































// function editNote(note){

// const noteId = event.target.dataset.noteId
//   const obj ={
//     title: document.querySelector(".h1-tag").innerText,
//     body: document.querySelector(".p-tag").innerText
//   }

//   fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
//     method: "PATCH",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({obj})
//   }).then(resp => resp.json())
//     .then(data => renderNote(data))
// }

// function editQuote(p, textA, footer, blockQuote, quote){
//   textA.style.width = `600px`
//   textA.hidden = false
//   textA.innerText = p.innerText
//   p.hidden = true

//   textA.addEventListener('keypress', function (e) {
//       if (e.keyCode === 13) { // if key pressed is 'enter'
//          fetch(`http://localhost:3000/quotes/${quote.id}`, { // do a fetch patch 
//              method: "PATCH",
//              headers: {"Content-Type": "application/json"},
//              body: JSON.stringify({quote: textA.value})
//          }).then(response => {
//              textA.hidden = true
//              p.hidden = false
//              p.innerText = textA.value
//          })
//       }
//   }, false); // I don't know what this is
// }