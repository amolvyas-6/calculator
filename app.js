const display = document.querySelector('.display')
const ac = document.querySelector('#clear')
const negate = document.querySelector('#negate')
const calc = document.querySelector('#calc')
let expression = []
let operand = 0
setDisplay(operand);

function reset(){
    while (expression.length > 0)
            expression.pop()
    operand = 0
    setDisplay(operand)
}

const operations = document.querySelectorAll('.operations')
const numbers = document.querySelectorAll('.numbers')

function checkIfOperator(c){
    if("+-*%/".indexOf(c) === -1)
        return false
    return true
}

function setDisplay(value){
    display.textContent = value
}

function operate(op1, opn, op2){
    let res = 0;
    switch(opn){
        case '+':
            res = op1 + op2
            break
        case '-':
            res = op1 - op2
            break
        case '*':
            res = op1 * op2
            break
        case '/':
            if(op2 === 0){
                console.log('Hey')
                reset();
                setDisplay('Cannot divide by 0')

                operations.forEach((operator)=>{
                    operator.classList.remove('clicked')
                })

                return
            }
            res = op1 / op2
            break
        case '%':
            if(op2 === 0){
                reset();
                setDisplay('Cannot divide by 0')
                operations.forEach((operator)=>{
                    operator.classList.remove('clicked')
                })
                return

            }
            res = op1 % op2
            break
    }
    setDisplay(res)
    expression.splice(0, 3, res)
}

numbers.forEach((number)=>{
    number.addEventListener('click', ()=>{
        operand = operand * 10 + (parseInt(number.textContent))
        setDisplay(operand)
        if(checkIfOperator(expression[expression.length-1])){
            expression.push(operand)
        }
        else{
            expression.pop()
            expression.push(operand)
        }
    })
})

operations.forEach((operator)=>{
    operator.addEventListener('click', ()=>{
        operand = 0
        if(expression.length == 3){
            operate(...expression)
        }
        if(expression.length === 0)
            return

        operations.forEach((operator)=>{
            operator.classList.remove('clicked')
        })
        operator.classList.add('clicked')

        const symbol = operator.textContent
        if (checkIfOperator(expression[expression.length - 1])){
            expression.pop()
        }
        expression.push(symbol)
    })
})

// operations.forEach((operator)=>{
//     operator.addEventListener('click', ()=>{
//         operations.forEach((operator)=>{
//             operator.classList.remove('clicked')
//         })
//         operator.classList.add('clicked')
//     })
// })

ac.addEventListener('click', reset)

calc.addEventListener('click', ()=>{
    if(checkIfOperator(expression[expression.length - 1]))
        expression.pop()
    else
        operate(...expression)

    operations.forEach((operator)=>{
        operator.classList.remove('clicked')
    })
})

negate.addEventListener('click', ()=>{
    if(expression.length > 0 && !checkIfOperator(expression[expression.length - 1])){
        expression[expression.length - 1] *= -1
        operand *= -1
        setDisplay(operand)
    }
})

