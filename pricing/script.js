const prices = {
  child: { lesson: 20, bundle: 70 },
  student: { lesson: 25, bundle: 90 },
  adult: { lesson: 35, bundle: 120 }
};

function calculatePrice() {
  const status = document.getElementById("status").value;
  const type = document.getElementById("type").value;
  const format = document.getElementById("format").value;
  const priceDisplay = document.getElementById("price");

  if (status && type && format) {
    let basePrice = prices[status][type];

    // Apply discount based on format
    if (format === "online") {
      basePrice *= 0.9; // 10% off
    } else if (format === "group") {
      basePrice *= 0.8; // 20% off
    }

    priceDisplay.textContent = "€" + basePrice.toFixed(2);
  } else {
    priceDisplay.textContent = "€0";
  }
}

document.getElementById("course").addEventListener("change", calculatePrice);
document.getElementById("status").addEventListener("change", calculatePrice);
document.getElementById("type").addEventListener("change", calculatePrice);
document.getElementById("format").addEventListener("change", calculatePrice);
