import { Translate } from '../translate'

class Jumbotron {

  constructor() {

    this.translate = new Translate()
    this.i18n = this.translate.i18n
    this.currentLang = this.translate.currentLang
    this.currentDiv = document.getElementById('js-jumbotron')

  }

  prependElement(element, classname, textValue, attributes) {

    let newElement = document.createElement(element)
    newElement.className = classname

    if (attributes) {

      attributes.forEach(element => {
        newElement[element.key] = element.value
      });

    }

    const newContent = document.createTextNode(textValue)
    newElement.appendChild(newContent)
    this.currentDiv.prepend(newElement)

  }

  createDisplay() {

    let textKey = 'classJumbotronDisplay'
    let textValue = this.i18n[this.currentLang][textKey]

    this.prependElement('h1', 'display-3', textValue)

  }

  createLead() {

    let textKey = 'classJumbotronLead'
    let textValue = this.i18n[this.currentLang][textKey]

    this.prependElement('p', 'lead', textValue)

  }

  createCTA() {

    let textKey = 'classJumbotronCTA'
    let textValue = this.i18n[this.currentLang][textKey]

    let attributes = [
      { key: 'type', value: 'button' },
      { key: 'name', value: 'button' }
    ]

    this.prependElement('button', 'btn btn-lg btn-success', textValue, attributes)

  }

  init() {
    this.createCTA()
    this.createLead()
    this.createDisplay()
  }

}

export { Jumbotron }
