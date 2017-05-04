const h = {
    isMobile () {
        const ua = navigator.userAgent;
        const result = ua.match(/(mobile|iPhone|iPod|iPad|Android)/i);
        return result;
    },
    _RAF: window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (cb) { return setTimeout(cb, 17); },

    _CAF: window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function (id) { clearTimeout(id); },

  /**
   * 设置css
   * @param {Node} node
   * @param {Object} style
   */
    css (node, style) {
        Object.keys(style).forEach(item => {
            node.style[item] = style[item];
        });
    }
};
export default h;

