//languages
const languages = {
  en: "search",
  af: "Soek",
  sq: "kërkimi",
  am: "ፍለጋ",
  hye: "որոնում",
  az: "Suche",
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
  kw: "검색",
  hr: "traži",
  lo: "ຊອກຫາ",
  la: "Quaerere",
  lv: "Meklēt",
  lt: "Paieška",
  lb: "sichen",
  mg: "karohy",
  ml: "തിരയുക",
  id: "cari",
  mt: "tfittxija",
  mi: "rapu",
  mr: "शोध",
  mk: "пребарување",
  mn: "хайх",
  hi: "खोज",
  nl: "zoeken",
  nb: "Søk",
  pl: "Szukaj",
  pt: "procurar",
  pa: "ਖੋਜ",
  ro: "căutare",
  ru: "поиск",
  ja: "Sök",
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
  ce: "Vyhledávání",
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

function hideFirst(selector) {
  var element = document.querySelector(selector);
  if (element) {
    element.style.display = "none";
  }
}

function removeFirst(selector) {
  var element = document.querySelector(selector);
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
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
          ? match.closest('search, form[role="search"], [role="search"]') || match
          : match;
      target.style.display = "none";
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

function hasOpenCv() {
  return (
    typeof cv !== "undefined" &&
    cv &&
    typeof cv.imread === "function" &&
    typeof cv.Mat === "function" &&
    typeof cv.matchTemplate === "function" &&
    typeof cv.minMaxLoc === "function"
  );
}
// Searches and hides search bars by examining HTML attributes for search-related terms
function noSearchBar() {
  hideSemanticSearchBars();
  if (hasOpenCv()) {
    getTemplate();
    getSVG();
  }
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
          dom[j].style.display = "none";
          if (att.nodeName.toUpperCase().includes("OMNIBOX")) {
            dom[j].style.display = "none";
          }
        } else if (
          att.nodeValue.toUpperCase().includes("SEARCH") &&
          att.nodeValue.toUpperCase().includes("RESULT") == false &&
          att.nodeValue.toUpperCase().includes("PRODUCT") == false
        ) {
          dom[j].style.display = "none";
        } else if (
          att.nodeValue.toUpperCase().includes(getLocal().toUpperCase())
        ) {
          dom[j].style.display = "none";
        }
      }
    }
  }
}
// Modified search function for subpages with additional filtering for div elements
function isSub() {
  hideSemanticSearchBars();
  if (hasOpenCv()) {
    getTemplate();
    getSVG();
  }
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
            dom[j].style.display = "none";
          }
        } else if (
          att.nodeValue.toUpperCase().includes("SEARCH") &&
          att.nodeValue.toUpperCase().includes("RESULT") == false &&
          att.nodeValue.toUpperCase().includes("PRODUCT") == false
        ) {
          if (dom[j].nodeName === "DIV") {
            checkchildnode(j);
          } else if (dom[j].nodeName !== "DIV") {
            dom[j].style.display = "none";
          }
        } else if (
          att.nodeValue.toUpperCase().includes(getLocal().toUpperCase())
        ) {
          if (dom[j].nodeName === "DIV") {
            checkchildnode(j);
          } else if (dom[j].nodeName !== "DIV") {
            dom[j].style.display = "none";
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
      div.style.display = "none";
    }
    i++;
  }
}
// Processes SVG elements on the page for template matching (limited to first 40)
function getSVG() {
  var nn = 0;
  var length = document.getElementsByTagName("svg").length;
  for (var i = 0; i < length; i++) {
    if (nn < 40) {
      svgbody(i);
      nn++;
    }
  }
}
// Converts SVG element to canvas image for template matching
function svgbody(int_j) {
  const canvas = document.getElementById("createSVG");
  var x = canvas.cloneNode();
  x.id = `${int_j}`;
  document.body.appendChild(x);
  const ctx = x.getContext("2d");
  var svg = document.querySelectorAll("svg")[int_j];
  let img = new Image();
  let b64 = "data:image/svg+xml;base64,";
  let xml = new XMLSerializer().serializeToString(svg);
  b64 += btoa(unescape(encodeURIComponent(xml)));
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };
  img.src = b64;
  var zzz = int_j;
  setTimeout(function () {
    templateMatching(zzz);
  }, 3000);
}
// Loads the template image into a canvas for comparison
function getTemplate() {
  var src_template = chrome.runtime.getURL("template.png");
  var creation2 = document.createElement("canvas");
  creation2.id = "template";
  creation2.style.display = "none";
  document.body.appendChild(creation2);
  var context2 = document.querySelector("#template").getContext("2d");
  var cnv = document.querySelector("#template");
  base_image = new Image();
  base_image.src = src_template;
  base_image.onload = function () {
    cnv.width = base_image.width;
    cnv.height = base_image.height;
    context2.drawImage(base_image, 0, 0);
  };
}
// Initializes the extension when page loads and creates reference canvas
window.addEventListener("load", function () {
  var creation = document.createElement("canvas");
  creation.id = "createSVG";
  creation.style.display = "none";
  document.body.appendChild(creation);
  observeDynamicSearchBars();
  getURL();
  setTimeout(getURL, 3000);
  setTimeout(getURL, 6000);
  setTimeout(getURL, 10000);
});
// Compares SVG canvas with template and hides matching search icons
function templateMatching(j_X) {
  if (!hasOpenCv()) {
    return;
  }
  let src = cv.imread(`${j_X}`);
  var template = cv.imread("template");
  var dst = new cv.Mat();
  var mask = new cv.Mat();
  var res = cv.matchTemplate(template, src, dst, cv.TM_CCOEFF, mask);
  var result = cv.minMaxLoc(dst, mask);
  var maxPoint = result.maxLoc;
  if (result.maxVal == 2933705.25 || result.maxVal == 3094075.25) {
    document.querySelectorAll("svg")[j_X].style.display = "none";
  }
}
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
