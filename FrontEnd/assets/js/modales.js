//#region Variables

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

//#endregion

//#region Function
function toggleModal(){
  modalContainer.classList.toggle("active")
} 

//#endregion

//#region Event

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

//#endregion




