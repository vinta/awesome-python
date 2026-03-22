// State
var activeFilter = null; // { type: "cat"|"group", value: "..." }
var activeSort = { col: 'stars', order: 'desc' };
var searchInput = document.querySelector('.search');
var filterBar = document.querySelector('.filter-bar');
var filterValue = document.querySelector('.filter-value');
var filterClear = document.querySelector('.filter-clear');
var noResults = document.querySelector('.no-results');
var rows = document.querySelectorAll('.table tbody tr.row');
var tags = document.querySelectorAll('.tag');
var tbody = document.querySelector('.table tbody');

function initRevealSections() {
  var sections = document.querySelectorAll('[data-reveal]');
  if (!sections.length) return;

  if (!('IntersectionObserver' in window)) {
    sections.forEach(function (section) {
      section.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px',
  });

  sections.forEach(function (section, index) {
    section.classList.add('will-reveal');
    section.style.transitionDelay = Math.min(index * 70, 180) + 'ms';
    observer.observe(section);
  });
}

initRevealSections();

// Pause hero animations when scrolled out of view
(function () {
  var hero = document.querySelector('.hero');
  if (!hero || !('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    hero.classList.toggle('offscreen', !entries[0].isIntersecting);
  });
  observer.observe(hero);
})();

// Relative time formatting
function relativeTime(isoStr) {
  var date = new Date(isoStr);
  var now = new Date();
  var diffMs = now - date;
  var diffHours = Math.floor(diffMs / 3600000);
  var diffDays = Math.floor(diffMs / 86400000);
  if (diffHours < 1) return 'just now';
  if (diffHours < 24) return diffHours === 1 ? '1 hour ago' : diffHours + ' hours ago';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 30) return diffDays + ' days ago';
  var diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return diffMonths === 1 ? '1 month ago' : diffMonths + ' months ago';
  var diffYears = Math.floor(diffDays / 365);
  return diffYears === 1 ? '1 year ago' : diffYears + ' years ago';
}

// Format all commit date cells
document.querySelectorAll('.col-commit[data-commit]').forEach(function (td) {
  var time = td.querySelector('time');
  if (time) time.textContent = relativeTime(td.dataset.commit);
});

// Store original row order for sort reset
rows.forEach(function (row, i) {
  row._origIndex = i;
  row._expandRow = row.nextElementSibling;
});

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
      var attr = activeFilter.type === 'cat' ? row.dataset.cats : row.dataset.groups;
      show = attr ? attr.split('||').indexOf(activeFilter.value) !== -1 : false;
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

    if (row.hidden !== !show) row.hidden = !show;

    if (show) {
      visibleCount++;
      var numCell = row.cells[0];
      if (numCell.textContent !== String(visibleCount)) {
        numCell.textContent = String(visibleCount);
      }
    }
  });

  if (noResults) noResults.hidden = visibleCount > 0;

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
      filterBar.classList.add('visible');
      if (filterValue) filterValue.textContent = activeFilter.value;
    } else {
      filterBar.classList.remove('visible');
    }
  }

  updateURL();
}

function updateURL() {
  var params = new URLSearchParams();
  var query = searchInput ? searchInput.value.trim() : '';
  if (query) params.set('q', query);
  if (activeFilter) {
    params.set(activeFilter.type === 'cat' ? 'category' : 'group', activeFilter.value);
  }
  if (activeSort.col !== 'stars' || activeSort.order !== 'desc') {
    params.set('sort', activeSort.col);
    params.set('order', activeSort.order);
  }
  var qs = params.toString();
  history.replaceState(null, '', qs ? '?' + qs : location.pathname);
}

function getSortValue(row, col) {
  if (col === 'name') {
    return row.querySelector('.col-name a').textContent.trim().toLowerCase();
  }
  if (col === 'stars') {
    var text = row.querySelector('.col-stars').textContent.trim().replace(/,/g, '');
    var num = parseInt(text, 10);
    return isNaN(num) ? -1 : num;
  }
  if (col === 'commit-time') {
    var attr = row.querySelector('.col-commit').getAttribute('data-commit');
    return attr ? new Date(attr).getTime() : 0;
  }
  return 0;
}

function sortRows() {
  var arr = Array.prototype.slice.call(rows);
  var col = activeSort.col;
  var order = activeSort.order;

  // Cache sort values once to avoid DOM queries per comparison
  arr.forEach(function (row) {
    row._sortVal = getSortValue(row, col);
  });

  arr.sort(function (a, b) {
    var aVal = a._sortVal;
    var bVal = b._sortVal;
    if (col === 'name') {
      var cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      if (cmp === 0) return a._origIndex - b._origIndex;
      return order === 'desc' ? -cmp : cmp;
    }
    if (aVal <= 0 && bVal <= 0) return a._origIndex - b._origIndex;
    if (aVal <= 0) return 1;
    if (bVal <= 0) return -1;
    var cmp = aVal - bVal;
    if (cmp === 0) return a._origIndex - b._origIndex;
    return order === 'desc' ? -cmp : cmp;
  });

  var frag = document.createDocumentFragment();
  arr.forEach(function (row) {
    frag.appendChild(row);
    frag.appendChild(row._expandRow);
  });
  tbody.appendChild(frag);
  applyFilters();
}

function updateSortIndicators() {
  document.querySelectorAll('th[data-sort]').forEach(function (th) {
    th.classList.remove('sort-asc', 'sort-desc');
    if (activeSort && th.dataset.sort === activeSort.col) {
      th.classList.add('sort-' + activeSort.order);
      th.setAttribute('aria-sort', activeSort.order === 'asc' ? 'ascending' : 'descending');
    } else {
      th.removeAttribute('aria-sort');
    }
  });
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

// No-results clear
var noResultsClear = document.querySelector('.no-results-clear');
if (noResultsClear) {
  noResultsClear.addEventListener('click', function () {
    if (searchInput) searchInput.value = '';
    activeFilter = null;
    applyFilters();
  });
}

// Column sorting
document.querySelectorAll('th[data-sort]').forEach(function (th) {
  th.addEventListener('click', function () {
    var col = th.dataset.sort;
    var defaultOrder = col === 'name' ? 'asc' : 'desc';
    var altOrder = defaultOrder === 'asc' ? 'desc' : 'asc';
    if (activeSort && activeSort.col === col) {
      if (activeSort.order === defaultOrder) activeSort = { col: col, order: altOrder };
      else activeSort = { col: 'stars', order: 'desc' };
    } else {
      activeSort = { col: col, order: defaultOrder };
    }
    sortRows();
    updateSortIndicators();
  });
});

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

// Back to top
var backToTop = document.querySelector('.back-to-top');
var resultsSection = document.querySelector('#library-index');
var tableWrap = document.querySelector('.table-wrap');
var stickyHeaderCell = backToTop ? backToTop.closest('th') : null;

function updateBackToTopVisibility() {
  if (!backToTop || !tableWrap || !stickyHeaderCell) return;

  var tableRect = tableWrap.getBoundingClientRect();
  var headRect = stickyHeaderCell.getBoundingClientRect();
  var hasPassedHeader = tableRect.top <= 0 && headRect.bottom > 0;

  backToTop.classList.toggle('visible', hasPassedHeader);
}

if (backToTop) {
  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        updateBackToTopVisibility();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  window.addEventListener('resize', updateBackToTopVisibility);

  backToTop.addEventListener('click', function () {
    var target = searchInput || resultsSection;
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (searchInput) searchInput.focus();
  });

  updateBackToTopVisibility();
}

// Restore state from URL
(function () {
  var params = new URLSearchParams(location.search);
  var q = params.get('q');
  var cat = params.get('category');
  var group = params.get('group');
  var sort = params.get('sort');
  var order = params.get('order');
  if (q && searchInput) searchInput.value = q;
  if (cat) activeFilter = { type: 'cat', value: cat };
  else if (group) activeFilter = { type: 'group', value: group };
  if ((sort === 'name' || sort === 'stars' || sort === 'commit-time') && (order === 'desc' || order === 'asc')) {
    activeSort = { col: sort, order: order };
  }
  if (q || cat || group || sort) {
    sortRows();
  }
  updateSortIndicators();
})();
