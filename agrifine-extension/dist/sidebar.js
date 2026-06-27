/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ag-refine/agent.js"
/*!********************************!*\
  !*** ./src/ag-refine/agent.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AgrifineAgent: () => (/* binding */ AgrifineAgent)
/* harmony export */ });
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage.js */ "./src/utils/storage.js");
/* harmony import */ var _tools_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools.js */ "./src/ag-refine/tools.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var MODEL = 'claude-sonnet-4-6';
var ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
var MAX_ITERATIONS = 10;

/**
 * AgrifineAgent — agentic loop with tool use.
 *
 * Runs entirely in the sidebar context via the background worker proxy.
 * Each call to run() streams back events via an onEvent callback so the
 * UI can update incrementally as the agent thinks and calls tools.
 */
var AgrifineAgent = /*#__PURE__*/function () {
  function AgrifineAgent(_ref) {
    var onEvent = _ref.onEvent;
    _classCallCheck(this, AgrifineAgent);
    this.onEvent = onEvent; // ({ type, data }) => void
  }
  return _createClass(AgrifineAgent, [{
    key: "run",
    value: function () {
      var _run = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(userMessage) {
        var apiKey, contextBundle, systemPrompt, messages, i, body, response, text, toolUseBlocks, toolResults, _iterator, _step, block, result, _t, _t2, _t3;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.n = 1;
              return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.sessionGet)(_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.KEYS.API_KEY);
            case 1:
              apiKey = _context.v;
              if (apiKey) {
                _context.n = 2;
                break;
              }
              this.onEvent({
                type: 'error',
                data: 'No API key set. Open ⚙ Settings to add your Anthropic key.'
              });
              return _context.a(2);
            case 2:
              _context.n = 3;
              return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.buildContextBundle)();
            case 3:
              contextBundle = _context.v;
              systemPrompt = "You are AgriAgent, the dedicated AI advisor for this farm operation. You maintain a persistent \"farm memory\" \u2014 a synthesized knowledge base you build and update over time as you learn more about the operation.\n\nIDENTITY AND ROLE\n- You are this farm's trusted advisor with deep, specific knowledge of its fields, crops, soils, finances, and operations.\n- You think both tactically (today's weather, this week's harvest window) and strategically (long-term soil health, carbon sequestration, USDA program eligibility).\n- Your answers are always grounded in the farm's actual data \u2014 never guess or use generic advice when specific data is available.\n\nMEMORY PROTOCOL\n- The FARM CONTEXT section below is pre-loaded with all available data from every source, including your previously stored farm memory.\n- The farm memory (if present) is the most important section \u2014 it is your synthesized understanding of this operation built from prior analysis. Reference it first.\n- When you discover something significant (a pattern, risk, or opportunity not already captured), call update_farm_memory to preserve it for future sessions.\n- If farm memory is absent or stale (>14 days old), proactively synthesize one after reviewing the available field and file data.\n\nREASONING APPROACH \u2014 follow this order:\n1. GROUND: What does the farm memory and pre-loaded context already tell me?\n2. GAPS: What additional data do I need? Use the right tool \u2014 don't query what's already in context.\n3. CONNECT: Link data across sources (e.g. soil type + weather + crop history \u2192 harvest recommendation).\n4. CITE: Always name fields, dates, acreages, and numbers from the actual data.\n5. REMEMBER: Did this conversation reveal anything new? If so, update_farm_memory.\n\nTOOL SELECTION GUIDE\n- get_field_profiles \u2014 field locations, soil type, acreage, crop history, harvest records\n- get_weather(lat, lon) \u2014 live 7-day forecast + GDD; always get field coordinates first\n- lookup_usda_soil(lat, lon) \u2014 USDA soil classification and organic matter data\n- get_ingested_files \u2014 uploaded CSVs, Excel files, PDFs with extracted structured data\n- get_reading_list \u2014 saved articles, research, USDA notices\n- calculate_gdd(highs, lows) \u2014 growing degree day accumulation from temperature data\n- screenshot_active_tab \u2014 capture the current browser page as an image you can see\n- get_page_content \u2014 read text from the active tab or a saved reading-list URL\n- open_tab(url) + read_tab_content(tab_id) \u2014 navigate to a URL and parse its content\n- export_farm_data \u2014 generate and download CSV/JSON of farm data\n- get_farm_memory \u2014 retrieve the stored farm knowledge snapshot\n- update_farm_memory \u2014 save new insights about this farm for future sessions\n\nFARM CONTEXT (all data sources pre-loaded \u2014 memory, field profiles, ingested files, reading list):\n".concat(contextBundle);
              messages = [{
                role: 'user',
                content: userMessage
              }];
              this.onEvent({
                type: 'thinking',
                data: 'Analysing your question…'
              });
              i = 0;
            case 4:
              if (!(i < MAX_ITERATIONS)) {
                _context.n = 23;
                break;
              }
              body = {
                model: MODEL,
                max_tokens: 2048,
                system: systemPrompt,
                tools: _tools_js__WEBPACK_IMPORTED_MODULE_1__.TOOL_DEFINITIONS,
                messages: messages
              };
              response = void 0;
              _context.p = 5;
              _context.n = 6;
              return this._callAPI(apiKey, body);
            case 6:
              response = _context.v;
              _context.n = 8;
              break;
            case 7:
              _context.p = 7;
              _t = _context.v;
              this.onEvent({
                type: 'error',
                data: _t.message
              });
              return _context.a(2);
            case 8:
              // Append assistant turn
              messages.push({
                role: 'assistant',
                content: response.content
              });
              if (!(response.stop_reason === 'end_turn' || response.stop_reason === 'max_tokens')) {
                _context.n = 9;
                break;
              }
              text = response.content.filter(function (b) {
                return b.type === 'text';
              }).map(function (b) {
                return b.text;
              }).join('\n');
              this.onEvent({
                type: 'answer',
                data: text
              });
              return _context.a(2);
            case 9:
              if (!(response.stop_reason === 'tool_use')) {
                _context.n = 21;
                break;
              }
              toolUseBlocks = response.content.filter(function (b) {
                return b.type === 'tool_use';
              });
              toolResults = [];
              _iterator = _createForOfIteratorHelper(toolUseBlocks);
              _context.p = 10;
              _iterator.s();
            case 11:
              if ((_step = _iterator.n()).done) {
                _context.n = 17;
                break;
              }
              block = _step.value;
              this.onEvent({
                type: 'tool_call',
                data: {
                  name: block.name,
                  input: block.input
                }
              });
              result = void 0;
              _context.p = 12;
              _context.n = 13;
              return (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.executeTool)(block.name, block.input);
            case 13:
              result = _context.v;
              _context.n = 15;
              break;
            case 14:
              _context.p = 14;
              _t2 = _context.v;
              result = {
                error: _t2.message
              };
            case 15:
              this.onEvent({
                type: 'tool_result',
                data: {
                  name: block.name,
                  result: result
                }
              });

              // Screenshot tool returns an image — pass it as a vision content block
              if (result && result._type === 'image') {
                toolResults.push({
                  type: 'tool_result',
                  tool_use_id: block.id,
                  content: [{
                    type: 'image',
                    source: {
                      type: 'base64',
                      media_type: result.media_type,
                      data: result.data
                    }
                  }, {
                    type: 'text',
                    text: "Screenshot of \"".concat(result.title, "\" (").concat(result.url, ")")
                  }]
                });
              } else {
                toolResults.push({
                  type: 'tool_result',
                  tool_use_id: block.id,
                  content: JSON.stringify(result)
                });
              }
            case 16:
              _context.n = 11;
              break;
            case 17:
              _context.n = 19;
              break;
            case 18:
              _context.p = 18;
              _t3 = _context.v;
              _iterator.e(_t3);
            case 19:
              _context.p = 19;
              _iterator.f();
              return _context.f(19);
            case 20:
              messages.push({
                role: 'user',
                content: toolResults
              });
              return _context.a(3, 22);
            case 21:
              // Unexpected stop reason
              this.onEvent({
                type: 'error',
                data: "Unexpected stop reason: ".concat(response.stop_reason)
              });
              return _context.a(2);
            case 22:
              i++;
              _context.n = 4;
              break;
            case 23:
              this.onEvent({
                type: 'error',
                data: 'Agent reached maximum iterations without completing.'
              });
            case 24:
              return _context.a(2);
          }
        }, _callee, this, [[12, 14], [10, 18, 19, 20], [5, 7]]);
      }));
      function run(_x) {
        return _run.apply(this, arguments);
      }
      return run;
    }()
  }, {
    key: "_callAPI",
    value: function () {
      var _callAPI2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(apiKey, body) {
        var res, text;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
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
            case 1:
              res = _context2.v;
              if (res.ok) {
                _context2.n = 3;
                break;
              }
              _context2.n = 2;
              return res.text();
            case 2:
              text = _context2.v;
              throw new Error("Anthropic API ".concat(res.status, ": ").concat(text));
            case 3:
              return _context2.a(2, res.json());
          }
        }, _callee2);
      }));
      function _callAPI(_x2, _x3) {
        return _callAPI2.apply(this, arguments);
      }
      return _callAPI;
    }()
  }]);
}();

/***/ },

/***/ "./src/ag-refine/committee.js"
/*!************************************!*\
  !*** ./src/ag-refine/committee.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COMMITTEE: () => (/* binding */ COMMITTEE),
/* harmony export */   runCommitteeAgent: () => (/* binding */ runCommitteeAgent)
/* harmony export */ });
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage.js */ "./src/utils/storage.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * The Boardroom — Multi-Agent Audit Committee
 *
 * Four named advisors, each with a domain-specific persona, review the same
 * farm data context and report in sequence. Later agents receive a summary of
 * what earlier agents said, enabling authentic cross-domain commentary.
 */

var MODEL = 'claude-sonnet-4-6';
var ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
var COMMITTEE = [{
  id: 'financials',
  name: 'Kount Kuekkens',
  role: 'CFO · Financials',
  emoji: '💹',
  accentColor: '#d97706',
  borderStyle: 'border-l-[3px]',
  borderColor: '#d97706',
  persona: "You are Kount Kuekkens, a retired agricultural economist now serving as CFO for this farm operation. You speak with a spiraling rhetorical style \u2014 you begin broad, drift into economic theory or historical context, but always land on concrete \"Dairy Moneyball\" math that actually matters.\n\nYour domain: Income Over Feed Cost (IOFC), commodity price impacts on margins, feed efficiency ratios, processor quality premium/penalty thresholds, cash flow position, budget variances, and the financial consequences of operational data errors.\n\nWhen you spot data problems, quantify the financial blindspot they create. When you see opportunities, express them in dollar terms. You are candid about when you are \"spiraling\" into uncertainty vs. when you have hard numbers. You occasionally reference obscure economic principles before getting to the point.\n\nReport in 3\u20134 paragraphs. Be specific \u2014 name dollar figures, percentages, and cite the data points you are drawing from."
}, {
  id: 'crops',
  name: 'Rolf Forage',
  role: 'Agronomist · Crops',
  emoji: '🌾',
  accentColor: '#16a34a',
  borderColor: '#16a34a',
  persona: "You are Rolf Forage (pronounced \"For-ahh-juz\"), a fiercely opinionated agronomist and crops director. You do not care about spreadsheets or financial models \u2014 you care about what is actually in the field and the bunker right now.\n\nYour domain: forage quality (dry matter, NDF, fiber digestibility), silage inventory and fermentation integrity, harvest timing windows, field conditions (soil type, drainage, compaction), cover crop programs, nutrient cycling, and input scheduling.\n\nYou are demanding and direct. If the data shows a crop problem that will compromise feed quality, you say so loudly and insist it be corrected immediately \u2014 you do not sugarcoat risk to protect someone's budget. You will call out the financial team for cutting corners that ultimately cost more in lost production. You speak in practical, field-level language.\n\nReport in 3\u20134 paragraphs. Be opinionated and specific about what needs to happen and when."
}, {
  id: 'herd',
  name: 'Dr. Vera Hest',
  role: 'Chief Veterinarian · Herd Health',
  emoji: '🐄',
  accentColor: '#60a5fa',
  borderColor: '#60a5fa',
  persona: "You are Dr. Vera Hest, a sharp-witted, data-driven veterinarian and herd health director. You value biological metrics and animal welfare above all else \u2014 and you will challenge any department that proposes to compromise herd health in the name of cost savings or operational convenience.\n\nYour domain: Somatic Cell Count (SCC) trends and penalty risk, Dry Matter Intake (DMI) per cow, Body Condition Score (BCS), transition cow health, Temperature-Humidity Index (THI) and heat stress protocol, milk component trends (fat, protein), reproductive performance, and disease incidence (ketosis, mastitis, lameness, displaced abomasum).\n\nYou connect biological metrics to production outcomes \u2014 a BCS over 3.75 at calving means dystocia and ketosis next month; a THI of 86 means DMI drops 10\u201315% and milk yield follows within 48 hours. You are precise with thresholds, not vague. You speak clinically but translate findings for the group when needed.\n\nReport in 3\u20134 paragraphs. Be incisive. Cite specific thresholds and explain their downstream consequences."
}, {
  id: 'personnel',
  name: 'Marla Shift',
  role: 'Operations Manager · Personnel',
  emoji: '📋',
  accentColor: '#94a3b8',
  borderColor: '#94a3b8',
  persona: "You are Marla Shift, the operations-hardened manager who oversees labor, personnel scheduling, equipment maintenance, and day-to-day execution. You are the \"reality check\" of the boardroom.\n\nYour domain: labor availability and shift coverage, overtime costs and crew fatigue, equipment uptime and maintenance backlogs, safety compliance, training gaps, and operational root causes of data errors or production misses.\n\nWhen the other advisors make demands \u2014 Rolf needs an early harvest crew, Vera wants manual pen checks every two hours, Kount wants a new validation system built by Friday \u2014 you translate those demands into actual execution requirements: how many people, how many hours, what it costs, and what else will be delayed or skipped to make it happen.\n\nYou provide honest operational explanations (not excuses) for why things went wrong: mechanical failures, staffing gaps during peak periods, training slips under pressure. You are pragmatic, occasionally exasperated, and very good at finding workarounds under real-world constraints.\n\nReport in 3\u20134 paragraphs. Be concrete about labor, time, and resource constraints."
}];

/**
 * Run a single committee agent and stream their response.
 * priorStatements: array of { name, role, text } from agents who already spoke.
 * onChunk: called with partial text as it streams in.
 */
function runCommitteeAgent(_x, _x2, _x3, _x4) {
  return _runCommitteeAgent.apply(this, arguments);
}
function _runCommitteeAgent() {
  _runCommitteeAgent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(agent, topic, priorStatements, onChunk) {
    var apiKey, contextBundle, priorContext, systemPrompt, res, text, reader, decoder, fullText, buffer, _lines$pop, _yield$reader$read, done, value, lines, _iterator, _step, line, payload, _evt$delta, evt, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.n = 1;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.sessionGet)(_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.KEYS.API_KEY);
        case 1:
          apiKey = _context.v;
          if (apiKey) {
            _context.n = 2;
            break;
          }
          throw new Error('No API key set — open ⚙ Settings to add your Anthropic key.');
        case 2:
          _context.n = 3;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.buildContextBundle)();
        case 3:
          contextBundle = _context.v;
          priorContext = priorStatements.length > 0 ? "\n\n\u2500\u2500 PRIOR STATEMENTS FROM YOUR COLLEAGUES \u2500\u2500\n".concat(priorStatements.map(function (s) {
            return "".concat(s.name, " (").concat(s.role, "):\n").concat(s.text);
          }).join('\n\n─────────────────────\n\n')) : '';
          systemPrompt = "".concat(agent.persona, "\n\n\u2500\u2500 FARM DATA CONTEXT \u2500\u2500\n").concat(contextBundle).concat(priorContext, "\n\nYou are presenting your department report at the weekly audit boardroom. Address the meeting topic directly from your domain's perspective. If colleagues have already spoken, you may reference or push back on their points where they intersect with your domain.");
          _context.n = 4;
          return fetch(ANTHROPIC_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
              'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
              model: MODEL,
              max_tokens: 1024,
              stream: true,
              system: systemPrompt,
              messages: [{
                role: 'user',
                content: topic
              }]
            })
          });
        case 4:
          res = _context.v;
          if (res.ok) {
            _context.n = 6;
            break;
          }
          _context.n = 5;
          return res.text();
        case 5:
          text = _context.v;
          throw new Error("API ".concat(res.status, ": ").concat(text));
        case 6:
          // Stream SSE response
          reader = res.body.getReader();
          decoder = new TextDecoder();
          fullText = '';
          buffer = '';
        case 7:
          if (false) // removed by dead control flow
{}
          _context.n = 8;
          return reader.read();
        case 8:
          _yield$reader$read = _context.v;
          done = _yield$reader$read.done;
          value = _yield$reader$read.value;
          if (!done) {
            _context.n = 9;
            break;
          }
          return _context.a(3, 19);
        case 9:
          buffer += decoder.decode(value, {
            stream: true
          });
          lines = buffer.split('\n');
          buffer = (_lines$pop = lines.pop()) !== null && _lines$pop !== void 0 ? _lines$pop : '';
          _iterator = _createForOfIteratorHelper(lines);
          _context.p = 10;
          _iterator.s();
        case 11:
          if ((_step = _iterator.n()).done) {
            _context.n = 15;
            break;
          }
          line = _step.value;
          if (line.startsWith('data: ')) {
            _context.n = 12;
            break;
          }
          return _context.a(3, 14);
        case 12:
          payload = line.slice(6).trim();
          if (!(payload === '[DONE]')) {
            _context.n = 13;
            break;
          }
          return _context.a(3, 14);
        case 13:
          try {
            evt = JSON.parse(payload);
            if (evt.type === 'content_block_delta' && ((_evt$delta = evt.delta) === null || _evt$delta === void 0 ? void 0 : _evt$delta.type) === 'text_delta') {
              fullText += evt.delta.text;
              onChunk(evt.delta.text, fullText);
            }
          } catch (_) {}
        case 14:
          _context.n = 11;
          break;
        case 15:
          _context.n = 17;
          break;
        case 16:
          _context.p = 16;
          _t = _context.v;
          _iterator.e(_t);
        case 17:
          _context.p = 17;
          _iterator.f();
          return _context.f(17);
        case 18:
          _context.n = 7;
          break;
        case 19:
          return _context.a(2, fullText);
      }
    }, _callee, null, [[10, 16, 17, 18]]);
  }));
  return _runCommitteeAgent.apply(this, arguments);
}

/***/ },

/***/ "./src/ag-refine/index.js"
/*!********************************!*\
  !*** ./src/ag-refine/index.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AgRefineModule: () => (/* binding */ AgRefineModule)
/* harmony export */ });
/* harmony import */ var _agent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./agent.js */ "./src/ag-refine/agent.js");
/* harmony import */ var _committee_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./committee.js */ "./src/ag-refine/committee.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


var TOOL_ICONS = {
  get_reading_list: '📖',
  get_field_profiles: '🌱',
  get_ingested_files: '📄',
  get_weather: '🌤️',
  lookup_usda_soil: '🏛️',
  calculate_gdd: '📊',
  screenshot_active_tab: '📸',
  get_page_content: '🔍',
  export_farm_data: '⬇️',
  open_tab: '🌐',
  read_tab_content: '📋',
  get_farm_memory: '🧠',
  update_farm_memory: '💾'
};
var AGENT_PROMPTS = ['Review all my farm data and build a farm memory summary', 'What are my current field conditions and harvest windows?', 'What risks or opportunities do you see across my operation?', 'Screenshot this page and tell me what agricultural data you see', 'Export my reading list and field profiles to CSV'];
var BOARDROOM_PROMPTS = ['Weekly operations audit — all departments, give me your status', 'We have a data integrity issue — assess the impact by department', 'Heat stress event incoming — what does each department need?', 'Review all farm data and identify the single biggest risk per department', 'What is the biggest point of contention between departments right now?'];
function AgRefineModule() {
  var mode = 'agent'; // 'agent' | 'boardroom'

  // Agent mode state
  var agentMessages = [];
  var agentRunning = false;

  // Boardroom mode state
  var boardMessages = []; // { type: 'topic'|'report'|'chair'|'thinking', ... }
  var boardRunning = false;
  var boardTargetAgent = null; // null = all, or agent id for targeted response

  return {
    id: 'ag-refine',
    label: 'AgriAgent',
    render: function render(container) {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              container.innerHTML = _this._html();
              _this._bindEvents(container);
              _this._switchMode(mode, container);
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }))();
    },
    _html: function _html() {
      return "\n        <div class=\"flex flex-col h-full\">\n\n          <!-- Mode toggle -->\n          <div class=\"flex-shrink-0 flex border-b border-night-600\" style=\"background:#131c2b;\">\n            <button data-mode=\"agent\"\n              class=\"mode-btn flex-1 py-2.5 text-xs font-bold uppercase tracking-widest transition\">\n              Agent\n            </button>\n            <button data-mode=\"boardroom\"\n              class=\"mode-btn flex-1 py-2.5 text-xs font-bold uppercase tracking-widest transition\">\n              Boardroom\n            </button>\n          </div>\n\n          <!-- \u2500\u2500 AGENT MODE \u2500\u2500 -->\n          <div id=\"panel-agent\" class=\"flex flex-col flex-1 overflow-hidden hidden\">\n\n            <div class=\"px-4 pt-3 pb-2 flex-shrink-0\">\n              <div class=\"flex items-center gap-2 mb-0.5\">\n                <span class=\"text-base\">\uD83E\uDD16</span>\n                <h2 class=\"text-sm font-bold text-white\">AgriAgent</h2>\n                <span class=\"text-xs px-2 py-0.5 rounded-full bg-night-600 text-agri-400 font-medium\">AI Agent</span>\n              </div>\n              <p class=\"text-xs text-gray-500\">Multi-step reasoning over all your farm data</p>\n            </div>\n\n            <div id=\"agent-chat\" class=\"flex-1 overflow-y-auto px-4 py-2 space-y-3\"></div>\n\n            <div id=\"agent-suggestions\" class=\"px-4 pb-2 flex-shrink-0\">\n              <p class=\"text-xs text-gray-500 mb-2\">Try asking\u2026</p>\n              <div class=\"flex flex-col gap-1.5\">\n                ".concat(AGENT_PROMPTS.map(function (p) {
        return "\n                  <button class=\"agent-suggest-btn text-left text-xs bg-night-700 hover:bg-night-600 text-agri-400 px-3 py-2 rounded-lg border border-night-500 transition\">\n                    ".concat(p, "\n                  </button>");
      }).join(''), "\n              </div>\n            </div>\n\n            <div class=\"flex-shrink-0 border-t border-night-600 px-3 py-3\">\n              <div class=\"flex gap-2 items-end\">\n                <textarea id=\"agent-input\" rows=\"2\"\n                  placeholder=\"Ask the agent anything about your farm\u2026\"\n                  class=\"ag-input flex-1 rounded-xl resize-none\"></textarea>\n                <button id=\"agent-send\"\n                  class=\"flex-shrink-0 bg-agri-600 hover:bg-agri-700 disabled:bg-night-500 text-white rounded-xl px-3 py-2 transition\">\n                  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 19l9 2-9-18-9 18 9-2zm0 0v-8\" />\n                  </svg>\n                </button>\n              </div>\n              <button id=\"agent-clear\" class=\"text-xs text-gray-500 hover:text-gray-300 mt-1 transition\">Clear conversation</button>\n            </div>\n          </div>\n\n          <!-- \u2500\u2500 BOARDROOM MODE \u2500\u2500 -->\n          <div id=\"panel-boardroom\" class=\"flex flex-col flex-1 overflow-hidden hidden\">\n\n            <!-- Committee roster -->\n            <div class=\"flex-shrink-0 px-4 pt-3 pb-2\">\n              <div class=\"flex items-center gap-1.5 mb-2\">\n                <span class=\"text-sm\">\uD83C\uDFDB\uFE0F</span>\n                <h2 class=\"text-sm font-bold text-white\">The Boardroom</h2>\n              </div>\n              <div class=\"flex flex-wrap gap-1.5\">\n                ").concat(_committee_js__WEBPACK_IMPORTED_MODULE_1__.COMMITTEE.map(function (a) {
        return "\n                  <div class=\"flex items-center gap-1 px-2 py-1 rounded-lg border text-xs\"\n                    style=\"border-color:".concat(a.borderColor, "22;background:").concat(a.accentColor, "11;\">\n                    <span>").concat(a.emoji, "</span>\n                    <span style=\"color:").concat(a.accentColor, ";\">").concat(a.name, "</span>\n                  </div>\n                ");
      }).join(''), "\n              </div>\n            </div>\n\n            <!-- Meeting transcript -->\n            <div id=\"board-chat\" class=\"flex-1 overflow-y-auto px-4 py-2 space-y-3\"></div>\n\n            <!-- Suggested meeting topics (when empty) -->\n            <div id=\"board-suggestions\" class=\"px-4 pb-2 flex-shrink-0\">\n              <p class=\"text-xs text-gray-500 mb-2\">Call the meeting to order\u2026</p>\n              <div class=\"flex flex-col gap-1.5\">\n                ").concat(BOARDROOM_PROMPTS.map(function (p) {
        return "\n                  <button class=\"board-suggest-btn text-left text-xs bg-night-700 hover:bg-night-600 text-agri-400 px-3 py-2 rounded-lg border border-night-500 transition\">\n                    ".concat(p, "\n                  </button>");
      }).join(''), "\n              </div>\n            </div>\n\n            <!-- Input bar -->\n            <div class=\"flex-shrink-0 border-t border-night-600 px-3 py-3\">\n              <!-- Agent selector for targeted follow-ups -->\n              <div id=\"board-target-bar\" class=\"hidden flex gap-1.5 mb-2 flex-wrap\">\n                <span class=\"text-[9px] uppercase tracking-widest text-gray-500 self-center mr-0.5\">Address:</span>\n                <button data-target=\"all\" class=\"target-btn active-target text-[9px] px-2 py-1 rounded border border-agri-600 text-agri-400 transition\">All</button>\n                ").concat(_committee_js__WEBPACK_IMPORTED_MODULE_1__.COMMITTEE.map(function (a) {
        return "\n                  <button data-target=\"".concat(a.id, "\" class=\"target-btn text-[9px] px-2 py-1 rounded border border-night-500 transition\" style=\"color:").concat(a.accentColor, "66;\">\n                    ").concat(a.name.split(' ')[0], "\n                  </button>\n                ");
      }).join(''), "\n              </div>\n\n              <div class=\"flex gap-2 items-end\">\n                <textarea id=\"board-input\" rows=\"2\"\n                  placeholder=\"State the meeting topic, or ask a follow-up\u2026\"\n                  class=\"ag-input flex-1 rounded-xl resize-none\"></textarea>\n                <button id=\"board-send\"\n                  class=\"flex-shrink-0 bg-agri-600 hover:bg-agri-700 disabled:bg-night-500 text-white rounded-xl px-3 py-2 transition\">\n                  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 19l9 2-9-18-9 18 9-2zm0 0v-8\" />\n                  </svg>\n                </button>\n              </div>\n              <button id=\"board-clear\" class=\"text-xs text-gray-500 hover:text-gray-300 mt-1 transition\">Clear meeting</button>\n            </div>\n          </div>\n\n        </div>\n      ");
    },
    _switchMode: function _switchMode(newMode, container) {
      mode = newMode;
      container.querySelector('#panel-agent').classList.toggle('hidden', mode !== 'agent');
      container.querySelector('#panel-boardroom').classList.toggle('hidden', mode !== 'boardroom');
      container.querySelectorAll('.mode-btn').forEach(function (btn) {
        var active = btn.dataset.mode === mode;
        btn.style.color = active ? '#22c55e' : '#3d4f66';
        btn.style.borderBottom = active ? '2px solid #22c55e' : '2px solid transparent';
      });
    },
    _bindEvents: function _bindEvents(container) {
      var _this2 = this;
      // Mode toggle
      container.querySelectorAll('.mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          return _this2._switchMode(btn.dataset.mode, container);
        });
      });

      // ── Agent mode ──
      var agentInput = container.querySelector('#agent-input');
      var agentSend = container.querySelector('#agent-send');
      var sendAgent = function sendAgent() {
        var text = agentInput.value.trim();
        if (!text || agentRunning) return;
        agentInput.value = '';
        _this2._runAgent(text, container);
      };
      agentSend.addEventListener('click', sendAgent);
      agentInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendAgent();
        }
      });
      container.querySelectorAll('.agent-suggest-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          agentInput.value = btn.textContent.trim();
          sendAgent();
        });
      });
      container.querySelector('#agent-clear').addEventListener('click', function () {
        agentMessages = [];
        agentRunning = false;
        _this2._renderAgentMessages(container);
      });

      // ── Boardroom mode ──
      var boardInput = container.querySelector('#board-input');
      var boardSend = container.querySelector('#board-send');
      var sendBoard = function sendBoard() {
        var text = boardInput.value.trim();
        if (!text || boardRunning) return;
        boardInput.value = '';
        _this2._runBoardroom(text, container);
      };
      boardSend.addEventListener('click', sendBoard);
      boardInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendBoard();
        }
      });
      container.querySelectorAll('.board-suggest-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          boardInput.value = btn.textContent.trim();
          sendBoard();
        });
      });
      container.querySelector('#board-clear').addEventListener('click', function () {
        boardMessages = [];
        boardRunning = false;
        boardTargetAgent = null;
        container.querySelector('#board-target-bar').classList.add('hidden');
        _this2._renderBoardMessages(container);
      });

      // Target agent selector
      container.querySelectorAll('.target-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          boardTargetAgent = btn.dataset.target === 'all' ? null : btn.dataset.target;
          container.querySelectorAll('.target-btn').forEach(function (b) {
            b.classList.toggle('active-target', b.dataset.target === (boardTargetAgent !== null && boardTargetAgent !== void 0 ? boardTargetAgent : 'all'));
            b.style.borderColor = b.classList.contains('active-target') ? '#22c55e' : '';
            if (!b.classList.contains('active-target')) b.style.borderColor = '#253047';
          });
        });
      });
    },
    // ── Agent mode logic ──────────────────────────────────────────────────────
    _runAgent: function _runAgent(userText, container) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _container$querySelec;
        var thinkingId, thinkingMsg, agent, idx, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              if (!agentRunning) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              agentRunning = true;
              (_container$querySelec = container.querySelector('#agent-suggestions')) === null || _container$querySelec === void 0 || _container$querySelec.classList.add('hidden');
              agentMessages.push({
                role: 'user',
                text: userText
              });
              _this3._renderAgentMessages(container);
              thinkingId = "thinking_".concat(Date.now());
              agentMessages.push({
                role: 'thinking',
                id: thinkingId,
                steps: []
              });
              _this3._renderAgentMessages(container);
              thinkingMsg = agentMessages[agentMessages.length - 1];
              agent = new _agent_js__WEBPACK_IMPORTED_MODULE_0__.AgrifineAgent({
                onEvent: function onEvent(_ref) {
                  var type = _ref.type,
                    data = _ref.data;
                  if (type === 'thinking') {
                    thinkingMsg.steps.push({
                      type: 'status',
                      text: data
                    });
                  } else if (type === 'tool_call') {
                    var _TOOL_ICONS$data$name;
                    thinkingMsg.steps.push({
                      type: 'tool',
                      icon: (_TOOL_ICONS$data$name = TOOL_ICONS[data.name]) !== null && _TOOL_ICONS$data$name !== void 0 ? _TOOL_ICONS$data$name : '🔧',
                      name: data.name.replace(/_/g, ' '),
                      input: JSON.stringify(data.input)
                    });
                  } else if (type === 'tool_result') {
                    var last = thinkingMsg.steps[thinkingMsg.steps.length - 1];
                    if ((last === null || last === void 0 ? void 0 : last.type) === 'tool') last.done = true;
                  } else if (type === 'answer') {
                    var idx = agentMessages.findIndex(function (m) {
                      return m.id === thinkingId;
                    });
                    if (idx >= 0) agentMessages.splice(idx, 1);
                    agentMessages.push({
                      role: 'assistant',
                      text: data
                    });
                    agentRunning = false;
                  } else if (type === 'error') {
                    var _idx = agentMessages.findIndex(function (m) {
                      return m.id === thinkingId;
                    });
                    if (_idx >= 0) agentMessages.splice(_idx, 1);
                    agentMessages.push({
                      role: 'error',
                      text: data
                    });
                    agentRunning = false;
                  }
                  _this3._renderAgentMessages(container);
                }
              });
              _context2.p = 2;
              _context2.n = 3;
              return agent.run(userText);
            case 3:
              _context2.n = 5;
              break;
            case 4:
              _context2.p = 4;
              _t = _context2.v;
              idx = agentMessages.findIndex(function (m) {
                return m.id === thinkingId;
              });
              if (idx >= 0) agentMessages.splice(idx, 1);
              agentMessages.push({
                role: 'error',
                text: _t.message
              });
              agentRunning = false;
              _this3._renderAgentMessages(container);
            case 5:
              return _context2.a(2);
          }
        }, _callee2, null, [[2, 4]]);
      }))();
    },
    _renderAgentMessages: function _renderAgentMessages(container) {
      var chat = container.querySelector('#agent-chat');
      if (!chat) return;
      if (agentMessages.length === 0) {
        var _container$querySelec2;
        chat.innerHTML = '';
        (_container$querySelec2 = container.querySelector('#agent-suggestions')) === null || _container$querySelec2 === void 0 || _container$querySelec2.classList.remove('hidden');
        return;
      }
      chat.innerHTML = agentMessages.map(function (msg) {
        if (msg.role === 'user') {
          return "<div class=\"flex justify-end\">\n            <div class=\"max-w-[85%] bg-agri-600 text-white text-sm px-3 py-2 rounded-2xl rounded-tr-sm\">\n              ".concat(escapeHtml(msg.text), "\n            </div>\n          </div>");
        }
        if (msg.role === 'thinking') {
          var _msg$steps;
          var steps = (_msg$steps = msg.steps) !== null && _msg$steps !== void 0 ? _msg$steps : [];
          return "<div class=\"flex flex-col gap-1.5\">\n            ".concat(steps.map(function (step) {
            if (step.type === 'status') {
              return "<div class=\"flex items-center gap-1.5 text-xs text-gray-500\">\n                  <span class=\"spinner flex-shrink-0\"></span> ".concat(escapeHtml(step.text), "\n                </div>");
            }
            if (step.type === 'tool') {
              return "<div class=\"flex items-center gap-2 text-xs bg-night-700 border border-night-600 rounded-lg px-3 py-1.5\">\n                  <span>".concat(step.icon, "</span>\n                  <span class=\"font-medium text-agri-400\">").concat(step.name, "</span>\n                  ").concat(step.done ? '<span class="ml-auto text-agri-500">✓</span>' : '<span class="spinner ml-auto flex-shrink-0"></span>', "\n                </div>");
            }
            return '';
          }).join(''), "\n            ").concat(steps.length === 0 ? '<div class="flex items-center gap-1.5 text-xs text-gray-500"><span class="spinner"></span> Starting…</div>' : '', "\n          </div>");
        }
        if (msg.role === 'assistant') {
          return "<div class=\"flex gap-2 items-start\">\n            <div class=\"flex-shrink-0 w-6 h-6 rounded-full bg-night-600 flex items-center justify-center text-xs\">\uD83E\uDD16</div>\n            <div class=\"flex-1 bg-night-700 border border-night-600 rounded-2xl rounded-tl-sm px-3 py-2.5 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap\">".concat(escapeHtml(msg.text), "</div>\n          </div>");
        }
        if (msg.role === 'error') {
          return "<div class=\"text-xs bg-red-900/20 border border-red-900/40 text-red-400 rounded-xl px-3 py-2\">\u26A0\uFE0F ".concat(escapeHtml(msg.text), "</div>");
        }
        return '';
      }).join('');
      chat.scrollTop = chat.scrollHeight;
    },
    // ── Boardroom mode logic ──────────────────────────────────────────────────
    _runBoardroom: function _runBoardroom(topic, container) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _container$querySelec3;
        var agentsToRun, priorStatements, _iterator, _step, agent, _iterator2, _step2, _loop, _t3;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              if (!boardRunning) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              boardRunning = true;
              (_container$querySelec3 = container.querySelector('#board-suggestions')) === null || _container$querySelec3 === void 0 || _container$querySelec3.classList.add('hidden');

              // Add chair statement
              boardMessages.push({
                type: 'chair',
                text: topic
              });
              _this4._renderBoardMessages(container);

              // Determine which agents respond
              agentsToRun = boardTargetAgent ? _committee_js__WEBPACK_IMPORTED_MODULE_1__.COMMITTEE.filter(function (a) {
                return a.id === boardTargetAgent;
              }) : _committee_js__WEBPACK_IMPORTED_MODULE_1__.COMMITTEE; // Build context: full prior statements from this meeting for sequential passing
              priorStatements = boardMessages.filter(function (m) {
                return m.type === 'report' && m.text;
              }).map(function (m) {
                return {
                  name: m.agent.name,
                  role: m.agent.role,
                  text: m.text
                };
              }); // Add thinking placeholders for each agent that will speak
              _iterator = _createForOfIteratorHelper(agentsToRun);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  agent = _step.value;
                  boardMessages.push({
                    type: 'thinking',
                    agentId: agent.id,
                    agent: agent
                  });
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              _this4._renderBoardMessages(container);

              // Run agents sequentially so each gets the prior context
              _iterator2 = _createForOfIteratorHelper(agentsToRun);
              _context4.p = 2;
              _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                var agent, msgIdx, reportMsg, _t2;
                return _regenerator().w(function (_context3) {
                  while (1) switch (_context3.p = _context3.n) {
                    case 0:
                      agent = _step2.value;
                      msgIdx = boardMessages.findIndex(function (m) {
                        return m.type === 'thinking' && m.agentId === agent.id;
                      }); // Convert thinking → streaming report
                      reportMsg = {
                        type: 'report',
                        agent: agent,
                        text: '',
                        streaming: true
                      };
                      if (msgIdx >= 0) boardMessages.splice(msgIdx, 1, reportMsg);
                      _this4._renderBoardMessages(container);
                      _context3.p = 1;
                      _context3.n = 2;
                      return (0,_committee_js__WEBPACK_IMPORTED_MODULE_1__.runCommitteeAgent)(agent, topic, priorStatements, function (chunk, fullText) {
                        reportMsg.text = fullText;
                        _this4._renderBoardMessages(container);
                      });
                    case 2:
                      reportMsg.streaming = false;
                      priorStatements.push({
                        name: agent.name,
                        role: agent.role,
                        text: reportMsg.text
                      });
                      _context3.n = 4;
                      break;
                    case 3:
                      _context3.p = 3;
                      _t2 = _context3.v;
                      boardMessages.splice(boardMessages.indexOf(reportMsg), 1, {
                        type: 'error',
                        text: "".concat(agent.name, ": ").concat(_t2.message)
                      });
                    case 4:
                      _this4._renderBoardMessages(container);
                    case 5:
                      return _context3.a(2);
                  }
                }, _loop, null, [[1, 3]]);
              });
              _iterator2.s();
            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context4.n = 5;
                break;
              }
              return _context4.d(_regeneratorValues(_loop()), 4);
            case 4:
              _context4.n = 3;
              break;
            case 5:
              _context4.n = 7;
              break;
            case 6:
              _context4.p = 6;
              _t3 = _context4.v;
              _iterator2.e(_t3);
            case 7:
              _context4.p = 7;
              _iterator2.f();
              return _context4.f(7);
            case 8:
              boardRunning = false;

              // Show target bar after the first meeting round
              if (boardMessages.some(function (m) {
                return m.type === 'report';
              })) {
                container.querySelector('#board-target-bar').classList.remove('hidden');
              }
              _this4._renderBoardMessages(container);
            case 9:
              return _context4.a(2);
          }
        }, _callee3, null, [[2, 6, 7, 8]]);
      }))();
    },
    _renderBoardMessages: function _renderBoardMessages(container) {
      var chat = container.querySelector('#board-chat');
      if (!chat) return;
      if (boardMessages.length === 0) {
        var _container$querySelec4;
        chat.innerHTML = '';
        (_container$querySelec4 = container.querySelector('#board-suggestions')) === null || _container$querySelec4 === void 0 || _container$querySelec4.classList.remove('hidden');
        return;
      }
      chat.innerHTML = boardMessages.map(function (msg) {
        if (msg.type === 'chair') {
          return "\n            <div class=\"flex justify-end\">\n              <div class=\"max-w-[85%] bg-agri-600 text-white text-xs px-3 py-2 rounded-2xl rounded-tr-sm\">\n                <div class=\"text-[9px] uppercase tracking-widest text-agri-200 mb-1 font-semibold\">Chair \xB7 David</div>\n                ".concat(escapeHtml(msg.text), "\n              </div>\n            </div>");
        }
        if (msg.type === 'thinking') {
          var a = msg.agent;
          return "\n            <div class=\"rounded-xl border border-night-600 overflow-hidden\" style=\"border-left-color:".concat(a.accentColor, "44;border-left-width:3px;\">\n              <div class=\"px-3 pt-2.5 pb-1 flex items-center gap-2\" style=\"background:#131c2b;\">\n                <span>").concat(a.emoji, "</span>\n                <span class=\"text-xs font-bold\" style=\"color:").concat(a.accentColor, ";\">").concat(a.name, "</span>\n                <span class=\"text-[9px] uppercase tracking-widest text-gray-500\">").concat(a.role, "</span>\n                <span class=\"spinner ml-auto flex-shrink-0\"></span>\n              </div>\n              <div class=\"px-3 py-2 text-xs text-gray-500 italic\" style=\"background:#0f1621;\">\n                Reviewing data\u2026\n              </div>\n            </div>");
        }
        if (msg.type === 'report') {
          var _a = msg.agent;
          return "\n            <div class=\"rounded-xl border border-night-600 overflow-hidden\" style=\"border-left-color:".concat(_a.accentColor, ";border-left-width:3px;\">\n              <div class=\"px-3 pt-2.5 pb-1 flex items-center gap-2\" style=\"background:#131c2b;\">\n                <span>").concat(_a.emoji, "</span>\n                <span class=\"text-xs font-bold\" style=\"color:").concat(_a.accentColor, ";\">").concat(_a.name, "</span>\n                <span class=\"text-[9px] uppercase tracking-widest text-gray-500\">").concat(_a.role, "</span>\n                ").concat(msg.streaming ? '<span class="spinner ml-auto flex-shrink-0"></span>' : '', "\n              </div>\n              <div class=\"px-3 py-2.5 text-xs text-gray-200 leading-relaxed whitespace-pre-wrap\" style=\"background:#0f1621;\">\n                ").concat(escapeHtml(msg.text || '…'), "\n              </div>\n            </div>");
        }
        if (msg.type === 'error') {
          return "<div class=\"text-xs bg-red-900/20 border border-red-900/40 text-red-400 rounded-xl px-3 py-2\">\u26A0\uFE0F ".concat(escapeHtml(msg.text), "</div>");
        }
        return '';
      }).join('');
      chat.scrollTop = chat.scrollHeight;
    }
  };
}
function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/***/ },

/***/ "./src/ag-refine/tools.js"
/*!********************************!*\
  !*** ./src/ag-refine/tools.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TOOL_DEFINITIONS: () => (/* binding */ TOOL_DEFINITIONS),
/* harmony export */   executeTool: () => (/* binding */ executeTool)
/* harmony export */ });
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage.js */ "./src/utils/storage.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

function csvEscape(val) {
  var s = String(val !== null && val !== void 0 ? val : '');
  return s.includes(',') || s.includes('"') || s.includes('\n') ? "\"".concat(s.replace(/"/g, '""'), "\"") : s;
}

// ── Tool definitions sent to Claude ──────────────────────────────────────────

var TOOL_DEFINITIONS = [{
  name: 'get_reading_list',
  description: 'Retrieve saved web pages from the user\'s reading list. Can filter by tag.',
  input_schema: {
    type: 'object',
    properties: {
      tag: {
        type: 'string',
        description: 'Optional tag to filter by: agriculture, equipment, land, carbon, USDA, dairy, finance, weather'
      }
    },
    required: []
  }
}, {
  name: 'get_field_profiles',
  description: 'Retrieve all farm field profiles including acreage, soil type, coordinates, crop history, and notes.',
  input_schema: {
    type: 'object',
    properties: {
      field_name: {
        type: 'string',
        description: 'Optional field name to filter by (partial match)'
      }
    },
    required: []
  }
}, {
  name: 'get_ingested_files',
  description: 'Retrieve all uploaded and parsed farm data files (CSV, Excel, PDF). Returns structured JSON extracted from each file.',
  input_schema: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        "enum": ['CSV', 'Excel', 'PDF'],
        description: 'Optional file type filter'
      }
    },
    required: []
  }
}, {
  name: 'get_weather',
  description: 'Fetch current conditions, 7-day forecast, and calculate Growing Degree Days (GDD) for a field location using Open-Meteo (free, no key required).',
  input_schema: {
    type: 'object',
    properties: {
      latitude: {
        type: 'number',
        description: 'Latitude of the field'
      },
      longitude: {
        type: 'number',
        description: 'Longitude of the field'
      },
      field_name: {
        type: 'string',
        description: 'Human-readable field name for context'
      }
    },
    required: ['latitude', 'longitude']
  }
}, {
  name: 'lookup_usda_soil',
  description: 'Look up soil data from the USDA Web Soil Survey API by coordinates. Returns soil series, texture, organic matter, and drainage class.',
  input_schema: {
    type: 'object',
    properties: {
      latitude: {
        type: 'number',
        description: 'Latitude'
      },
      longitude: {
        type: 'number',
        description: 'Longitude'
      }
    },
    required: ['latitude', 'longitude']
  }
}, {
  name: 'screenshot_active_tab',
  description: 'Take a screenshot of the currently active browser tab. Returns an image Claude can visually inspect — use this to see what the user is currently viewing, check a web page layout, verify data on screen, or analyse any visible content.',
  input_schema: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'Optional note about why the screenshot is being taken (for context)'
      }
    },
    required: []
  }
}, {
  name: 'get_page_content',
  description: 'Fetch the full text content of the currently active browser tab, or look up a saved reading-list URL. Use this to read articles, extract data from web pages, or analyse the text of any page the user has open.',
  input_schema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'Optional URL to look up in the saved reading list. If omitted, reads the active tab.'
      }
    },
    required: []
  }
}, {
  name: 'export_farm_data',
  description: 'Generate and download a CSV or JSON export of farm data. Triggers a file download in the user\'s browser. Use when the user asks to export, download, or save their farm data.',
  input_schema: {
    type: 'object',
    properties: {
      data_type: {
        type: 'string',
        "enum": ['reading_list', 'field_profiles', 'ingested_files', 'all'],
        description: 'Which data set to export'
      },
      format: {
        type: 'string',
        "enum": ['csv', 'json'],
        description: 'File format (csv or json). "all" data_type always uses json.'
      }
    },
    required: ['data_type']
  }
}, {
  name: 'get_farm_memory',
  description: 'Retrieve the stored farm memory — the AI-synthesized knowledge base for this operation. Returns the most recent summary, key insights, action items, risk flags, and opportunities identified in prior sessions. Call this if the system context did not already include farm memory.',
  input_schema: {
    type: 'object',
    properties: {},
    required: []
  }
}, {
  name: 'update_farm_memory',
  description: 'Save an updated farm memory snapshot. Call this after synthesizing new insights so future sessions benefit from what you learned. Write a comprehensive aiGeneratedSummary covering the whole farm operation — fields, soils, crops, patterns, and strategic outlook.',
  input_schema: {
    type: 'object',
    properties: {
      aiGeneratedSummary: {
        type: 'string',
        description: 'A rich narrative synthesis of the farm operation. Cover: total acreage, each field\'s status, soil conditions, crop history patterns, financial health (if data available), key risks, and strategic opportunities. Write as a briefing you\'d give a new advisor.'
      },
      farm_name: {
        type: 'string',
        description: 'Farm or operation name if known'
      },
      total_acres: {
        type: 'number',
        description: 'Total acreage across all fields'
      },
      primary_crops: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Primary crops grown'
      },
      soil_overview: {
        type: 'string',
        description: 'Summary of soil conditions across the operation'
      },
      key_insights: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Most important observations — patterns, correlations, or findings about this farm'
      },
      action_items: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Recommended next steps for the operator'
      },
      risk_flags: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Risks, concerns, or issues to monitor'
      },
      opportunities: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Opportunities identified — programs, practices, markets'
      }
    },
    required: ['aiGeneratedSummary']
  }
}, {
  name: 'open_tab',
  description: 'Open a URL in a new browser tab and wait for it to load. Use this to navigate to a relevant website — USDA, weather services, commodity markets, farm news, etc. After opening, call read_tab_content or screenshot_active_tab to extract information.',
  input_schema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'The full URL to open (must start with https:// or http://)'
      },
      reason: {
        type: 'string',
        description: 'Why you are opening this URL — shown to the user'
      }
    },
    required: ['url']
  }
}, {
  name: 'read_tab_content',
  description: 'Extract and parse the text content of a browser tab. Call after open_tab to read the page that was just loaded, or omit tab_id to read the currently active tab.',
  input_schema: {
    type: 'object',
    properties: {
      tab_id: {
        type: 'number',
        description: 'Tab ID returned by open_tab. Omit to read the currently active tab.'
      }
    },
    required: []
  }
}, {
  name: 'calculate_gdd',
  description: 'Calculate Growing Degree Days from temperature data. Uses base temp of 50°F for forage crops.',
  input_schema: {
    type: 'object',
    properties: {
      daily_highs: {
        type: 'array',
        items: {
          type: 'number'
        },
        description: 'Array of daily high temperatures in Fahrenheit'
      },
      daily_lows: {
        type: 'array',
        items: {
          type: 'number'
        },
        description: 'Array of daily low temperatures in Fahrenheit'
      },
      base_temp: {
        type: 'number',
        description: 'Base temperature in °F (default 50 for forage crops)'
      }
    },
    required: ['daily_highs', 'daily_lows']
  }
}];

// ── Tool implementations ──────────────────────────────────────────────────────

function executeTool(_x, _x2) {
  return _executeTool.apply(this, arguments);
}
function _executeTool() {
  _executeTool = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(name, input) {
    var _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _t = name;
          _context.n = _t === 'get_reading_list' ? 1 : _t === 'get_field_profiles' ? 2 : _t === 'get_ingested_files' ? 3 : _t === 'get_weather' ? 4 : _t === 'lookup_usda_soil' ? 5 : _t === 'calculate_gdd' ? 6 : _t === 'screenshot_active_tab' ? 7 : _t === 'get_page_content' ? 8 : _t === 'export_farm_data' ? 9 : _t === 'get_farm_memory' ? 10 : _t === 'update_farm_memory' ? 11 : _t === 'open_tab' ? 12 : _t === 'read_tab_content' ? 13 : 14;
          break;
        case 1:
          return _context.a(2, toolGetReadingList(input));
        case 2:
          return _context.a(2, toolGetFieldProfiles(input));
        case 3:
          return _context.a(2, toolGetIngestedFiles(input));
        case 4:
          return _context.a(2, toolGetWeather(input));
        case 5:
          return _context.a(2, toolLookupUSDAsoil(input));
        case 6:
          return _context.a(2, toolCalculateGDD(input));
        case 7:
          return _context.a(2, toolScreenshotActiveTab(input));
        case 8:
          return _context.a(2, toolGetPageContent(input));
        case 9:
          return _context.a(2, toolExportFarmData(input));
        case 10:
          return _context.a(2, toolGetFarmMemory());
        case 11:
          return _context.a(2, toolUpdateFarmMemory(input));
        case 12:
          return _context.a(2, toolOpenTab(input));
        case 13:
          return _context.a(2, toolReadTabContent(input));
        case 14:
          return _context.a(2, {
            error: "Unknown tool: ".concat(name)
          });
        case 15:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _executeTool.apply(this, arguments);
}
function toolGetReadingList() {
  return _toolGetReadingList.apply(this, arguments);
}
function _toolGetReadingList() {
  _toolGetReadingList = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var _ref7,
      tag,
      list,
      filtered,
      _args2 = arguments;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _ref7 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, tag = _ref7.tag;
          _context2.n = 1;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getReadingList)();
        case 1:
          list = _context2.v;
          filtered = tag ? list.filter(function (i) {
            var _i$tags;
            return (_i$tags = i.tags) === null || _i$tags === void 0 ? void 0 : _i$tags.includes(tag);
          }) : list;
          return _context2.a(2, {
            count: filtered.length,
            items: filtered.slice(0, 30).map(function (i) {
              return {
                title: i.title,
                url: i.url,
                summary: i.summary,
                tags: i.tags,
                savedAt: i.savedAt
              };
            })
          });
      }
    }, _callee2);
  }));
  return _toolGetReadingList.apply(this, arguments);
}
function toolGetFieldProfiles() {
  return _toolGetFieldProfiles.apply(this, arguments);
}
function _toolGetFieldProfiles() {
  _toolGetFieldProfiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var _ref8,
      field_name,
      profiles,
      filtered,
      _args3 = arguments;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _ref8 = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {}, field_name = _ref8.field_name;
          _context3.n = 1;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getFieldProfiles)();
        case 1:
          profiles = _context3.v;
          filtered = field_name ? profiles.filter(function (p) {
            var _p$name;
            return (_p$name = p.name) === null || _p$name === void 0 ? void 0 : _p$name.toLowerCase().includes(field_name.toLowerCase());
          }) : profiles;
          return _context3.a(2, {
            count: filtered.length,
            profiles: filtered.map(function (p) {
              return {
                id: p.id,
                name: p.name,
                acres: p.acres,
                soilType: p.soilType,
                cluId: p.cluId,
                coordinates: p.coordinates,
                notes: p.notes,
                cropHistory: p.cropHistory,
                harvestRecords: p.harvestRecords,
                createdAt: p.createdAt
              };
            })
          });
      }
    }, _callee3);
  }));
  return _toolGetFieldProfiles.apply(this, arguments);
}
function toolGetIngestedFiles() {
  return _toolGetIngestedFiles.apply(this, arguments);
}
function _toolGetIngestedFiles() {
  _toolGetIngestedFiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var _ref9,
      type,
      files,
      filtered,
      _args4 = arguments;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _ref9 = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {}, type = _ref9.type;
          _context4.n = 1;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getIngestedFiles)();
        case 1:
          files = _context4.v;
          filtered = type ? files.filter(function (f) {
            return f.type === type;
          }) : files;
          return _context4.a(2, {
            count: filtered.length,
            files: filtered.map(function (f) {
              return {
                filename: f.filename,
                type: f.type,
                uploadedAt: f.uploadedAt,
                structuredData: f.structuredData
              };
            })
          });
      }
    }, _callee4);
  }));
  return _toolGetIngestedFiles.apply(this, arguments);
}
function toolGetWeather(_x3) {
  return _toolGetWeather.apply(this, arguments);
}
function _toolGetWeather() {
  _toolGetWeather = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(_ref) {
    var _daily$precipitation_, _daily$precipitation_2;
    var latitude, longitude, _ref$field_name, field_name, url, res, data, current, daily, gddDays, totalGDD, rainAlert, avgRainProb, harvestWindow;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          latitude = _ref.latitude, longitude = _ref.longitude, _ref$field_name = _ref.field_name, field_name = _ref$field_name === void 0 ? 'field' : _ref$field_name;
          url = new URL('https://api.open-meteo.com/v1/forecast');
          url.searchParams.set('latitude', latitude);
          url.searchParams.set('longitude', longitude);
          url.searchParams.set('current', 'temperature_2m,precipitation,wind_speed_10m,weather_code');
          url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max');
          url.searchParams.set('temperature_unit', 'fahrenheit');
          url.searchParams.set('wind_speed_unit', 'mph');
          url.searchParams.set('precipitation_unit', 'inch');
          url.searchParams.set('forecast_days', '7');
          url.searchParams.set('timezone', 'auto');
          _context5.n = 1;
          return fetch(url.toString());
        case 1:
          res = _context5.v;
          if (res.ok) {
            _context5.n = 2;
            break;
          }
          throw new Error("Open-Meteo error: ".concat(res.status));
        case 2:
          _context5.n = 3;
          return res.json();
        case 3:
          data = _context5.v;
          current = data.current;
          daily = data.daily; // GDD accumulation from forecast
          gddDays = daily.temperature_2m_max.map(function (hi, i) {
            var lo = daily.temperature_2m_min[i];
            return Math.max(0, (hi + lo) / 2 - 50);
          });
          totalGDD = gddDays.reduce(function (a, b) {
            return a + b;
          }, 0); // Rain alert: >0.5 inch in next 48h
          rainAlert = ((_daily$precipitation_ = daily.precipitation_sum[0]) !== null && _daily$precipitation_ !== void 0 ? _daily$precipitation_ : 0) + ((_daily$precipitation_2 = daily.precipitation_sum[1]) !== null && _daily$precipitation_2 !== void 0 ? _daily$precipitation_2 : 0) > 0.5; // Harvest window
          avgRainProb = daily.precipitation_probability_max.slice(0, 3).reduce(function (a, b) {
            return a + b;
          }, 0) / 3;
          harvestWindow = avgRainProb < 20 ? 'GREEN' : avgRainProb < 50 ? 'YELLOW' : 'RED';
          return _context5.a(2, {
            field: field_name,
            coordinates: {
              latitude: latitude,
              longitude: longitude
            },
            current: {
              temperature_f: current.temperature_2m,
              precipitation_in: current.precipitation,
              wind_mph: current.wind_speed_10m
            },
            forecast_7day: daily.time.map(function (date, i) {
              return {
                date: date,
                high_f: daily.temperature_2m_max[i],
                low_f: daily.temperature_2m_min[i],
                precip_in: daily.precipitation_sum[i],
                rain_probability_pct: daily.precipitation_probability_max[i],
                gdd: gddDays[i].toFixed(1)
              };
            }),
            gdd_7day_total: totalGDD.toFixed(1),
            rain_alert_48h: rainAlert,
            harvest_window: harvestWindow
          });
      }
    }, _callee5);
  }));
  return _toolGetWeather.apply(this, arguments);
}
function toolLookupUSDAsoil(_x4) {
  return _toolLookupUSDAsoil.apply(this, arguments);
}
function _toolLookupUSDAsoil() {
  _toolLookupUSDAsoil = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(_ref2) {
    var latitude, longitude, query, _data$Table, res, data, rows, _t2;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          latitude = _ref2.latitude, longitude = _ref2.longitude;
          // USDA Web Soil Survey SDA REST API
          query = "SELECT mapunit.muname, component.compname, component.comppct_r,\n    component.taxorder, component.taxsubgrp, chorizon.texture, chorizon.om_r,\n    chorizon.drainagecl\n    FROM mapunit\n    INNER JOIN component ON mapunit.mukey = component.mukey\n    INNER JOIN chorizon ON component.cokey = chorizon.cokey\n    WHERE mu_lks.mukey IN (\n      SELECT * FROM SDA_Get_Mukey_from_intersection_with_WktWgs84(\n        'point(".concat(longitude, " ").concat(latitude, ")')\n    )\n    AND component.majcompflag = 'Yes'\n    ORDER BY component.comppct_r DESC");
          _context6.p = 1;
          _context6.n = 2;
          return fetch('https://sdmdataaccess.sc.egov.usda.gov/TABULAR/post.rest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "request=query&query=".concat(encodeURIComponent(query), "&format=JSON")
          });
        case 2:
          res = _context6.v;
          if (res.ok) {
            _context6.n = 3;
            break;
          }
          throw new Error("USDA SDA API ".concat(res.status));
        case 3:
          _context6.n = 4;
          return res.json();
        case 4:
          data = _context6.v;
          rows = (_data$Table = data.Table) !== null && _data$Table !== void 0 ? _data$Table : [];
          return _context6.a(2, {
            coordinates: {
              latitude: latitude,
              longitude: longitude
            },
            soil_data: rows.slice(0, 5).map(function (r) {
              return {
                map_unit: r[0],
                component: r[1],
                percent: r[2],
                tax_order: r[3],
                subgroup: r[4],
                texture: r[5],
                organic_matter_pct: r[6],
                drainage_class: r[7]
              };
            })
          });
        case 5:
          _context6.p = 5;
          _t2 = _context6.v;
          return _context6.a(2, {
            coordinates: {
              latitude: latitude,
              longitude: longitude
            },
            note: 'USDA SDA API unavailable — soil data requires network access from background worker'
          });
      }
    }, _callee6, null, [[1, 5]]);
  }));
  return _toolLookupUSDAsoil.apply(this, arguments);
}
function toolScreenshotActiveTab() {
  return new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({
      type: 'CAPTURE_SCREENSHOT'
    }, function (response) {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (response !== null && response !== void 0 && response.error) {
        reject(new Error(response.error));
        return;
      }
      // Strip data URL prefix — agent.js will format this as an image content block
      var base64 = response.dataUrl.replace(/^data:image\/\w+;base64,/, '');
      resolve({
        _type: 'image',
        media_type: 'image/jpeg',
        data: base64,
        url: response.url,
        title: response.title
      });
    });
  });
}
function toolGetPageContent() {
  return _toolGetPageContent.apply(this, arguments);
}
function _toolGetPageContent() {
  _toolGetPageContent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
    var _ref0,
      url,
      list,
      saved,
      _args7 = arguments;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _ref0 = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {}, url = _ref0.url;
          if (!url) {
            _context7.n = 2;
            break;
          }
          _context7.n = 1;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getReadingList)();
        case 1:
          list = _context7.v;
          saved = list.find(function (i) {
            return i.url === url || i.url.startsWith(url);
          });
          if (!saved) {
            _context7.n = 2;
            break;
          }
          return _context7.a(2, {
            url: saved.url,
            title: saved.title,
            summary: saved.summary,
            tags: saved.tags,
            source: 'reading_list_cache'
          });
        case 2:
          return _context7.a(2, new Promise(function (resolve, reject) {
            chrome.runtime.sendMessage({
              type: 'GET_ACTIVE_TAB_CONTENT'
            }, function (response) {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
              }
              if (response !== null && response !== void 0 && response.error) {
                reject(new Error(response.error));
                return;
              }
              resolve(response);
            });
          }));
      }
    }, _callee7);
  }));
  return _toolGetPageContent.apply(this, arguments);
}
function toolExportFarmData(_x5) {
  return _toolExportFarmData.apply(this, arguments);
}
function _toolExportFarmData() {
  _toolExportFarmData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(_ref3) {
    var data_type, _ref3$format, format, records, filename, content, date, _yield$Promise$all, _yield$Promise$all2, rl, files, profiles, list, hdrs, rows, _profiles, _hdrs, _rows, _files, mimeType, blob, objectUrl, anchor;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          data_type = _ref3.data_type, _ref3$format = _ref3.format, format = _ref3$format === void 0 ? 'csv' : _ref3$format;
          date = new Date().toISOString().slice(0, 10);
          if (!(data_type === 'all')) {
            _context8.n = 2;
            break;
          }
          _context8.n = 1;
          return Promise.all([(0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getReadingList)(), (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getIngestedFiles)(), (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getFieldProfiles)()]);
        case 1:
          _yield$Promise$all = _context8.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
          rl = _yield$Promise$all2[0];
          files = _yield$Promise$all2[1];
          profiles = _yield$Promise$all2[2];
          filename = "agrifine_export_".concat(date, ".json");
          content = JSON.stringify({
            reading_list: rl,
            ingested_files: files,
            field_profiles: profiles
          }, null, 2);
          records = rl.length + files.length + profiles.length;
          _context8.n = 9;
          break;
        case 2:
          if (!(data_type === 'reading_list')) {
            _context8.n = 4;
            break;
          }
          _context8.n = 3;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getReadingList)();
        case 3:
          list = _context8.v;
          records = list.length;
          filename = "agrifine_reading_list_".concat(date, ".").concat(format);
          if (format === 'json') {
            content = JSON.stringify(list, null, 2);
          } else {
            hdrs = ['title', 'url', 'summary', 'tags', 'savedAt'];
            rows = list.map(function (i) {
              var _i$summary, _i$tags2;
              return [i.title, i.url, (_i$summary = i.summary) !== null && _i$summary !== void 0 ? _i$summary : '', ((_i$tags2 = i.tags) !== null && _i$tags2 !== void 0 ? _i$tags2 : []).join('; '), i.savedAt].map(csvEscape);
            });
            content = [hdrs.join(',')].concat(_toConsumableArray(rows.map(function (r) {
              return r.join(',');
            }))).join('\n');
          }
          _context8.n = 9;
          break;
        case 4:
          if (!(data_type === 'field_profiles')) {
            _context8.n = 6;
            break;
          }
          _context8.n = 5;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getFieldProfiles)();
        case 5:
          _profiles = _context8.v;
          records = _profiles.length;
          filename = "agrifine_field_profiles_".concat(date, ".").concat(format);
          if (format === 'json') {
            content = JSON.stringify(_profiles, null, 2);
          } else {
            _hdrs = ['name', 'acres', 'soil_type', 'latitude', 'longitude', 'clu_id', 'notes', 'created_at'];
            _rows = _profiles.map(function (p) {
              var _p$acres, _p$soilType, _p$coordinates$lat, _p$coordinates, _p$coordinates$lon, _p$coordinates2, _p$cluId, _p$notes;
              return [p.name, (_p$acres = p.acres) !== null && _p$acres !== void 0 ? _p$acres : '', (_p$soilType = p.soilType) !== null && _p$soilType !== void 0 ? _p$soilType : '', (_p$coordinates$lat = (_p$coordinates = p.coordinates) === null || _p$coordinates === void 0 ? void 0 : _p$coordinates.lat) !== null && _p$coordinates$lat !== void 0 ? _p$coordinates$lat : '', (_p$coordinates$lon = (_p$coordinates2 = p.coordinates) === null || _p$coordinates2 === void 0 ? void 0 : _p$coordinates2.lon) !== null && _p$coordinates$lon !== void 0 ? _p$coordinates$lon : '', (_p$cluId = p.cluId) !== null && _p$cluId !== void 0 ? _p$cluId : '', (_p$notes = p.notes) !== null && _p$notes !== void 0 ? _p$notes : '', p.createdAt].map(csvEscape);
            });
            content = [_hdrs.join(',')].concat(_toConsumableArray(_rows.map(function (r) {
              return r.join(',');
            }))).join('\n');
          }
          _context8.n = 9;
          break;
        case 6:
          if (!(data_type === 'ingested_files')) {
            _context8.n = 8;
            break;
          }
          _context8.n = 7;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getIngestedFiles)();
        case 7:
          _files = _context8.v;
          records = _files.length;
          filename = "agrifine_ingested_files_".concat(date, ".json");
          content = JSON.stringify(_files, null, 2);
          _context8.n = 9;
          break;
        case 8:
          return _context8.a(2, {
            error: "Unknown data_type: ".concat(data_type)
          });
        case 9:
          // Trigger download inside the sidebar page
          mimeType = filename.endsWith('.json') ? 'application/json' : 'text/csv';
          blob = new Blob([content], {
            type: mimeType
          });
          objectUrl = URL.createObjectURL(blob);
          anchor = document.createElement('a');
          anchor.href = objectUrl;
          anchor.download = filename;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
          setTimeout(function () {
            return URL.revokeObjectURL(objectUrl);
          }, 2000);
          return _context8.a(2, {
            exported: true,
            filename: filename,
            record_count: records,
            format: filename.split('.').pop(),
            data_type: data_type
          });
      }
    }, _callee8);
  }));
  return _toolExportFarmData.apply(this, arguments);
}
function toolGetFarmMemory() {
  return _toolGetFarmMemory.apply(this, arguments);
}
function _toolGetFarmMemory() {
  _toolGetFarmMemory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
    var memory;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _context9.n = 1;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getFarmMemory)();
        case 1:
          memory = _context9.v;
          if (memory) {
            _context9.n = 2;
            break;
          }
          return _context9.a(2, {
            has_memory: false,
            message: 'No farm memory stored yet. Review the field profiles and ingested files, then call update_farm_memory to create a persistent knowledge base for this farm.'
          });
        case 2:
          return _context9.a(2, _objectSpread({
            has_memory: true
          }, memory));
      }
    }, _callee9);
  }));
  return _toolGetFarmMemory.apply(this, arguments);
}
function toolUpdateFarmMemory(_x6) {
  return _toolUpdateFarmMemory.apply(this, arguments);
}
function _toolUpdateFarmMemory() {
  _toolUpdateFarmMemory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(input) {
    var _input$farm_name, _input$total_acres, _input$primary_crops, _input$soil_overview, _input$key_insights, _input$action_items, _input$risk_flags, _input$opportunities;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          _context0.n = 1;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.saveFarmMemory)({
            aiGeneratedSummary: input.aiGeneratedSummary,
            farm_name: (_input$farm_name = input.farm_name) !== null && _input$farm_name !== void 0 ? _input$farm_name : null,
            total_acres: (_input$total_acres = input.total_acres) !== null && _input$total_acres !== void 0 ? _input$total_acres : null,
            primary_crops: (_input$primary_crops = input.primary_crops) !== null && _input$primary_crops !== void 0 ? _input$primary_crops : [],
            soil_overview: (_input$soil_overview = input.soil_overview) !== null && _input$soil_overview !== void 0 ? _input$soil_overview : null,
            key_insights: (_input$key_insights = input.key_insights) !== null && _input$key_insights !== void 0 ? _input$key_insights : [],
            action_items: (_input$action_items = input.action_items) !== null && _input$action_items !== void 0 ? _input$action_items : [],
            risk_flags: (_input$risk_flags = input.risk_flags) !== null && _input$risk_flags !== void 0 ? _input$risk_flags : [],
            opportunities: (_input$opportunities = input.opportunities) !== null && _input$opportunities !== void 0 ? _input$opportunities : []
          });
        case 1:
          return _context0.a(2, {
            saved: true,
            message: 'Farm memory updated. Future sessions will begin with this knowledge.'
          });
      }
    }, _callee0);
  }));
  return _toolUpdateFarmMemory.apply(this, arguments);
}
function toolOpenTab(_ref4) {
  var url = _ref4.url,
    reason = _ref4.reason;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return Promise.resolve({
      error: 'URL must start with http:// or https://'
    });
  }
  return new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({
      type: 'OPEN_TAB',
      payload: {
        url: url
      }
    }, function (response) {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (response !== null && response !== void 0 && response.error) {
        reject(new Error(response.error));
        return;
      }
      resolve(_objectSpread(_objectSpread({}, response), {}, {
        reason: reason !== null && reason !== void 0 ? reason : null
      }));
    });
  });
}
function toolReadTabContent() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    tab_id = _ref5.tab_id;
  return new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({
      type: 'READ_TAB_CONTENT',
      payload: {
        tab_id: tab_id !== null && tab_id !== void 0 ? tab_id : null
      }
    }, function (response) {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (response !== null && response !== void 0 && response.error) {
        reject(new Error(response.error));
        return;
      }
      resolve(response);
    });
  });
}
function toolCalculateGDD(_ref6) {
  var daily_highs = _ref6.daily_highs,
    daily_lows = _ref6.daily_lows,
    _ref6$base_temp = _ref6.base_temp,
    base_temp = _ref6$base_temp === void 0 ? 50 : _ref6$base_temp;
  var gdd_per_day = daily_highs.map(function (hi, i) {
    var _daily_lows$i;
    var lo = (_daily_lows$i = daily_lows[i]) !== null && _daily_lows$i !== void 0 ? _daily_lows$i : hi;
    var avg = (hi + lo) / 2;
    return Math.max(0, avg - base_temp);
  });
  var total = gdd_per_day.reduce(function (a, b) {
    return a + b;
  }, 0);
  return {
    base_temp_f: base_temp,
    days: gdd_per_day.length,
    gdd_per_day: gdd_per_day.map(function (g) {
      return parseFloat(g.toFixed(1));
    }),
    total_gdd: parseFloat(total.toFixed(1)),
    interpretation: total < 200 ? 'Early growth stage' : total < 500 ? 'Vegetative growth' : total < 900 ? 'Approaching harvest window' : 'Harvest recommended'
  };
}

/***/ },

/***/ "./src/modules/carbon-estimator/index.js"
/*!***********************************************!*\
  !*** ./src/modules/carbon-estimator/index.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CarbonEstimatorModule: () => (/* binding */ CarbonEstimatorModule)
/* harmony export */ });
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Carbon Estimator — Phase 7 stub
// Full implementation: soil organic matter, Scope 3 emissions, USDA NRCS eFOTG API, PDF export

function CarbonEstimatorModule() {
  return {
    id: 'carbon-estimator',
    label: 'Carbon',
    render: function render(container) {
      container.innerHTML = "\n        <div class=\"section-heading\">Carbon Estimator</div>\n\n        <div class=\"px-4\">\n          <!-- Phase 7 preview card -->\n          <div class=\"agri-card border-night-600\">\n            <div class=\"flex items-center gap-3 mb-3\">\n              <div class=\"w-10 h-10 rounded-full bg-night-600 flex items-center justify-center text-xl\">\uD83C\uDF3F</div>\n              <div>\n                <h3 class=\"text-sm font-bold text-white\">Carbon Estimator</h3>\n                <span class=\"coming-soon\">Coming in Phase 7</span>\n              </div>\n            </div>\n            <p class=\"text-xs text-gray-400 leading-relaxed\">\n              The Carbon Estimator will calculate your operation's Scope 3 emissions profile\n              and estimate carbon sequestration potential per field using USDA emission factors.\n            </p>\n          </div>\n\n          <!-- Feature preview list -->\n          <div class=\"space-y-2 mt-2\">\n            ".concat([['📊', 'Scope 3 Emissions Profile', 'Based on fuel use, crop type, and animal operations'], ['🌱', 'Sequestration Potential', 'Per-field estimate using soil type and land cover'], ['🏛️', 'USDA Program Matcher', 'Match your practices to EQIP, CSP, and CRP programs'], ['📄', 'Carbon Credit PDF', 'Downloadable eligibility summary for carbon marketplaces'], ['📡', 'Marketplace Handoff', 'Send your credit profile to Nori, Pachama, or others (Phase 8)']].map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3),
          icon = _ref2[0],
          title = _ref2[1],
          desc = _ref2[2];
        return "\n              <div class=\"flex items-start gap-3 py-2.5 border-b border-night-600 last:border-0\">\n                <span class=\"text-base\">".concat(icon, "</span>\n                <div>\n                  <p class=\"text-xs font-semibold text-gray-200\">").concat(title, "</p>\n                  <p class=\"text-xs text-gray-500\">").concat(desc, "</p>\n                </div>\n              </div>");
      }).join(''), "\n          </div>\n\n          <!-- Notify placeholder -->\n          <div class=\"mt-4 bg-night-800 rounded-xl p-3 text-center\">\n            <p class=\"text-xs text-agri-400 font-medium\">Your field profile data is already being collected.</p>\n            <p class=\"text-xs text-agri-500 mt-0.5\">Carbon estimates will populate automatically when Phase 7 lands.</p>\n          </div>\n        </div>\n      ");
    }
  };
}

/***/ },

/***/ "./src/modules/dashboard/index.js"
/*!****************************************!*\
  !*** ./src/modules/dashboard/index.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardModule: () => (/* binding */ DashboardModule)
/* harmony export */ });
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/storage.js */ "./src/utils/storage.js");
/* harmony import */ var _utils_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/api.js */ "./src/utils/api.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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


function escapeHtml(str) {
  return String(str !== null && str !== void 0 ? str : '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
var CATEGORIES = ['all', 'land', 'equipment', 'harvest', 'finance', 'carbon', 'weather'];
function tagCategory(item) {
  var _item$tags, _item$structuredData;
  var tags = (_item$tags = item.tags) !== null && _item$tags !== void 0 ? _item$tags : [];
  var data = JSON.stringify((_item$structuredData = item.structuredData) !== null && _item$structuredData !== void 0 ? _item$structuredData : {}).toLowerCase();
  if (tags.includes('land') || data.includes('field') || data.includes('acre')) return 'land';
  if (tags.includes('equipment') || data.includes('equipment')) return 'equipment';
  if (data.includes('harvest') || data.includes('yield')) return 'harvest';
  if (tags.includes('finance') || data.includes('financ') || data.includes('expense')) return 'finance';
  if (tags.includes('carbon') || data.includes('carbon')) return 'carbon';
  if (tags.includes('weather') || data.includes('weather')) return 'weather';
  return 'other';
}
function DashboardModule() {
  var activeCategory = 'all';
  var keyword = '';
  var aiAnswer = '';
  var aiLoading = false;
  return {
    id: 'dashboard',
    label: 'Dashboard',
    render: function render(container) {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              container.innerHTML = "\n        <div class=\"section-heading\">Farm Dashboard</div>\n\n        <!-- AI Query bar -->\n        <div class=\"px-4 mb-3\">\n          <div class=\"flex gap-2\">\n            <input id=\"dash-ai-input\" type=\"text\" placeholder=\"Ask anything\u2026 e.g. highest yield field?\"\n              class=\"ag-input flex-1 rounded-xl\" />\n            <button id=\"dash-ai-btn\"\n              class=\"bg-agri-600 hover:bg-agri-700 text-white text-sm px-4 py-2 rounded-xl transition flex-shrink-0\">\n              Ask\n            </button>\n          </div>\n          <div id=\"dash-ai-answer\" class=\"hidden mt-2 bg-night-700 border border-night-600 rounded-xl p-3 text-sm text-gray-200 leading-relaxed\"></div>\n        </div>\n\n        <!-- Filters -->\n        <div class=\"px-4 mb-3\">\n          <div class=\"flex gap-1.5 flex-wrap mb-2\">\n            ".concat(CATEGORIES.map(function (c) {
                return "\n              <button data-cat=\"".concat(c, "\" class=\"cat-btn text-xs px-2.5 py-1 rounded-full border transition\n                ").concat(c === activeCategory ? 'bg-agri-600 text-white border-agri-600' : 'border-night-500 text-gray-400 hover:border-agri-500', "\">\n                ").concat(c.charAt(0).toUpperCase() + c.slice(1), "\n              </button>");
              }).join(''), "\n          </div>\n          <input id=\"dash-search\" type=\"text\" placeholder=\"Search by keyword or field name\u2026\"\n            class=\"ag-input\" />\n        </div>\n\n        <!-- Unified list -->\n        <div id=\"dash-list\" class=\"px-4 pb-4\"></div>\n      ");
              _this._bindEvents(container);
              _context.n = 1;
              return _this._renderDashboard(container);
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }))();
    },
    _bindEvents: function _bindEvents(container) {
      var _this2 = this;
      container.querySelectorAll('.cat-btn').forEach(function (btn) {
        btn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                activeCategory = btn.dataset.cat;
                container.querySelectorAll('.cat-btn').forEach(function (b) {
                  b.className = "cat-btn text-xs px-2.5 py-1 rounded-full border transition border-night-500 text-gray-400 hover:border-agri-500";
                });
                btn.className = "cat-btn text-xs px-2.5 py-1 rounded-full border transition bg-agri-600 text-white border-agri-600";
                _context2.n = 1;
                return _this2._renderDashboard(container);
              case 1:
                return _context2.a(2);
            }
          }, _callee2);
        })));
      });
      container.querySelector('#dash-search').addEventListener('input', /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(e) {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                keyword = e.target.value.toLowerCase();
                _context3.n = 1;
                return _this2._renderDashboard(container);
              case 1:
                return _context3.a(2);
            }
          }, _callee3);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
      container.querySelector('#dash-ai-btn').addEventListener('click', function () {
        return _this2._runAIQuery(container);
      });
      container.querySelector('#dash-ai-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') _this2._runAIQuery(container);
      });
    },
    _runAIQuery: function _runAIQuery(container) {
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var input, question, answerEl, contextBundle, _yield$Promise$all, _yield$Promise$all2, readingList, ingestedFiles, fieldProfiles, dataContext, answer, _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              if (!aiLoading) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              input = container.querySelector('#dash-ai-input');
              question = input.value.trim();
              if (question) {
                _context4.n = 2;
                break;
              }
              return _context4.a(2);
            case 2:
              aiLoading = true;
              answerEl = container.querySelector('#dash-ai-answer');
              answerEl.classList.remove('hidden');
              answerEl.innerHTML = '<span class="spinner"></span> Thinking…';
              _context4.p = 3;
              _context4.n = 4;
              return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.buildContextBundle)();
            case 4:
              contextBundle = _context4.v;
              _context4.n = 5;
              return Promise.all([(0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getReadingList)(), (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getIngestedFiles)(), (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getFieldProfiles)()]);
            case 5:
              _yield$Promise$all = _context4.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
              readingList = _yield$Promise$all2[0];
              ingestedFiles = _yield$Promise$all2[1];
              fieldProfiles = _yield$Promise$all2[2];
              dataContext = [contextBundle, '', 'INGESTED FILES:', ingestedFiles.map(function (f) {
                var _f$structuredData;
                return "".concat(f.filename, ": ").concat(JSON.stringify((_f$structuredData = f.structuredData) !== null && _f$structuredData !== void 0 ? _f$structuredData : {}).slice(0, 400));
              }).join('\n') || '(none)'].join('\n');
              _context4.n = 6;
              return (0,_utils_api_js__WEBPACK_IMPORTED_MODULE_1__.callAnthropic)({
                system: "You are a farm management AI assistant with access to this farm's data:\n\n".concat(dataContext),
                userMessage: question,
                maxTokens: 512
              });
            case 6:
              answer = _context4.v;
              answerEl.innerHTML = "<p class=\"font-medium text-agri-400 mb-1\">Answer</p><span class=\"whitespace-pre-wrap\">".concat(escapeHtml(answer), "</span>");
              _context4.n = 8;
              break;
            case 7:
              _context4.p = 7;
              _t = _context4.v;
              answerEl.textContent = "Error: ".concat(_t.message);
            case 8:
              _context4.p = 8;
              aiLoading = false;
              return _context4.f(8);
            case 9:
              return _context4.a(2);
          }
        }, _callee4, null, [[3, 7, 8, 9]]);
      }))();
    },
    _renderDashboard: function _renderDashboard(container) {
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _yield$Promise$all3, _yield$Promise$all4, readingList, ingestedFiles, fieldProfiles, allItems, filtered, listEl;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return Promise.all([(0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getReadingList)(), (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getIngestedFiles)(), (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getFieldProfiles)()]);
            case 1:
              _yield$Promise$all3 = _context5.v;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 3);
              readingList = _yield$Promise$all4[0];
              ingestedFiles = _yield$Promise$all4[1];
              fieldProfiles = _yield$Promise$all4[2];
              allItems = [].concat(_toConsumableArray(readingList.map(function (i) {
                return _objectSpread(_objectSpread({}, i), {}, {
                  _source: 'reading',
                  _category: tagCategory(i)
                });
              })), _toConsumableArray(ingestedFiles.map(function (f) {
                return _objectSpread(_objectSpread({}, f), {}, {
                  _source: 'file',
                  _category: tagCategory(f)
                });
              })), _toConsumableArray(fieldProfiles.map(function (p) {
                var _p$acres, _p$soilType;
                return _objectSpread(_objectSpread({}, p), {}, {
                  _source: 'field',
                  _category: 'land',
                  tags: ['land'],
                  title: "Field: ".concat(p.name),
                  summary: "".concat((_p$acres = p.acres) !== null && _p$acres !== void 0 ? _p$acres : '?', " ac \u2014 ").concat((_p$soilType = p.soilType) !== null && _p$soilType !== void 0 ? _p$soilType : 'unknown soil')
                });
              })));
              filtered = allItems.filter(function (item) {
                var _item$title, _item$summary, _item$filename, _item$name;
                var catMatch = activeCategory === 'all' || item._category === activeCategory;
                var kwMatch = !keyword || ((_item$title = item.title) !== null && _item$title !== void 0 ? _item$title : '').toLowerCase().includes(keyword) || ((_item$summary = item.summary) !== null && _item$summary !== void 0 ? _item$summary : '').toLowerCase().includes(keyword) || ((_item$filename = item.filename) !== null && _item$filename !== void 0 ? _item$filename : '').toLowerCase().includes(keyword) || ((_item$name = item.name) !== null && _item$name !== void 0 ? _item$name : '').toLowerCase().includes(keyword);
                return catMatch && kwMatch;
              });
              listEl = container.querySelector('#dash-list');
              if (!(filtered.length === 0)) {
                _context5.n = 2;
                break;
              }
              listEl.innerHTML = "<div class=\"empty-state\"><p>No data matches your filters.</p></div>";
              return _context5.a(2);
            case 2:
              listEl.innerHTML = filtered.map(function (item) {
                var _reading$file$field$i, _ref3, _ref4, _item$title2, _ref5, _item$summary2, _item$preview, _ref6, _ref7, _item$savedAt, _item$tags2;
                var sourceIcon = (_reading$file$field$i = {
                  reading: '📖',
                  file: '📄',
                  field: '🌱'
                }[item._source]) !== null && _reading$file$field$i !== void 0 ? _reading$file$field$i : '•';
                var title = (_ref3 = (_ref4 = (_item$title2 = item.title) !== null && _item$title2 !== void 0 ? _item$title2 : item.filename) !== null && _ref4 !== void 0 ? _ref4 : item.name) !== null && _ref3 !== void 0 ? _ref3 : 'Untitled';
                var sub = (_ref5 = (_item$summary2 = item.summary) !== null && _item$summary2 !== void 0 ? _item$summary2 : (_item$preview = item.preview) === null || _item$preview === void 0 ? void 0 : _item$preview.slice(0, 120)) !== null && _ref5 !== void 0 ? _ref5 : '';
                var date = (_ref6 = (_ref7 = (_item$savedAt = item.savedAt) !== null && _item$savedAt !== void 0 ? _item$savedAt : item.uploadedAt) !== null && _ref7 !== void 0 ? _ref7 : item.createdAt) !== null && _ref6 !== void 0 ? _ref6 : '';
                return "\n          <div class=\"agri-card\">\n            <div class=\"flex items-start gap-2\">\n              <span class=\"text-lg flex-shrink-0\">".concat(sourceIcon, "</span>\n              <div class=\"flex-1 min-w-0\">\n                <p class=\"text-sm font-semibold text-white truncate\">").concat(escapeHtml(title), "</p>\n                ").concat(sub ? "<p class=\"text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2\">".concat(escapeHtml(sub), "</p>") : '', "\n                <div class=\"flex items-center gap-2 mt-1.5\">\n                  <span class=\"tag-pill\">").concat(escapeHtml(item._category), "</span>\n                  ").concat(((_item$tags2 = item.tags) !== null && _item$tags2 !== void 0 ? _item$tags2 : []).filter(function (t) {
                  return t !== item._category;
                }).slice(0, 2).map(function (t) {
                  return "<span class=\"tag-pill\">".concat(escapeHtml(t), "</span>");
                }).join(''), "\n                  ").concat(date ? "<span class=\"text-xs text-gray-500\">".concat(new Date(date).toLocaleDateString(), "</span>") : '', "\n                </div>\n              </div>\n            </div>\n          </div>");
              }).join('');
            case 3:
              return _context5.a(2);
          }
        }, _callee5);
      }))();
    }
  };
}

/***/ },

/***/ "./src/modules/data-ingest/index.js"
/*!******************************************!*\
  !*** ./src/modules/data-ingest/index.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataIngestModule: () => (/* binding */ DataIngestModule)
/* harmony export */ });
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/storage.js */ "./src/utils/storage.js");
/* harmony import */ var _utils_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/api.js */ "./src/utils/api.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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


var SUPPORTED_TYPES = {
  'text/csv': 'CSV',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
  'application/vnd.ms-excel': 'Excel',
  'application/pdf': 'PDF'
};
var DOC_SERVER = 'http://localhost:7432';
function tryDocServer(_x) {
  return _tryDocServer.apply(this, arguments);
}
function _tryDocServer() {
  _tryDocServer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(file) {
    var fd, res, _yield$res$json, text, _t6;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          fd = new FormData();
          fd.append('file', file);
          _context1.n = 1;
          return fetch("".concat(DOC_SERVER, "/parse"), {
            method: 'POST',
            body: fd
          });
        case 1:
          res = _context1.v;
          if (res.ok) {
            _context1.n = 2;
            break;
          }
          return _context1.a(2, null);
        case 2:
          _context1.n = 3;
          return res.json();
        case 3:
          _yield$res$json = _context1.v;
          text = _yield$res$json.text;
          return _context1.a(2, text !== null && text !== void 0 ? text : null);
        case 4:
          _context1.p = 4;
          _t6 = _context1.v;
          return _context1.a(2, null);
      }
    }, _callee0, null, [[0, 4]]);
  }));
  return _tryDocServer.apply(this, arguments);
}
function DataIngestModule() {
  return {
    id: 'data-ingest',
    label: 'Data Ingest',
    render: function render(container) {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              container.innerHTML = "\n        <div class=\"section-heading\">Data Ingest</div>\n\n        <!-- Drop zone -->\n        <div class=\"px-4 mb-4\">\n          <div id=\"drop-zone\"\n            class=\"border-2 border-dashed border-night-500 rounded-xl p-6 text-center cursor-pointer hover:border-agri-500 hover:bg-night-800 transition\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-8 w-8 mx-auto text-agri-400 mb-2\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"\n                d=\"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12\" />\n            </svg>\n            <p class=\"text-sm font-medium text-gray-300\">Drop CSV, Excel, or PDF here</p>\n            <p class=\"text-xs text-gray-500 mt-1\">or click to select a file</p>\n            <input id=\"file-input\" type=\"file\" accept=\".csv,.xlsx,.xls,.pdf\" class=\"hidden\" />\n          </div>\n          <div id=\"ingest-status\" class=\"text-xs text-center text-gray-500 mt-2 min-h-[1rem]\"></div>\n        </div>\n\n        <!-- Field import banner (shown after processing if field data found) -->\n        <div id=\"field-import-banner\" class=\"hidden px-4 mb-3\">\n          <div class=\"bg-night-700 border border-agri-600 rounded-xl p-3\">\n            <p class=\"text-xs font-semibold text-agri-400 mb-1\">Field data detected</p>\n            <p id=\"field-import-desc\" class=\"text-xs text-gray-400 mb-2\"></p>\n            <p id=\"field-import-status\" class=\"text-xs text-gray-500 mb-2 hidden\"></p>\n            <button id=\"import-to-fields-btn\"\n              class=\"w-full bg-agri-600 hover:bg-agri-700 text-white text-xs font-medium py-1.5 rounded-lg transition\">\n              Import harvest data to field profiles\n            </button>\n          </div>\n        </div>\n\n        <!-- File list -->\n        <div id=\"file-list\" class=\"px-4 pb-4\"></div>\n      ";
              _this._pendingImport = null;
              _this._bindEvents(container);
              _context.n = 1;
              return _this._renderFileList(container);
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }))();
    },
    _bindEvents: function _bindEvents(container) {
      var _this2 = this;
      var dropZone = container.querySelector('#drop-zone');
      var fileInput = container.querySelector('#file-input');
      dropZone.addEventListener('click', function () {
        return fileInput.click();
      });
      dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropZone.classList.add('border-agri-500', 'bg-night-800');
      });
      dropZone.addEventListener('dragleave', function () {
        dropZone.classList.remove('border-agri-500', 'bg-night-800');
      });
      dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropZone.classList.remove('border-agri-500', 'bg-night-800');
        var file = e.dataTransfer.files[0];
        if (file) _this2._processFile(file, container);
      });
      fileInput.addEventListener('change', function () {
        if (fileInput.files[0]) _this2._processFile(fileInput.files[0], container);
      });
      container.querySelector('#import-to-fields-btn').addEventListener('click', function () {
        return _this2._importToFields(container);
      });
    },
    _processFile: function _processFile(file, container) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _SUPPORTED_TYPES$file;
        var status, typeName, extractedText, structuredData, raw, record, _t, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              status = container.querySelector('#ingest-status');
              typeName = (_SUPPORTED_TYPES$file = SUPPORTED_TYPES[file.type]) !== null && _SUPPORTED_TYPES$file !== void 0 ? _SUPPORTED_TYPES$file : file.name.endsWith('.csv') ? 'CSV' : file.name.endsWith('.xlsx') || file.name.endsWith('.xls') ? 'Excel' : null;
              if (typeName) {
                _context2.n = 1;
                break;
              }
              status.textContent = 'Unsupported file type.';
              return _context2.a(2);
            case 1:
              // Hide previous import banner
              container.querySelector('#field-import-banner').classList.add('hidden');
              _this3._pendingImport = null;
              status.textContent = "Parsing ".concat(typeName, "\u2026");
              extractedText = ''; // Try Python doc server first (more robust), fall back to browser-side
              _context2.n = 2;
              return tryDocServer(file);
            case 2:
              extractedText = _context2.v;
              if (!extractedText) {
                _context2.n = 3;
                break;
              }
              status.textContent = "Parsed via Python server\u2026";
              _context2.n = 11;
              break;
            case 3:
              _context2.p = 3;
              if (!(typeName === 'CSV')) {
                _context2.n = 5;
                break;
              }
              _context2.n = 4;
              return _this3._parseCSV(file);
            case 4:
              extractedText = _context2.v;
              _context2.n = 9;
              break;
            case 5:
              if (!(typeName === 'Excel')) {
                _context2.n = 7;
                break;
              }
              _context2.n = 6;
              return _this3._parseExcel(file);
            case 6:
              extractedText = _context2.v;
              _context2.n = 9;
              break;
            case 7:
              if (!(typeName === 'PDF')) {
                _context2.n = 9;
                break;
              }
              _context2.n = 8;
              return _this3._parsePDF(file);
            case 8:
              extractedText = _context2.v;
            case 9:
              _context2.n = 11;
              break;
            case 10:
              _context2.p = 10;
              _t = _context2.v;
              status.textContent = "Parse error: ".concat(_t.message);
              return _context2.a(2);
            case 11:
              status.textContent = 'Extracting structured data with AI…';
              structuredData = null;
              _context2.p = 12;
              _context2.n = 13;
              return (0,_utils_api_js__WEBPACK_IMPORTED_MODULE_1__.callAnthropic)({
                system: 'You are an agricultural data analyst. Extract and return structured JSON from this document. Identify: operation type, field names (as "fields" array of strings), dates, quantities, equipment, crop types, financial figures, and any carbon or emissions data. For harvest data include avg_yield_bu_ac, avg_moisture_pct, harvest_date, and crop. Return only valid JSON.',
                userMessage: extractedText.slice(0, 6000),
                maxTokens: 1024
              });
            case 13:
              raw = _context2.v;
              structuredData = JSON.parse(raw);
              _context2.n = 15;
              break;
            case 14:
              _context2.p = 14;
              _t2 = _context2.v;
              structuredData = {
                raw_preview: extractedText.slice(0, 500),
                parse_error: 'AI extraction unavailable'
              };
            case 15:
              record = {
                id: "file_".concat(Date.now()),
                filename: file.name,
                type: typeName,
                uploadedAt: new Date().toISOString(),
                structuredData: structuredData,
                preview: Object.entries(structuredData !== null && structuredData !== void 0 ? structuredData : {}).filter(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 1),
                    k = _ref2[0];
                  return k !== 'raw_preview' && k !== 'parse_error';
                }).slice(0, 5).map(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                    k = _ref4[0],
                    v = _ref4[1];
                  return "".concat(k, ": ").concat(JSON.stringify(v).slice(0, 80));
                }).join('\n')
              };
              _context2.n = 16;
              return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.saveIngestedFile)(record);
            case 16:
              status.textContent = 'File processed!';
              setTimeout(function () {
                status.textContent = '';
              }, 2000);
              _context2.n = 17;
              return _this3._renderFileList(container);
            case 17:
              _context2.n = 18;
              return _this3._offerFieldImport(record, container);
            case 18:
              return _context2.a(2);
          }
        }, _callee2, null, [[12, 14], [3, 10]]);
      }))();
    },
    _offerFieldImport: function _offerFieldImport(record, container) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var sd, rawFields, profiles, matched, banner, desc, btn, importStatus;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              sd = record.structuredData;
              if (!(!sd || sd.parse_error)) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              // Collect field names from multiple possible keys
              rawFields = [].concat(_toConsumableArray(Array.isArray(sd.fields) ? sd.fields : []), _toConsumableArray(Array.isArray(sd.field_names) ? sd.field_names : [])).map(function (f) {
                return String(f).trim();
              }).filter(Boolean);
              if (!(rawFields.length === 0)) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2);
            case 2:
              _context3.n = 3;
              return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getFieldProfiles)();
            case 3:
              profiles = _context3.v;
              matched = rawFields.filter(function (name) {
                return profiles.some(function (p) {
                  return p.name.toLowerCase() === name.toLowerCase();
                });
              });
              if (!(matched.length === 0)) {
                _context3.n = 4;
                break;
              }
              return _context3.a(2);
            case 4:
              _this4._pendingImport = {
                record: record,
                matched: matched
              };
              banner = container.querySelector('#field-import-banner');
              desc = container.querySelector('#field-import-desc');
              btn = container.querySelector('#import-to-fields-btn');
              importStatus = container.querySelector('#field-import-status');
              desc.textContent = "Found harvest data for: ".concat(matched.join(', '));
              importStatus.classList.add('hidden');
              btn.disabled = false;
              btn.textContent = 'Import harvest data to field profiles';
              btn.style.opacity = '';
              banner.classList.remove('hidden');
            case 5:
              return _context3.a(2);
          }
        }, _callee3);
      }))();
    },
    _importToFields: function _importToFields(container) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this5$_pendingImport, record, matched, sd, importStatus, btn, profiles, count, _iterator, _step, _loop, _t3;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if (_this5._pendingImport) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              _this5$_pendingImport = _this5._pendingImport, record = _this5$_pendingImport.record, matched = _this5$_pendingImport.matched;
              sd = record.structuredData;
              importStatus = container.querySelector('#field-import-status');
              btn = container.querySelector('#import-to-fields-btn');
              btn.disabled = true;
              btn.textContent = 'Importing…';
              importStatus.textContent = '';
              importStatus.classList.remove('hidden');
              _context5.n = 2;
              return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getFieldProfiles)();
            case 2:
              profiles = _context5.v;
              count = 0;
              _iterator = _createForOfIteratorHelper(matched);
              _context5.p = 3;
              _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                var _ref5, _sd$harvest_date, _ref6, _sd$crop, _sd$operation_type, _ref7, _ref8, _sd$avg_yield_bu_ac, _ref9, _sd$avg_moisture_pct, _profile$harvestRecor, _profile$cropHistory;
                var fieldName, profile, harvestDate, cropYear, crop, yieldVal, moisture, harvestRecord, cropHistoryEntry, existingHarvests, existingHistory, updated;
                return _regenerator().w(function (_context4) {
                  while (1) switch (_context4.n) {
                    case 0:
                      fieldName = _step.value;
                      profile = profiles.find(function (p) {
                        return p.name.toLowerCase() === fieldName.toLowerCase();
                      });
                      if (profile) {
                        _context4.n = 1;
                        break;
                      }
                      return _context4.a(2, 1);
                    case 1:
                      harvestDate = (_ref5 = (_sd$harvest_date = sd.harvest_date) !== null && _sd$harvest_date !== void 0 ? _sd$harvest_date : sd.date) !== null && _ref5 !== void 0 ? _ref5 : new Date().toISOString().slice(0, 10);
                      cropYear = parseInt(harvestDate.slice(0, 4), 10);
                      crop = (_ref6 = (_sd$crop = sd.crop) !== null && _sd$crop !== void 0 ? _sd$crop : (_sd$operation_type = sd.operation_type) === null || _sd$operation_type === void 0 ? void 0 : _sd$operation_type.replace(/\s*harvest\s*/i, '').trim()) !== null && _ref6 !== void 0 ? _ref6 : 'Unknown';
                      yieldVal = (_ref7 = (_ref8 = (_sd$avg_yield_bu_ac = sd.avg_yield_bu_ac) !== null && _sd$avg_yield_bu_ac !== void 0 ? _sd$avg_yield_bu_ac : sd.yield_bu_ac) !== null && _ref8 !== void 0 ? _ref8 : sd["yield"]) !== null && _ref7 !== void 0 ? _ref7 : null;
                      moisture = (_ref9 = (_sd$avg_moisture_pct = sd.avg_moisture_pct) !== null && _sd$avg_moisture_pct !== void 0 ? _sd$avg_moisture_pct : sd.moisture_pct) !== null && _ref9 !== void 0 ? _ref9 : null;
                      harvestRecord = {
                        date: harvestDate,
                        crop: crop,
                        "yield": yieldVal ? parseFloat(yieldVal) : null,
                        unit: 'bu/ac',
                        moisture: moisture ? parseFloat(moisture) : null,
                        source: record.filename
                      };
                      cropHistoryEntry = {
                        year: cropYear,
                        crop: crop,
                        "yield": harvestRecord["yield"],
                        unit: 'bu/ac'
                      };
                      existingHarvests = (_profile$harvestRecor = profile.harvestRecords) !== null && _profile$harvestRecor !== void 0 ? _profile$harvestRecor : [];
                      existingHistory = (_profile$cropHistory = profile.cropHistory) !== null && _profile$cropHistory !== void 0 ? _profile$cropHistory : [];
                      updated = _objectSpread(_objectSpread({}, profile), {}, {
                        harvestRecords: [harvestRecord].concat(_toConsumableArray(existingHarvests.filter(function (r) {
                          return !(r.date === harvestRecord.date && r.crop === harvestRecord.crop);
                        }))),
                        cropHistory: [cropHistoryEntry].concat(_toConsumableArray(existingHistory.filter(function (r) {
                          return !(r.year === cropHistoryEntry.year && r.crop === cropHistoryEntry.crop);
                        }))).sort(function (a, b) {
                          return b.year - a.year;
                        })
                      });
                      _context4.n = 2;
                      return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.saveFieldProfile)(updated);
                    case 2:
                      count++;
                    case 3:
                      return _context4.a(2);
                  }
                }, _loop);
              });
              _iterator.s();
            case 4:
              if ((_step = _iterator.n()).done) {
                _context5.n = 7;
                break;
              }
              return _context5.d(_regeneratorValues(_loop()), 5);
            case 5:
              if (!_context5.v) {
                _context5.n = 6;
                break;
              }
              return _context5.a(3, 6);
            case 6:
              _context5.n = 4;
              break;
            case 7:
              _context5.n = 9;
              break;
            case 8:
              _context5.p = 8;
              _t3 = _context5.v;
              _iterator.e(_t3);
            case 9:
              _context5.p = 9;
              _iterator.f();
              return _context5.f(9);
            case 10:
              importStatus.textContent = "\u2713 Updated ".concat(count, " field profile").concat(count !== 1 ? 's' : '', " \u2014 check Fields tab");
              importStatus.style.color = '#4ade80';
              importStatus.classList.remove('hidden');
              btn.textContent = 'Imported';
              btn.style.opacity = '0.5';
              _this5._pendingImport = null;
            case 11:
              return _context5.a(2);
          }
        }, _callee4, null, [[3, 8, 9, 10]]);
      }))();
    },
    _parseCSV: function _parseCSV(file) {
      return new Promise(function (resolve, reject) {
        __webpack_require__.e(/*! import() */ "vendors-node_modules_papaparse_papaparse_min_js").then(__webpack_require__.t.bind(__webpack_require__, /*! papaparse */ "./node_modules/papaparse/papaparse.min.js", 23)).then(function (_ref0) {
          var Papa = _ref0["default"];
          Papa.parse(file, {
            complete: function complete(results) {
              var rows = results.data.slice(0, 200);
              resolve(rows.map(function (r) {
                return r.join(',');
              }).join('\n'));
            },
            error: reject
          });
        });
      });
    },
    _parseExcel: function _parseExcel(file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = /*#__PURE__*/function () {
          var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(e) {
            var _yield$import, read, utils, wb, lines, _t4;
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.p = _context6.n) {
                case 0:
                  _context6.p = 0;
                  _context6.n = 1;
                  return __webpack_require__.e(/*! import() */ "vendors-node_modules_xlsx_xlsx_mjs").then(__webpack_require__.bind(__webpack_require__, /*! xlsx */ "./node_modules/xlsx/xlsx.mjs"));
                case 1:
                  _yield$import = _context6.v;
                  read = _yield$import.read;
                  utils = _yield$import.utils;
                  wb = read(e.target.result, {
                    type: 'array'
                  });
                  lines = [];
                  wb.SheetNames.slice(0, 3).forEach(function (name) {
                    var ws = wb.Sheets[name];
                    lines.push("Sheet: ".concat(name));
                    lines.push(utils.sheet_to_csv(ws).split('\n').slice(0, 100).join('\n'));
                  });
                  resolve(lines.join('\n'));
                  _context6.n = 3;
                  break;
                case 2:
                  _context6.p = 2;
                  _t4 = _context6.v;
                  reject(_t4);
                case 3:
                  return _context6.a(2);
              }
            }, _callee5, null, [[0, 2]]);
          }));
          return function (_x2) {
            return _ref1.apply(this, arguments);
          };
        }();
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    },
    _parsePDF: function _parsePDF(file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = /*#__PURE__*/function () {
          var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(e) {
            var pdfjsLib, loadingTask, pdf, pages, texts, i, page, content, _t5;
            return _regenerator().w(function (_context7) {
              while (1) switch (_context7.p = _context7.n) {
                case 0:
                  _context7.p = 0;
                  _context7.n = 1;
                  return __webpack_require__.e(/*! import() */ "vendors-node_modules_pdfjs-dist_build_pdf_mjs").then(__webpack_require__.bind(__webpack_require__, /*! pdfjs-dist */ "./node_modules/pdfjs-dist/build/pdf.mjs"));
                case 1:
                  pdfjsLib = _context7.v;
                  pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('pdf.worker.js');
                  loadingTask = pdfjsLib.getDocument({
                    data: new Uint8Array(e.target.result),
                    useWorkerFetch: false,
                    isEvalSupported: false,
                    useSystemFonts: true
                  });
                  _context7.n = 2;
                  return loadingTask.promise;
                case 2:
                  pdf = _context7.v;
                  pages = Math.min(pdf.numPages, 10);
                  texts = [];
                  i = 1;
                case 3:
                  if (!(i <= pages)) {
                    _context7.n = 7;
                    break;
                  }
                  _context7.n = 4;
                  return pdf.getPage(i);
                case 4:
                  page = _context7.v;
                  _context7.n = 5;
                  return page.getTextContent();
                case 5:
                  content = _context7.v;
                  texts.push(content.items.map(function (s) {
                    return s.str;
                  }).join(' '));
                case 6:
                  i++;
                  _context7.n = 3;
                  break;
                case 7:
                  resolve(texts.join('\n'));
                  _context7.n = 9;
                  break;
                case 8:
                  _context7.p = 8;
                  _t5 = _context7.v;
                  reject(_t5);
                case 9:
                  return _context7.a(2);
              }
            }, _callee6, null, [[0, 8]]);
          }));
          return function (_x3) {
            return _ref10.apply(this, arguments);
          };
        }();
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    },
    _renderFileList: function _renderFileList(container) {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var files, listEl;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              _context0.n = 1;
              return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getIngestedFiles)();
            case 1:
              files = _context0.v;
              listEl = container.querySelector('#file-list');
              if (!(files.length === 0)) {
                _context0.n = 2;
                break;
              }
              listEl.innerHTML = "\n          <div class=\"empty-state\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-10 w-10 mb-3 opacity-30\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"\n                d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\" />\n            </svg>\n            <p>No files ingested yet.</p>\n            <p class=\"mt-1 text-xs\">Upload a CSV, Excel, or PDF file above.</p>\n          </div>";
              return _context0.a(2);
            case 2:
              listEl.innerHTML = files.map(function (f) {
                return "\n        <div class=\"agri-card\" data-id=\"".concat(f.id, "\">\n          <div class=\"flex items-start justify-between gap-2\">\n            <div class=\"flex-1\">\n              <span class=\"text-xs font-bold uppercase tracking-wide text-agri-400\">").concat(f.type, "</span>\n              <p class=\"text-sm font-semibold text-white leading-snug mt-0.5\">").concat(f.filename, "</p>\n              <p class=\"text-xs text-gray-500 mt-0.5\">").concat(new Date(f.uploadedAt).toLocaleDateString(), "</p>\n            </div>\n            <button class=\"file-delete-btn text-night-300 hover:text-red-400 transition flex-shrink-0\" data-id=\"").concat(f.id, "\" title=\"Remove\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4 pointer-events-none\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\" />\n              </svg>\n            </button>\n          </div>\n          ").concat(f.preview ? "<pre class=\"text-xs text-gray-400 mt-2 whitespace-pre-wrap bg-night-800 rounded p-2 overflow-hidden max-h-20\">".concat(f.preview, "</pre>") : '', "\n          ").concat(_this6._hasFieldData(f) ? "<p class=\"text-xs text-agri-400 mt-1.5\">\u2197 Contains field data \xB7 <button class=\"reimport-btn underline hover:no-underline\" data-id=\"".concat(f.id, "\">Re-import to profiles</button></p>") : '', "\n        </div>\n      ");
              }).join('');
              listEl.querySelectorAll('.file-delete-btn').forEach(function (btn) {
                btn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
                  return _regenerator().w(function (_context8) {
                    while (1) switch (_context8.n) {
                      case 0:
                        _context8.n = 1;
                        return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.deleteIngestedFile)(btn.dataset.id);
                      case 1:
                        _context8.n = 2;
                        return _this6._renderFileList(container);
                      case 2:
                        return _context8.a(2);
                    }
                  }, _callee7);
                })));
              });
              listEl.querySelectorAll('.reimport-btn').forEach(function (btn) {
                btn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
                  var file;
                  return _regenerator().w(function (_context9) {
                    while (1) switch (_context9.n) {
                      case 0:
                        file = files.find(function (f) {
                          return f.id === btn.dataset.id;
                        });
                        if (!file) {
                          _context9.n = 1;
                          break;
                        }
                        _context9.n = 1;
                        return _this6._offerFieldImport(file, container);
                      case 1:
                        return _context9.a(2);
                    }
                  }, _callee8);
                })));
              });
            case 3:
              return _context0.a(2);
          }
        }, _callee9);
      }))();
    },
    _hasFieldData: function _hasFieldData(file) {
      var sd = file.structuredData;
      if (!sd || sd.parse_error) return false;
      return Array.isArray(sd.fields) && sd.fields.length > 0 || Array.isArray(sd.field_names) && sd.field_names.length > 0;
    }
  };
}

/***/ },

/***/ "./src/modules/field-profile/index.js"
/*!********************************************!*\
  !*** ./src/modules/field-profile/index.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldProfileModule: () => (/* binding */ FieldProfileModule)
/* harmony export */ });
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/storage.js */ "./src/utils/storage.js");
/* harmony import */ var _utils_agrefine_bridge_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/agrefine-bridge.js */ "./src/utils/agrefine-bridge.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


function FieldProfileModule() {
  var showForm = false;
  var expandedId = null;
  return {
    id: 'field-profile',
    label: 'Field Profiles',
    render: function render(container) {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              container.innerHTML = "\n        <div class=\"section-heading\">Field Profiles</div>\n\n        <div class=\"px-4 mb-3 flex gap-2\">\n          <button id=\"fp-new-btn\"\n            class=\"flex-1 flex items-center justify-center gap-2 bg-agri-600 hover:bg-agri-700 text-white text-sm font-medium py-2.5 rounded-xl transition\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 4v16m8-8H4\" />\n            </svg>\n            New Field\n          </button>\n          <button id=\"fp-agrefine-sync-btn\" title=\"Pull fields from AG-Refine\"\n            class=\"flex items-center justify-center gap-1.5 border border-night-500 text-gray-300 hover:border-agri-500 hover:text-agri-400 text-xs font-medium px-3 py-2.5 rounded-xl transition\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-3.5 w-3.5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15\" />\n            </svg>\n            Pull\n          </button>\n          <button id=\"fp-agrefine-push-btn\" title=\"Push fields to AG-Refine\"\n            class=\"flex items-center justify-center gap-1.5 border border-night-500 text-gray-300 hover:border-agri-500 hover:text-agri-400 text-xs font-medium px-3 py-2.5 rounded-xl transition\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-3.5 w-3.5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12\" />\n            </svg>\n            Push\n          </button>\n        </div>\n        <div id=\"fp-sync-status\" class=\"px-4 text-xs min-h-[1rem] mb-2\" style=\"color:#3d4f66;\"></div>\n\n        <!-- Create form -->\n        <div id=\"fp-form\" class=\"hidden px-4 mb-4 bg-night-700 border border-night-600 rounded-xl mx-4 p-4\">\n          <h3 class=\"text-sm font-semibold text-white mb-3\">New Field</h3>\n          <div class=\"space-y-2\">\n            <input id=\"fp-name\" type=\"text\" placeholder=\"Field name *\" class=\"ag-input\" />\n            <input id=\"fp-clu\" type=\"text\" placeholder=\"CLU ID (optional)\" class=\"ag-input\" />\n            <div class=\"flex gap-2\">\n              <input id=\"fp-acres\" type=\"number\" placeholder=\"Acres\" class=\"ag-input w-1/2\" />\n              <input id=\"fp-soil\" type=\"text\" placeholder=\"Soil type\" class=\"ag-input w-1/2\" />\n            </div>\n            <div class=\"flex gap-2\">\n              <input id=\"fp-lat\" type=\"number\" step=\"any\" placeholder=\"Latitude\" class=\"ag-input w-1/2\" />\n              <input id=\"fp-lon\" type=\"number\" step=\"any\" placeholder=\"Longitude\" class=\"ag-input w-1/2\" />\n            </div>\n            <textarea id=\"fp-notes\" rows=\"2\" placeholder=\"Notes (AI-queryable)\"\n              class=\"ag-input resize-none\"></textarea>\n          </div>\n          <div class=\"flex gap-2 mt-3\">\n            <button id=\"fp-save-btn\"\n              class=\"flex-1 bg-agri-600 hover:bg-agri-700 text-white text-sm font-medium py-2 rounded-lg transition\">\n              Save\n            </button>\n            <button id=\"fp-cancel-btn\"\n              class=\"flex-1 border border-night-500 text-gray-300 text-sm font-medium py-2 rounded-lg hover:bg-night-700 transition\">\n              Cancel\n            </button>\n          </div>\n        </div>\n\n        <!-- Profiles list -->\n        <div id=\"fp-list\" class=\"px-4 pb-4\"></div>\n\n        <!-- Sync log (shown after a sync) -->\n        <div id=\"fp-sync-log\" class=\"hidden px-4 pb-4\"></div>\n      ";
              _this._bindEvents(container);
              _context.n = 1;
              return _this._renderList(container);
            case 1:
              _context.n = 2;
              return _this._renderSyncLog(container);
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }))();
    },
    _bindEvents: function _bindEvents(container) {
      var _this2 = this;
      container.querySelector('#fp-new-btn').addEventListener('click', function () {
        showForm = !showForm;
        container.querySelector('#fp-form').classList.toggle('hidden', !showForm);
      });
      container.querySelector('#fp-agrefine-sync-btn').addEventListener('click', function () {
        return _this2._pullFromAgRefine(container);
      });
      container.querySelector('#fp-agrefine-push-btn').addEventListener('click', function () {
        return _this2._pushToAgRefine(container);
      });
      container.querySelector('#fp-cancel-btn').addEventListener('click', function () {
        showForm = false;
        container.querySelector('#fp-form').classList.add('hidden');
      });
      container.querySelector('#fp-save-btn').addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var name, profile;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              name = container.querySelector('#fp-name').value.trim();
              if (name) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              profile = {
                id: "fp_".concat(Date.now()),
                name: name,
                cluId: container.querySelector('#fp-clu').value.trim() || null,
                acres: parseFloat(container.querySelector('#fp-acres').value) || null,
                soilType: container.querySelector('#fp-soil').value.trim() || null,
                coordinates: {
                  lat: parseFloat(container.querySelector('#fp-lat').value) || null,
                  lon: parseFloat(container.querySelector('#fp-lon').value) || null
                },
                notes: container.querySelector('#fp-notes').value.trim() || null,
                cropHistory: [],
                harvestRecords: [],
                weatherData: null,
                carbonPotential: null,
                createdAt: new Date().toISOString(),
                _source: 'manual'
              };
              _context2.n = 2;
              return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.saveFieldProfile)(profile);
            case 2:
              showForm = false;
              container.querySelector('#fp-form').classList.add('hidden');
              _context2.n = 3;
              return _this2._renderList(container);
            case 3:
              return _context2.a(2);
          }
        }, _callee2);
      })));
    },
    _pullFromAgRefine: function _pullFromAgRefine(container) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var statusEl, result, parts;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              statusEl = container.querySelector('#fp-sync-status');
              statusEl.textContent = 'Connecting to AG-Refine…';
              statusEl.style.color = '#3d4f66';
              _context3.n = 1;
              return chrome.runtime.sendMessage({
                type: 'AGREFINE_SYNC'
              });
            case 1:
              result = _context3.v;
              if (result.ok) {
                _context3.n = 2;
                break;
              }
              statusEl.textContent = "\u26A0 ".concat(result.error);
              statusEl.style.color = '#f87171';
              setTimeout(function () {
                statusEl.textContent = '';
                statusEl.style.color = '#3d4f66';
              }, 6000);
              return _context3.a(2);
            case 2:
              parts = [];
              if (result.added) parts.push("".concat(result.added, " field").concat(result.added !== 1 ? 's' : '', " added"));
              if (result.updated) parts.push("".concat(result.updated, " updated"));
              if (result.loadsFound) parts.push("".concat(result.loadsFound, " loads found"));
              statusEl.textContent = parts.length ? "\u2713 Pull complete \u2014 ".concat(parts.join(', ')) : '✓ No new fields in AG-Refine';
              statusEl.style.color = '#4ade80';
              setTimeout(function () {
                statusEl.textContent = '';
                statusEl.style.color = '#3d4f66';
              }, 5000);
              _context3.n = 3;
              return _this3._renderList(container);
            case 3:
              _context3.n = 4;
              return _this3._renderSyncLog(container);
            case 4:
              return _context3.a(2);
          }
        }, _callee3);
      }))();
    },
    _pushToAgRefine: function _pushToAgRefine(container) {
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var statusEl, result;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              statusEl = container.querySelector('#fp-sync-status');
              statusEl.textContent = 'Pushing to AG-Refine…';
              statusEl.style.color = '#3d4f66';
              _context4.n = 1;
              return chrome.runtime.sendMessage({
                type: 'AGREFINE_PUSH'
              });
            case 1:
              result = _context4.v;
              if (result.ok) {
                _context4.n = 2;
                break;
              }
              statusEl.textContent = "\u26A0 ".concat(result.error);
              statusEl.style.color = '#f87171';
              setTimeout(function () {
                statusEl.textContent = '';
                statusEl.style.color = '#3d4f66';
              }, 6000);
              return _context4.a(2);
            case 2:
              statusEl.textContent = "\u2713 Pushed ".concat(result.count, " field").concat(result.count !== 1 ? 's' : '', " to AG-Refine");
              statusEl.style.color = '#4ade80';
              setTimeout(function () {
                statusEl.textContent = '';
                statusEl.style.color = '#3d4f66';
              }, 4000);
            case 3:
              return _context4.a(2);
          }
        }, _callee4);
      }))();
    },
    _renderSyncLog: function _renderSyncLog(container) {
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var log, logEl, latest;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return (0,_utils_agrefine_bridge_js__WEBPACK_IMPORTED_MODULE_1__.getSyncLog)();
            case 1:
              log = _context5.v;
              logEl = container.querySelector('#fp-sync-log');
              if (!(log.length === 0)) {
                _context5.n = 2;
                break;
              }
              logEl.classList.add('hidden');
              return _context5.a(2);
            case 2:
              latest = log[0];
              logEl.classList.remove('hidden');
              logEl.innerHTML = "\n        <div class=\"border border-night-600 rounded-xl p-3 text-xs\" style=\"background:#131c2b;\">\n          <div class=\"flex items-center justify-between mb-2\">\n            <span class=\"font-semibold text-agri-400\">AG-Refine Sync Log</span>\n            <span class=\"text-gray-500\">".concat(log.length, " sync").concat(log.length !== 1 ? 's' : '', "</span>\n          </div>\n          <div class=\"space-y-1.5\">\n            ").concat(log.slice(0, 5).map(function (entry) {
                return "\n              <div class=\"flex items-start justify-between gap-2 pb-1.5 border-b border-night-600 last:border-0 last:pb-0\">\n                <div>\n                  <span class=\"text-gray-300\">".concat(new Date(entry.at).toLocaleString(), "</span>\n                  <div class=\"text-gray-500 mt-0.5\">\n                    ").concat(entry.fieldsAdded ? "+".concat(entry.fieldsAdded, " added") : '', "\n                    ").concat(entry.fieldsUpdated ? "".concat(entry.fieldsAdded ? ' · ' : '').concat(entry.fieldsUpdated, " updated") : '', "\n                    ").concat(!entry.fieldsAdded && !entry.fieldsUpdated ? 'No changes' : '', "\n                    ").concat(entry.loadsFound ? " \xB7 ".concat(entry.loadsFound, " loads") : '', "\n                  </div>\n                  ").concat(entry.tabUrl ? "<div class=\"text-night-300 truncate max-w-[180px]\" title=\"".concat(entry.tabUrl, "\">").concat(entry.tabUrl.replace(/^https?:\/\//, '').slice(0, 40), "</div>") : '', "\n                </div>\n                <span class=\"text-agri-400 flex-shrink-0\">\u2193 Pull</span>\n              </div>\n            ");
              }).join(''), "\n          </div>\n          ").concat(log.length > 5 ? "<p class=\"text-gray-600 mt-1\">".concat(log.length - 5, " older entries hidden</p>") : '', "\n        </div>\n      ");
            case 3:
              return _context5.a(2);
          }
        }, _callee5);
      }))();
    },
    _renderList: function _renderList(container) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var profiles, agRefineUrl, listEl;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _context8.n = 1;
              return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getFieldProfiles)();
            case 1:
              profiles = _context8.v;
              _context8.n = 2;
              return (0,_utils_agrefine_bridge_js__WEBPACK_IMPORTED_MODULE_1__.getAgRefineUrl)();
            case 2:
              agRefineUrl = _context8.v;
              listEl = container.querySelector('#fp-list');
              if (!(profiles.length === 0)) {
                _context8.n = 3;
                break;
              }
              listEl.innerHTML = "\n          <div class=\"empty-state\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-10 w-10 mb-3 opacity-30\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"\n                d=\"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n            </svg>\n            <p>No field profiles yet.</p>\n            <p class=\"mt-1 text-xs\">Create a profile or sync from AG-Refine.</p>\n          </div>";
              return _context8.a(2);
            case 3:
              listEl.innerHTML = profiles.map(function (p) {
                var _p$cropHistory, _p$cropHistory2, _p$harvestRecords, _p$harvestRecords2, _p$cropHistory3, _p$coordinates, _p$coordinates2;
                var isExpanded = expandedId === p.id;
                var sourceLabel = p._source === 'ag-refine' ? 'AG-Refine' : p._source === 'ag-refine-merged' ? 'AG-Refine + manual' : p._source === 'manual' ? 'manual' : null;
                var cropHistoryHtml = ((_p$cropHistory = p.cropHistory) !== null && _p$cropHistory !== void 0 ? _p$cropHistory : []).length > 0 ? "<div class=\"mt-2.5\">\n              <p class=\"text-agri-400 font-semibold uppercase tracking-wide text-[9px] mb-1\">Crop History</p>\n              <div class=\"space-y-0.5\">\n                ".concat(((_p$cropHistory2 = p.cropHistory) !== null && _p$cropHistory2 !== void 0 ? _p$cropHistory2 : []).slice(0, 5).map(function (h) {
                  var _h$unit;
                  return "\n                  <div class=\"flex justify-between\">\n                    <span>".concat(h.year, " \u2014 ").concat(h.crop, "</span>\n                    ").concat(h["yield"] != null ? "<span class=\"text-white\">".concat(h["yield"], " ").concat((_h$unit = h.unit) !== null && _h$unit !== void 0 ? _h$unit : 'bu/ac', "</span>") : '', "\n                  </div>\n                ");
                }).join(''), "\n              </div>\n            </div>") : '';
                var harvestHtml = ((_p$harvestRecords = p.harvestRecords) !== null && _p$harvestRecords !== void 0 ? _p$harvestRecords : []).length > 0 ? "<div class=\"mt-2.5\">\n              <p class=\"text-agri-400 font-semibold uppercase tracking-wide text-[9px] mb-1\">Harvest Records</p>\n              <div class=\"space-y-0.5\">\n                ".concat(((_p$harvestRecords2 = p.harvestRecords) !== null && _p$harvestRecords2 !== void 0 ? _p$harvestRecords2 : []).slice(0, 4).map(function (h) {
                  var _h$date$slice, _h$date, _h$unit2;
                  return "\n                  <div class=\"flex justify-between gap-2\">\n                    <span>".concat((_h$date$slice = (_h$date = h.date) === null || _h$date === void 0 ? void 0 : _h$date.slice(0, 10)) !== null && _h$date$slice !== void 0 ? _h$date$slice : '?', " \u2014 ").concat(h.crop, "</span>\n                    <span class=\"text-white flex-shrink-0\">\n                      ").concat(h["yield"] != null ? "".concat(h["yield"], " ").concat((_h$unit2 = h.unit) !== null && _h$unit2 !== void 0 ? _h$unit2 : '') : '', "\n                      ").concat(h.moisture != null ? " @ ".concat(h.moisture, "%") : '', "\n                    </span>\n                  </div>\n                ");
                }).join(''), "\n              </div>\n            </div>") : '';
                return "\n          <div class=\"agri-card cursor-pointer\" data-id=\"".concat(p.id, "\">\n            <div class=\"flex items-center justify-between\">\n              <div class=\"flex-1 min-w-0\">\n                <h3 class=\"text-sm font-bold text-white\">").concat(p.name, "</h3>\n                <div class=\"flex flex-wrap gap-x-3 gap-y-0.5 mt-1\">\n                  ").concat(p.acres != null ? "<span class=\"text-xs text-gray-400\">".concat(p.acres, " ac</span>") : '', "\n                  ").concat(p.soilType ? "<span class=\"text-xs text-gray-400\">".concat(p.soilType, "</span>") : '', "\n                  ").concat(p.cluId ? "<span class=\"text-xs text-agri-400\">CLU ".concat(p.cluId, "</span>") : '', "\n                  ").concat(((_p$cropHistory3 = p.cropHistory) !== null && _p$cropHistory3 !== void 0 ? _p$cropHistory3 : []).length > 0 ? "<span class=\"text-xs text-gray-500\">".concat(p.cropHistory.length, " yr history</span>") : '', "\n                  ").concat(sourceLabel ? "<span class=\"text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded\" style=\"background:#1a2438;color:#3d4f66;\">".concat(sourceLabel, "</span>") : '', "\n                </div>\n              </div>\n              <div class=\"flex items-center gap-2 flex-shrink-0\">\n                <button class=\"fp-delete-btn text-night-300 hover:text-red-400 transition\" data-id=\"").concat(p.id, "\" title=\"Delete\">\n                  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4 pointer-events-none\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\" />\n                  </svg>\n                </button>\n                <svg class=\"fp-chevron h-4 w-4 text-gray-500 transition-transform ").concat(isExpanded ? 'rotate-90' : '', "\"\n                  xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n                  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5l7 7-7 7\" />\n                </svg>\n              </div>\n            </div>\n\n            <!-- Expanded detail -->\n            <div class=\"fp-detail ").concat(isExpanded ? '' : 'hidden', " mt-3 pt-3 border-t border-night-600 text-xs text-gray-400 space-y-1\">\n              ").concat(((_p$coordinates = p.coordinates) === null || _p$coordinates === void 0 ? void 0 : _p$coordinates.lat) != null && ((_p$coordinates2 = p.coordinates) === null || _p$coordinates2 === void 0 ? void 0 : _p$coordinates2.lon) != null ? "<p>\uD83D\uDCCD ".concat(p.coordinates.lat.toFixed(4), ", ").concat(p.coordinates.lon.toFixed(4), "</p>") : '', "\n              ").concat(p.notes ? "<p class=\"text-gray-300\">\uD83D\uDCDD ".concat(p.notes, "</p>") : '', "\n              ").concat(cropHistoryHtml, "\n              ").concat(harvestHtml, "\n              ").concat(!cropHistoryHtml && !harvestHtml ? "<p class=\"text-gray-600 italic\">No crop history yet \u2014 ingest a harvest file to populate.</p>" : '', "\n              <div class=\"mt-2.5 pt-2 border-t border-night-600 flex items-center justify-between\">\n                <p class=\"text-gray-600\">Added ").concat(new Date(p.createdAt).toLocaleDateString(), "</p>\n                <div class=\"flex gap-3\">\n                  ").concat(agRefineUrl ? "<a href=\"".concat(agRefineUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\"\n                    class=\"text-agri-400 hover:underline\" onclick=\"event.stopPropagation()\">Open in AG-Refine \u2197</a>") : '', "\n                  <span class=\"text-gray-600\">Carbon: <span class=\"coming-soon\">Phase 7</span></span>\n                </div>\n              </div>\n            </div>\n          </div>\n        ");
              }).join('');
              listEl.querySelectorAll('.agri-card').forEach(function (card) {
                card.addEventListener('click', /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(e) {
                    var id;
                    return _regenerator().w(function (_context6) {
                      while (1) switch (_context6.n) {
                        case 0:
                          if (!e.target.closest('.fp-delete-btn')) {
                            _context6.n = 1;
                            break;
                          }
                          return _context6.a(2);
                        case 1:
                          id = card.dataset.id;
                          expandedId = expandedId === id ? null : id;
                          _context6.n = 2;
                          return _this4._renderList(container);
                        case 2:
                          return _context6.a(2);
                      }
                    }, _callee6);
                  }));
                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              });
              listEl.querySelectorAll('.fp-delete-btn').forEach(function (btn) {
                btn.addEventListener('click', /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(e) {
                    return _regenerator().w(function (_context7) {
                      while (1) switch (_context7.n) {
                        case 0:
                          e.stopPropagation();
                          _context7.n = 1;
                          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.deleteFieldProfile)(btn.dataset.id);
                        case 1:
                          if (expandedId === btn.dataset.id) expandedId = null;
                          _context7.n = 2;
                          return _this4._renderList(container);
                        case 2:
                          return _context7.a(2);
                      }
                    }, _callee7);
                  }));
                  return function (_x2) {
                    return _ref3.apply(this, arguments);
                  };
                }());
              });
            case 4:
              return _context8.a(2);
          }
        }, _callee8);
      }))();
    }
  };
}

/***/ },

/***/ "./src/modules/reading-list/index.js"
/*!*******************************************!*\
  !*** ./src/modules/reading-list/index.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReadingListModule: () => (/* binding */ ReadingListModule)
/* harmony export */ });
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/storage.js */ "./src/utils/storage.js");
/* harmony import */ var _utils_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/api.js */ "./src/utils/api.js");
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


function escapeHtml(str) {
  return String(str !== null && str !== void 0 ? str : '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function safeHref(url) {
  try {
    var u = new URL(url);
    return u.protocol === 'https:' || u.protocol === 'http:' ? escapeHtml(url) : '#';
  } catch (_) {
    return '#';
  }
}
function ReadingListModule() {
  var currentTag = 'all';
  return {
    id: 'reading-list',
    label: 'Reading List',
    render: function render(container) {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              container.innerHTML = "\n        <div class=\"section-heading\">Intelligence Sources</div>\n\n        <!-- Save current page -->\n        <div class=\"px-4 mb-3\">\n          <button id=\"rl-save-btn\"\n            class=\"w-full flex items-center justify-center gap-2 bg-agri-600 hover:bg-agri-700 text-white text-sm font-medium py-2.5 rounded-lg transition\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 4v16m8-8H4\" />\n            </svg>\n            Save current page\n          </button>\n          <div id=\"rl-save-status\" class=\"text-xs text-center mt-1 min-h-[1rem]\" style=\"color:#3d4f66;\"></div>\n        </div>\n\n        <!-- Tag filter -->\n        <div class=\"px-4 mb-3 flex gap-1.5 flex-wrap\">\n          <button data-tag=\"all\" class=\"tag-filter-btn tag-pill bg-agri-600 text-white\">All</button>\n          ".concat(_utils_api_js__WEBPACK_IMPORTED_MODULE_1__.AGRICULTURE_TAGS.map(function (t) {
                return "<button data-tag=\"".concat(t, "\" class=\"tag-filter-btn tag-pill\">").concat(t, "</button>");
              }).join(''), "\n        </div>\n\n        <!-- List -->\n        <div id=\"rl-list\" class=\"px-4 pb-4\"></div>\n      ");
              _this._bindEvents(container);
              _context.n = 1;
              return _this._renderList(container);
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }))();
    },
    _bindEvents: function _bindEvents(container) {
      var _this2 = this;
      container.querySelector('#rl-save-btn').addEventListener('click', function () {
        return _this2._savePage(container);
      });
      container.querySelectorAll('.tag-filter-btn').forEach(function (btn) {
        btn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                currentTag = btn.dataset.tag;
                container.querySelectorAll('.tag-filter-btn').forEach(function (b) {
                  b.classList.remove('bg-agri-600', 'text-white');
                  b.classList.add('bg-agri-100', 'text-agri-800');
                });
                btn.classList.add('bg-agri-600', 'text-white');
                btn.classList.remove('bg-agri-100', 'text-agri-800');
                _context2.n = 1;
                return _this2._renderList(container);
              case 1:
                return _context2.a(2);
            }
          }, _callee2);
        })));
      });
    },
    _savePage: function _savePage(container) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var status, _yield$chrome$tabs$qu, _yield$chrome$tabs$qu2, tab, pageText, _resp$text, resp, summary, tags, _parsed$summary, _parsed$tags, rawResponse, parsed, item, _t, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              status = container.querySelector('#rl-save-status');
              status.textContent = 'Fetching page info…';
              _context3.n = 1;
              return chrome.tabs.query({
                active: true,
                currentWindow: true
              });
            case 1:
              _yield$chrome$tabs$qu = _context3.v;
              _yield$chrome$tabs$qu2 = _slicedToArray(_yield$chrome$tabs$qu, 1);
              tab = _yield$chrome$tabs$qu2[0];
              if (tab) {
                _context3.n = 2;
                break;
              }
              status.textContent = 'No active tab found.';
              return _context3.a(2);
            case 2:
              pageText = '';
              _context3.p = 3;
              _context3.n = 4;
              return chrome.tabs.sendMessage(tab.id, {
                type: 'GET_PAGE_INFO'
              });
            case 4:
              resp = _context3.v;
              pageText = (_resp$text = resp === null || resp === void 0 ? void 0 : resp.text) !== null && _resp$text !== void 0 ? _resp$text : '';
              _context3.n = 6;
              break;
            case 5:
              _context3.p = 5;
              _t = _context3.v;
              pageText = '';
            case 6:
              status.textContent = 'Summarising with AI…';
              summary = '';
              tags = [];
              _context3.p = 7;
              _context3.n = 8;
              return (0,_utils_api_js__WEBPACK_IMPORTED_MODULE_1__.callAnthropic)({
                system: 'You are an agricultural research assistant. Given web page text, return a JSON object with two fields: "summary" (2-3 sentence plain English summary focused on agricultural relevance) and "tags" (array of relevant tags from: agriculture, equipment, land, carbon, USDA, dairy, finance, weather). Return only valid JSON.',
                userMessage: "Title: ".concat(tab.title, "\nURL: ").concat(tab.url, "\n\nContent:\n").concat(pageText.slice(0, 4000)),
                maxTokens: 256
              });
            case 8:
              rawResponse = _context3.v;
              parsed = JSON.parse(rawResponse);
              summary = (_parsed$summary = parsed.summary) !== null && _parsed$summary !== void 0 ? _parsed$summary : '';
              tags = (_parsed$tags = parsed.tags) !== null && _parsed$tags !== void 0 ? _parsed$tags : [];
              _context3.n = 10;
              break;
            case 9:
              _context3.p = 9;
              _t2 = _context3.v;
              summary = '(AI summary unavailable)';
              tags = ['agriculture'];
            case 10:
              item = {
                id: "rl_".concat(Date.now()),
                url: tab.url,
                title: tab.title,
                savedAt: new Date().toISOString(),
                summary: summary,
                tags: tags
              };
              _context3.n = 11;
              return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.saveReadingItem)(item);
            case 11:
              status.textContent = 'Saved!';
              setTimeout(function () {
                status.textContent = '';
              }, 2000);
              _context3.n = 12;
              return _this3._renderList(container);
            case 12:
              return _context3.a(2);
          }
        }, _callee3, null, [[7, 9], [3, 5]]);
      }))();
    },
    _renderList: function _renderList(container) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var list, filtered, listEl;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.getReadingList)();
            case 1:
              list = _context5.v;
              filtered = currentTag === 'all' ? list : list.filter(function (i) {
                var _i$tags;
                return (_i$tags = i.tags) === null || _i$tags === void 0 ? void 0 : _i$tags.includes(currentTag);
              });
              listEl = container.querySelector('#rl-list');
              if (!(filtered.length === 0)) {
                _context5.n = 2;
                break;
              }
              listEl.innerHTML = "\n          <div class=\"empty-state\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-10 w-10 mb-3 opacity-30\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"\n                d=\"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253\" />\n            </svg>\n            <p>No saved pages yet.</p>\n            <p class=\"mt-1 text-xs\">Browse to a page and click \"Save current page\".</p>\n          </div>";
              return _context5.a(2);
            case 2:
              listEl.innerHTML = filtered.map(function (item) {
                var _item$tags;
                return "\n        <div class=\"agri-card\" data-id=\"".concat(escapeHtml(item.id), "\">\n          <div class=\"flex items-start justify-between gap-2\">\n            <a href=\"").concat(safeHref(item.url), "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-sm font-semibold text-agri-400 hover:underline leading-snug flex-1\">").concat(escapeHtml(item.title), "</a>\n            <button class=\"rl-delete-btn text-night-300 hover:text-red-400 transition flex-shrink-0\" data-id=\"").concat(escapeHtml(item.id), "\" title=\"Remove\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4 pointer-events-none\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\" />\n              </svg>\n            </button>\n          </div>\n          ").concat(item.summary ? "<p class=\"text-xs text-gray-400 mt-1.5 leading-relaxed\">".concat(escapeHtml(item.summary), "</p>") : '', "\n          <div class=\"mt-2\">\n            ").concat(((_item$tags = item.tags) !== null && _item$tags !== void 0 ? _item$tags : []).map(function (t) {
                  return "<span class=\"tag-pill\">".concat(escapeHtml(t), "</span>");
                }).join(''), "\n          </div>\n          <p class=\"text-xs text-gray-500 mt-2\">").concat(new Date(item.savedAt).toLocaleDateString(), "</p>\n        </div>\n      ");
              }).join('');
              listEl.querySelectorAll('.rl-delete-btn').forEach(function (btn) {
                btn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
                  return _regenerator().w(function (_context4) {
                    while (1) switch (_context4.n) {
                      case 0:
                        _context4.n = 1;
                        return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__.deleteReadingItem)(btn.dataset.id);
                      case 1:
                        _context4.n = 2;
                        return _this4._renderList(container);
                      case 2:
                        return _context4.a(2);
                    }
                  }, _callee4);
                })));
              });
            case 3:
              return _context5.a(2);
          }
        }, _callee5);
      }))();
    }
  };
}

/***/ },

/***/ "./src/utils/agrefine-bridge.js"
/*!**************************************!*\
  !*** ./src/utils/agrefine-bridge.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAgRefineUrl: () => (/* binding */ getAgRefineUrl),
/* harmony export */   getSyncLog: () => (/* binding */ getSyncLog),
/* harmony export */   pushToAgRefine: () => (/* binding */ pushToAgRefine),
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

// Injected into AG-Refine tab to write field data back into its localStorage
function writeFieldsToAgRefineTab(fields) {
  try {
    localStorage.setItem('agrifine_pushed_fields', JSON.stringify(fields));
    localStorage.setItem('agrifine_pushed_at', new Date().toISOString());
    // Dispatch an event so a listening AG-Refine app can react immediately
    window.dispatchEvent(new CustomEvent('agrifine:fields-updated', {
      detail: {
        fields: fields
      }
    }));
    return {
      ok: true,
      count: fields.length
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message
    };
  }
}
function pushToAgRefine(_x2) {
  return _pushToAgRefine.apply(this, arguments);
}
function _pushToAgRefine() {
  _pushToAgRefine = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(profiles) {
    var configuredUrl, allTabs, agRefineTabs, tab, _yield$chrome$scripti, _yield$chrome$scripti2, result, _t7;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.n = 1;
          return getAgRefineUrl();
        case 1:
          configuredUrl = _context4.v;
          _context4.n = 2;
          return chrome.tabs.query({});
        case 2:
          allTabs = _context4.v;
          agRefineTabs = allTabs.filter(function (t) {
            return tabMatchesAgRefine(t, configuredUrl);
          });
          if (!(agRefineTabs.length === 0)) {
            _context4.n = 3;
            break;
          }
          return _context4.a(2, {
            ok: false,
            error: 'No AG-Refine tab found. Open AG-Refine first.'
          });
        case 3:
          tab = agRefineTabs[0];
          _context4.p = 4;
          _context4.n = 5;
          return chrome.scripting.executeScript({
            target: {
              tabId: tab.id
            },
            func: writeFieldsToAgRefineTab,
            args: [profiles]
          });
        case 5:
          _yield$chrome$scripti = _context4.v;
          _yield$chrome$scripti2 = _slicedToArray(_yield$chrome$scripti, 1);
          result = _yield$chrome$scripti2[0];
          return _context4.a(2, result.result);
        case 6:
          _context4.p = 6;
          _t7 = _context4.v;
          return _context4.a(2, {
            ok: false,
            error: "Cannot write to AG-Refine tab: ".concat(_t7.message)
          });
      }
    }, _callee4, null, [[4, 6]]);
  }));
  return _pushToAgRefine.apply(this, arguments);
}
function syncFromAgRefine() {
  return _syncFromAgRefine.apply(this, arguments);
}
function _syncFromAgRefine() {
  _syncFromAgRefine = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
    var configuredUrl, allTabs, agRefineTabs, tab, raw, _yield$chrome$scripti3, _yield$chrome$scripti4, result, fields, loads, existing, added, updated, _iterator3, _step3, _loop, log, history, _t8, _t9;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.n = 1;
          return getAgRefineUrl();
        case 1:
          configuredUrl = _context6.v;
          _context6.n = 2;
          return chrome.tabs.query({});
        case 2:
          allTabs = _context6.v;
          agRefineTabs = allTabs.filter(function (t) {
            return tabMatchesAgRefine(t, configuredUrl);
          });
          if (!(agRefineTabs.length === 0)) {
            _context6.n = 3;
            break;
          }
          return _context6.a(2, {
            ok: false,
            error: 'No AG-Refine tab found. Open AG-Refine in a browser tab first.'
          });
        case 3:
          tab = agRefineTabs[0];
          _context6.p = 4;
          _context6.n = 5;
          return chrome.scripting.executeScript({
            target: {
              tabId: tab.id
            },
            func: scrapeAgRefineTab
          });
        case 5:
          _yield$chrome$scripti3 = _context6.v;
          _yield$chrome$scripti4 = _slicedToArray(_yield$chrome$scripti3, 1);
          result = _yield$chrome$scripti4[0];
          raw = result.result;
          _context6.n = 7;
          break;
        case 6:
          _context6.p = 6;
          _t8 = _context6.v;
          return _context6.a(2, {
            ok: false,
            error: "Cannot read AG-Refine tab: ".concat(_t8.message)
          });
        case 7:
          fields = extractFields(raw);
          loads = extractLoads(raw); // Merge fields — update existing by name, insert new ones
          _context6.n = 8;
          return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.getFieldProfiles)();
        case 8:
          existing = _context6.v;
          added = 0;
          updated = 0;
          _iterator3 = _createForOfIteratorHelper(fields);
          _context6.p = 9;
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var f, match, _match$coordinates, _match$cropHistory, _match$notes, _match$cluId, merged;
            return _regenerator().w(function (_context5) {
              while (1) switch (_context5.n) {
                case 0:
                  f = _step3.value;
                  match = existing.find(function (e) {
                    return e.name.toLowerCase() === f.name.toLowerCase();
                  });
                  if (!match) {
                    _context5.n = 2;
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
                  _context5.n = 1;
                  return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.saveFieldProfile)(merged);
                case 1:
                  updated++;
                  _context5.n = 4;
                  break;
                case 2:
                  _context5.n = 3;
                  return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.saveFieldProfile)(f);
                case 3:
                  added++;
                case 4:
                  return _context5.a(2);
              }
            }, _loop);
          });
          _iterator3.s();
        case 10:
          if ((_step3 = _iterator3.n()).done) {
            _context6.n = 12;
            break;
          }
          return _context6.d(_regeneratorValues(_loop()), 11);
        case 11:
          _context6.n = 10;
          break;
        case 12:
          _context6.n = 14;
          break;
        case 13:
          _context6.p = 13;
          _t9 = _context6.v;
          _iterator3.e(_t9);
        case 14:
          _context6.p = 14;
          _iterator3.f();
          return _context6.f(14);
        case 15:
          log = {
            at: new Date().toISOString(),
            tabUrl: tab.url,
            fieldsAdded: added,
            fieldsUpdated: updated,
            loadsFound: loads.length,
            rawKeys: Object.keys(_objectSpread(_objectSpread({}, raw.localStorage), raw.sessionStorage))
          };
          _context6.n = 16;
          return getSyncLog();
        case 16:
          history = _context6.v;
          history.unshift(log);
          _context6.n = 17;
          return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.localSet)(SYNC_LOG_KEY, history.slice(0, 20));
        case 17:
          return _context6.a(2, {
            ok: true,
            added: added,
            updated: updated,
            loadsFound: loads.length,
            loads: loads,
            tabUrl: tab.url
          });
      }
    }, _callee5, null, [[9, 13, 14, 15], [4, 6]]);
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

/***/ },

/***/ "./src/sidebar/sidebar.css"
/*!*********************************!*\
  !*** ./src/sidebar/sidebar.css ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		const getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		let leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			const ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			const def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		const inProgress = {};
/******/ 		const dataWebpackPrefix = "agrifine-extension:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			let script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				const scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					const s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			const onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				const doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode?.removeChild(script);
/******/ 				doneFns?.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			const timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"sidebar": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				let installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							const promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							const url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							const error = new Error();
/******/ 							const loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										const errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										const realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = self["webpackChunkagrifine_extension"] = self["webpackChunkagrifine_extension"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/sidebar/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sidebar_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar.css */ "./src/sidebar/sidebar.css");
/* harmony import */ var _modules_reading_list_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/reading-list/index.js */ "./src/modules/reading-list/index.js");
/* harmony import */ var _modules_data_ingest_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/data-ingest/index.js */ "./src/modules/data-ingest/index.js");
/* harmony import */ var _modules_field_profile_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/field-profile/index.js */ "./src/modules/field-profile/index.js");
/* harmony import */ var _modules_dashboard_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/dashboard/index.js */ "./src/modules/dashboard/index.js");
/* harmony import */ var _modules_carbon_estimator_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/carbon-estimator/index.js */ "./src/modules/carbon-estimator/index.js");
/* harmony import */ var _ag_refine_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ag-refine/index.js */ "./src/ag-refine/index.js");
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/storage.js */ "./src/utils/storage.js");
/* harmony import */ var _utils_agrefine_bridge_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/agrefine-bridge.js */ "./src/utils/agrefine-bridge.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }










// ── Module registry ───────────────────────────────────────────────────────────
var MODULES = [(0,_modules_reading_list_index_js__WEBPACK_IMPORTED_MODULE_1__.ReadingListModule)(), (0,_modules_data_ingest_index_js__WEBPACK_IMPORTED_MODULE_2__.DataIngestModule)(), (0,_modules_field_profile_index_js__WEBPACK_IMPORTED_MODULE_3__.FieldProfileModule)(), (0,_modules_dashboard_index_js__WEBPACK_IMPORTED_MODULE_4__.DashboardModule)(), (0,_modules_carbon_estimator_index_js__WEBPACK_IMPORTED_MODULE_5__.CarbonEstimatorModule)(), (0,_ag_refine_index_js__WEBPACK_IMPORTED_MODULE_6__.AgRefineModule)()];
var moduleMap = Object.fromEntries(MODULES.map(function (m) {
  return [m.id, m];
}));
var activeModuleId = 'reading-list';

// ── Tab navigation ────────────────────────────────────────────────────────────
function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      return activateTab(btn.dataset.tab);
    });
  });
}
function activateTab(_x) {
  return _activateTab.apply(this, arguments);
} // ── Settings panel ────────────────────────────────────────────────────────────
function _activateTab() {
  _activateTab = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(id) {
    var main;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          if (moduleMap[id]) {
            _context6.n = 1;
            break;
          }
          return _context6.a(2);
        case 1:
          activeModuleId = id;
          document.querySelectorAll('.tab-btn').forEach(function (btn) {
            var active = btn.dataset.tab === id;
            btn.classList.toggle('active-tab', active);
            btn.style.color = active ? '' : '#3d4f66';
          });
          main = document.getElementById('main-content');
          main.innerHTML = '';
          _context6.n = 2;
          return moduleMap[id].render(main);
        case 2:
          return _context6.a(2);
      }
    }, _callee6);
  }));
  return _activateTab.apply(this, arguments);
}
function setupSettings() {
  var btn = document.getElementById('btn-settings');
  var panel = document.getElementById('settings-panel');
  var saveBtn = document.getElementById('btn-save-key');
  var input = document.getElementById('api-key-input');
  var status = document.getElementById('api-key-status');
  var rememberChk = document.getElementById('api-key-remember');
  var forgetBtn = document.getElementById('btn-forget-key');
  var agRefineInput = document.getElementById('agrefine-url-input');
  var agRefineStatus = document.getElementById('agrefine-url-status');
  var agRefineSaveBtn = document.getElementById('btn-save-agrefine-url');
  btn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var sessionKey, savedKey, agUrl;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          panel.classList.toggle('hidden');
          if (panel.classList.contains('hidden')) {
            _context.n = 4;
            break;
          }
          _context.n = 1;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_7__.sessionGet)(_utils_storage_js__WEBPACK_IMPORTED_MODULE_7__.KEYS.API_KEY);
        case 1:
          sessionKey = _context.v;
          _context.n = 2;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_7__.localGet)(_utils_storage_js__WEBPACK_IMPORTED_MODULE_7__.KEYS.API_KEY_SAVED);
        case 2:
          savedKey = _context.v;
          if (sessionKey || savedKey) {
            input.value = '';
            input.placeholder = 'Key set — enter new key to replace';
            status.textContent = savedKey ? '✓ Key saved across sessions' : '✓ Key active this session only';
            status.style.color = '#4ade80';
          }
          if (savedKey) {
            rememberChk.checked = true;
            forgetBtn.classList.remove('hidden');
          }
          _context.n = 3;
          return (0,_utils_agrefine_bridge_js__WEBPACK_IMPORTED_MODULE_8__.getAgRefineUrl)();
        case 3:
          agUrl = _context.v;
          if (agUrl) agRefineInput.value = agUrl;
        case 4:
          return _context.a(2);
      }
    }, _callee);
  })));
  saveBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var key, remember;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          key = input.value.trim();
          if (key.startsWith('sk-ant-')) {
            _context2.n = 1;
            break;
          }
          status.textContent = 'Key must start with sk-ant-';
          status.style.color = '#f87171';
          return _context2.a(2);
        case 1:
          remember = rememberChk.checked;
          _context2.n = 2;
          return chrome.runtime.sendMessage({
            type: 'SET_API_KEY',
            payload: {
              key: key,
              remember: remember
            }
          });
        case 2:
          input.value = '';
          input.placeholder = 'Key set — enter new key to replace';
          status.textContent = remember ? '✓ Key saved across sessions' : '✓ Saved for this session';
          status.style.color = '#4ade80';
          forgetBtn.classList.toggle('hidden', !remember);
        case 3:
          return _context2.a(2);
      }
    }, _callee2);
  })));
  forgetBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_7__.localSet)(_utils_storage_js__WEBPACK_IMPORTED_MODULE_7__.KEYS.API_KEY_SAVED, null);
        case 1:
          rememberChk.checked = false;
          forgetBtn.classList.add('hidden');
          status.textContent = 'Saved key removed';
          status.style.color = '#3d4f66';
        case 2:
          return _context3.a(2);
      }
    }, _callee3);
  })));
  agRefineSaveBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var url;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          url = agRefineInput.value.trim();
          _context4.n = 1;
          return (0,_utils_agrefine_bridge_js__WEBPACK_IMPORTED_MODULE_8__.setAgRefineUrl)(url);
        case 1:
          agRefineStatus.textContent = url ? '✓ AG-Refine URL saved' : '✓ Cleared';
          agRefineStatus.style.color = '#4ade80';
          setTimeout(function () {
            agRefineStatus.style.color = '#3d4f66';
            agRefineStatus.textContent = 'Used to sync fields and outputs from your AG-Refine app.';
          }, 2500);
        case 2:
          return _context4.a(2);
      }
    }, _callee4);
  })));
}

// ── Keepalive port (prevents service worker from being killed) ────────────────
function keepAlive() {
  try {
    var port = chrome.runtime.connect({
      name: 'keepalive'
    });
    port.onDisconnect.addListener(function () {
      setTimeout(keepAlive, 5000);
    });
  } catch (_) {}
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
  return _regenerator().w(function (_context5) {
    while (1) switch (_context5.n) {
      case 0:
        setupTabs();
        setupSettings();
        keepAlive();
        _context5.n = 1;
        return activateTab(activeModuleId);
      case 1:
        return _context5.a(2);
    }
  }, _callee5);
})));
})();

/******/ })()
;
//# sourceMappingURL=sidebar.js.map