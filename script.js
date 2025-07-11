<<<<<<< HEAD
// Currency data with personality
const currencyData = {
  USD: { name: "US Dollar", symbol: "$", emoji: "🇺🇸", vibe: "The boss money!" },
  EUR: { name: "Euro", symbol: "€", emoji: "🇪🇺", vibe: "Fancy European vibes" },
  GBP: { name: "British Pound", symbol: "£", emoji: "🇬🇧", vibe: "Proper British, innit?" },
  JPY: { name: "Japanese Yen", symbol: "¥", emoji: "🇯🇵", vibe: "Kawaii money!" },
  AUD: { name: "Australian Dollar", symbol: "A$", emoji: "🇦🇺", vibe: "G'day mate!" },
  CAD: { name: "Canadian Dollar", symbol: "C$", emoji: "🇨🇦", vibe: "Sorry, eh?" },
  CHF: { name: "Swiss Franc", symbol: "CHF", emoji: "🇨🇭", vibe: "Mountain money" },
  CNY: { name: "Chinese Yuan", symbol: "¥", emoji: "🇨🇳", vibe: "Dragon power!" },
  INR: { name: "Indian Rupee", symbol: "₹", emoji: "🇮🇳", vibe: "Spicy currency!" },
  BRL: { name: "Brazilian Real", symbol: "R$", emoji: "🇧🇷", vibe: "Samba money!" },
=======
const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){ 
        // selecting USD by default as FROM currency and AFN as TO  
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "AFN" ? "selected" : "";
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target); // calling loadFlag with passing target element as an argument
    });
>>>>>>> ae70113c7467a38984acef9a78d69c5b86eaa167
}

const moods = ["😊", "🤑", "🚀", "✨", "🎉", "💰", "🔥", "⚡", "🌟", "💎"]
const funFacts = [
  "The word 'currency' comes from Latin 'currere' meaning 'to run'! 🏃‍♂️",
  "The first paper money was used in China over 1000 years ago! 🏮",
  "There are 180 currencies in the world today! 🌍",
  "The Euro is used by 19 countries! 🇪🇺",
  "Bitcoin was the first cryptocurrency! ₿",
  "The US Dollar is the most traded currency! 💵",
  "Switzerland has some of the most beautiful banknotes! 🏔️",
  "The British Pound is the oldest currency still in use! 👑",
  "Japan's currency doesn't have cents - only whole yen! 🎌",
  "Australia's money is made of plastic and waterproof! 🏄‍♂️",
]

// Global variables
let currentRates = {}
let conversionHistory = []

// DOM elements
const amountInput = document.getElementById("amountInput")
const fromCurrency = document.getElementById("fromCurrency")
const toCurrency = document.getElementById("toCurrency")
const swapBtn = document.getElementById("swapBtn")
const refreshBtn = document.getElementById("refreshBtn")
const currentMood = document.getElementById("currentMood")
const funFactText = document.getElementById("funFactText")
const resultAmount = document.getElementById("resultAmount")
const resultSymbol = document.getElementById("resultSymbol")
const resultValue = document.getElementById("resultValue")
const conversionText = document.getElementById("conversionText")
const rateBadge = document.getElementById("rateBadge")
const confettiOverlay = document.getElementById("confettiOverlay")
const historySection = document.getElementById("historySection")
const historyList = document.getElementById("historyList")

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
  updateCurrencyDisplays()
  fetchRates()
  showRandomFunFact()
})

function setupEventListeners() {
  // Amount input
  amountInput.addEventListener("input", debounce(convertCurrency, 300))

  // Currency selectors
  fromCurrency.addEventListener("change", () => {
    updateCurrencyDisplays()
    fetchRates()
  })

  toCurrency.addEventListener("change", () => {
    updateCurrencyDisplays()
    convertCurrency()
  })

  // Quick amount buttons
  document.querySelectorAll(".quick-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      amountInput.value = this.dataset.amount
      convertCurrency()

      // Fun animation
      this.style.transform = "scale(1.2) rotate(10deg)"
      setTimeout(() => {
        this.style.transform = ""
      }, 200)
    })
  })

  // Swap button
  swapBtn.addEventListener("click", swapCurrencies)

  // Refresh button
  refreshBtn.addEventListener("click", () => {
    fetchRates()
    showRandomFunFact()
  })
}

function updateCurrencyDisplays() {
  const fromCode = fromCurrency.value
  const toCode = toCurrency.value

  // Update FROM display
  document.getElementById("fromFlag").textContent = currencyData[fromCode].emoji
  document.getElementById("fromCode").textContent = fromCode
  document.getElementById("fromVibe").textContent = currencyData[fromCode].vibe

  // Update TO display
  document.getElementById("toFlag").textContent = currencyData[toCode].emoji
  document.getElementById("toCode").textContent = toCode
  document.getElementById("toVibe").textContent = currencyData[toCode].vibe

  // Update result symbol
  resultSymbol.textContent = currencyData[toCode].symbol
}

async function fetchRates() {
  const refreshIcon = document.getElementById("refreshIcon")
  const refreshText = document.getElementById("refreshText")

  // Show loading state
  refreshIcon.classList.add("spinning")
  refreshText.textContent = "Getting fresh rates..."

  // Change mood
  currentMood.textContent = moods[Math.floor(Math.random() * moods.length)]

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`)
    const data = await response.json()

    if (data.rates) {
      currentRates = data.rates
      convertCurrency()
    }
<<<<<<< HEAD
  } catch (error) {
    console.error("Rates went on vacation:", error)
    // Fallback rates for demo
    currentRates = {
      USD: 1,
      EUR: 0.85 + Math.random() * 0.1,
      GBP: 0.73 + Math.random() * 0.1,
      JPY: 110.0 + Math.random() * 10,
      AUD: 1.35 + Math.random() * 0.1,
      CAD: 1.25 + Math.random() * 0.1,
      CHF: 0.92 + Math.random() * 0.1,
      CNY: 6.45 + Math.random() * 0.5,
      INR: 74.5 + Math.random() * 5,
      BRL: 5.2 + Math.random() * 0.5,
    }
    convertCurrency()
  }

  // Reset loading state
  refreshIcon.classList.remove("spinning")
  refreshText.textContent = "Refresh Rates"
}

function convertCurrency() {
  const amount = Number.parseFloat(amountInput.value) || 0
  const fromCode = fromCurrency.value
  const toCode = toCurrency.value

  if (amount <= 0) {
    resultValue.textContent = "0.00"
    conversionText.textContent = "Enter an amount to convert!"
    rateBadge.textContent = "Rate: Waiting for input..."
    return
  }

  let rate = 1

  if (fromCode === toCode) {
    rate = 1
  } else if (fromCode === "USD") {
    rate = currentRates[toCode] || 1
  } else if (toCode === "USD") {
    rate = 1 / (currentRates[fromCode] || 1)
  } else {
    // Convert through USD
    const fromToUsd = 1 / (currentRates[fromCode] || 1)
    const usdToTo = currentRates[toCode] || 1
    rate = fromToUsd * usdToTo
  }

  const result = amount * rate

  // Update display
  resultValue.textContent = result.toFixed(2)
  conversionText.textContent = `${amount} ${currencyData[fromCode].emoji} ${fromCode} = ${result.toFixed(2)} ${currencyData[toCode].emoji} ${toCode}`
  rateBadge.textContent = `Rate: 1 ${fromCode} = ${rate.toFixed(4)} ${toCode}`

  // Add to history
  if (amount > 0) {
    addToHistory({
      from: fromCode,
      to: toCode,
      amount: amount,
      result: result,
      rate: rate,
      mood: currentMood.textContent,
      timestamp: new Date(),
    })
  }

  // Show confetti for big conversions
  if (amount >= 1000) {
    showConfetti()
  }
}

function swapCurrencies() {
  const temp = fromCurrency.value
  fromCurrency.value = toCurrency.value
  toCurrency.value = temp

  updateCurrencyDisplays()
  convertCurrency()

  // Fun mood change
  currentMood.textContent = "🔄"
  setTimeout(() => {
    currentMood.textContent = moods[Math.floor(Math.random() * moods.length)]
  }, 1000)
}

function addToHistory(conversion) {
  conversionHistory.unshift(conversion)

  // Keep only last 5 conversions
  if (conversionHistory.length > 5) {
    conversionHistory = conversionHistory.slice(0, 5)
  }

  updateHistoryDisplay()
}

function updateHistoryDisplay() {
  if (conversionHistory.length === 0) {
    historySection.style.display = "none"
    return
  }

  historySection.style.display = "block"
  historyList.innerHTML = ""

  conversionHistory.forEach((item) => {
    const historyItem = document.createElement("div")
    historyItem.className = "history-item"
    historyItem.innerHTML = `
      <div class="history-info">
        <div class="history-mood">${item.mood}</div>
        <div class="history-details">
          <div class="history-conversion">
            ${item.amount} ${currencyData[item.from].emoji} ${item.from} → ${item.result.toFixed(2)} ${currencyData[item.to].emoji} ${item.to}
          </div>
          <div class="history-time">${item.timestamp.toLocaleTimeString()}</div>
        </div>
      </div>
      <div class="history-rate">Rate: ${item.rate.toFixed(4)}</div>
    `
    historyList.appendChild(historyItem)
  })
}

function showConfetti() {
  confettiOverlay.classList.add("active")
  setTimeout(() => {
    confettiOverlay.classList.remove("active")
  }, 2000)
}

function showRandomFunFact() {
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)]
  funFactText.textContent = randomFact
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
=======
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6//latest/${fromCurrency.value}`;
    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value]; // getting user selected TO currency rate
        let totalExRate = (amountVal * exchangeRate).toFixed(2); // multiplying user entered value with selected TO currency rate
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{ // if user is offline or any other error occured while fetching data then catch function will run
        exchangeRateTxt.innerText = "Something went wrong";
    });
>>>>>>> ae70113c7467a38984acef9a78d69c5b86eaa167
}
