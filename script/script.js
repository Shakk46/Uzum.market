// Assets
const doc = document
const body = doc.body
const header = doc.querySelector('.header')
const main = doc.querySelector('.main')

function createDOMElement(type, className, textCont) {
    const element = doc.createElement(type)
    element.className = className
    element.textContent = textCont
}
