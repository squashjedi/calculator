const numbers = document.querySelectorAll('.number')

numbers.forEach(number => {
  number.addEventListener('click', (e) => {
    console.log(e.target.textContent)
  })
})