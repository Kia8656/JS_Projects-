const STORAGE_KEY = 'myLinks';
const THEME_KEY = 'themeMode';
let myLinks = [];

const inputEl = document.getElementById('input-el');
const inputBtn = document.querySelector('#input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const themeBtn = document.getElementById('theme-btn');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  if (themeBtn) {
    themeBtn.textContent = isDark ? 'Light' : 'Dark';
  }
  localStorage.setItem(THEME_KEY, theme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark') {
    applyTheme('dark');
    return;
  }

  applyTheme('light');
}

function saveLinks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(myLinks));
}

function loadLinks() {
  try {
    const storedLinks = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(storedLinks) ? storedLinks : [];
  } catch (error) {
    return [];
  }
}

function addLink(link) {
  const cleanedLink = link.trim();

  if (!cleanedLink || myLinks.includes(cleanedLink)) {
    return;
  }

  myLinks.push(cleanedLink);
  saveLinks();
  render();
}

function render() {
  if (!myLinks.length) {
    ulEl.innerHTML = '<li class="empty-state">No links saved yet.</li>';
    return;
  }

  ulEl.innerHTML = `
    <li class="toolbar">
      <label class="select-all">
        <input type="checkbox" id="select-all">
        <span>Select all</span>
      </label>
    </li>
    ${myLinks
      .map(
        (link, index) => `
          <li class="link-item">
            <label class="link-label">
              <input type="checkbox" value="${index}" class="link-checkbox">
              <a href="${link}" target="_blank" rel="noopener noreferrer" class="links">
                ${link}
              </a>
              <button type="button" class="remove-btn" data-index="${index}" aria-label="Delete link">×</button>
            </label>
          </li>
        `
      )
      .join('')}
  `;

  const selectAllCheckbox = document.getElementById('select-all');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', () => {
      const isChecked = selectAllCheckbox.checked;
      ulEl.querySelectorAll('.link-checkbox').forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
    });
  }

  ulEl.querySelectorAll('.remove-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const indexToRemove = Number(button.dataset.index);
      myLinks.splice(indexToRemove, 1);
      saveLinks();
      render();
    });
  });
}

myLinks = loadLinks();
render();

tabBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeUrl = tabs[0]?.url;

    if (!activeUrl) {
      return;
    }

    addLink(activeUrl);
  });
});

deleteBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const selectedIndexes = Array.from(
    ulEl.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => Number(checkbox.value));

  if (!selectedIndexes.length) {
    return;
  }

  myLinks = myLinks.filter((_, index) => !selectedIndexes.includes(index));
  saveLinks();
  render();
});

inputBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const value = inputEl.value;
  addLink(value);
  inputEl.value = '';
  inputEl.focus();
});

inputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    inputBtn.click();
  }
});

themeBtn.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  applyTheme(nextTheme);
});

loadTheme();


