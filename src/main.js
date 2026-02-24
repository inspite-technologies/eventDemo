import './style.css'

// Dark Mode Toggle Logic
const themeToggle = document.querySelector('#theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

const updateThemeIcon = (isDark) => {
  if (isDark) {
    themeIcon.textContent = 'light_mode';
  } else {
    themeIcon.textContent = 'dark_mode';
  }
};

// Check for saved theme or preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  htmlElement.classList.add('dark');
  htmlElement.classList.remove('light');
  updateThemeIcon(true);
} else {
  htmlElement.classList.add('light');
  htmlElement.classList.remove('dark');
  updateThemeIcon(false);
}

themeToggle.addEventListener('click', () => {
  const isDark = htmlElement.classList.contains('dark');
  if (isDark) {
    htmlElement.classList.remove('dark');
    htmlElement.classList.add('light');
    localStorage.setItem('theme', 'light');
    updateThemeIcon(false);
  } else {
    htmlElement.classList.remove('light');
    htmlElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    updateThemeIcon(true);
  }
});

// Form Submission Handling (Demo)
const bookingForm = document.querySelector('form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        `;
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      submitBtn.innerHTML = `
                <span>Enquiry Sent!</span>
                <span class="material-symbols-outlined">check_circle</span>
            `;
      submitBtn.classList.remove('bg-primary');
      submitBtn.classList.add('bg-green-600');

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.classList.add('bg-primary');
        submitBtn.classList.remove('bg-green-600');
        submitBtn.disabled = false;
        bookingForm.reset();
      }, 3000);
    }, 1500);
  });
}
// Horizontal Scroll for Upcoming Events
const scrollContainer = document.querySelector('.custom-scrollbar');
const leftBtn = document.querySelector('button span:contains("chevron_left")')?.parentElement;
const rightBtn = document.querySelector('button span:contains("chevron_right")')?.parentElement;

// Since :contains isn't standard JS selector, let's use a more robust way
const navButtons = document.querySelectorAll('main section:nth-of-type(3) .flex.gap-2 button');
const prevBtn = navButtons[0];
const nextBtn = navButtons[1];

if (scrollContainer && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -400, behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: 400, behavior: 'smooth' });
  });
}
