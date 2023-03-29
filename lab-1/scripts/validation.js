const submitBtn = document.querySelector('.form_btn')

const showWarning = (e) => {
  e.target.classList.add("error")
}
const disableSubmitButton = () => {
  submitBtn.disabled = true
}
const enableSubmitButton = () => {
  submitBtn.disabled = false
}
const hideWarning = (e) => {
  e.target.classList.remove("error")
}
export function validateRTextInput(e) {
  const value = +(e.target.value)
  hideWarning(e)
  
  if (Number.isNaN(value) || (value < 2 || value > 5)) {
    
    showWarning(e)
    disableSubmitButton()
  } else {
    
    enableSubmitButton()
  }
}
export function validateYTextInput(e) {
  const value = +(e.target.value)
  hideWarning(e) 

  if (Number.isNaN(value) || (value < -3 || value > 3)) {
    showWarning(e)
    disableSubmitButton()
  } else {
    enableSubmitButton()
  }
}
