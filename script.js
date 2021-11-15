const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const totalCasesIp = $('.case-input')
const caseErrorMsg = $('.case-error')
const resultEl = $('.checked-result')
const luckyNumberForm = $('.lucky-number-form')
const ordinalIp = $('.ordinal-input')
const inputRemain = $('.ordinal-error')
const resetBtn = $('.reset-btn')
let checkedCase = 0
let totalCases = 0
let result = []

totalCasesIp.onkeyup = function(e) {
    caseErrorMsg.innerText = ''
    caseErrorMsg.classList.remove('invalid')
    
    if (e.keyCode === 13) {
        const typedCaseNumber = parseInt(e.target.value)
        if (typedCaseNumber >= 1 && typedCaseNumber <= 20) {
            totalCasesIp.disabled = true
            totalCases = typedCaseNumber
            openLuckyNumberForm()
        } else {
            e.target.value = ''
            caseErrorMsg.innerText = 'vui lòng nhập giá trị từ 1 đến 20'
            caseErrorMsg.classList.add('invalid')
        }
    }
}

ordinalIp.onkeyup = function(e) {
    inputRemain.innerText = ''
    inputRemain.classList.remove('invalid')
    
    const ordinal = parseInt(e.target.value)
    if (e.keyCode === 13) {
        if (ordinal) {
            checkedCase ++
            checkRemainCase(checkedCase)
            getLuckyNumber(ordinal)
        } else {
            inputRemain.innerText = 'Vui lòng nhập vào 1 số nguyên'
            inputRemain.classList.add('invalid')
        }
    }
}

function openLuckyNumberForm() {
    inputRemain.innerText = `Số lần kiểm tra còn lại: ${totalCases} lần`
    totalCasesIp.disabled = true
    luckyNumberForm.classList.remove('invisible')
    ordinalIp.focus()
}

function checkRemainCase(checkedCase) {
    if (checkedCase !== totalCases) {
        const remainCases = totalCases - checkedCase
        inputRemain.innerText = `Số lần tìm kiếm còn lại: ${remainCases} lần`
        ordinalIp.value = ''
    } else {
        ordinalIp.disabled = true
        ordinalIp.value = ''
    }
}

function getLuckyNumberArray() {
    let resultArr = []
    for(let k = 1; k <=1000; k++) {
        let counter = 0
        let n = k
        let primeDivisorArr = []
        k_loop:
        for (let i = 2; i <= n; i++) {
            while (n % i === 0) {
                n = n / i
                if (primeDivisorArr.indexOf(i) === -1) {
                    primeDivisorArr.push(i)
                    counter ++
                    if (counter === 3) {
                        resultArr.push(k)
                        break k_loop
                    }
                }
            }
        }
    }
    return resultArr
}
const luckyNumberArr = getLuckyNumberArray()

function getLuckyNumber(ordinal) {
    resultEl.classList.remove('invisible')
    const luckyNumber = luckyNumberArr[ordinal-1]
    if (luckyNumber) {
        resultEl.innerText = `Số may mắn thứ ${ordinal} là: ${luckyNumber}`
    } else {
        resultEl.innerText = `Số may mắn thứ ${ordinal} đã lớn hơn 1000 mất rồi 😅`
    }
}

resetBtn.onclick = function() {
    // reset variables
    checkedCase = 0
    totalCases = 0
    result = []

    // restart total cases input field
    totalCasesIp.disabled = false
    totalCasesIp.value = ''
    totalCasesIp.focus()
    caseErrorMsg.innerText = ''
    caseErrorMsg.classList.remove('invalid')

    // close ordinal input form and hide result element
    luckyNumberForm.classList.add('invisible')
    ordinalIp.disabled = false
    ordinalIp.value = ''
    inputRemain.classList.remove('invalid')
    resultEl.classList.add('invisible')
}
