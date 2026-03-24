const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function getScrollBehavior() {
  return reducedMotion.matches ? "auto" : "smooth";
}

let activeFilter = null;
let activeSort = { col: "stars", order: "desc" };
const searchInput = document.querySelector(".search");
const filterBar = document.querySelector(".filter-bar");
const filterValue = document.querySelector(".filter-value");
const filterClear = document.querySelector(".filter-clear");
const noResults = document.querySelector(".no-results");
const rows = document.querySelectorAll(".table tbody tr.row");
const tags = document.querySelectorAll(".tag");
const tbody = document.querySelector(".table tbody");

function initRevealSections() {
  const sections = document.querySelectorAll("[data-reveal]");
  if (!sections.length) return;

  if (!("IntersectionObserver" in window)) {
    sections.forEach(function (section) {
      section.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  sections.forEach(function (section, index) {
    section.classList.add("will-reveal");
    section.style.transitionDelay = Math.min(index * 70, 180) + "ms";
    observer.observe(section);
  });
}

initRevealSections();

// Smooth scroll without hash in URL
document.querySelectorAll("[data-scroll-to]").forEach(function (link) {
  link.addEventListener("click", function (e) {
    const el = document.getElementById(link.dataset.scrollTo);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: getScrollBehavior() });
  });
});

// Pause hero animations when scrolled out of view
(function () {
  const hero = document.querySelector(".hero");
  if (!hero || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(function (entries) {
    hero.classList.toggle("offscreen", !entries[0].isIntersecting);
  });
  observer.observe(hero);
})();

function relativeTime(isoStr) {
  const date = new Date(isoStr);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffHours < 1) return "just now";
  if (diffHours < 24)
    return diffHours === 1 ? "1 hour ago" : diffHours + " hours ago";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return diffDays + " days ago";
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12)
    return diffMonths === 1 ? "1 month ago" : diffMonths + " months ago";
  const diffYears = Math.floor(diffDays / 365);
  return diffYears === 1 ? "1 year ago" : diffYears + " years ago";
}

document.querySelectorAll(".col-commit[data-commit]").forEach(function (td) {
  const time = td.querySelector("time");
  if (time) time.textContent = relativeTime(td.dataset.commit);
});

document
  .querySelectorAll(".expand-commit time[datetime]")
  .forEach(function (time) {
    time.textContent = relativeTime(time.getAttribute("datetime"));
  });

rows.forEach(function (row, i) {
  row._origIndex = i;
  row._expandRow = row.nextElementSibling;
});

function collapseAll() {
  if (!tbody) return;
  const openRows = tbody.querySelectorAll("tr.row.open");
  openRows.forEach(function (row) {
    row.classList.remove("open");
    row.setAttribute("aria-expanded", "false");
  });
}

function applyFilters() {
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  let visibleCount = 0;

  collapseAll();

  rows.forEach(function (row) {
    let show = true;

    if (activeFilter) {
      const rowTags = row.dataset.tags;
      show = rowTags ? rowTags.split("||").includes(activeFilter) : false;
    }

    if (show && query) {
      if (!row._searchText) {
        let text = row.textContent.toLowerCase();
        const next = row.nextElementSibling;
        if (next && next.classList.contains("expand-row")) {
          text += " " + next.textContent.toLowerCase();
        }
        row._searchText = text;
      }
      show = row._searchText.includes(query);
    }

    if (row.hidden !== !show) row.hidden = !show;

    if (show) {
      visibleCount++;
      const numCell = row.cells[0];
      if (numCell.textContent !== String(visibleCount)) {
        numCell.textContent = String(visibleCount);
      }
    }
  });

  if (noResults) noResults.hidden = visibleCount > 0;

  tags.forEach(function (tag) {
    tag.classList.toggle("active", activeFilter === tag.dataset.value);
  });

  if (filterBar) {
    if (activeFilter) {
      filterBar.classList.add("visible");
      if (filterValue) filterValue.textContent = activeFilter;
    } else {
      filterBar.classList.remove("visible");
    }
  }

  updateURL();
}

function updateURL() {
  const params = new URLSearchParams();
  const query = searchInput ? searchInput.value.trim() : "";
  if (query) params.set("q", query);
  if (activeFilter) {
    params.set("filter", activeFilter);
  }
  if (activeSort.col !== "stars" || activeSort.order !== "desc") {
    params.set("sort", activeSort.col);
    params.set("order", activeSort.order);
  }
  const qs = params.toString();
  history.replaceState(null, "", qs ? "?" + qs : location.pathname);
}

function getSortValue(row, col) {
  if (col === "name") {
    return row.querySelector(".col-name a").textContent.trim().toLowerCase();
  }
  if (col === "stars") {
    const text = row
      .querySelector(".col-stars")
      .textContent.trim()
      .replace(/,/g, "");
    const num = parseInt(text, 10);
    return isNaN(num) ? -1 : num;
  }
  if (col === "commit-time") {
    const attr = row.querySelector(".col-commit").getAttribute("data-commit");
    return attr ? new Date(attr).getTime() : 0;
  }
  return 0;
}

function sortRows() {
  const arr = Array.prototype.slice.call(rows);
  const col = activeSort.col;
  const order = activeSort.order;

  // Cache sort values once to avoid DOM queries per comparison
  arr.forEach(function (row) {
    row._sortVal = getSortValue(row, col);
  });

  arr.sort(function (a, b) {
    const aVal = a._sortVal;
    const bVal = b._sortVal;
    if (col === "name") {
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      if (cmp === 0) return a._origIndex - b._origIndex;
      return order === "desc" ? -cmp : cmp;
    }
    if (aVal <= 0 && bVal <= 0) return a._origIndex - b._origIndex;
    if (aVal <= 0) return 1;
    if (bVal <= 0) return -1;
    const cmp = aVal - bVal;
    if (cmp === 0) return a._origIndex - b._origIndex;
    return order === "desc" ? -cmp : cmp;
  });

  const frag = document.createDocumentFragment();
  arr.forEach(function (row) {
    frag.appendChild(row);
    frag.appendChild(row._expandRow);
  });
  tbody.appendChild(frag);
  applyFilters();
}

const sortHeaders = document.querySelectorAll("th[data-sort]");

function updateSortIndicators() {
  sortHeaders.forEach(function (th) {
    th.classList.remove("sort-asc", "sort-desc");
    if (th.dataset.sort === activeSort.col) {
      th.classList.add("sort-" + activeSort.order);
      th.setAttribute(
        "aria-sort",
        activeSort.order === "asc" ? "ascending" : "descending",
      );
    } else {
      th.removeAttribute("aria-sort");
    }
  });
}

// Expand/collapse: event delegation on tbody
if (tbody) {
  tbody.addEventListener("click", function (e) {
    // Don't toggle if clicking a link or tag button
    if (e.target.closest("a") || e.target.closest(".tag")) return;

    const row = e.target.closest("tr.row");
    if (!row) return;

    const isOpen = row.classList.contains("open");
    if (isOpen) {
      row.classList.remove("open");
      row.setAttribute("aria-expanded", "false");
    } else {
      row.classList.add("open");
      row.setAttribute("aria-expanded", "true");
    }
  });

  // Keyboard: Enter or Space on focused .row toggles expand
  tbody.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    const row = e.target.closest("tr.row");
    if (!row) return;
    e.preventDefault();
    row.click();
  });
}

tags.forEach(function (tag) {
  tag.addEventListener("click", function (e) {
    e.preventDefault();
    const value = tag.dataset.value;
    activeFilter = activeFilter === value ? null : value;
    applyFilters();
  });
});

if (filterClear) {
  filterClear.addEventListener("click", function () {
    activeFilter = null;
    applyFilters();
  });
}

const noResultsClear = document.querySelector(".no-results-clear");
if (noResultsClear) {
  noResultsClear.addEventListener("click", function () {
    if (searchInput) searchInput.value = "";
    activeFilter = null;
    applyFilters();
  });
}

sortHeaders.forEach(function (th) {
  th.addEventListener("click", function () {
    const col = th.dataset.sort;
    const defaultOrder = col === "name" ? "asc" : "desc";
    const altOrder = defaultOrder === "asc" ? "desc" : "asc";
    if (activeSort.col === col) {
      if (activeSort.order === defaultOrder)
        activeSort = { col: col, order: altOrder };
      else activeSort = { col: "stars", order: "desc" };
    } else {
      activeSort = { col: col, order: defaultOrder };
    }
    sortRows();
    updateSortIndicators();
  });
});

if (searchInput) {
  let searchTimer;
  searchInput.addEventListener("input", function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(applyFilters, 150);
  });

  document.addEventListener("keydown", function (e) {
    if (
      e.key === "/" &&
      !["INPUT", "TEXTAREA", "SELECT"].includes(
        document.activeElement.tagName,
      ) &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      activeFilter = null;
      applyFilters();
      searchInput.blur();
    }
  });
}

const backToTop = document.querySelector(".back-to-top");
const resultsSection = document.querySelector("#library-index");
const tableWrap = document.querySelector(".table-wrap");
const stickyHeaderCell = backToTop ? backToTop.closest("th") : null;

function updateBackToTopVisibility() {
  if (!backToTop || !tableWrap || !stickyHeaderCell) return;

  const tableRect = tableWrap.getBoundingClientRect();
  const headRect = stickyHeaderCell.getBoundingClientRect();
  const hasPassedHeader = tableRect.top <= 0 && headRect.bottom > 0;

  backToTop.classList.toggle("visible", hasPassedHeader);
}

if (backToTop) {
  let scrollTicking = false;
  window.addEventListener("scroll", function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        updateBackToTopVisibility();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  window.addEventListener("resize", updateBackToTopVisibility);

  backToTop.addEventListener("click", function () {
    const target = searchInput || resultsSection;
    if (!target) return;
    target.scrollIntoView({ behavior: getScrollBehavior(), block: "center" });
    if (searchInput) searchInput.focus();
  });

  updateBackToTopVisibility();
}

(function () {
  const params = new URLSearchParams(location.search);
  const q = params.get("q");
  const filter = params.get("filter");
  const sort = params.get("sort");
  const order = params.get("order");
  if (q && searchInput) searchInput.value = q;
  if (filter) activeFilter = filter;
  if (
    (sort === "name" || sort === "stars" || sort === "commit-time") &&
    (order === "desc" || order === "asc")
  ) {
    activeSort = { col: sort, order: order };
  }
  if (q || filter || sort) {
    sortRows();
  }
  updateSortIndicators();
})();
