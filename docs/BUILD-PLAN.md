<H1>Steps from Claude to create a Dark Mode Option </H1>

<ul>
  <li>
    <strong>Step 1 — Add the dark palette + fix hardcoded colors</strong>
    <ul>
      <li>Replace all hardcoded <code>#e9ecef</code> values with a new <code>--border-color</code> variable in <code>:root</code>.</li>
      <li>Add a <code>[data-theme="dark"]</code> block that overrides your existing CSS variables.</li>
      <li>Test by manually adding <code>data-theme="dark"</code> to the <code>&lt;html&gt;</code> element in DevTools.</li>
      <li>Fix footer by replacing <code>background-color: var(--text-dark)</code> with a dedicated <code>--footer-bg</code> variable.</li>
    </ul>
  </li>

  <li>
    <strong>Step 2 — Add smooth transitions</strong>
    <ul>
      <li>Add <code>transition: background-color 0.3s ease, color 0.3s ease</code> to <code>body</code>, <code>.navbar</code>, <code>.feature-card</code>, <code>.contact-form</code>, and form inputs.</li>
      <li>Test transitions by toggling <code>data-theme</code> in DevTools.</li>
    </ul>
  </li>

  <li>
    <strong>Step 3 — Add and wire the toggle button</strong>
    <ul>
      <li>Place a sun/moon icon button in the navbar.</li>
      <li>Use JavaScript to toggle <code>data-theme="dark"</code> on the <code>&lt;html&gt;</code> element and flip the icon.</li>
      <li>Ensure the button is functional immediately—avoid leaving a dead toggle.</li>
      <li>Test clicking back and forth on all pages.</li>
    </ul>
  </li>

  <li>
    <strong>Step 4 — Persist preference with correct priority logic</strong>
    <ul>
      <li>On page load, apply theme in this order: localStorage → OS <code>prefers-color-scheme</code> → default light.</li>
      <li>Test by toggling, refreshing, navigating pages, and switching OS dark mode with no saved preference.</li>
    </ul>
  </li>

  <li>
    <strong>Step 5 — Final polish pass</strong>
    <ul>
      <li>Check every page in both modes for missed elements.</li>
      <li>Review hover states, SVG logo fills, placeholder text color, and scrollbar styling.</li>
      <li>Fix any remaining inconsistencies.</li>
    </ul>
  </li>
</ul>
