// theme-toggle.js — Step 4: persist preference with correct priority logic
//
// Theme is applied in this exact order on every page load:
//   1. localStorage  — user's explicit choice always wins
//   2. prefers-color-scheme — OS preference if no saved choice
//   3. default light — fallback if neither is set

const html = document.documentElement;
const VALID_THEMES = ['dark', 'light'];

// ─── Safe localStorage helpers ────────────────────────────
// FIX: wrapped in try/catch so private browsing (Safari etc.)
// doesn't throw a SecurityError and break the whole script
function getSaved() {
    try {
        return localStorage.getItem('theme');
    } catch {
        return null;
    }
}

function setSaved(theme) {
    try {
        localStorage.setItem('theme', theme);
    } catch {
        // Fail silently — toggle still works, just won't persist
    }
}

// ─── Apply theme on page load ─────────────────────────────
(function applyThemeOnLoad() {
    // Step 1: Block transitions during load to prevent flash
    html.classList.add('no-transition');

    // Step 2: Determine which theme to apply
    const raw = getSaved();

    // FIX: validate the saved value — only accept 'dark' or 'light'.
    // Corrupted, old, or third-party values are treated as no preference.
    const saved = VALID_THEMES.includes(raw) ? raw : null;

    const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let theme;
    if (saved) {
        // User made an explicit choice — always honour it
        theme = saved;
    } else if (osPrefersDark) {
        // No saved choice — respect the OS setting
        theme = 'dark';
    } else {
        // No saved choice, OS is light or unsupported — default to light
        theme = 'light';
    }

    html.setAttribute('data-theme', theme);

    // Step 3: Re-enable transitions after a short delay
    // requestAnimationFrame ensures the theme is painted before
    // transitions are restored, preventing the load flash
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            html.classList.remove('no-transition');
        });
    });
})();

// ─── Toggle on button click ───────────────────────────────
function toggleTheme() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);

    // Save the explicit user choice to localStorage
    setSaved(newTheme);
}

// Wire up both desktop and mobile toggle buttons
document.querySelectorAll('.theme-toggle, .theme-toggle-mobile')
    .forEach(btn => btn.addEventListener('click', toggleTheme));

// ─── Keep in sync if OS preference changes while page is open ─
// e.g. user switches OS dark mode while browsing — but ONLY if
// they haven't made a manual choice (no localStorage entry)
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
        const raw = getSaved();
        const saved = VALID_THEMES.includes(raw) ? raw : null;
        if (!saved) {
            // No valid manual choice saved — follow the OS change
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
        // If there IS a saved choice, do nothing — user preference wins
    });