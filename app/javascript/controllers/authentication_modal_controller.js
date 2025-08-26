import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["loginModal"]

  open() {
    this.loginModalTarget.showModal()
  }

  close() {
    this.loginModalTarget.close()
  }

  closeOnBackdrop(event) {
    if (event.target === this.loginModalTarget) {
      this.close()
    }
  }
}