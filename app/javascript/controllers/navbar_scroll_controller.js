import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="navbar-scroll"
export default class extends Controller {
  static targets = ["navbar"]
  static values = { 
    threshold: { type: Number, default: 10 },
    hideClass: { type: String, default: "navbar-hidden" }
  }

  connect() {
    this.lastScrollTop = 0
    this.isScrolling = false
    
    // Throttle scroll events for better performance
    this.handleScroll = this.throttle(this.handleScroll.bind(this), 16)
    
    // Add scroll event listener
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    
    // Add initial styles to navbar
    this.setupNavbar()
  }

  disconnect() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  setupNavbar() {
    const navbar = this.navbarTarget
    
    // Add initial visible class
    navbar.classList.add('navbar-visible')
    
    // Ensure navbar is positioned correctly (classes should already be in HTML)
    if (!navbar.classList.contains('fixed')) {
      navbar.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'z-50')
    }
  }

  handleScroll() {
    if (this.isScrolling) return
    
    this.isScrolling = true
    
    requestAnimationFrame(() => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
      const navbar = this.navbarTarget
      
      // Only act if we've scrolled more than the threshold
      if (Math.abs(currentScrollTop - this.lastScrollTop) < this.thresholdValue) {
        this.isScrolling = false
        return
      }
      
      if (currentScrollTop > this.lastScrollTop && currentScrollTop > 100) {
        // Scrolling down - hide navbar
        this.hideNavbar()
      } else if (currentScrollTop < this.lastScrollTop) {
        // Scrolling up - show navbar
        this.showNavbar()
      }
      
      // If we're at the top of the page, always show navbar
      if (currentScrollTop <= 0) {
        this.showNavbar()
        this.removeScrolledShadow()
      } else if (currentScrollTop > 50) {
        // Add shadow when scrolled down
        this.addScrolledShadow()
      }
      
      this.lastScrollTop = currentScrollTop
      this.isScrolling = false
    })
  }

  hideNavbar() {
    const navbar = this.navbarTarget
    navbar.classList.add(this.hideClassValue)
    navbar.classList.remove('navbar-visible')
  }

  showNavbar() {
    const navbar = this.navbarTarget
    navbar.classList.remove(this.hideClassValue)
    navbar.classList.add('navbar-visible')
  }

  addScrolledShadow() {
    const navbar = this.navbarTarget
    navbar.classList.add('scrolled')
  }

  removeScrolledShadow() {
    const navbar = this.navbarTarget
    navbar.classList.remove('scrolled')
  }

  // Throttle function to limit scroll event frequency
  throttle(func, limit) {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
}