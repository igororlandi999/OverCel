document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle")
  const navMenu = document.querySelector(".nav-menu")
  const body = document.body

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active")
      body.classList.toggle("menu-open")

      // Toggle icon
      const icon = this.querySelector("i")
      if (icon && icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else if (icon) {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Close menu when clicking on a menu item
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      body.classList.remove("menu-open")

      const icon = menuToggle.querySelector("i")
      if (icon) {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      navMenu &&
      navMenu.classList.contains("active") &&
      !event.target.closest(".nav-menu") &&
      !event.target.closest("#menuToggle")
    ) {
      navMenu.classList.remove("active")
      body.classList.remove("menu-open")

      const icon = menuToggle.querySelector("i")
      if (icon) {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    }
  })

  // Back to Top Button
  const backToTopButton = document.getElementById("backToTop")

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("active")
      } else {
        backToTopButton.classList.remove("active")
      }
    })

    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Smooth Scroll for Article Index Links
  const indexLinks = document.querySelectorAll(".article-index a")

  indexLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Newsletter Form Submission
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')

      if (emailInput.value) {
        // Aqui você normalmente enviaria os dados para um servidor
        alert("Obrigado por se inscrever! Em breve você receberá nossas novidades.")
        emailInput.value = ""
      }
    })
  }

  // Header Scroll Effect
  const header = document.querySelector(".header")

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Lazy Load Images
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]")
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      })
    })

    lazyImages.forEach((img) => {
      imageObserver.observe(img)
    })
  }
})
