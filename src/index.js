import bootstrap, { Modal } from 'bootstrap'
import { createPopper } from '@popperjs/core'
import {
  randomPassword, digits, lower, upper, symbols
} from 'secure-random-password'
import crypto from 'crypto'

window.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.querySelector("#generate-btn")
  const generateField = document.querySelector("#generated-password-input")
  function generatePassword() {
    const length = Math.floor(crypto.randomInt(8, 13))
    const characters = [digits, lower, upper, symbols]
    return randomPassword({ length, characters })
  }

  generateButton.addEventListener("click", () => {
    generateField.value = generatePassword()
  })

  function validatePassword() {
    const passwordInput = document.querySelector("#password-input")
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordPattern.test(passwordInput.value)
  }

  const submitButton = document.querySelector("#submit-btn")
  const errorMsg = document.querySelector("#error-msg")
  const modalSuccess = document.querySelector("#success-modal-label")
  const modalBody = document.querySelector("#modal-body")

  function blinkErrorMessage() {
    let opacity = 1
    const interval = setInterval(() => {
      opacity = opacity ? 0 : 1
      errorMsg.style.opacity = opacity
    }, 400);
    setTimeout(() => {
      clearInterval(interval)
      errorMsg.style.opacity = 1
    }, 1000)
  }

  function blinkSuccess(timesToBlink) {
    let opacity = 1
    let blinkCount = 0
    const interval = setInterval(() => {
      opacity = opacity ? 0 : 1
      modalSuccess.style.opacity = opacity
      blinkCount += 1
      if (blinkCount === timesToBlink * 2) {
        clearInterval(interval)
        modalSuccess.style.opacity = 1
      }
    }, 200)
  }

  submitButton.addEventListener("click", (event) => {
    event.preventDefault()
    if (!validatePassword()) {
      errorMsg.textContent = "Password must have at least 8 characters and contain at least one uppercase letter, one number, and one special character."
      blinkErrorMessage()
    } else {
      errorMsg.textContent = ""
      const successModal = new Modal(document.querySelector("#success-modal"))
      modalBody.textContent = "Congrats on a strong password!"
      successModal.show()
      blinkSuccess(5)

      const hideModalOnKeyDown = (e) => {
        if (event.key === "Enter" || event.key === "Escape") {
          successModal.hide()
          document.removeEventListener("keydown", hideModalOnKeyDown)
        }
      }
      document.addEventListener("keydown", hideModalOnKeyDown)
    }
  })

  submitButton.addEventListener("touchstart", (event) => {
    event.preventDefault()
    if (!validatePassword()) {
      errorMsg.textContent = "Password must have at least 8 characters and contain at least one uppercase letter, one number, and one special character."
      blinkErrorMessage()
    } else {
      errorMsg.textContent = ""
      const successModal = new Modal(document.querySelector("#success-modal"))
      modalBody.textContent = "Congrats on a strong password!"
      successModal.show()
      blinkSuccess(5)

      const hideModalOnKeyDown = (e) => {
        if (event.key === "Enter" || event.key === "Escape") {
          successModal.hide()
          document.removeEventListener("keydown", hideModalOnKeyDown)
        }
      }
      document.addEventListener("keydown", hideModalOnKeyDown)
    }
  })

  const headerContainer = document.querySelector("#header-container")
  const container1 = document.querySelector("#header")
  createPopper(headerContainer, {
    container: container1,
    placement: "top",
    offset: [0, 20],
    sanitize: false,
    html: true
  })

  const labelContainer = document.querySelector("#label-container")
  const container2 = document.querySelector("label")
  createPopper(labelContainer, {
    container: container2,
    placement: "top",
    offset: [0, 40]
  })

  const errorContainer = document.querySelector("#error-container")
  const container3 = document.querySelector("#error-msg")
  createPopper(errorContainer, {
    container: container3,
    placement: "bottom",
    offset: [0, 15]
  })
})
