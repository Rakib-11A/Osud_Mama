import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="login-modal"
export default class extends Controller {
  static targets = ["loginModal","registrationModal"]
  connect() {
    console.log("Authentication Modal Controller connected!")
  }
  open(event){
    event.preventDefault()
    this.openModal("login-modal")
    this.openModal("registration-modal")
  }
  close(event){
    event.preventDefault()
    this.closeModal("login-modal")
    this.closeModal("registration-modal")
  }
  openModal(modalId){
    const modal = document.getElementById(modalId)
    if(modal){
      modal.classList.remove("hidden")
    }else{
      console.log(`${modalId} ---> not found`)
    }
  }

  closeModal(modalId){
    const modal = document.getElementById(modalId)
    if(modal){
      modal.classList.add("hidden")
    }else{
      console.log(`${modalId} ---> not found`)
    }
  }
}
