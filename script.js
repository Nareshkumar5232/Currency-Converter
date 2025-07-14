document.addEventListener("DOMContentLoaded", () => {
  const amountInput = document.getElementById("amountInput");
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const fromCode = document.getElementById("fromCode");
  const toCode = document.getElementById("toCode");
  const fromFlag = document.getElementById("fromFlag");
  const toFlag = document.getElementById("toFlag");
  const swapBtn = document.getElementById("swapBtn");
  const refreshBtn = document.getElementById("refreshBtn");
  const refreshText = document.getElementById("refreshText");
  const historySection = document.getElementById("historySection");
  const historyList = document.getElementById("historyList");

  const confettiOverlay = document.getElementById("confettiOverlay");

  const flagMap = {
    USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵",
    AUD: "🇦🇺", CAD: "🇨🇦", CHF: "🇨🇭", CNY: "🇨🇳",
    INR: "🇮🇳", BRL: "🇧🇷"
  };

  function getFlag(currency) {
    return flagMap[currency] || "🏳️";
  }

  function updateDisplays() {
    fromCode.textContent = fromCurrency.value;
    toCode.textContent = toCurrency.value;
    fromFlag.textContent = getFlag(fromCurrency.value);
    toFlag.textContent = getFlag(toCurrency.value);
  }

  function showConfetti() {
    confettiOverlay.style.display = "flex";
    setTimeout(() => {
      confettiOverlay.style.display = "none";
    }, 1000);
  }

  function addToHistory(amount, from, to, result) {
    const item = document.createElement("div");
    item.className = "history-item";
    item.textContent = `${amount} ${from} → ${result.toFixed(2)} ${to}`;
    historyList.prepend(item);
    historySection.style.display = "block";
  }

  async function fetchRates() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount!");
      return;
    }

    try {
      refreshText.textContent = "Loading...";
      const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
      const res = await fetch(url);
      const data = await res.json();
      const rate = data.rates[to];
      if (!rate) throw new Error("Invalid conversion rate");

      const result = amount * rate;
      addToHistory(amount, from, to, result);
      showConfetti();
      refreshText.textContent = "Refresh Rates";
    } catch (err) {
      alert("Error fetching rates. Try again later.");
      console.error(err);
      refreshText.textContent = "Refresh Rates";
    }
  }

  swapBtn.addEventListener("click", () => {
    // Swap values
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    updateDisplays();
    fetchRates(); // Auto-refresh after swap
  });

  refreshBtn.addEventListener("click", fetchRates);

  fromCurrency.addEventListener("change", updateDisplays);
  toCurrency.addEventListener("change", updateDisplays);

  updateDisplays(); // Initialize
});
