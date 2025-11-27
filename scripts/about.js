// Find every toggle button and wire it up to its card
document.querySelectorAll(".toggle-bio").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".instructor-card");
    const bio = card.querySelector(".teacher-bio");
    const isHidden = bio.classList.toggle("hidden");

    btn.textContent = isHidden ? "Show Bio" : "Hide Bio";
    btn.setAttribute("aria-expanded", String(!isHidden));
  });
});