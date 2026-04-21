// =============================================
// QUOTES APP - API Integration Project
// API Used: DummyJSON (https://dummyjson.com)
// Free API, No key needed, CORS supported
// =============================================

// API ka address - yahan se random quote maangenge
const API_URL = "https://dummyjson.com/quotes/random";

// HTML elements ko JavaScript mein pakadna (id se dhoondh rahe hain)
const quoteText = document.getElementById("quoteText");   // quote wali line
const quoteAuthor = document.getElementById("quoteAuthor"); // author wali line
const loader = document.getElementById("loader");          // loading dots
const errorMsg = document.getElementById("errorMsg");      // error message
const copyBtn = document.getElementById("copyBtn");        // copy button

// =============================================
// MAIN FUNCTION - API se quote fetch karna
// async = yeh function internet se data maangta hai
// =============================================
async function fetchQuote() {

  showLoader(true);          // loading dots dikhao
  errorMsg.textContent = ""; // pehle wala error saaf karo
  
  // quote aur author ko invisible karo (animation ke liye)
  quoteText.style.opacity = "0";
  quoteAuthor.style.opacity = "0";

  try {
    // API ko request bhejo - "ek random quote do"
    const response = await fetch(API_URL);
    // await = jab tak jawab na aaye, ruko

    // agar API ne error diya (internet off, etc.)
    if (!response.ok) {
      throw new Error("Failed to fetch quote. Try again!");
    }

    // API ka jawab JSON format mein convert karo
    // data = { id: 1, quote: "...", author: "..." }
    const data = await response.json();

    // API se aaya quote aur author HTML mein daalo
    quoteText.textContent = data.quote;
    quoteAuthor.textContent = "— " + data.author;

    // Fade-in animation dobara chalao
    // (pehle "none" karte hain taaki reset ho)
    quoteText.style.animation = "none";
    quoteAuthor.style.animation = "none";
    quoteText.offsetHeight; // browser ko force karo refresh karne ke liye
    quoteText.style.animation = "fadeUp 0.5s ease forwards";
    quoteAuthor.style.animation = "fadeUp 0.5s ease 0.1s forwards";

  } catch (error) {
    // Kuch galat hua toh - error message dikhao
    errorMsg.textContent = "⚠ " + error.message;
    quoteText.textContent = "Something went wrong. Please try again.";
    quoteAuthor.textContent = "— Unknown";
    quoteText.style.opacity = "1";
    quoteAuthor.style.opacity = "1";

  } finally {
    // try ya catch - dono ke baad loading dots band karo
    showLoader(false);
  }
}

// =============================================
// COPY FUNCTION - quote clipboard mein copy karna
// =============================================
function copyQuote() {
  // quote aur author ek saath copy karo
  const text = `"${quoteText.textContent}" ${quoteAuthor.textContent}`;
  
  // browser ka built-in clipboard API use karo
  navigator.clipboard.writeText(text).then(() => {
    // Copy successful - button ka text change karo
    copyBtn.innerHTML = "<span>Copied! ✓</span>";
    copyBtn.classList.add("copied"); // green color CSS class

    // 2 second baad button wapas normal kar do
    setTimeout(() => {
      copyBtn.innerHTML = "<span>Copy</span>";
      copyBtn.classList.remove("copied");
    }, 2000);
  });
}

// =============================================
// LOADER FUNCTION - loading dots show/hide karna
// =============================================
function showLoader(show) {
  if (show) {
    loader.classList.add("active");    // dots dikhao
  } else {
    loader.classList.remove("active"); // dots chhupaao
  }
}

// Page load hote hi automatically ek quote fetch karo
// (button click ka wait nahi karna)
window.onload = fetchQuote;