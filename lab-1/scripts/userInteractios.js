import '../styles/userInteraction.scss'
import testHit from './api'
import { validateYTextInput, validateRTextInput } from './validation'

const checkboxValues = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2]
const yTextInput = document.querySelector('#Y-input-text')
const rTextInput = document.querySelector('#R-input-text')
const checkboxSelect = document.querySelector('.form_checkbox-select')
const form = document.querySelector('#form')
let currentCheckboxValue

const listOfCheckboxInputs = checkboxValues.map((value, index) => {
  const newCheckboxElement = document.createElement('input')

  newCheckboxElement.setAttribute('value', String(value))
  newCheckboxElement.setAttribute('type', 'checkbox')

  


  if (index === 0) {
    newCheckboxElement.click()
    currentCheckboxValue = newCheckboxElement.value
  }

  return newCheckboxElement
})

const loadSelectElements = () => {
  listOfCheckboxInputs.forEach((checkbox) => {
    checkboxSelect.appendChild(checkbox)
    const checkboxText = document.createElement('label')
    checkboxText.innerText = checkbox.value

    checkboxSelect.appendChild(checkboxText)
    
    checkbox.addEventListener(
      'change',
      (e) => { 
        listOfCheckboxInputs.forEach(element => element.checked = false) 
        e.target.checked = true
        currentCheckboxValue = +e.target.value
        
      }
    )
  })
}

export default function startApplication() {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    testHit(
      currentCheckboxValue,
      parseFloat(yTextInput.value),
      parseFloat(rTextInput.value)
    )
  })
  rTextInput.addEventListener('input', (e) => validateRTextInput(e))
  yTextInput.addEventListener('input', (e) => validateYTextInput(e))

  loadSelectElements()
}
