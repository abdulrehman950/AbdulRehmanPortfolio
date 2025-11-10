// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeIcon = themeToggle.querySelector("i");

// utility to update navLinks top to header height CSS variable
function getHeaderHeightVar() {
  const v = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-height"
  );
  return v ? v.trim() : "72px";
}

function updateNavTop() {
  if (!navLinks) return;
  try {
    const hv = getHeaderHeightVar();
    navLinks.style.top = hv;
  } catch (e) {
    /* ignore */
  }
}

// initialize nav top
updateNavTop();
window.addEventListener("resize", updateNavTop);

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
// also set on body for broader compatibility
document.body && document.body.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  document.body && document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
  themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact form handling with email functionality
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const statusElement = document.getElementById("form-status");
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    try {
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;

      const response = await fetch(
        "https://formspree.io/f/mwpwrvvw",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        statusElement.textContent =
          "Thank you for your message! I'll get back to you soon.";
        statusElement.style.color = "var(--primary-color)";
        contactForm.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      statusElement.textContent = "Failed to send message. Please try again.";
      statusElement.style.color = "red";
    } finally {
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    }
  });
}

// (Removed email subscription UI) subscription removed — contact button links to contact section

// Mobile menu toggle
mobileMenuToggle.addEventListener("click", () => {
  if (!navLinks) return;
  navLinks.classList.toggle("active");
  // ensure top is set under header in case header height changed
  updateNavTop();
  const expanded = navLinks.classList.contains("active");
  mobileMenuToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  const spans = mobileMenuToggle.querySelectorAll("span");
  spans[0].style.transform = expanded
    ? "rotate(45deg) translate(5px, 5px)"
    : "none";
  spans[1].style.opacity = expanded ? "0" : "1";
  spans[2].style.transform = expanded
    ? "rotate(-45deg) translate(5px, -5px)"
    : "none";
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const spans = mobileMenuToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".skill-bar");
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.width =
        entry.target.parentElement.dataset.progress || "0%";
    }
  });
}, observerOptions);

skillBars.forEach((bar) => observer.observe(bar));

// Roles typewriter (JS-driven) — "Abdul Rehman" remains static
const roleEl = document.getElementById("role-text");
const roles = [
  "Frontend Developer",
  "React learner",
  "JavaScript learner",
  "Figma UI/UX Designer",
];
const typingSpeed = 80; // ms per char
const deletingSpeed = 40;
const holdDelay = 1400; // ms to hold full word

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeString(text) {
  for (let i = 0; i <= text.length; i++) {
    roleEl.textContent = text.slice(0, i);
    await sleep(typingSpeed);
  }
}

async function deleteString(text) {
  for (let i = text.length; i >= 0; i--) {
    roleEl.textContent = text.slice(0, i);
    await sleep(deletingSpeed);
  }
}

async function startRolesLoop() {
  if (!roleEl) return;
  let idx = 0;
  while (true) {
    const text = roles[idx];
    await typeString(text);
    await sleep(holdDelay);
    await deleteString(text);
    idx = (idx + 1) % roles.length;
    await sleep(300);
  }
}

// start when ready
// Import Hadees quotes from hadees.js
const hadeesQuotes = [
  {
    text: "جو شخص اپنی زبان اور ہاتھ سے دوسروں کو تکلیف نہ پہنچائے وہ سب سے بہتر مسلمان ہے۔",
    reference: "صحیح البخاری",
    number: "6136",
    status: "صحیح",
  },
  {
    text: "طاقتور وہ نہیں جو کشتی میں کسی کو پچھاڑ دے بلکہ طاقتور وہ ہے جو غصے کے وقت اپنے آپ پر قابو رکھے۔",
    reference: "صحیح البخاری",
    number: "6114",
    status: "صحیح",
  },
  {
    text: "جو شخص اللہ اور قیامت کے دن پر ایمان رکھتا ہے اسے چاہیے کہ وہ اچھی بات کہے یا خاموش رہے۔",
    reference: "صحیح البخاری",
    number: "6475",
    status: "صحیح",
  },
  {
    text: "اچھی بات بھی صدقہ ہے۔",
    reference: "صحیح البخاری",
    number: "2989",
    status: "صحیح",
  },
  {
    text: "اپنے بھائی کے چہرے پر مسکرانا بھی صدقہ ہے۔",
    reference: "جامع الترمذی",
    number: "1956",
    status: "حسن",
  },
  {
    text: "جو لوگوں کا شکریہ ادا نہیں کرتا وہ اللہ کا شکر بھی ادا نہیں کرتا۔",
    reference: "سنن ابی داؤد",
    number: "4811",
    status: "صحیح",
  },
  {
    text: "آسانی پیدا کرو، سختی نہ کرو، خوشخبری دو، نفرت نہ پھیلاؤ۔",
    reference: "صحیح البخاری",
    number: "6125",
    status: "صحیح",
  },
];

// Function to get daily Hadees based on the day of year
function getDailyHadees() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % hadeesQuotes.length;
  return hadeesQuotes[index];
}

// Function to display daily Hadees
function displayDailyHadees() {
  const quoteText = document.getElementById("hadees-quote");
  const quoteReference = document.getElementById("hadees-reference");
  const quoteNumber = document.getElementById("hadees-number");
  const quoteStatus = document.getElementById("hadees-status");
  const dateElement = document.getElementById("hadees-date");

  if (!quoteText || !quoteReference || !quoteNumber || !quoteStatus) return;

  const { text, reference, number, status } = getDailyHadees();
  const today = new Date();
  const dateStr = today.toLocaleDateString("ur-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  quoteText.textContent = text;
  quoteReference.textContent = reference;
  quoteNumber.textContent = "حدیث نمبر: " + number;
  quoteStatus.textContent = "درجہ: " + status;
  if (dateElement) {
    dateElement.textContent = dateStr;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  startRolesLoop().catch(console.error);

  // Initial Hadees display
  displayDailyHadees();

  // Update the quote at midnight
  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  const timeToMidnight = tomorrow - now;

  setTimeout(() => {
    displayDailyHadees();
    // After the first midnight update, update every 24 hours
    setInterval(displayDailyHadees, 24 * 60 * 60 * 1000);
  }, timeToMidnight);
});
   const defaultTitle = document.title;
  const awayTitles = [
        "Hey! Come back 😢",
        "We miss you 👋",
        "you are there? 👀",
        "Don't leave us!",
        "Your site is lonely 😔",
        "Hello? Come back!",
        "Stay a while! 😊",
        "You left me on read... 😞",
      ];

      // function to pick random title
      function getRandomTitle() {
        const index = Math.floor(Math.random() * awayTitles.length);
        return awayTitles[index];
      }

      // Tab chhodne par
      window.addEventListener("blur", () => {
        document.title = getRandomTitle();
      });

      // Tab wapas aane par
      window.addEventListener("focus", () => {
        document.title = defaultTitle;
      });




