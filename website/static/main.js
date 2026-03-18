// State
var activeFilter = null; // { type: "cat"|"group", value: "..." }
var searchInput = document.querySelector('.search');
var filterBar = document.querySelector('.filter-bar');
var filterValue = document.querySelector('.filter-value');
var filterClear = document.querySelector('.filter-clear');
var noResults = document.querySelector('.no-results');
var countEl = document.querySelector('.count');
var rows = document.querySelectorAll('.table tbody tr.row');
var tags = document.querySelectorAll('.tag');
var tbody = document.querySelector('.table tbody');

function collapseAll() {
  var openRows = document.querySelectorAll('.table tbody tr.row.open');
  openRows.forEach(function (row) {
    row.classList.remove('open');
    row.setAttribute('aria-expanded', 'false');
  });
}

function applyFilters() {
  var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  var visibleCount = 0;

  // Collapse all expanded rows on filter/search change
  collapseAll();

  rows.forEach(function (row) {
    var show = true;

    // Category/group filter
    if (activeFilter) {
      show = row.dataset[activeFilter.type] === activeFilter.value;
    }

    // Text search
    if (show && query) {
      if (!row._searchText) {
        var text = row.textContent.toLowerCase();
        var next = row.nextElementSibling;
        if (next && next.classList.contains('expand-row')) {
          text += ' ' + next.textContent.toLowerCase();
        }
        row._searchText = text;
      }
      show = row._searchText.includes(query);
    }

    row.hidden = !show;

    if (show) {
      visibleCount++;
      row.querySelector('.col-num').textContent = String(visibleCount);
    }
  });

  if (noResults) noResults.hidden = visibleCount > 0;
  if (countEl) countEl.textContent = visibleCount;

  // Update tag highlights
  tags.forEach(function (tag) {
    var isActive = activeFilter
      && tag.dataset.type === activeFilter.type
      && tag.dataset.value === activeFilter.value;
    tag.classList.toggle('active', isActive);
  });

  // Filter bar
  if (filterBar) {
    if (activeFilter) {
      filterBar.hidden = false;
      if (filterValue) filterValue.textContent = activeFilter.value;
    } else {
      filterBar.hidden = true;
    }
  }
}

// Expand/collapse: event delegation on tbody
if (tbody) {
  tbody.addEventListener('click', function (e) {
    // Don't toggle if clicking a link or tag button
    if (e.target.closest('a') || e.target.closest('.tag')) return;

    var row = e.target.closest('tr.row');
    if (!row) return;

    var isOpen = row.classList.contains('open');
    if (isOpen) {
      row.classList.remove('open');
      row.setAttribute('aria-expanded', 'false');
    } else {
      row.classList.add('open');
      row.setAttribute('aria-expanded', 'true');
    }
  });

  // Keyboard: Enter or Space on focused .row toggles expand
  tbody.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var row = e.target.closest('tr.row');
    if (!row) return;
    e.preventDefault();
    row.click();
  });
}

// Tag click: filter by category or group
tags.forEach(function (tag) {
  tag.addEventListener('click', function (e) {
    e.preventDefault();
    var type = tag.dataset.type;
    var value = tag.dataset.value;

    // Toggle: click same filter again to clear
    if (activeFilter && activeFilter.type === type && activeFilter.value === value) {
      activeFilter = null;
    } else {
      activeFilter = { type: type, value: value };
    }
    applyFilters();
  });
});

// Clear filter
if (filterClear) {
  filterClear.addEventListener('click', function () {
    activeFilter = null;
    applyFilters();
  });
}

// Search input
if (searchInput) {
  var searchTimer;
  searchInput.addEventListener('input', function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(applyFilters, 150);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      activeFilter = null;
      applyFilters();
      searchInput.blur();
    }
  });
}
