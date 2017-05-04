import h from './helper.js';

class Thread {
    constructor (pDom) {
        this.pool = [];
        this.lineHeight = h.isMobile() ? 20 : 24;
        const r = Math.floor(parseInt(pDom.offsetHeight) / this.lineHeight);
        this.rows = r;
        this.vRows = new Array(r);
    // this.rowDetails = new Array(this.rows);
    }
  /**
   * 从弹幕池内，根据 index 来取对应一条弹幕数据
   * @param {Number} i
   */
    get (i) {
        return this.pool[i];
    }
  /**
   * 向弹幕池内存一条弹幕的具体数据
   * @param {Object} d
   */
    push (d) {
        this.pool.push(d);
    }
  /**
   * 从弹幕池内删除一条弹幕
   * @param {Number} i
   */
    remove (i) {
        this.pool.splice(i, 1);
    }
  /**
   * 清空弹幕池
   */
    empty () {
        this.pool = [];
    }

}
export default Thread;
