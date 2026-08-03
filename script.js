//languages
const languages = {
  en: "search",
  af: "Soek",
  sq: "kërkimi",
  am: "ፍለጋ",
  hy: "որոնում",
  az: "axtar",
  eu: "bilatu",
  uk: "пошук",
  bn: "অনুসন্ধান",
  my: "ရှာဖွေ",
  hr: "traži",
  bg: "Търсене",
  ny: "fufuzani",
  zh: "搜索",
  da: "Søg",
  de: "Suche",
  eo: "serĉi",
  et: "otsing",
  tl: "paghahanap",
  fi: "Hae",
  fr: "chercher",
  fy: "sykje",
  es: "buscar",
  ka: "ძებნა",
  el: "Αναζήτηση",
  gu: "શોધ",
  ha: "bincika",
  he: "לחפש",
  hi: "खोज",
  ig: "chọọ",
  id: "Cari",
  ga: "cuardach",
  ja: "探す",
  yi: "זוכן",
  kn: "ಹುಡುಕಿ",
  kk: "іздеу",
  it: "cerca",
  km: "ស្វែងរក",
  rw: "gushakisha",
  ky: "издөө",
  ko: "검색",
  kw: "hwilas",
  lo: "ຊອກຫາ",
  la: "Quaerere",
  lv: "Meklēt",
  lt: "Paieška",
  lb: "sichen",
  mg: "karohy",
  ml: "തിരയുക",
  mt: "tfittxija",
  mi: "rapu",
  mr: "शोध",
  mk: "пребарување",
  mn: "хайх",
  nl: "zoeken",
  nb: "Søk",
  pl: "Szukaj",
  pt: "procurar",
  pa: "ਖੋਜ",
  ro: "căutare",
  ru: "поиск",
  sv: "Sök",
  sr: "Претрага",
  st: "batla",
  sn: "tsvaga",
  sd: "ڳولا",
  si: "සෙවීම",
  sk: "Vyhľadávanie",
  sl: "Iskanje",
  su: "milarian",
  tg: "ҷустуҷӯ",
  ta: "தேடல்",
  tt: "эзләү",
  te: "వెతకండి",
  th: "ค้นหา",
  cs: "Vyhledávání",
  tr: "arama",
  tk: "gözlemek",
  ug: "ئىزدەش",
  hu: "keresés",
  ur: "تلاش",
  uz: "qidirmoq",
  vi: "Tìm kiếm",
  cy: "chwilio",
};
// Site-specific selectors can be updated here if websites change their DOM.
const SITE_SELECTORS = {
  google: {
    homepageSearch: 'div[jscontroller="cnjECf"].A8SBwf, *[jsname="RNNXgb"]',
    earthSearch: "#search",
  },
  youtube: {
    searchBox: "yt-searchbox, ytd-searchbox",
    voiceSearchButton: "#voice-search-button",
    paperInput: "tp-yt-paper-input",
  },
  apple: {
    navSearch: "#globalnav-menubutton-link-search, #ac-gn-link-search",
  },
  instagram: {
    searchButton: "._aawf",
  },
  ebay: {
    searchBar: "form#gh-f.gh-search, .gh-td-s",
  },
  amazon: {
    searchBar: "#nav-search",
  },
};

// Makes an element invisible while keeping its space in the layout,
// so surrounding elements do not shift.
function hideElement(el) {
  if (el) {
    el.style.visibility = "hidden";
  }
}

function hideFirst(selector) {
  hideElement(document.querySelector(selector));
}

function removeFirst(selector) {
  hideElement(document.querySelector(selector));
}

function hideKnownSiteSelectors() {
  for (var site in SITE_SELECTORS) {
    for (var selector in SITE_SELECTORS[site]) {
      hideFirst(SITE_SELECTORS[site][selector]);
    }
  }
}
// Analyzes the website URL and decides which search function to use
function getURL() {
  hideKnownSiteSelectors();
  hidePreciseSearchControls();
  var getURL = window.location.href;
  var host = window.location.hostname;
  if (
    getURL.toUpperCase().includes("GOOGLE") &&
    getURL.toUpperCase().includes("SEARCH")
  ) {
    if (
      !host.toUpperCase().includes("WWW.") ||
      !host.toUpperCase().includes("GOOGLE")
    ) {
      if (subdomain() == true) {
        isSub();
      } else {
        noSearchBar();
      }
    } else {
      hideFirst(SITE_SELECTORS.google.homepageSearch);
    }
  } else if (getURL.toUpperCase().includes("YOUTUBE")) {
    hideFirst(SITE_SELECTORS.youtube.searchBox);
    hideFirst(SITE_SELECTORS.youtube.voiceSearchButton);
    hideFirst(SITE_SELECTORS.youtube.paperInput);
  } else if (
    getURL.toUpperCase().includes("APPLE") &&
    getURL.toUpperCase().includes("SEARCH") == false
  ) {
    hideFirst(SITE_SELECTORS.apple.navSearch);
  } else if (getURL.toUpperCase().includes("INSTAGRAM")) {
    removeFirst(SITE_SELECTORS.instagram.searchButton);
  } else if (
    getURL.toUpperCase().includes("EBAY") &&
    getURL.toUpperCase().includes("KLEIN") == false
  ) {
    hideFirst(SITE_SELECTORS.ebay.searchBar);
  } else if (
    getURL.toUpperCase().includes("AMAZON") &&
    getURL.toUpperCase().includes("S?K")
  ) {
    hideFirst(SITE_SELECTORS.amazon.searchBar);
  } else if (
    getURL.toUpperCase().includes("GOOGLE") &&
    getURL.toUpperCase().includes("EARTH")
  ) {
    setTimeout(function () {
      hideFirst(SITE_SELECTORS.google.earthSearch);
    }, 4000);
  } else {
    if (
      subdomain() == true &&
      getURL.toUpperCase().includes("GOOGLE") == false &&
      getURL.toUpperCase().includes("G2A") == false
    ) {
      isSub();
    } else {
      noSearchBar();
    }
  }
}
// Checks if the current page is a homepage or subpage using pathname
function subdomain() {
  var pathname = window.location.pathname;
  if (pathname == "/") {
    return false;
  } else if (
    pathname.toUpperCase().includes(getLocal().toUpperCase()) &&
    pathname.split("/").length - 1 <= 2
  ) {
    return false;
  } else if (
    pathname.toUpperCase().includes(getLocal().toUpperCase()) &&
    pathname.split("/").length - 1 >= 2
  ) {
    return true;
  } else if (
    pathname != "/" &&
    pathname.toUpperCase().includes(getLocal().toUpperCase()) == false
  ) {
    return true;
  }
}

function getSearchRoots() {
  var roots = [document];
  for (var i = 0; i < roots.length; i++) {
    var hosts = roots[i].querySelectorAll("*");
    for (var j = 0; j < hosts.length; j++) {
      if (hosts[j].shadowRoot) {
        roots.push(hosts[j].shadowRoot);
      }
    }
  }
  return roots;
}

function hideSemanticSearchBars() {
  var roots = getSearchRoots();
  for (var i = 0; i < roots.length; i++) {
    var matches = roots[i].querySelectorAll(
      'search, form[role="search"], [role="search"], input[type="search"], input[role="searchbox"], input[enterkeyhint="search"]',
    );
    for (var j = 0; j < matches.length; j++) {
      var match = matches[j];
      var target =
        match.tagName === "INPUT"
          ? match.closest('search, form[role="search"], [role="search"]') ||
            match
          : match;
      hideElement(target);
    }
  }
}

// Returns the search word for the current language plus English as fallback.
function getLocalSearchWords() {
  var words = ["search"];
  var local = getLocal();
  if (local && words.indexOf(local) === -1) {
    words.push(local);
  }
  return words;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Whole-word, script-aware match so "research" or "results" never trigger.
function matchesSearchWord(text) {
  if (!text) {
    return false;
  }
  var words = getLocalSearchWords();
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    if (!word) {
      continue;
    }
    try {
      var re = new RegExp(
        "(^|[^\\p{L}])" + escapeRegExp(word) + "([^\\p{L}]|$)",
        "iu",
      );
      if (re.test(text)) {
        return true;
      }
    } catch (e) {
      if (text.toUpperCase().indexOf(word.toUpperCase()) !== -1) {
        return true;
      }
    }
  }
  return false;
}

// Collects the accessible label of a form control from its ARIA/HTML sources.
function getAccessibleName(el, root) {
  var parts = [
    el.getAttribute("aria-label"),
    el.getAttribute("placeholder"),
    el.getAttribute("title"),
    el.getAttribute("name"),
  ];
  var labelledby = el.getAttribute("aria-labelledby");
  if (labelledby) {
    var ids = labelledby.split(/\s+/);
    for (var i = 0; i < ids.length; i++) {
      var scope = root && root.getElementById ? root : document;
      var ref = scope.getElementById(ids[i]);
      if (ref) {
        parts.push(ref.textContent);
      }
    }
  }
  return parts.join(" ");
}

// Hides an element as a search bar, preferring its dedicated search container.
function hideAsSearch(el) {
  var container =
    el.closest && el.closest('search, form[role="search"], [role="search"]');
  hideElement(container || el);
}

// High-precision detection: only hides elements that are unambiguously
// search bars, without touching any other content on the page.
function hidePreciseSearchControls() {
  var roots = getSearchRoots();
  for (var r = 0; r < roots.length; r++) {
    var root = roots[r];

    // 1) Explicit search widgets by ARIA role.
    var searchboxes = root.querySelectorAll('[role="searchbox"]');
    for (var s = 0; s < searchboxes.length; s++) {
      hideAsSearch(searchboxes[s]);
    }

    // 2) Custom elements whose tag name is clearly a search widget
    //    (e.g. <site-search>). The hyphen guarantees we never match
    //    standard HTML elements.
    var all = root.querySelectorAll("*");
    for (var a = 0; a < all.length; a++) {
      var tag = all[a].tagName;
      if (
        tag.indexOf("-") !== -1 &&
        tag.toUpperCase().indexOf("SEARCH") !== -1
      ) {
        hideElement(all[a]);
      }
    }

    // 3) Text-entry controls explicitly labelled "search" in the user's
    //    language. Restricted to real inputs so links or unrelated
    //    buttons are never affected.
    var controls = root.querySelectorAll(
      'input:not([type="hidden"]), textarea, [role="combobox"], [contenteditable="true"]',
    );
    for (var c = 0; c < controls.length; c++) {
      if (matchesSearchWord(getAccessibleName(controls[c], root))) {
        hideAsSearch(controls[c]);
      }
    }
  }
}

function observeDynamicSearchBars() {
  var scheduled = false;
  var observer = new MutationObserver(function () {
    if (scheduled) {
      return;
    }
    scheduled = true;
    setTimeout(function () {
      scheduled = false;
      getURL();
    }, 200);
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Searches and hides search bars by examining HTML attributes for search-related terms
function noSearchBar() {
  hideSemanticSearchBars();
  var dom = document.querySelectorAll("*");
  var xx = document.querySelectorAll("*").length;
  for (var j = 0; j < xx; j++) {
    atts = dom[j].attributes;
    for (var att, i = 0; i < atts.length; i++) {
      att = atts[i];
      if (dom[j].nodeName !== "BODY" && dom[j].nodeName !== "HTML") {
        if (
          att.nodeName.toUpperCase().includes("SEARCH") &&
          att.nodeName.toUpperCase().includes("WRAPPER") == false &&
          att.nodeName.toUpperCase().includes("RESULTS") == false
        ) {
          hideElement(dom[j]);
          if (att.nodeName.toUpperCase().includes("OMNIBOX")) {
            hideElement(dom[j]);
          }
        } else if (
          att.nodeValue.toUpperCase().includes("SEARCH") &&
          att.nodeValue.toUpperCase().includes("RESULT") == false &&
          att.nodeValue.toUpperCase().includes("PRODUCT") == false
        ) {
          hideElement(dom[j]);
        } else if (
          att.nodeValue.toUpperCase().includes(getLocal().toUpperCase())
        ) {
          hideElement(dom[j]);
        }
      }
    }
  }
}
// Modified search function for subpages with additional filtering for div elements
function isSub() {
  hideSemanticSearchBars();
  var dom = document.querySelectorAll("*");
  var xx = document.querySelectorAll("*").length;
  for (var j = 0; j < xx; j++) {
    atts = dom[j].attributes;
    for (var att, i = 0; i < atts.length; i++) {
      att = atts[i];
      if (
        dom[j].nodeName !== "BODY" &&
        dom[j].nodeName !== "HTML" &&
        dom[j].nodeName !== "IMG"
      ) {
        if (
          att.nodeName.toUpperCase().includes("SEARCH") &&
          att.nodeName.toUpperCase().includes("WRAPPER") == false &&
          att.nodeName.toUpperCase().includes("RESULTS") == false &&
          att.nodeName.toUpperCase().includes("IMAGE") == false &&
          att.nodeName.toUpperCase().includes("FRAGMENT") == false &&
          att.nodeName.toUpperCase().includes("PRODUCT") == false
        ) {
          if (dom[j].nodeName === "DIV") {
            checkchildnode(j);
          } else if (dom[j].nodeName !== "DIV") {
            hideElement(dom[j]);
          }
        } else if (
          att.nodeValue.toUpperCase().includes("SEARCH") &&
          att.nodeValue.toUpperCase().includes("RESULT") == false &&
          att.nodeValue.toUpperCase().includes("PRODUCT") == false
        ) {
          if (dom[j].nodeName === "DIV") {
            checkchildnode(j);
          } else if (dom[j].nodeName !== "DIV") {
            hideElement(dom[j]);
          }
        } else if (
          att.nodeValue.toUpperCase().includes(getLocal().toUpperCase())
        ) {
          if (dom[j].nodeName === "DIV") {
            checkchildnode(j);
          } else if (dom[j].nodeName !== "DIV") {
            hideElement(dom[j]);
          }
        }
      }
    }
  }
}
// Checks if a div element contains an input field as child node
function checkchildnode(j) {
  var div = document.querySelectorAll("*")[j];
  var length = div.querySelectorAll("*").length;
  var child = div.querySelectorAll("*");
  var i = 0;
  while (i < length) {
    if (child[i].tagName == "INPUT") {
      hideElement(div);
    }
    i++;
  }
}
// Initializes the extension when page loads
window.addEventListener("load", function () {
  observeDynamicSearchBars();
  getURL();
  setTimeout(getURL, 3000);
  setTimeout(getURL, 6000);
  setTimeout(getURL, 10000);
});
// Gets the localized word for "search" based on browser language
function getLocal() {
  if (navigator.language != undefined) {
    const obj = JSON.parse(JSON.stringify(languages));
    var x = navigator.language.slice(0, 2);
    return obj[x];
  } else {
    return "search";
  }
}
