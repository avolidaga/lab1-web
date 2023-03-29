const baseURL = 'http://localhost:5000'
const resultTable = document.querySelector('.scripts-info_body')
export default function testHit(x, y, r) {
  fetch(`${baseURL}/api/hit?x=${x}&y=${y}&r=${r}`)
    .then((res) => res.text())
    .then((stringRes) =>
      resultTable.insertAdjacentHTML('afterbegin', stringRes)
    )
    .catch(() => alert('Что-то пошло не так,извините..'))
}
