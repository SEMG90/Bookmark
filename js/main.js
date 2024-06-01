// global variables
var nameInput = document.getElementById("siteName");
var websiteNameInput = document.getElementById("siteUrl");
let inputs = document.getElementsByClassName("form-control");
let addBtn = document.getElementById("addBtn");
var aryLine = []; // global array

// -------------------------------  START validation  ---------------------------------
let nameAlert = document.getElementById("nameAlert");
let rejexName = /^[a-zA-Z]{3,9}(?:\s[a-zA-Z]{3,9})*$/;
let urleAlert = document.getElementById("urleAlert");
let rejexUrl = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;

function validateInput(rejex, input, alert) {
  if (rejex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
   
  } else {
    input.classList.add("is-invalid");
 
  }
  validateForm();
}

function validateForm() {
  if (rejexName.test(nameInput.value) && rejexUrl.test(websiteNameInput.value)) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.setAttribute("disabled", "true");
  }
}

nameInput.onkeyup = function () {
  validateInput(rejexName, nameInput, nameAlert);
};
websiteNameInput.onkeyup = function () {
  validateInput(rejexUrl, websiteNameInput, urleAlert);
};

// Retrieve data from localStorage on load
if (localStorage.getItem("websitesList") !== null) {
  aryLine = JSON.parse(localStorage.getItem("websitesList"));
  displayLine();
}

// add line function
function addLine() {
  if (nameInput.classList.contains("is-valid") && websiteNameInput.classList.contains("is-valid")) {
    var line = {
      nameInput: nameInput.value,
      websiteName: websiteNameInput.value,
    };

    aryLine.push(line);
    localStorage.setItem("websitesList", JSON.stringify(aryLine));
    clearLine();
    displayLine();
  }
}

// clear line function
function clearLine() {
  nameInput.value = '';
  websiteNameInput.value = '';
  nameInput.classList.remove("is-valid");
  websiteNameInput.classList.remove("is-valid");
  addBtn.setAttribute("disabled", "true");
}

// display line function
function displayLine() {
  var empBox = '';
  for (var i = 0; i < aryLine.length; i++) {
    empBox +=
      `
            <div class="line-booking bg-light mt-1 d-flex flex-row align-items-center justify-content-around pt-2 pb-2 gap-5">
                <div class="col-2 text-center">
                    <h6>${i + 1}</h6>
                </div>
                <div class="col-2 text-center">
                    <h6>${aryLine[i].nameInput}</h6>
                </div>
                <div class="col-2 text-center">
                    <button class="btn btn-primary ps-4 pe-4">
                        <i class="fa-solid fa-eye"></i>
                        <a href="${aryLine[i].websiteName}" target="_blank" class="text-white">Visit</a>
                    </button>
                </div>
                <div class="col-2 text-center">
                    <button class="btn btn-danger ps-3 pe-3" onclick="deleteLine(${i})">
                    <i class="fa-regular fa-trash-can"></i>
                    Delete
                    </button>
                </div>
            </div>
        `
  }
  document.getElementById("box-booking").innerHTML = empBox;
}

// delete line function
function deleteLine(deletedRow) {
  aryLine.splice(deletedRow, 1);
  localStorage.setItem("websitesList", JSON.stringify(aryLine));
  displayLine();
}
