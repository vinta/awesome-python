/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/agrefine-bridge.js"
/*!**************************************!*\
  !*** ./src/utils/agrefine-bridge.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAgRefineUrl: () => (/* binding */ getAgRefineUrl),
/* harmony export */   getSyncLog: () => (/* binding */ getSyncLog),
/* harmony export */   setAgRefineUrl: () => (/* binding */ setAgRefineUrl),
/* harmony export */   syncFromAgRefine: () => (/* binding */ syncFromAgRefine)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/utils/storage.js");
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * AG-Refine Sister-App Bridge
 *
 * Detects an open AG-Refine tab, pulls field and output data from its
 * localStorage/sessionStorage, and maps it into Agrifine field profiles.
 *
 * AG-Refine tab detection: any tab whose URL matches a configurable pattern
 * (default: localhost:* OR any URL containing "ag-refine" or "agrefine").
 * Set the URL in Settings > AG-Refine URL to pin it to a specific origin.
 */


var AGREFINE_KEY = 'agrifine_agrefine_url';
var SYNC_LOG_KEY = 'agrifine_agrefine_sync_log';
function getAgRefineUrl() {
  return _getAgRefineUrl.apply(this, arguments);
}
function _getAgRefineUrl() {
  _getAgRefineUrl = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var _yield$localGet;
    var _t, _t2, _t3;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.localGet)(AGREFINE_KEY);
        case 1:
          _t2 = _yield$localGet = _context.v;
          _t = _t2 !== null;
          if (!_t) {
            _context.n = 2;
            break;
          }
          _t = _yield$localGet !== void 0;
        case 2:
          if (!_t) {
            _context.n = 3;
            break;
          }
          _t3 = _yield$localGet;
          _context.n = 4;
          break;
        case 3:
          _t3 = '';
        case 4:
          return _context.a(2, _t3);
      }
    }, _callee);
  }));
  return _getAgRefineUrl.apply(this, arguments);
}
function setAgRefineUrl(_x) {
  return _setAgRefineUrl.apply(this, arguments);
}
function _setAgRefineUrl() {
  _setAgRefineUrl = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(url) {
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.localSet)(AGREFINE_KEY, url);
        case 1:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _setAgRefineUrl.apply(this, arguments);
}
function getSyncLog() {
  return _getSyncLog.apply(this, arguments);
}
function _getSyncLog() {
  _getSyncLog = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var _yield$localGet2;
    var _t4, _t5, _t6;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.localGet)(SYNC_LOG_KEY);
        case 1:
          _t5 = _yield$localGet2 = _context3.v;
          _t4 = _t5 !== null;
          if (!_t4) {
            _context3.n = 2;
            break;
          }
          _t4 = _yield$localGet2 !== void 0;
        case 2:
          if (!_t4) {
            _context3.n = 3;
            break;
          }
          _t6 = _yield$localGet2;
          _context3.n = 4;
          break;
        case 3:
          _t6 = [];
        case 4:
          return _context3.a(2, _t6);
      }
    }, _callee3);
  }));
  return _getSyncLog.apply(this, arguments);
}
function tabMatchesAgRefine(tab, configuredUrl) {
  if (!tab.url) return false;
  if (configuredUrl) {
    try {
      var origin = new URL(configuredUrl).origin;
      return tab.url.startsWith(origin);
    } catch (_) {}
  }
  var u = tab.url.toLowerCase();
  return u.includes('ag-refine') || u.includes('agrefine') || u.startsWith('http://localhost') || u.startsWith('http://127.0.0.1');
}

// Injected into the AG-Refine tab — reads all storage and DOM hints
function scrapeAgRefineTab() {
  var out = {
    localStorage: {},
    sessionStorage: {},
    domHints: {}
  };
  for (var i = 0; i < localStorage.length; i++) {
    var k = localStorage.key(i);
    try {
      out.localStorage[k] = JSON.parse(localStorage.getItem(k));
    } catch (_) {
      out.localStorage[k] = localStorage.getItem(k);
    }
  }
  for (var _i = 0; _i < sessionStorage.length; _i++) {
    var _k = sessionStorage.key(_i);
    try {
      out.sessionStorage[_k] = JSON.parse(sessionStorage.getItem(_k));
    } catch (_) {
      out.sessionStorage[_k] = sessionStorage.getItem(_k);
    }
  }

  // Pull field-name-like text from the DOM as a fallback hint
  var fieldEls = document.querySelectorAll('[data-field],[data-name],[data-id]');
  fieldEls.forEach(function (el) {
    var _ref, _el$dataset$field, _el$textContent;
    var id = (_ref = (_el$dataset$field = el.dataset.field) !== null && _el$dataset$field !== void 0 ? _el$dataset$field : el.dataset.id) !== null && _ref !== void 0 ? _ref : el.dataset.name;
    if (id) out.domHints[id] = ((_el$textContent = el.textContent) !== null && _el$textContent !== void 0 ? _el$textContent : '').trim().slice(0, 200);
  });
  return out;
}

/**
 * Map raw AG-Refine storage dump to Agrifine field profile shape.
 * Tries common key patterns used by React/Next.js ag apps.
 */
function extractFields(raw) {
  var all = _objectSpread(_objectSpread({}, raw.localStorage), raw.sessionStorage);
  var candidates = [];
  for (var _i2 = 0, _Object$entries = Object.entries(all); _i2 < _Object$entries.length; _i2++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
      key = _Object$entries$_i[0],
      val = _Object$entries$_i[1];
    var k = key.toLowerCase();
    if (!k.includes('field') && !k.includes('load') && !k.includes('farm') && !k.includes('plot')) continue;
    var arr = Array.isArray(val) ? val : val && _typeof(val) === 'object' ? [val] : null;
    if (!arr) continue;
    var _iterator = _createForOfIteratorHelper(arr),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _ref2, _ref3, _ref4, _ref5, _item$name, _ref6, _item$id, _ref7, _ref8, _item$cluId, _ref9, _ref0, _item$acres, _ref1, _ref10, _item$soilType, _ref11, _item$lat, _item$coordinates, _ref12, _ref13, _ref14, _item$lon, _item$coordinates2, _item$coordinates3, _ref15, _ref16, _item$notes, _item$cropHistory, _item$cropHistory2, _item$harvests, _item$harvests2, _item$carbonPotential, _ref17, _item$createdAt;
        var item = _step.value;
        if (!item || _typeof(item) !== 'object') continue;
        var name = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_item$name = item.name) !== null && _item$name !== void 0 ? _item$name : item.fieldName) !== null && _ref5 !== void 0 ? _ref5 : item.field_name) !== null && _ref4 !== void 0 ? _ref4 : item.title) !== null && _ref3 !== void 0 ? _ref3 : item.label) !== null && _ref2 !== void 0 ? _ref2 : null;
        if (!name) continue;
        candidates.push({
          id: "agr_".concat((_ref6 = (_item$id = item.id) !== null && _item$id !== void 0 ? _item$id : item.fieldId) !== null && _ref6 !== void 0 ? _ref6 : Date.now(), "_").concat(Math.random().toString(36).slice(2, 6)),
          name: String(name),
          cluId: (_ref7 = (_ref8 = (_item$cluId = item.cluId) !== null && _item$cluId !== void 0 ? _item$cluId : item.clu_id) !== null && _ref8 !== void 0 ? _ref8 : item.clu) !== null && _ref7 !== void 0 ? _ref7 : null,
          acres: parseFloat((_ref9 = (_ref0 = (_item$acres = item.acres) !== null && _item$acres !== void 0 ? _item$acres : item.area) !== null && _ref0 !== void 0 ? _ref0 : item.size) !== null && _ref9 !== void 0 ? _ref9 : item.acreage) || null,
          soilType: (_ref1 = (_ref10 = (_item$soilType = item.soilType) !== null && _item$soilType !== void 0 ? _item$soilType : item.soil_type) !== null && _ref10 !== void 0 ? _ref10 : item.soil) !== null && _ref1 !== void 0 ? _ref1 : null,
          coordinates: {
            lat: parseFloat((_ref11 = (_item$lat = item.lat) !== null && _item$lat !== void 0 ? _item$lat : item.latitude) !== null && _ref11 !== void 0 ? _ref11 : (_item$coordinates = item.coordinates) === null || _item$coordinates === void 0 ? void 0 : _item$coordinates.lat) || null,
            lon: parseFloat((_ref12 = (_ref13 = (_ref14 = (_item$lon = item.lon) !== null && _item$lon !== void 0 ? _item$lon : item.lng) !== null && _ref14 !== void 0 ? _ref14 : item.longitude) !== null && _ref13 !== void 0 ? _ref13 : (_item$coordinates2 = item.coordinates) === null || _item$coordinates2 === void 0 ? void 0 : _item$coordinates2.lon) !== null && _ref12 !== void 0 ? _ref12 : (_item$coordinates3 = item.coordinates) === null || _item$coordinates3 === void 0 ? void 0 : _item$coordinates3.lng) || null
          },
          notes: (_ref15 = (_ref16 = (_item$notes = item.notes) !== null && _item$notes !== void 0 ? _item$notes : item.description) !== null && _ref16 !== void 0 ? _ref16 : item.comments) !== null && _ref15 !== void 0 ? _ref15 : null,
          cropHistory: Array.isArray((_item$cropHistory = item.cropHistory) !== null && _item$cropHistory !== void 0 ? _item$cropHistory : item.crop_history) ? (_item$cropHistory2 = item.cropHistory) !== null && _item$cropHistory2 !== void 0 ? _item$cropHistory2 : item.crop_history : [],
          harvestRecords: Array.isArray((_item$harvests = item.harvests) !== null && _item$harvests !== void 0 ? _item$harvests : item.harvestRecords) ? (_item$harvests2 = item.harvests) !== null && _item$harvests2 !== void 0 ? _item$harvests2 : item.harvestRecords : [],
          carbonPotential: (_item$carbonPotential = item.carbonPotential) !== null && _item$carbonPotential !== void 0 ? _item$carbonPotential : null,
          weatherData: null,
          createdAt: (_ref17 = (_item$createdAt = item.createdAt) !== null && _item$createdAt !== void 0 ? _item$createdAt : item.created_at) !== null && _ref17 !== void 0 ? _ref17 : new Date().toISOString(),
          _source: 'ag-refine'
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return candidates;
}

/**
 * Loads also come over — map to ingested file records for the dashboard.
 */
function extractLoads(raw) {
  var all = _objectSpread(_objectSpread({}, raw.localStorage), raw.sessionStorage);
  var loads = [];
  for (var _i3 = 0, _Object$entries2 = Object.entries(all); _i3 < _Object$entries2.length; _i3++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
      key = _Object$entries2$_i[0],
      val = _Object$entries2$_i[1];
    var k = key.toLowerCase();
    if (!k.includes('load') && !k.includes('scale') && !k.includes('ticket') && !k.includes('delivery')) continue;
    var arr = Array.isArray(val) ? val : null;
    if (!arr) continue;
    var _iterator2 = _createForOfIteratorHelper(arr),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var item = _step2.value;
        if (!item || _typeof(item) !== 'object') continue;
        loads.push(item);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  return loads;
}
function syncFromAgRefine() {
  return _syncFromAgRefine.apply(this, arguments);
}
function _syncFromAgRefine() {
  _syncFromAgRefine = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var configuredUrl, allTabs, agRefineTabs, tab, raw, _yield$chrome$scripti, _yield$chrome$scripti2, result, fields, loads, existing, added, updated, _iterator3, _step3, _loop, log, history, _t7, _t8;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.n = 1;
          return getAgRefineUrl();
        case 1:
          configuredUrl = _context5.v;
          _context5.n = 2;
          return chrome.tabs.query({});
        case 2:
          allTabs = _context5.v;
          agRefineTabs = allTabs.filter(function (t) {
            return tabMatchesAgRefine(t, configuredUrl);
          });
          if (!(agRefineTabs.length === 0)) {
            _context5.n = 3;
            break;
          }
          return _context5.a(2, {
            ok: false,
            error: 'No AG-Refine tab found. Open AG-Refine in a browser tab first.'
          });
        case 3:
          tab = agRefineTabs[0];
          _context5.p = 4;
          _context5.n = 5;
          return chrome.scripting.executeScript({
            target: {
              tabId: tab.id
            },
            func: scrapeAgRefineTab
          });
        case 5:
          _yield$chrome$scripti = _context5.v;
          _yield$chrome$scripti2 = _slicedToArray(_yield$chrome$scripti, 1);
          result = _yield$chrome$scripti2[0];
          raw = result.result;
          _context5.n = 7;
          break;
        case 6:
          _context5.p = 6;
          _t7 = _context5.v;
          return _context5.a(2, {
            ok: false,
            error: "Cannot read AG-Refine tab: ".concat(_t7.message)
          });
        case 7:
          fields = extractFields(raw);
          loads = extractLoads(raw); // Merge fields — update existing by name, insert new ones
          _context5.n = 8;
          return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.getFieldProfiles)();
        case 8:
          existing = _context5.v;
          added = 0;
          updated = 0;
          _iterator3 = _createForOfIteratorHelper(fields);
          _context5.p = 9;
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var f, match, _match$coordinates, _match$cropHistory, _match$notes, _match$cluId, merged;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.n) {
                case 0:
                  f = _step3.value;
                  match = existing.find(function (e) {
                    return e.name.toLowerCase() === f.name.toLowerCase();
                  });
                  if (!match) {
                    _context4.n = 2;
                    break;
                  }
                  // Merge: fill in missing data without overwriting user edits
                  merged = _objectSpread(_objectSpread(_objectSpread({}, f), match), {}, {
                    coordinates: ((_match$coordinates = match.coordinates) === null || _match$coordinates === void 0 ? void 0 : _match$coordinates.lat) != null ? match.coordinates : f.coordinates,
                    cropHistory: (_match$cropHistory = match.cropHistory) !== null && _match$cropHistory !== void 0 && _match$cropHistory.length ? match.cropHistory : f.cropHistory,
                    notes: (_match$notes = match.notes) !== null && _match$notes !== void 0 ? _match$notes : f.notes,
                    cluId: (_match$cluId = match.cluId) !== null && _match$cluId !== void 0 ? _match$cluId : f.cluId,
                    _source: 'ag-refine-merged'
                  });
                  _context4.n = 1;
                  return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.saveFieldProfile)(merged);
                case 1:
                  updated++;
                  _context4.n = 4;
                  break;
                case 2:
                  _context4.n = 3;
                  return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.saveFieldProfile)(f);
                case 3:
                  added++;
                case 4:
                  return _context4.a(2);
              }
            }, _loop);
          });
          _iterator3.s();
        case 10:
          if ((_step3 = _iterator3.n()).done) {
            _context5.n = 12;
            break;
          }
          return _context5.d(_regeneratorValues(_loop()), 11);
        case 11:
          _context5.n = 10;
          break;
        case 12:
          _context5.n = 14;
          break;
        case 13:
          _context5.p = 13;
          _t8 = _context5.v;
          _iterator3.e(_t8);
        case 14:
          _context5.p = 14;
          _iterator3.f();
          return _context5.f(14);
        case 15:
          log = {
            at: new Date().toISOString(),
            tabUrl: tab.url,
            fieldsAdded: added,
            fieldsUpdated: updated,
            loadsFound: loads.length,
            rawKeys: Object.keys(_objectSpread(_objectSpread({}, raw.localStorage), raw.sessionStorage))
          };
          _context5.n = 16;
          return getSyncLog();
        case 16:
          history = _context5.v;
          history.unshift(log);
          _context5.n = 17;
          return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.localSet)(SYNC_LOG_KEY, history.slice(0, 20));
        case 17:
          return _context5.a(2, {
            ok: true,
            added: added,
            updated: updated,
            loadsFound: loads.length,
            loads: loads,
            tabUrl: tab.url
          });
      }
    }, _callee4, null, [[9, 13, 14, 15], [4, 6]]);
  }));
  return _syncFromAgRefine.apply(this, arguments);
}

/***/ },

/***/ "./src/utils/api.js"
/*!**************************!*\
  !*** ./src/utils/api.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AGRICULTURE_TAGS: () => (/* binding */ AGRICULTURE_TAGS),
/* harmony export */   callAnthropic: () => (/* binding */ callAnthropic),
/* harmony export */   fetchAnthropic: () => (/* binding */ fetchAnthropic)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/utils/storage.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
var MODEL = 'claude-sonnet-4-6';

/**
 * Send a message to the Anthropic API via the background service worker.
 * Content scripts and sidebar cannot call external APIs directly due to CSP,
 * so all API calls are proxied through the background worker.
 */
function callAnthropic(_x) {
  return _callAnthropic.apply(this, arguments);
}

/**
 * Direct fetch from background worker — keeps API key off content scripts.
 */
function _callAnthropic() {
  _callAnthropic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
    var system, userMessage, _ref$maxTokens, maxTokens;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          system = _ref.system, userMessage = _ref.userMessage, _ref$maxTokens = _ref.maxTokens, maxTokens = _ref$maxTokens === void 0 ? 1024 : _ref$maxTokens;
          return _context.a(2, new Promise(function (resolve, reject) {
            chrome.runtime.sendMessage({
              type: 'ANTHROPIC_REQUEST',
              payload: {
                system: system,
                userMessage: userMessage,
                maxTokens: maxTokens
              }
            }, function (response) {
              var _response$text;
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
              }
              if (response !== null && response !== void 0 && response.error) {
                reject(new Error(response.error));
                return;
              }
              resolve((_response$text = response === null || response === void 0 ? void 0 : response.text) !== null && _response$text !== void 0 ? _response$text : '');
            });
          }));
      }
    }, _callee);
  }));
  return _callAnthropic.apply(this, arguments);
}
function fetchAnthropic(_x2) {
  return _fetchAnthropic.apply(this, arguments);
}
function _fetchAnthropic() {
  _fetchAnthropic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref2) {
    var _data$content$0$text, _data$content;
    var system, userMessage, _ref2$maxTokens, maxTokens, apiKey, body, res, errText, data;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          system = _ref2.system, userMessage = _ref2.userMessage, _ref2$maxTokens = _ref2.maxTokens, maxTokens = _ref2$maxTokens === void 0 ? 1024 : _ref2$maxTokens;
          _context2.n = 1;
          return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.sessionGet)(_storage_js__WEBPACK_IMPORTED_MODULE_0__.KEYS.API_KEY);
        case 1:
          apiKey = _context2.v;
          if (apiKey) {
            _context2.n = 2;
            break;
          }
          throw new Error('No API key set. Open Agrifine settings to add your key.');
        case 2:
          body = {
            model: MODEL,
            max_tokens: maxTokens,
            system: system,
            messages: [{
              role: 'user',
              content: userMessage
            }]
          };
          _context2.n = 3;
          return fetch(ANTHROPIC_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
              'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify(body)
          });
        case 3:
          res = _context2.v;
          if (res.ok) {
            _context2.n = 5;
            break;
          }
          _context2.n = 4;
          return res.text();
        case 4:
          errText = _context2.v;
          throw new Error("Anthropic API error ".concat(res.status, ": ").concat(errText));
        case 5:
          _context2.n = 6;
          return res.json();
        case 6:
          data = _context2.v;
          return _context2.a(2, (_data$content$0$text = (_data$content = data.content) === null || _data$content === void 0 || (_data$content = _data$content[0]) === null || _data$content === void 0 ? void 0 : _data$content.text) !== null && _data$content$0$text !== void 0 ? _data$content$0$text : '');
      }
    }, _callee2);
  }));
  return _fetchAnthropic.apply(this, arguments);
}
var AGRICULTURE_TAGS = ['agriculture', 'equipment', 'land', 'carbon', 'USDA', 'dairy', 'finance', 'weather'];

/***/ },

/***/ "./src/utils/storage.js"
/*!******************************!*\
  !*** ./src/utils/storage.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KEYS: () => (/* binding */ KEYS),
/* harmony export */   buildContextBundle: () => (/* binding */ buildContextBundle),
/* harmony export */   deleteFieldProfile: () => (/* binding */ deleteFieldProfile),
/* harmony export */   deleteIngestedFile: () => (/* binding */ deleteIngestedFile),
/* harmony export */   deleteReadingItem: () => (/* binding */ deleteReadingItem),
/* harmony export */   getFarmMemory: () => (/* binding */ getFarmMemory),
/* harmony export */   getFieldProfiles: () => (/* binding */ getFieldProfiles),
/* harmony export */   getIngestedFiles: () => (/* binding */ getIngestedFiles),
/* harmony export */   getReadingList: () => (/* binding */ getReadingList),
/* harmony export */   getSettings: () => (/* binding */ getSettings),
/* harmony export */   localGet: () => (/* binding */ localGet),
/* harmony export */   localSet: () => (/* binding */ localSet),
/* harmony export */   saveFarmMemory: () => (/* binding */ saveFarmMemory),
/* harmony export */   saveFieldProfile: () => (/* binding */ saveFieldProfile),
/* harmony export */   saveIngestedFile: () => (/* binding */ saveIngestedFile),
/* harmony export */   saveReadingItem: () => (/* binding */ saveReadingItem),
/* harmony export */   saveSettings: () => (/* binding */ saveSettings),
/* harmony export */   sessionGet: () => (/* binding */ sessionGet),
/* harmony export */   sessionSet: () => (/* binding */ sessionSet)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Agrifine storage schema
 *
 * chrome.storage.local keys:
 *   agrifine_reading_list   — Array<ReadingItem>
 *   agrifine_ingested_files — Array<IngestedFile>
 *   agrifine_field_profiles — Array<FieldProfile>
 *   agrifine_settings       — Settings
 *   agrifine_farm_memory    — FarmMemory (AI-synthesized knowledge base)
 *
 * chrome.storage.session keys:
 *   agrifine_api_key        — string (never persisted to local)
 *
 * FarmMemory shape:
 *   {
 *     lastUpdated: ISO string,
 *     aiGeneratedSummary: string,   // Claude's narrative synthesis of the whole farm
 *     farm_name: string | null,
 *     total_acres: number | null,
 *     primary_crops: string[],
 *     soil_overview: string | null,
 *     key_insights: string[],       // important observations
 *     action_items: string[],       // recommended next steps
 *     risk_flags: string[],         // risks or concerns to watch
 *     opportunities: string[],      // identified opportunities
 *   }
 */

var KEYS = {
  READING_LIST: 'agrifine_reading_list',
  INGESTED_FILES: 'agrifine_ingested_files',
  FIELD_PROFILES: 'agrifine_field_profiles',
  SETTINGS: 'agrifine_settings',
  FARM_MEMORY: 'agrifine_farm_memory',
  API_KEY: 'agrifine_api_key',
  // session storage (always)
  API_KEY_SAVED: 'agrifine_api_key_saved' // local storage (when user opts to remember)
};

// ── Generic helpers ──────────────────────────────────────────────────────────

function localGet(_x) {
  return _localGet.apply(this, arguments);
}
function _localGet() {
  _localGet = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(key) {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          return _context.a(2, new Promise(function (resolve, reject) {
            chrome.storage.local.get(key, function (result) {
              var _result$key;
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
              }
              resolve((_result$key = result[key]) !== null && _result$key !== void 0 ? _result$key : null);
            });
          }));
      }
    }, _callee);
  }));
  return _localGet.apply(this, arguments);
}
function localSet(_x2, _x3) {
  return _localSet.apply(this, arguments);
}
function _localSet() {
  _localSet = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(key, value) {
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          return _context2.a(2, new Promise(function (resolve, reject) {
            chrome.storage.local.set(_defineProperty({}, key, value), function () {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
              }
              resolve();
            });
          }));
      }
    }, _callee2);
  }));
  return _localSet.apply(this, arguments);
}
function sessionGet(_x4) {
  return _sessionGet.apply(this, arguments);
}
function _sessionGet() {
  _sessionGet = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(key) {
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          return _context3.a(2, new Promise(function (resolve, reject) {
            chrome.storage.session.get(key, function (result) {
              var _result$key2;
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
              }
              resolve((_result$key2 = result[key]) !== null && _result$key2 !== void 0 ? _result$key2 : null);
            });
          }));
      }
    }, _callee3);
  }));
  return _sessionGet.apply(this, arguments);
}
function sessionSet(_x5, _x6) {
  return _sessionSet.apply(this, arguments);
}

// ── Reading List ─────────────────────────────────────────────────────────────
function _sessionSet() {
  _sessionSet = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(key, value) {
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          return _context4.a(2, new Promise(function (resolve, reject) {
            chrome.storage.session.set(_defineProperty({}, key, value), function () {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
              }
              resolve();
            });
          }));
      }
    }, _callee4);
  }));
  return _sessionSet.apply(this, arguments);
}
function getReadingList() {
  return _getReadingList.apply(this, arguments);
}
function _getReadingList() {
  _getReadingList = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
    var _yield$localGet;
    var _t, _t2, _t3;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.n = 1;
          return localGet(KEYS.READING_LIST);
        case 1:
          _t2 = _yield$localGet = _context5.v;
          _t = _t2 !== null;
          if (!_t) {
            _context5.n = 2;
            break;
          }
          _t = _yield$localGet !== void 0;
        case 2:
          if (!_t) {
            _context5.n = 3;
            break;
          }
          _t3 = _yield$localGet;
          _context5.n = 4;
          break;
        case 3:
          _t3 = [];
        case 4:
          return _context5.a(2, _t3);
      }
    }, _callee5);
  }));
  return _getReadingList.apply(this, arguments);
}
function saveReadingItem(_x7) {
  return _saveReadingItem.apply(this, arguments);
}
function _saveReadingItem() {
  _saveReadingItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(item) {
    var list;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.n = 1;
          return getReadingList();
        case 1:
          list = _context6.v;
          list.unshift(item);
          _context6.n = 2;
          return localSet(KEYS.READING_LIST, list);
        case 2:
          return _context6.a(2);
      }
    }, _callee6);
  }));
  return _saveReadingItem.apply(this, arguments);
}
function deleteReadingItem(_x8) {
  return _deleteReadingItem.apply(this, arguments);
}

// ── Ingested Files ───────────────────────────────────────────────────────────
function _deleteReadingItem() {
  _deleteReadingItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(id) {
    var list;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _context7.n = 1;
          return getReadingList();
        case 1:
          list = _context7.v;
          _context7.n = 2;
          return localSet(KEYS.READING_LIST, list.filter(function (i) {
            return i.id !== id;
          }));
        case 2:
          return _context7.a(2);
      }
    }, _callee7);
  }));
  return _deleteReadingItem.apply(this, arguments);
}
function getIngestedFiles() {
  return _getIngestedFiles.apply(this, arguments);
}
function _getIngestedFiles() {
  _getIngestedFiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
    var _yield$localGet2;
    var _t4, _t5, _t6;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _context8.n = 1;
          return localGet(KEYS.INGESTED_FILES);
        case 1:
          _t5 = _yield$localGet2 = _context8.v;
          _t4 = _t5 !== null;
          if (!_t4) {
            _context8.n = 2;
            break;
          }
          _t4 = _yield$localGet2 !== void 0;
        case 2:
          if (!_t4) {
            _context8.n = 3;
            break;
          }
          _t6 = _yield$localGet2;
          _context8.n = 4;
          break;
        case 3:
          _t6 = [];
        case 4:
          return _context8.a(2, _t6);
      }
    }, _callee8);
  }));
  return _getIngestedFiles.apply(this, arguments);
}
function saveIngestedFile(_x9) {
  return _saveIngestedFile.apply(this, arguments);
}
function _saveIngestedFile() {
  _saveIngestedFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(file) {
    var files;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _context9.n = 1;
          return getIngestedFiles();
        case 1:
          files = _context9.v;
          files.unshift(file);
          _context9.n = 2;
          return localSet(KEYS.INGESTED_FILES, files);
        case 2:
          return _context9.a(2);
      }
    }, _callee9);
  }));
  return _saveIngestedFile.apply(this, arguments);
}
function deleteIngestedFile(_x0) {
  return _deleteIngestedFile.apply(this, arguments);
}

// ── Field Profiles ───────────────────────────────────────────────────────────
function _deleteIngestedFile() {
  _deleteIngestedFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(id) {
    var files;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          _context0.n = 1;
          return getIngestedFiles();
        case 1:
          files = _context0.v;
          _context0.n = 2;
          return localSet(KEYS.INGESTED_FILES, files.filter(function (f) {
            return f.id !== id;
          }));
        case 2:
          return _context0.a(2);
      }
    }, _callee0);
  }));
  return _deleteIngestedFile.apply(this, arguments);
}
function getFieldProfiles() {
  return _getFieldProfiles.apply(this, arguments);
}
function _getFieldProfiles() {
  _getFieldProfiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
    var _yield$localGet3;
    var _t7, _t8, _t9;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.n) {
        case 0:
          _context1.n = 1;
          return localGet(KEYS.FIELD_PROFILES);
        case 1:
          _t8 = _yield$localGet3 = _context1.v;
          _t7 = _t8 !== null;
          if (!_t7) {
            _context1.n = 2;
            break;
          }
          _t7 = _yield$localGet3 !== void 0;
        case 2:
          if (!_t7) {
            _context1.n = 3;
            break;
          }
          _t9 = _yield$localGet3;
          _context1.n = 4;
          break;
        case 3:
          _t9 = [];
        case 4:
          return _context1.a(2, _t9);
      }
    }, _callee1);
  }));
  return _getFieldProfiles.apply(this, arguments);
}
function saveFieldProfile(_x1) {
  return _saveFieldProfile.apply(this, arguments);
}
function _saveFieldProfile() {
  _saveFieldProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(profile) {
    var profiles, idx;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.n) {
        case 0:
          _context10.n = 1;
          return getFieldProfiles();
        case 1:
          profiles = _context10.v;
          idx = profiles.findIndex(function (p) {
            return p.id === profile.id;
          });
          if (idx >= 0) {
            profiles[idx] = profile;
          } else {
            profiles.unshift(profile);
          }
          _context10.n = 2;
          return localSet(KEYS.FIELD_PROFILES, profiles);
        case 2:
          return _context10.a(2);
      }
    }, _callee10);
  }));
  return _saveFieldProfile.apply(this, arguments);
}
function deleteFieldProfile(_x10) {
  return _deleteFieldProfile.apply(this, arguments);
}

// ── Farm Memory ──────────────────────────────────────────────────────────────
function _deleteFieldProfile() {
  _deleteFieldProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(id) {
    var profiles;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.n) {
        case 0:
          _context11.n = 1;
          return getFieldProfiles();
        case 1:
          profiles = _context11.v;
          _context11.n = 2;
          return localSet(KEYS.FIELD_PROFILES, profiles.filter(function (p) {
            return p.id !== id;
          }));
        case 2:
          return _context11.a(2);
      }
    }, _callee11);
  }));
  return _deleteFieldProfile.apply(this, arguments);
}
function getFarmMemory() {
  return _getFarmMemory.apply(this, arguments);
}
function _getFarmMemory() {
  _getFarmMemory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
    var _yield$localGet4;
    var _t0, _t1, _t10;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.n) {
        case 0:
          _context12.n = 1;
          return localGet(KEYS.FARM_MEMORY);
        case 1:
          _t1 = _yield$localGet4 = _context12.v;
          _t0 = _t1 !== null;
          if (!_t0) {
            _context12.n = 2;
            break;
          }
          _t0 = _yield$localGet4 !== void 0;
        case 2:
          if (!_t0) {
            _context12.n = 3;
            break;
          }
          _t10 = _yield$localGet4;
          _context12.n = 4;
          break;
        case 3:
          _t10 = null;
        case 4:
          return _context12.a(2, _t10);
      }
    }, _callee12);
  }));
  return _getFarmMemory.apply(this, arguments);
}
function saveFarmMemory(_x11) {
  return _saveFarmMemory.apply(this, arguments);
}

// ── Settings ─────────────────────────────────────────────────────────────────
function _saveFarmMemory() {
  _saveFarmMemory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(memory) {
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.n) {
        case 0:
          _context13.n = 1;
          return localSet(KEYS.FARM_MEMORY, _objectSpread(_objectSpread({}, memory), {}, {
            lastUpdated: new Date().toISOString()
          }));
        case 1:
          return _context13.a(2);
      }
    }, _callee13);
  }));
  return _saveFarmMemory.apply(this, arguments);
}
function getSettings() {
  return _getSettings.apply(this, arguments);
}
function _getSettings() {
  _getSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
    var _yield$localGet5;
    var _t11, _t12, _t13;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.n) {
        case 0:
          _context14.n = 1;
          return localGet(KEYS.SETTINGS);
        case 1:
          _t12 = _yield$localGet5 = _context14.v;
          _t11 = _t12 !== null;
          if (!_t11) {
            _context14.n = 2;
            break;
          }
          _t11 = _yield$localGet5 !== void 0;
        case 2:
          if (!_t11) {
            _context14.n = 3;
            break;
          }
          _t13 = _yield$localGet5;
          _context14.n = 4;
          break;
        case 3:
          _t13 = {
            theme: 'light',
            defaultState: 'all'
          };
        case 4:
          return _context14.a(2, _t13);
      }
    }, _callee14);
  }));
  return _getSettings.apply(this, arguments);
}
function saveSettings(_x12) {
  return _saveSettings.apply(this, arguments);
}

// ── Context bundle (used as AI system context) ───────────────────────────────
function _saveSettings() {
  _saveSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(patch) {
    var current;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.n) {
        case 0:
          _context15.n = 1;
          return getSettings();
        case 1:
          current = _context15.v;
          _context15.n = 2;
          return localSet(KEYS.SETTINGS, _objectSpread(_objectSpread({}, current), patch));
        case 2:
          return _context15.a(2);
      }
    }, _callee15);
  }));
  return _saveSettings.apply(this, arguments);
}
function buildContextBundle() {
  return _buildContextBundle.apply(this, arguments);
}
function _buildContextBundle() {
  _buildContextBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
    var _yield$Promise$all, _yield$Promise$all2, list, profiles, files, memory, memorySection, _memory$lastUpdated$s, _memory$lastUpdated, _memory$aiGeneratedSu, _memory$primary_crops, _memory$key_insights, _memory$action_items, _memory$risk_flags, lines, fieldLines, fileLines, readingLines;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.n) {
        case 0:
          _context16.n = 1;
          return Promise.all([getReadingList(), getFieldProfiles(), getIngestedFiles(), getFarmMemory()]);
        case 1:
          _yield$Promise$all = _context16.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 4);
          list = _yield$Promise$all2[0];
          profiles = _yield$Promise$all2[1];
          files = _yield$Promise$all2[2];
          memory = _yield$Promise$all2[3];
          if (memory) {
            lines = ["FARM MEMORY (last updated ".concat((_memory$lastUpdated$s = (_memory$lastUpdated = memory.lastUpdated) === null || _memory$lastUpdated === void 0 ? void 0 : _memory$lastUpdated.slice(0, 10)) !== null && _memory$lastUpdated$s !== void 0 ? _memory$lastUpdated$s : 'unknown', "):"), (_memory$aiGeneratedSu = memory.aiGeneratedSummary) !== null && _memory$aiGeneratedSu !== void 0 ? _memory$aiGeneratedSu : ''];
            if ((_memory$primary_crops = memory.primary_crops) !== null && _memory$primary_crops !== void 0 && _memory$primary_crops.length) lines.push("Primary crops: ".concat(memory.primary_crops.join(', ')));
            if (memory.total_acres != null) lines.push("Total acreage: ".concat(memory.total_acres, " ac"));
            if ((_memory$key_insights = memory.key_insights) !== null && _memory$key_insights !== void 0 && _memory$key_insights.length) {
              lines.push('Key insights:');
              memory.key_insights.forEach(function (s) {
                return lines.push("  \u2022 ".concat(s));
              });
            }
            if ((_memory$action_items = memory.action_items) !== null && _memory$action_items !== void 0 && _memory$action_items.length) {
              lines.push('Action items:');
              memory.action_items.forEach(function (s) {
                return lines.push("  \u2022 ".concat(s));
              });
            }
            if ((_memory$risk_flags = memory.risk_flags) !== null && _memory$risk_flags !== void 0 && _memory$risk_flags.length) {
              lines.push('Risk flags:');
              memory.risk_flags.forEach(function (s) {
                return lines.push("  \u26A0 ".concat(s));
              });
            }
            memorySection = lines.filter(Boolean).join('\n');
          } else {
            memorySection = 'FARM MEMORY: (none yet — after reviewing field data, call update_farm_memory to build a persistent knowledge base)';
          }

          // ── 2. Field profiles with crop history and harvest records ──────────────────
          fieldLines = profiles.length === 0 ? ['(none)'] : profiles.map(function (p) {
            var _p$coordinates, _p$coordinates2, _p$cropHistory, _p$harvestRecords, _p$acres, _p$soilType;
            var coords = ((_p$coordinates = p.coordinates) === null || _p$coordinates === void 0 ? void 0 : _p$coordinates.lat) != null && ((_p$coordinates2 = p.coordinates) === null || _p$coordinates2 === void 0 ? void 0 : _p$coordinates2.lon) != null ? "".concat(p.coordinates.lat.toFixed(4), ", ").concat(p.coordinates.lon.toFixed(4)) : null;
            var history = ((_p$cropHistory = p.cropHistory) !== null && _p$cropHistory !== void 0 ? _p$cropHistory : []).slice(0, 4).map(function (h) {
              return "".concat(h.year, ": ").concat(h.crop);
            }).join(', ');
            var harvests = ((_p$harvestRecords = p.harvestRecords) !== null && _p$harvestRecords !== void 0 ? _p$harvestRecords : []).slice(0, 3).map(function (h) {
              var _h$date$slice, _h$date, _h$unit;
              return "".concat((_h$date$slice = (_h$date = h.date) === null || _h$date === void 0 ? void 0 : _h$date.slice(0, 10)) !== null && _h$date$slice !== void 0 ? _h$date$slice : '?', ": ").concat(h["yield"], " ").concat((_h$unit = h.unit) !== null && _h$unit !== void 0 ? _h$unit : '').trim();
            }).join('; ');
            var parts = ["Field \"".concat(p.name, "\" | ").concat((_p$acres = p.acres) !== null && _p$acres !== void 0 ? _p$acres : '?', " ac | ").concat((_p$soilType = p.soilType) !== null && _p$soilType !== void 0 ? _p$soilType : 'unknown soil'), coords ? "  Coords: ".concat(coords) : null, p.cluId ? "  CLU: ".concat(p.cluId) : null, history ? "  Crop history: ".concat(history) : null, harvests ? "  Harvests: ".concat(harvests) : null, p.notes ? "  Notes: ".concat(p.notes) : null];
            return parts.filter(Boolean).join('\n');
          }); // ── 3. Ingested data files ───────────────────────────────────────────────────
          fileLines = files.length === 0 ? ['(none)'] : files.slice(0, 10).map(function (f) {
            var _f$preview$slice, _f$preview, _f$uploadedAt$slice, _f$uploadedAt;
            var preview = f.structuredData ? Object.entries(f.structuredData).filter(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 1),
                k = _ref2[0];
              return k !== 'raw_preview' && k !== 'parse_error';
            }).slice(0, 5).map(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                k = _ref4[0],
                v = _ref4[1];
              return "".concat(k, ": ").concat(JSON.stringify(v).slice(0, 120));
            }).join(' | ') : (_f$preview$slice = (_f$preview = f.preview) === null || _f$preview === void 0 ? void 0 : _f$preview.slice(0, 200)) !== null && _f$preview$slice !== void 0 ? _f$preview$slice : '(no structured data)';
            return "[".concat(f.type, "] ").concat(f.filename, " (").concat((_f$uploadedAt$slice = (_f$uploadedAt = f.uploadedAt) === null || _f$uploadedAt === void 0 ? void 0 : _f$uploadedAt.slice(0, 10)) !== null && _f$uploadedAt$slice !== void 0 ? _f$uploadedAt$slice : '?', "): ").concat(preview);
          }); // ── 4. Reading list (recent saved articles) ──────────────────────────────────
          readingLines = list.length === 0 ? ['(none)'] : list.slice(0, 15).map(function (item) {
            var _item$tags$join, _item$tags, _item$summary;
            return "[".concat((_item$tags$join = (_item$tags = item.tags) === null || _item$tags === void 0 ? void 0 : _item$tags.join(', ')) !== null && _item$tags$join !== void 0 ? _item$tags$join : 'general', "] \"").concat(item.title, "\": ").concat((_item$summary = item.summary) !== null && _item$summary !== void 0 ? _item$summary : '(no summary)');
          });
          return _context16.a(2, [memorySection, '', '── FIELD PROFILES ──', fieldLines.join('\n\n'), '', '── INGESTED DATA FILES ──', fileLines.join('\n'), '', '── READING LIST (recent articles) ──', readingLines.join('\n')].join('\n'));
      }
    }, _callee16);
  }));
  return _buildContextBundle.apply(this, arguments);
}

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/background/index.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage.js */ "./src/utils/storage.js");
/* harmony import */ var _utils_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/api.js */ "./src/utils/api.js");
/* harmony import */ var _utils_agrefine_bridge_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/agrefine-bridge.js */ "./src/utils/agrefine-bridge.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }




// Open the side panel when the action icon is clicked
chrome.sidePanel.setPanelBehavior({
  openPanelOnActionClick: true
})["catch"](console.error);

// Restore saved API key into session on service worker startup
(0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.localGet)(_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.KEYS.API_KEY_SAVED).then(function (saved) {
  if (saved) (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.sessionSet)(_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.KEYS.API_KEY, saved)["catch"](function () {});
})["catch"](function () {});

// ── Message router ────────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener(function (message, _sender, sendResponse) {
  var _message$payload2;
  switch (message.type) {
    case 'ANTHROPIC_REQUEST':
      handleAnthropicRequest(message.payload).then(sendResponse)["catch"](function (err) {
        return sendResponse({
          error: err.message
        });
      });
      return true;
    // keep channel open for async response

    case 'SET_API_KEY':
      {
        var _message$payload = message.payload,
          key = _message$payload.key,
          remember = _message$payload.remember;
        var ops = [(0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.sessionSet)(_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.KEYS.API_KEY, key)];
        if (remember) {
          ops.push((0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.localSet)(_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.KEYS.API_KEY_SAVED, key));
        } else {
          ops.push((0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.localSet)(_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.KEYS.API_KEY_SAVED, null));
        }
        Promise.all(ops).then(function () {
          return sendResponse({
            ok: true
          });
        })["catch"](function (err) {
          return sendResponse({
            error: err.message
          });
        });
        return true;
      }
    case 'GET_PAGE_CONTENT':
      sendResponse({
        ok: true
      });
      return false;
    case 'CAPTURE_SCREENSHOT':
      captureActiveTabScreenshot().then(sendResponse)["catch"](function (err) {
        return sendResponse({
          error: err.message
        });
      });
      return true;
    case 'GET_ACTIVE_TAB_CONTENT':
      getActiveTabContent().then(sendResponse)["catch"](function (err) {
        return sendResponse({
          error: err.message
        });
      });
      return true;
    case 'OPEN_TAB':
      openUrlInTab(message.payload.url).then(sendResponse)["catch"](function (err) {
        return sendResponse({
          error: err.message
        });
      });
      return true;
    case 'READ_TAB_CONTENT':
      readTabContent((_message$payload2 = message.payload) === null || _message$payload2 === void 0 ? void 0 : _message$payload2.tab_id).then(sendResponse)["catch"](function (err) {
        return sendResponse({
          error: err.message
        });
      });
      return true;
    case 'AGREFINE_SYNC':
      (0,_utils_agrefine_bridge_js__WEBPACK_IMPORTED_MODULE_2__.syncFromAgRefine)().then(sendResponse)["catch"](function (err) {
        return sendResponse({
          ok: false,
          error: err.message
        });
      });
      return true;
    default:
      return false;
  }
});
function handleAnthropicRequest(_x) {
  return _handleAnthropicRequest.apply(this, arguments);
}
function _handleAnthropicRequest() {
  _handleAnthropicRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
    var system, userMessage, maxTokens, text;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          system = _ref.system, userMessage = _ref.userMessage, maxTokens = _ref.maxTokens;
          _context.n = 1;
          return (0,_utils_api_js__WEBPACK_IMPORTED_MODULE_1__.fetchAnthropic)({
            system: system,
            userMessage: userMessage,
            maxTokens: maxTokens
          });
        case 1:
          text = _context.v;
          return _context.a(2, {
            text: text
          });
      }
    }, _callee);
  }));
  return _handleAnthropicRequest.apply(this, arguments);
}
function captureActiveTabScreenshot() {
  return _captureActiveTabScreenshot.apply(this, arguments);
}
function _captureActiveTabScreenshot() {
  _captureActiveTabScreenshot = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var _yield$chrome$tabs$qu, _yield$chrome$tabs$qu2, tab, dataUrl;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return chrome.tabs.query({
            active: true,
            currentWindow: true
          });
        case 1:
          _yield$chrome$tabs$qu = _context2.v;
          _yield$chrome$tabs$qu2 = _slicedToArray(_yield$chrome$tabs$qu, 1);
          tab = _yield$chrome$tabs$qu2[0];
          if (tab) {
            _context2.n = 2;
            break;
          }
          throw new Error('No active tab found');
        case 2:
          _context2.n = 3;
          return chrome.tabs.captureVisibleTab(tab.windowId, {
            format: 'jpeg',
            quality: 80
          });
        case 3:
          dataUrl = _context2.v;
          return _context2.a(2, {
            dataUrl: dataUrl,
            url: tab.url,
            title: tab.title
          });
      }
    }, _callee2);
  }));
  return _captureActiveTabScreenshot.apply(this, arguments);
}
function getActiveTabContent() {
  return _getActiveTabContent.apply(this, arguments);
}
function _getActiveTabContent() {
  _getActiveTabContent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var _yield$chrome$tabs$qu3, _yield$chrome$tabs$qu4, tab, _resp$text, resp, _t;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.n = 1;
          return chrome.tabs.query({
            active: true,
            currentWindow: true
          });
        case 1:
          _yield$chrome$tabs$qu3 = _context3.v;
          _yield$chrome$tabs$qu4 = _slicedToArray(_yield$chrome$tabs$qu3, 1);
          tab = _yield$chrome$tabs$qu4[0];
          if (tab) {
            _context3.n = 2;
            break;
          }
          throw new Error('No active tab found');
        case 2:
          _context3.p = 2;
          _context3.n = 3;
          return chrome.tabs.sendMessage(tab.id, {
            type: 'GET_PAGE_INFO'
          });
        case 3:
          resp = _context3.v;
          return _context3.a(2, {
            url: tab.url,
            title: tab.title,
            text: (_resp$text = resp === null || resp === void 0 ? void 0 : resp.text) !== null && _resp$text !== void 0 ? _resp$text : '',
            source: 'active_tab'
          });
        case 4:
          _context3.p = 4;
          _t = _context3.v;
          return _context3.a(2, {
            url: tab.url,
            title: tab.title,
            text: '',
            source: 'active_tab',
            note: 'Content script unavailable on this page (chrome://, extensions, etc.)'
          });
      }
    }, _callee3, null, [[2, 4]]);
  }));
  return _getActiveTabContent.apply(this, arguments);
}
function waitForTabLoad(tabId) {
  var timeoutMs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20000;
  return new Promise(function (resolve, reject) {
    var timer = setTimeout(function () {
      chrome.tabs.onUpdated.removeListener(listener);
      chrome.tabs.get(tabId).then(resolve)["catch"](function () {
        return reject(new Error('Tab load timed out'));
      });
    }, timeoutMs);
    function listener(id, info, tab) {
      if (id !== tabId || info.status !== 'complete') return;
      chrome.tabs.onUpdated.removeListener(listener);
      clearTimeout(timer);
      resolve(tab);
    }
    chrome.tabs.onUpdated.addListener(listener);
  });
}
function openUrlInTab(_x2) {
  return _openUrlInTab.apply(this, arguments);
}
function _openUrlInTab() {
  _openUrlInTab = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(url) {
    var tab, loaded;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return chrome.tabs.create({
            url: url,
            active: true
          });
        case 1:
          tab = _context4.v;
          _context4.n = 2;
          return waitForTabLoad(tab.id);
        case 2:
          loaded = _context4.v;
          return _context4.a(2, {
            tab_id: loaded.id,
            url: loaded.url,
            title: loaded.title,
            status: 'ready'
          });
      }
    }, _callee4);
  }));
  return _openUrlInTab.apply(this, arguments);
}
function readTabContent(_x3) {
  return _readTabContent.apply(this, arguments);
} // Keep service worker alive during active side-panel sessions
function _readTabContent() {
  _readTabContent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(tabId) {
    var _yield$chrome$tabs$qu5;
    var targetId, _yield$chrome$scripti, _yield$chrome$scripti2, result, _t2, _t3, _t4, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          if (!(tabId !== null && tabId !== void 0)) {
            _context5.n = 1;
            break;
          }
          _t2 = tabId;
          _context5.n = 6;
          break;
        case 1:
          _context5.n = 2;
          return chrome.tabs.query({
            active: true,
            currentWindow: true
          });
        case 2:
          _t4 = _yield$chrome$tabs$qu5 = _context5.v[0];
          _t3 = _t4 === null;
          if (_t3) {
            _context5.n = 3;
            break;
          }
          _t3 = _yield$chrome$tabs$qu5 === void 0;
        case 3:
          if (!_t3) {
            _context5.n = 4;
            break;
          }
          _t5 = void 0;
          _context5.n = 5;
          break;
        case 4:
          _t5 = _yield$chrome$tabs$qu5.id;
        case 5:
          _t2 = _t5;
        case 6:
          targetId = _t2;
          if (targetId) {
            _context5.n = 7;
            break;
          }
          throw new Error('No tab found');
        case 7:
          _context5.n = 8;
          return chrome.scripting.executeScript({
            target: {
              tabId: targetId
            },
            func: function func() {
              var _document$body$innerT, _document$body;
              var selectors = ['article', 'main', '[role="main"]', '.content', '#content'];
              for (var _i = 0, _selectors = selectors; _i < _selectors.length; _i++) {
                var sel = _selectors[_i];
                var el = document.querySelector(sel);
                if (el) {
                  var clone = el.cloneNode(true);
                  clone.querySelectorAll('script,style,nav,header,footer,aside').forEach(function (n) {
                    return n.remove();
                  });
                  return {
                    url: location.href,
                    title: document.title,
                    text: clone.innerText.trim().slice(0, 8000)
                  };
                }
              }
              return {
                url: location.href,
                title: document.title,
                text: (_document$body$innerT = (_document$body = document.body) === null || _document$body === void 0 || (_document$body = _document$body.innerText) === null || _document$body === void 0 ? void 0 : _document$body.slice(0, 8000)) !== null && _document$body$innerT !== void 0 ? _document$body$innerT : ''
              };
            }
          });
        case 8:
          _yield$chrome$scripti = _context5.v;
          _yield$chrome$scripti2 = _slicedToArray(_yield$chrome$scripti, 1);
          result = _yield$chrome$scripti2[0];
          return _context5.a(2, result.result);
      }
    }, _callee5);
  }));
  return _readTabContent.apply(this, arguments);
}
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === 'keepalive') {
    port.onDisconnect.addListener(function () {});
  }
});
})();

/******/ })()
;
//# sourceMappingURL=background.js.map