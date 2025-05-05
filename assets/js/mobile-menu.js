document.addEventListener("DOMContentLoaded", () => {
  // Elementos do menu
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const menuOverlay = document.querySelector(".menu-overlay")
  const body = document.body

  // Abrir/fechar menu
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      menuOverlay.classList.toggle("active")
      body.classList.toggle("menu-open")

      // Toggle icon
      const icon = menuToggle.querySelector("i")
      if (icon && icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else if (icon) {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      menuOverlay.classList.remove("active")
      body.classList.remove("menu-open")

      const icon = menuToggle.querySelector("i")
      if (icon) {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  })

  // Fechar menu ao clicar no overlay
  if (menuOverlay) {
    menuOverlay.addEventListener("click", () => {
      navMenu.classList.remove("active")
      menuOverlay.classList.remove("active")
      body.classList.remove("menu-open")

      const icon = menuToggle.querySelector("i")
      if (icon) {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Fechar menu ao pressionar ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      menuOverlay.classList.remove("active")
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
})
