/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var h = {
    isMobile: function isMobile() {
        var ua = navigator.userAgent;
        var result = ua.match(/(mobile|iPhone|iPod|iPad|Android)/i);
        return result;
    },

    _RAF: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (cb) {
        return setTimeout(cb, 17);
    },

    _CAF: window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
        clearTimeout(id);
    },

    /**
     * 设置css
     * @param {Node} node
     * @param {Object} style
     */
    css: function css(node, style) {
        Object.keys(style).forEach(function (item) {
            node.style[item] = style[item];
        });
    }
};
exports.default = h;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvas = __webpack_require__(2);

var _canvas2 = _interopRequireDefault(_canvas);

var _thread = __webpack_require__(3);

var _thread2 = _interopRequireDefault(_thread);

var _helper = __webpack_require__(0);

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Danma = function () {
    /**
     * @constructor
     * @param {Object} data 弹幕相关参数
     * @param {Node} dom 弹幕的挂载节点
     */
    function Danma(id) {
        _classCallCheck(this, Danma);

        this.pDom = document.getElementById(id);
        this.thread = new _thread2.default(this.pDom);
        this.canvas = new _canvas2.default(this.pDom, this.thread);
        this.timer = null;
        this.lineHeight = _helper2.default.isMobile() ? 20 : 24;
    }

    /**
     * 弹幕开始
     */


    _createClass(Danma, [{
        key: 'start',
        value: function start() {
            this.canvas.start();
        }

        /**
         * 弹幕暂停
         */

    }, {
        key: 'pause',
        value: function pause() {
            this.canvas.pause();
        }

        /**
         * flow  mode 下寻找合适的行， 来存放这条弹幕，
         * @return {Number} 行号
         */

    }, {
        key: '_line',
        value: function _line() {
            var data = this.thread.pool;
            var len = data.length;
            var rows = new Array(this.thread.rows);
            var row = 0;

            for (var i = len - 1; i >= 0; i--) {
                if (data[i].mode === 'flow') {
                    var r = data[i].row;
                    rows[r] = rows[r] ? rows[r] : data[i];
                }
            }
            var maxX = 0;
            for (var j = 0; j < rows.length; j++) {
                if (!rows[j]) {
                    row = j;
                    break;
                }

                var left = rows[j].offset.x + rows[j].canvas.width;
                if (!maxX || left < maxX) {
                    maxX = left;
                    row = rows[j].row;
                }
            }

            return row;
        }

        /**
         * 固定在上下 mode 下寻找合适的行， 来存放这条弹幕，
         * @return {Number} 行号
         */

    }, {
        key: '_vLine',
        value: function _vLine(data) {
            var rows = this.thread.vRows;
            var len = rows.length;
            var row = 0;
            // 固定模式下的弹幕其实是有两种状态
            // 1是全部数组的length 都相同的时候
            // 2是某个数组，比其他数组大一的情况

            // 判断是否全部相同
            var plain = rows.every(function (item) {
                return Array.isArray(rows[0]) && item.length === rows[0].length;
            });
            if (plain) {
                row = data.mode === 'top' ? 0 : len - 1;
            } else {
                row = this._cLine(rows, data);
            }
            rows[row] = rows[row] ? rows[row].concat(data) : [data];
            return row;
        }
    }, {
        key: '_cLine',
        value: function _cLine(r, d) {
            var row = 0;
            var len = r.length;
            var shortRow = [];
            for (var i = 0; i < len; i++) {
                var p = i === 0 ? len - 1 : i - 1;
                var n = i === len - 1 ? 0 : i + 1;
                var pLen = Array.isArray(r[p]) ? r[p].length : 0;
                var nLen = Array.isArray(r[n]) ? r[n].length : 0;
                var iLen = Array.isArray(r[i]) ? r[i].length : 0;

                if (!iLen || iLen < pLen || iLen < nLen) {
                    shortRow.push(i);
                }
            }
            row = d.node === 'top' ? shortRow[0] : shortRow[shortRow.length - 1];
            return row;
        }

        /**
         * 用户在当前时间点新增一条弹幕数据
         * @param {Object} d 弹幕数据
         */

    }, {
        key: 'emit',
        value: function emit(data) {
            if (!data) return;
            var danma = {};

            if (typeof data === 'string') {
                danma.text = data;
            } else {
                danma = data;
            }

            var defaultData = {
                text: '吃惊到都不知道说什么了！',
                mode: 'flow',
                fontSize: 'big',
                color: '#fff'
            };

            data = Object.assign(defaultData, danma);
            data.mode = data.mode || 'flow';
            var cvs = this.canvas.createPiece(data);
            var row = data.mode === 'flow' ? this._line() : this._vLine(data);
            this.thread.pool.push({
                canvas: cvs,
                text: data.text,
                mode: data.mode,
                speed: Math.pow(cvs.width, 1 / 3) * 0.3,
                row: row,
                offset: {
                    x: data.mode === 'flow' ? this.canvas.layer.width : (this.canvas.layer.width - cvs.width) / 2,
                    y: this.lineHeight * row
                }
            });
        }

        /**
         * 清屏操作, 往往用在, 进度拖动的时候
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.thread.empty();
        }

        /**
         * 屏幕缩放，引起重置
         */

    }, {
        key: 'resize',
        value: function resize() {}
    }]);

    return Danma;
}();

exports.default = Danma;

window.Danma = Danma;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = __webpack_require__(0);

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
    function Canvas(pDom, thread) {
        _classCallCheck(this, Canvas);

        this.create(pDom);
        this.thread = thread;
        this.timer = null;
        this.isMobile = _helper2.default.isMobile();
        this.pDom = pDom;
    }
    /**
     * 根据父节点创建 canvas 画布，增加 canvas 属性
     * @param {String} id
     */


    _createClass(Canvas, [{
        key: 'create',
        value: function create(pDom) {
            var canvas = document.createElement('canvas');
            _helper2.default.css(canvas, {
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 500,
                width: '100%',
                height: '100%'
            });
            pDom.appendChild(canvas);

            this.layer = canvas;
            this.layer.width = pDom.offsetWidth;
            this.layer.height = pDom.offsetHeight;
            this.context = this.layer.getContext('2d');
        }
        /**
         * 为一条数据创建一个 canvas
         * @param {Object} d
         */

    }, {
        key: 'createPiece',
        value: function createPiece(d) {
            var cvs = document.createElement('canvas');
            var ctx = cvs.getContext('2d');
            var fontSize = this.isMobile ? '16px' : d.fontSize === 'small' ? '16px' : '24px';
            var fontFamily = d.fontFamily || 'serif';
            ctx.font = fontSize + ' ' + fontFamily;
            cvs.width = ctx.measureText(d.text).width;
            cvs.height = this.isMobile ? 20 : 24;
            ctx.font = fontSize + ' ' + fontFamily;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';

            ctx.fillStyle = d.color || '#ffffff';
            ctx.fillText(d.text, 0, 0);
            return cvs;
        }
    }, {
        key: 'start',
        value: function start() {
            this.render();
        }
    }, {
        key: 'pause',
        value: function pause() {
            _helper2.default._CAF.call(window, this.timer);
        }
    }, {
        key: 'draw',
        value: function draw(d) {
            this.context.drawImage(d.canvas, d.offset.x, d.offset.y, d.canvas.width, d.canvas.height);
        }
        /**
         * 逐条读取弹幕池中的弹幕数据并根据弹幕样式展示
         * @param {Array} pool
         */

    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            this.clear();
            this.thread.pool.forEach(function (item, i) {
                _this.draw(item);
                if (item.mode === 'flow') {
                    item.offset.x -= item.speed;
                    item.offset.x < -item.canvas.width && _this.thread.remove(i);
                } else {
                    var time = new Date();
                    var index = item.row;
                    item.startTime = item.startTime || new Date();
                    time - item.startTime > 5000 && _this.thread.remove(i) && _this.thread.vRows[index].shift;
                }
            });
            this.timer = _helper2.default._RAF.call(window, function () {
                _this.render();
            });
        }

        /**
         * 清除画布
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.context.clearRect(0, 0, this.layer.width, this.layer.height);
        }
    }]);

    return Canvas;
}();

exports.default = Canvas;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = __webpack_require__(0);

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Thread = function () {
    function Thread(pDom) {
        _classCallCheck(this, Thread);

        this.pool = [];
        this.lineHeight = _helper2.default.isMobile() ? 20 : 24;
        var r = Math.floor(parseInt(pDom.offsetHeight) / this.lineHeight);
        this.rows = r;
        this.vRows = new Array(r);
        // this.rowDetails = new Array(this.rows);
    }
    /**
     * 从弹幕池内，根据 index 来取对应一条弹幕数据
     * @param {Number} i
     */


    _createClass(Thread, [{
        key: 'get',
        value: function get(i) {
            return this.pool[i];
        }
        /**
         * 向弹幕池内存一条弹幕的具体数据
         * @param {Object} d
         */

    }, {
        key: 'push',
        value: function push(d) {
            this.pool.push(d);
        }
        /**
         * 从弹幕池内删除一条弹幕
         * @param {Number} i
         */

    }, {
        key: 'remove',
        value: function remove(i) {
            this.pool.splice(i, 1);
        }
        /**
         * 清空弹幕池
         */

    }, {
        key: 'empty',
        value: function empty() {
            this.pool = [];
        }
    }]);

    return Thread;
}();

exports.default = Thread;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGNkYTc4ZmIwMGMxMTk3M2IyM2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGFubWEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGhyZWFkLmpzIl0sIm5hbWVzIjpbImgiLCJpc01vYmlsZSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwicmVzdWx0IiwibWF0Y2giLCJfUkFGIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJvUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2IiLCJzZXRUaW1lb3V0IiwiX0NBRiIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSIsIndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJvQ2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJpZCIsImNsZWFyVGltZW91dCIsImNzcyIsIm5vZGUiLCJzdHlsZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiaXRlbSIsIkRhbm1hIiwicERvbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0aHJlYWQiLCJjYW52YXMiLCJ0aW1lciIsImxpbmVIZWlnaHQiLCJzdGFydCIsInBhdXNlIiwiZGF0YSIsInBvb2wiLCJsZW4iLCJsZW5ndGgiLCJyb3dzIiwiQXJyYXkiLCJyb3ciLCJpIiwibW9kZSIsInIiLCJtYXhYIiwiaiIsImxlZnQiLCJvZmZzZXQiLCJ4Iiwid2lkdGgiLCJ2Um93cyIsInBsYWluIiwiZXZlcnkiLCJpc0FycmF5IiwiX2NMaW5lIiwiY29uY2F0IiwiZCIsInNob3J0Um93IiwicCIsIm4iLCJwTGVuIiwibkxlbiIsImlMZW4iLCJwdXNoIiwiZGFubWEiLCJ0ZXh0IiwiZGVmYXVsdERhdGEiLCJmb250U2l6ZSIsImNvbG9yIiwiYXNzaWduIiwiY3ZzIiwiY3JlYXRlUGllY2UiLCJfbGluZSIsIl92TGluZSIsInNwZWVkIiwiTWF0aCIsInBvdyIsImxheWVyIiwieSIsImVtcHR5IiwiQ2FudmFzIiwiY3JlYXRlIiwiY3JlYXRlRWxlbWVudCIsInBvc2l0aW9uIiwidG9wIiwiekluZGV4IiwiaGVpZ2h0IiwiYXBwZW5kQ2hpbGQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiY3R4IiwiZm9udEZhbWlseSIsImZvbnQiLCJtZWFzdXJlVGV4dCIsInRleHRBbGlnbiIsInRleHRCYXNlbGluZSIsImZpbGxTdHlsZSIsImZpbGxUZXh0IiwicmVuZGVyIiwiY2FsbCIsImRyYXdJbWFnZSIsImNsZWFyIiwiZHJhdyIsInJlbW92ZSIsInRpbWUiLCJEYXRlIiwiaW5kZXgiLCJzdGFydFRpbWUiLCJzaGlmdCIsImNsZWFyUmVjdCIsIlRocmVhZCIsImZsb29yIiwicGFyc2VJbnQiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwr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LFlBQU1rRCxJQUFJZ0MsS0FBS3NDLEtBQUwsQ0FBV0MsU0FBU3pGLEtBQUtnRSxZQUFkLElBQThCLEtBQUsxRCxVQUE5QyxDQUFWO0FBQ0EsYUFBS08sSUFBTCxHQUFZSyxDQUFaO0FBQ0EsYUFBS08sS0FBTCxHQUFhLElBQUlYLEtBQUosQ0FBVUksQ0FBVixDQUFiO0FBQ0o7QUFDQztBQUNIOzs7Ozs7Ozs0QkFJT0YsQyxFQUFHO0FBQ0osbUJBQU8sS0FBS04sSUFBTCxDQUFVTSxDQUFWLENBQVA7QUFDSDtBQUNIOzs7Ozs7OzZCQUlRZSxDLEVBQUc7QUFDTCxpQkFBS3JCLElBQUwsQ0FBVTRCLElBQVYsQ0FBZVAsQ0FBZjtBQUNIO0FBQ0g7Ozs7Ozs7K0JBSVVmLEMsRUFBRztBQUNQLGlCQUFLTixJQUFMLENBQVVnRixNQUFWLENBQWlCMUUsQ0FBakIsRUFBb0IsQ0FBcEI7QUFDSDtBQUNIOzs7Ozs7Z0NBR1c7QUFDTCxpQkFBS04sSUFBTCxHQUFZLEVBQVo7QUFDSDs7Ozs7O2tCQUdVNkUsTSIsImZpbGUiOiJkYW5tYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGNkYTc4ZmIwMGMxMTk3M2IyM2QiLCJjb25zdCBoID0ge1xuICAgIGlzTW9iaWxlICgpIHtcbiAgICAgICAgY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICBjb25zdCByZXN1bHQgPSB1YS5tYXRjaCgvKG1vYmlsZXxpUGhvbmV8aVBvZHxpUGFkfEFuZHJvaWQpL2kpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgX1JBRjogd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICBmdW5jdGlvbiAoY2IpIHsgcmV0dXJuIHNldFRpbWVvdXQoY2IsIDE3KTsgfSxcblxuICAgIF9DQUY6IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cubXNDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5vQ2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICBmdW5jdGlvbiAoaWQpIHsgY2xlYXJUaW1lb3V0KGlkKTsgfSxcblxuICAvKipcbiAgICog6K6+572uY3NzXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgKiBAcGFyYW0ge09iamVjdH0gc3R5bGVcbiAgICovXG4gICAgY3NzIChub2RlLCBzdHlsZSkge1xuICAgICAgICBPYmplY3Qua2V5cyhzdHlsZSkuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGVbaXRlbV0gPSBzdHlsZVtpdGVtXTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGg7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxwZXIuanMiLCJpbXBvcnQgQ2FudmFzIGZyb20gJy4vY2FudmFzLmpzJztcbmltcG9ydCBUaHJlYWQgZnJvbSAnLi90aHJlYWQuanMnO1xuaW1wb3J0IGggZnJvbSAnLi9oZWxwZXIuanMnO1xuXG5jbGFzcyBEYW5tYSB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEg5by55bmV55u45YWz5Y+C5pWwXG4gICAqIEBwYXJhbSB7Tm9kZX0gZG9tIOW8ueW5leeahOaMgui9veiKgueCuVxuICAgKi9cbiAgICBjb25zdHJ1Y3RvciAoaWQpIHtcbiAgICAgICAgdGhpcy5wRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICB0aGlzLnRocmVhZCA9IG5ldyBUaHJlYWQodGhpcy5wRG9tKTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBuZXcgQ2FudmFzKHRoaXMucERvbSwgdGhpcy50aHJlYWQpO1xuICAgICAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5saW5lSGVpZ2h0ID0gaC5pc01vYmlsZSgpID8gMjAgOiAyNDtcbiAgICB9XG5cbiAgLyoqXG4gICAqIOW8ueW5leW8gOWni1xuICAgKi9cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLnN0YXJ0KCk7XG4gICAgfVxuXG4gIC8qKlxuICAgKiDlvLnluZXmmoLlgZxcbiAgICovXG4gICAgcGF1c2UgKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5wYXVzZSgpO1xuICAgIH1cblxuICAvKipcbiAgICogZmxvdyAgbW9kZSDkuIvlr7vmib7lkIjpgILnmoTooYzvvIwg5p2l5a2Y5pS+6L+Z5p2h5by55bmV77yMXG4gICAqIEByZXR1cm4ge051bWJlcn0g6KGM5Y+3XG4gICAqL1xuICAgIF9saW5lICgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMudGhyZWFkLnBvb2w7XG4gICAgICAgIGNvbnN0IGxlbiA9IGRhdGEubGVuZ3RoO1xuICAgICAgICBjb25zdCByb3dzID0gbmV3IEFycmF5KHRoaXMudGhyZWFkLnJvd3MpO1xuICAgICAgICBsZXQgcm93ID0gMDtcblxuICAgICAgICBmb3IobGV0IGkgPSBsZW4gLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYoZGF0YVtpXS5tb2RlID09PSAnZmxvdycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gZGF0YVtpXS5yb3c7XG4gICAgICAgICAgICAgICAgcm93c1tyXSA9IHJvd3Nbcl0gPyByb3dzW3JdIDogZGF0YVtpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGxldCBtYXhYID0gMDtcbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHJvd3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmKCFyb3dzW2pdKSB7XG4gICAgICAgICAgICAgICAgcm93ID0gajtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbGVmdCA9IHJvd3Nbal0ub2Zmc2V0LnggKyByb3dzW2pdLmNhbnZhcy53aWR0aDtcbiAgICAgICAgICAgIGlmKCFtYXhYIHx8IGxlZnQgPCBtYXhYKSB7XG4gICAgICAgICAgICAgICAgbWF4WCA9IGxlZnQ7XG4gICAgICAgICAgICAgICAgcm93ID0gcm93c1tqXS5yb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcm93O1xuICAgIH1cblxuICAvKipcbiAgICog5Zu65a6a5Zyo5LiK5LiLIG1vZGUg5LiL5a+75om+5ZCI6YCC55qE6KGM77yMIOadpeWtmOaUvui/meadoeW8ueW5le+8jFxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IOihjOWPt1xuICAgKi9cbiAgICBfdkxpbmUgKGRhdGEpIHtcbiAgICAgICAgY29uc3Qgcm93cyA9IHRoaXMudGhyZWFkLnZSb3dzO1xuICAgICAgICBjb25zdCBsZW4gPSByb3dzLmxlbmd0aDtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgLy8g5Zu65a6a5qih5byP5LiL55qE5by55bmV5YW25a6e5piv5pyJ5Lik56eN54q25oCBXG4gICAgLy8gMeaYr+WFqOmDqOaVsOe7hOeahGxlbmd0aCDpg73nm7jlkIznmoTml7blgJlcbiAgICAvLyAy5piv5p+Q5Liq5pWw57uE77yM5q+U5YW25LuW5pWw57uE5aSn5LiA55qE5oOF5Ya1XG5cbiAgICAvLyDliKTmlq3mmK/lkKblhajpg6jnm7jlkIxcbiAgICAgICAgY29uc3QgcGxhaW4gPSByb3dzLmV2ZXJ5KGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocm93c1swXSkgJiYgaXRlbS5sZW5ndGggPT09IHJvd3NbMF0ubGVuZ3RoO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYocGxhaW4pIHtcbiAgICAgICAgICAgIHJvdyA9IGRhdGEubW9kZSA9PT0gJ3RvcCcgPyAwIDogbGVuIC0gMTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByb3cgPSB0aGlzLl9jTGluZShyb3dzLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByb3dzW3Jvd10gPSByb3dzW3Jvd10gPyByb3dzW3Jvd10uY29uY2F0KGRhdGEpIDogW2RhdGFdO1xuICAgICAgICByZXR1cm4gcm93O1xuICAgIH1cbiAgICBfY0xpbmUgKHIsIGQpIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIGNvbnN0IGxlbiA9IHIubGVuZ3RoO1xuICAgICAgICBjb25zdCBzaG9ydFJvdyA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBpID09PSAwID8gbGVuIC0gMSA6IGkgLSAxO1xuICAgICAgICAgICAgY29uc3QgbiA9IGkgPT09IGxlbiAtIDEgPyAwIDogaSArIDE7XG4gICAgICAgICAgICBjb25zdCBwTGVuID0gQXJyYXkuaXNBcnJheShyW3BdKSA/IHJbcF0ubGVuZ3RoIDogMDtcbiAgICAgICAgICAgIGNvbnN0IG5MZW4gPSBBcnJheS5pc0FycmF5KHJbbl0pID8gcltuXS5sZW5ndGggOiAwO1xuICAgICAgICAgICAgY29uc3QgaUxlbiA9IEFycmF5LmlzQXJyYXkocltpXSkgPyByW2ldLmxlbmd0aCA6IDA7XG5cbiAgICAgICAgICAgIGlmKCFpTGVuIHx8IGlMZW4gPCBwTGVuIHx8IGlMZW4gPCBuTGVuKSB7XG4gICAgICAgICAgICAgICAgc2hvcnRSb3cucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByb3cgPSBkLm5vZGUgPT09ICd0b3AnID8gc2hvcnRSb3dbMF0gOiBzaG9ydFJvd1tzaG9ydFJvdy5sZW5ndGggLSAxXTtcbiAgICAgICAgcmV0dXJuIHJvdztcblxuICAgIH1cblxuICAvKipcbiAgICog55So5oi35Zyo5b2T5YmN5pe26Ze054K55paw5aKe5LiA5p2h5by55bmV5pWw5o2uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkIOW8ueW5leaVsOaNrlxuICAgKi9cbiAgICBlbWl0IChkYXRhKSB7XG4gICAgICAgIGlmKCFkYXRhKSByZXR1cm47XG4gICAgICAgIGxldCBkYW5tYSA9IHt9O1xuXG4gICAgICAgIGlmKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGFubWEudGV4dCA9IGRhdGE7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZGFubWEgPSBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVmYXVsdERhdGEgPSB7XG4gICAgICAgICAgICB0ZXh0OiAn5ZCD5oOK5Yiw6YO95LiN55+l6YGT6K+05LuA5LmI5LqG77yBJyxcbiAgICAgICAgICAgIG1vZGU6ICdmbG93JyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAnYmlnJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZidcbiAgICAgICAgfTtcblxuICAgICAgICBkYXRhID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0RGF0YSwgZGFubWEpO1xuICAgICAgICBkYXRhLm1vZGUgPSBkYXRhLm1vZGUgfHwgJ2Zsb3cnO1xuICAgICAgICBjb25zdCBjdnMgPSB0aGlzLmNhbnZhcy5jcmVhdGVQaWVjZShkYXRhKTtcbiAgICAgICAgY29uc3Qgcm93ID0gZGF0YS5tb2RlID09PSAnZmxvdycgPyB0aGlzLl9saW5lKCkgOiB0aGlzLl92TGluZShkYXRhKTtcbiAgICAgICAgdGhpcy50aHJlYWQucG9vbC5wdXNoKHtcbiAgICAgICAgICAgIGNhbnZhczogY3ZzLFxuICAgICAgICAgICAgdGV4dDogZGF0YS50ZXh0LFxuICAgICAgICAgICAgbW9kZTogZGF0YS5tb2RlLFxuICAgICAgICAgICAgc3BlZWQ6IE1hdGgucG93KGN2cy53aWR0aCwgMSAvIDMpICogMC4zLFxuICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICAgICAgeDogZGF0YS5tb2RlID09PSAnZmxvdycgPyB0aGlzLmNhbnZhcy5sYXllci53aWR0aCA6ICh0aGlzLmNhbnZhcy5sYXllci53aWR0aCAtIGN2cy53aWR0aCkgLyAyLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMubGluZUhlaWdodCAqIHJvd1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgLyoqXG4gICAqIOa4heWxj+aTjeS9nCwg5b6A5b6A55So5ZyoLCDov5vluqbmi5bliqjnmoTml7blgJlcbiAgICovXG4gICAgY2xlYXIgKCkge1xuICAgICAgICB0aGlzLnRocmVhZC5lbXB0eSgpO1xuICAgIH1cblxuICAvKipcbiAgICog5bGP5bmV57yp5pS+77yM5byV6LW36YeN572uXG4gICAqL1xuICAgIHJlc2l6ZSAoKSB7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGFubWE7XG53aW5kb3cuRGFubWEgPSBEYW5tYTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kYW5tYS5qcyIsImltcG9ydCBoIGZyb20gJy4vaGVscGVyLmpzJztcblxuY2xhc3MgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3RvciAocERvbSwgdGhyZWFkKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlKHBEb20pO1xuICAgICAgICB0aGlzLnRocmVhZCA9IHRocmVhZDtcbiAgICAgICAgdGhpcy50aW1lciA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNNb2JpbGUgPSBoLmlzTW9iaWxlKCk7XG4gICAgICAgIHRoaXMucERvbSA9IHBEb207XG4gICAgfVxuICAvKipcbiAgICog5qC55o2u54i26IqC54K55Yib5bu6IGNhbnZhcyDnlLvluIPvvIzlop7liqAgY2FudmFzIOWxnuaAp1xuICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICovXG4gICAgY3JlYXRlIChwRG9tKSB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBoLmNzcyhjYW52YXMsIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHpJbmRleDogNTAwLFxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgIH0pO1xuICAgICAgICBwRG9tLmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbiAgICAgICAgdGhpcy5sYXllciA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5sYXllci53aWR0aCA9IHBEb20ub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMubGF5ZXIuaGVpZ2h0ID0gcERvbS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMubGF5ZXIuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB9XG4gIC8qKlxuICAgKiDkuLrkuIDmnaHmlbDmja7liJvlu7rkuIDkuKogY2FudmFzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkXG4gICAqL1xuICAgIGNyZWF0ZVBpZWNlIChkKSB7XG4gICAgICAgIGNvbnN0IGN2cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjb25zdCBjdHggPSBjdnMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSB0aGlzLmlzTW9iaWxlID8gJzE2cHgnIDogZC5mb250U2l6ZSA9PT0gJ3NtYWxsJyA/ICcxNnB4JyA6ICcyNHB4JztcbiAgICAgICAgY29uc3QgZm9udEZhbWlseSA9IGQuZm9udEZhbWlseSB8fCAnc2VyaWYnO1xuICAgICAgICBjdHguZm9udCA9IGAke2ZvbnRTaXplfSAke2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgY3ZzLndpZHRoID0gY3R4Lm1lYXN1cmVUZXh0KGQudGV4dCkud2lkdGg7XG4gICAgICAgIGN2cy5oZWlnaHQgPSB0aGlzLmlzTW9iaWxlID8gMjAgOiAyNDtcbiAgICAgICAgY3R4LmZvbnQgPSBgJHtmb250U2l6ZX0gJHtmb250RmFtaWx5fWA7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gZC5jb2xvciB8fCAnI2ZmZmZmZic7XG4gICAgICAgIGN0eC5maWxsVGV4dChkLnRleHQsIDAsIDApO1xuICAgICAgICByZXR1cm4gY3ZzO1xuICAgIH1cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICAgIHBhdXNlICgpIHtcbiAgICAgICAgaC5fQ0FGLmNhbGwod2luZG93LCB0aGlzLnRpbWVyKTtcbiAgICB9XG4gICAgZHJhdyAoZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGQuY2FudmFzLCBkLm9mZnNldC54LCBkLm9mZnNldC55LCBkLmNhbnZhcy53aWR0aCwgZC5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG4gIC8qKlxuICAgKiDpgJDmnaHor7vlj5blvLnluZXmsaDkuK3nmoTlvLnluZXmlbDmja7lubbmoLnmja7lvLnluZXmoLflvI/lsZXnpLpcbiAgICogQHBhcmFtIHtBcnJheX0gcG9vbFxuICAgKi9cbiAgICByZW5kZXIgKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMudGhyZWFkLnBvb2wuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmF3KGl0ZW0pO1xuICAgICAgICAgICAgaWYoaXRlbS5tb2RlID09PSAnZmxvdycpIHtcbiAgICAgICAgICAgICAgICBpdGVtLm9mZnNldC54IC09IGl0ZW0uc3BlZWQ7XG4gICAgICAgICAgICAgICAgaXRlbS5vZmZzZXQueCA8IC1pdGVtLmNhbnZhcy53aWR0aCAmJiB0aGlzLnRocmVhZC5yZW1vdmUoaSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGl0ZW0ucm93O1xuICAgICAgICAgICAgICAgIGl0ZW0uc3RhcnRUaW1lID0gaXRlbS5zdGFydFRpbWUgfHwgbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICB0aW1lIC0gaXRlbS5zdGFydFRpbWUgPiA1MDAwICYmIHRoaXMudGhyZWFkLnJlbW92ZShpKSAmJiB0aGlzLnRocmVhZC52Um93c1tpbmRleF0uc2hpZnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGltZXIgPSBoLl9SQUYuY2FsbCh3aW5kb3csICgpID0+IHt0aGlzLnJlbmRlcigpO30pO1xuICAgIH1cblxuICAvKipcbiAgICog5riF6Zmk55S75biDXG4gICAqL1xuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmxheWVyLndpZHRoLCB0aGlzLmxheWVyLmhlaWdodCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbnZhcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jYW52YXMuanMiLCJpbXBvcnQgaCBmcm9tICcuL2hlbHBlci5qcyc7XG5cbmNsYXNzIFRocmVhZCB7XG4gICAgY29uc3RydWN0b3IgKHBEb20pIHtcbiAgICAgICAgdGhpcy5wb29sID0gW107XG4gICAgICAgIHRoaXMubGluZUhlaWdodCA9IGguaXNNb2JpbGUoKSA/IDIwIDogMjQ7XG4gICAgICAgIGNvbnN0IHIgPSBNYXRoLmZsb29yKHBhcnNlSW50KHBEb20ub2Zmc2V0SGVpZ2h0KSAvIHRoaXMubGluZUhlaWdodCk7XG4gICAgICAgIHRoaXMucm93cyA9IHI7XG4gICAgICAgIHRoaXMudlJvd3MgPSBuZXcgQXJyYXkocik7XG4gICAgLy8gdGhpcy5yb3dEZXRhaWxzID0gbmV3IEFycmF5KHRoaXMucm93cyk7XG4gICAgfVxuICAvKipcbiAgICog5LuO5by55bmV5rGg5YaF77yM5qC55o2uIGluZGV4IOadpeWPluWvueW6lOS4gOadoeW8ueW5leaVsOaNrlxuICAgKiBAcGFyYW0ge051bWJlcn0gaVxuICAgKi9cbiAgICBnZXQgKGkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9vbFtpXTtcbiAgICB9XG4gIC8qKlxuICAgKiDlkJHlvLnluZXmsaDlhoXlrZjkuIDmnaHlvLnluZXnmoTlhbfkvZPmlbDmja5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRcbiAgICovXG4gICAgcHVzaCAoZCkge1xuICAgICAgICB0aGlzLnBvb2wucHVzaChkKTtcbiAgICB9XG4gIC8qKlxuICAgKiDku47lvLnluZXmsaDlhoXliKDpmaTkuIDmnaHlvLnluZVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlcbiAgICovXG4gICAgcmVtb3ZlIChpKSB7XG4gICAgICAgIHRoaXMucG9vbC5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICAvKipcbiAgICog5riF56m65by55bmV5rGgXG4gICAqL1xuICAgIGVtcHR5ICgpIHtcbiAgICAgICAgdGhpcy5wb29sID0gW107XG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBUaHJlYWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdGhyZWFkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==