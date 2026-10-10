const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function getScrollBehavior() {
  return reducedMotion.matches ? "auto" : "smooth";
}

const table = document.querySelector(".table");
// Category pages list rows in editorial (README) order until a column is sorted
const defaultSort =
  table && table.dataset.defaultSort === "editorial"
    ? { col: "editorial", order: "asc" }
    : { col: "downloads", order: "desc" };
let activeSort = defaultSort;
const searchInput = document.querySelector(".search");
const noResults = document.querySelector(".no-results");
const rows = document.querySelectorAll(".table tbody tr.row");
const tbody = document.querySelector(".table tbody");
const groupRows = document.querySelectorAll(".table tbody tr.group-row");

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

// Land at #library-index without leaving the hash in the URL
if (window.location.hash === "#library-index") {
  const target = document.getElementById("library-index");
  if (target) {
    target.scrollIntoView();
  }
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search,
  );
}

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

let currentGroupRow = null;
Array.prototype.forEach.call(tbody ? tbody.rows : [], function (tr) {
  if (tr.classList.contains("group-row")) currentGroupRow = tr;
  else if (tr.classList.contains("row")) tr._groupRow = currentGroupRow;
});

rows.forEach(function (row, i) {
  row._origIndex = i;
  let next = row.nextElementSibling;
  if (next && next.classList.contains("desc-row")) {
    row._descRow = next;
    next = next.nextElementSibling;
  }
  row._expandRow = next;
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
  const descRowsVisible = !isIndexDocument;
  let visibleCount = 0;

  collapseAll();

  // Number rows in their sorted DOM order, not the load order `rows` keeps
  const orderedRows = tbody ? tbody.querySelectorAll("tr.row") : rows;
  orderedRows.forEach(function (row) {
    let show = true;

    if (query) {
      if (!row._searchText) {
        let text = row.textContent.toLowerCase();
        if (row._descRow) {
          text += " " + row._descRow.textContent.toLowerCase();
        }
        if (row._expandRow) {
          text += " " + row._expandRow.textContent.toLowerCase();
        }
        row._searchText = text;
      }
      show = row._searchText.includes(query);
    }

    if (row.hidden !== !show) row.hidden = !show;
    if (row._descRow) {
      const descHidden = !show || !descRowsVisible;
      if (row._descRow.hidden !== descHidden) {
        row._descRow.hidden = descHidden;
      }
    }

    if (show) {
      visibleCount++;
      const numCell = row.cells[0];
      if (numCell.textContent !== String(visibleCount)) {
        numCell.textContent = String(visibleCount);
      }
    }
  });

  groupRows.forEach(function (groupRow) {
    groupRow.hidden = true;
  });
  if (activeSort.col === "editorial") {
    rows.forEach(function (row) {
      if (!row.hidden && row._groupRow) row._groupRow.hidden = false;
    });
  }

  if (noResults) noResults.hidden = visibleCount > 0;

  updateURL();
}

const isIndexDocument =
  location.pathname === "/" || location.pathname === "/index.html";

function buildQueryString() {
  const params = new URLSearchParams();
  const query = searchInput ? searchInput.value.trim() : "";
  if (query) params.set("q", query);
  if (activeSort.col !== defaultSort.col || activeSort.order !== defaultSort.order) {
    params.set("sort", activeSort.col);
    params.set("order", activeSort.order);
  }
  const qs = params.toString();
  return qs ? "?" + qs : "";
}

function updateURL() {
  if (!isIndexDocument) return;
  history.replaceState(null, "", "/" + buildQueryString());
}

function getSortValue(row, col) {
  // +1 keeps the first row above the "no value" cutoff in sortRows
  if (col === "editorial") return row._origIndex + 1;
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
  if (col === "downloads") {
    const text = row
      .querySelector(".col-downloads")
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
  if (!tbody) return;

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
  let lastGroupRow = null;
  arr.forEach(function (row) {
    if (col === "editorial" && row._groupRow && row._groupRow !== lastGroupRow) {
      frag.appendChild(row._groupRow);
      lastGroupRow = row._groupRow;
    }
    frag.appendChild(row);
    if (row._descRow) frag.appendChild(row._descRow);
    if (row._expandRow) frag.appendChild(row._expandRow);
  });
  tbody.appendChild(frag);
  applyFilters();
}

const sortHeaders = document.querySelectorAll("th[data-sort]");

function updateSortIndicators() {
  if (table) table.classList.toggle("sorted", activeSort.col !== "editorial");
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
    // Don't toggle if clicking a link
    if (e.target.closest("a")) return;

    let row = e.target.closest("tr.row");
    if (!row) {
      const descRow = e.target.closest("tr.desc-row");
      if (descRow) row = descRow.previousElementSibling;
    }
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

const noResultsClear = document.querySelector(".no-results-clear");
if (noResultsClear) {
  noResultsClear.addEventListener("click", function () {
    if (!isIndexDocument) {
      window.location.href = "/";
      return;
    }
    if (searchInput) searchInput.value = "";
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
      else activeSort = defaultSort;
    } else {
      activeSort = { col: col, order: defaultOrder };
    }
    sortRows();
    updateSortIndicators();
  });
});

// Group headings are hidden while sorted flat or filtered out by search, so a link to one must restore them first
document.addEventListener("click", function (e) {
  const link = e.target.closest('a[href*="#"]');
  if (!link || link.pathname !== location.pathname) return;
  const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
  const groupRow = heading ? heading.closest(".group-row") : null;
  if (!groupRow) return;
  if (activeSort.col !== "editorial") {
    activeSort = defaultSort;
    sortRows();
    updateSortIndicators();
  }
  if (groupRow.hidden && searchInput) {
    searchInput.value = "";
    applyFilters();
  }
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
  const sort = params.get("sort");
  const order = params.get("order");
  if (q && searchInput) searchInput.value = q;
  if (
    (sort === "name" ||
      sort === "stars" ||
      sort === "downloads" ||
      sort === "commit-time") &&
    (order === "desc" || order === "asc")
  ) {
    activeSort = { col: sort, order: order };
  }
  if (q || sort) {
    sortRows();
  }
  updateSortIndicators();
})();
