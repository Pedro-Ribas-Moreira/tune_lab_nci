// Open modal by clicking course card
document.querySelectorAll(".course-card").forEach(card => {
    card.addEventListener("click", () => {
        const modalId = card.getAttribute("data-modal");
        document.getElementById(modalId).style.display = "block";
    });
});

// Close modal with X button
document.querySelectorAll(".close").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.parentElement.parentElement.style.display = "none";
    });
});

// Close modal by clicking outside content
window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
    }
});