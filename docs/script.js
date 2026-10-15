const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('path').setAttribute('d', 'M4 8h16M4 16h16');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  navigation.classList.toggle('open', !isOpen);
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.querySelector('path').setAttribute('d', isOpen ? 'M4 8h16M4 16h16' : 'm5 5 14 14M5 19 19 5');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
const filters = document.querySelectorAll('[data-filter]');
const notes = document.querySelectorAll('[data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  notes.forEach(note => {
    const visible = button.dataset.filter === 'all' || note.dataset.category === button.dataset.filter;
    note.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector('#notes-count').textContent = `${count} 篇精选`;
}));
