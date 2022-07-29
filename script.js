const numbers = document.querySelectorAll('.number')
const display = document.querySelector('#display')
const keypadOperators = document.querySelectorAll('.operators')
const decimalPoint = document.querySelector('.point')
const toggle = document.querySelector('.toggle')
const equals = document.querySelector('.equals')
const cancel = document.querySelector('.cancel')
let equation = []

function calculate(equation) {
  let operators = {
    '/': function (a, b) {
      return a / b
    },
    '*': function (a, b) {
      return a * b
    },
    '-': function (a, b) {
      return a - b
    },
    '+': function (a, b) {
      return a + b
    },
    '%': function (a, b) {
      return a % b
    },
  }

  return operators[equation[1]](Number(equation[0]), Number(equation[2]))
}

function updateDisplay() {
  let temp = []
  temp.push(parseFloat(calculate(equation).toFixed(3)).toString())
  equation = []
  equation = temp
  display.textContent = equation[0]
}


numbers.forEach(number => {
  number.addEventListener('click', (e) => {
    if (equation[0] === "-0") {
      display.textContent = display.textContent.replace(/.$/, e.target.textContent)
      equation[0] = display.textContent
    } else if (equation.length === 0 && e.target.textContent === '0') {
      return
    } else if (equation.length === 0) {
      display.textContent = e.target.textContent
      equation.push(e.target.textContent)
    } else if (equation.length === 1) {
      display.textContent = display.textContent.concat(e.target.textContent)
      equation[0] = display.textContent
      console.log(equation[0])
    } else if (equation.length === 2) {
      display.textContent = e.target.textContent
      equation.push(e.target.textContent)
    } else if (equation.length === 3) {
      display.textContent = display.textContent.concat(e.target.textContent)
      equation[2] = display.textContent
    }
  })
})

keypadOperators.forEach(keypadOperator => {
  keypadOperator.addEventListener('click', (e) => {
    if (equation[0] === '0.' || equation[0] === '-0.' || equation[0] === '-0') {
      equation = []
      display.textContent = 0
    } else if (equation.length === 0) {
      return
    } else if (equation.length === 1) {
      equation.push(e.target.textContent)
    } else if (equation.length === 2) {
      equation[1] = e.target.textContent
    } else if (equation.length === 3) {
      updateDisplay()
      equation.push(e.target.textContent)
    }
  })
})

decimalPoint.addEventListener('click', () => {
  if (equation.length === 0) {
    equation.push('0.')
    display.textContent = '0.'
  } else if (equation.length === 1) {
    if (!equation[0].includes('.')) {
      display.textContent += '.'
    }
  } else if (equation.length === 3) {
    if (!equation[2].includes('.')) {
      display.textContent += '.'
    }
  }
})

cancel.addEventListener('click', () => {
  equation = []
  display.textContent = 0
})

equals.addEventListener('click', () => {
  if (equation.length === 3) {
    updateDisplay()
  }
})

toggle.addEventListener('click', () => {
  if (equation.length === 0) {
    display.textContent = "-0"
    equation[0] = display.textContent
  } else if (equation.length === 1) {
    equation[0] = equation[0].charAt(0) === "-" ? equation[0].substring(1) : `-${equation[0]}`
    display.textContent = equation[0]
  } else if (equation.length === 3) {
    equation[2] = equation[2].charAt(0) === "-" ? equation[2].substring(1) : `-${equation[2]}`
    display.textContent = equation[2]
  }
})

