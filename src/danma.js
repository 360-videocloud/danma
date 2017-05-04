import Canvas from './canvas.js';
import Thread from './thread.js';
import h from './helper.js';

class Danma {
  /**
   * @constructor
   * @param {Object} data 弹幕相关参数
   * @param {Node} dom 弹幕的挂载节点
   */
    constructor (id) {
        this.pDom = document.getElementById(id);
        this.thread = new Thread(this.pDom);
        this.canvas = new Canvas(this.pDom, this.thread);
        this.timer = null;
        this.lineHeight = h.isMobile() ? 20 : 24;
    }

  /**
   * 弹幕开始
   */
    start () {
        this.canvas.start();
    }

  /**
   * 弹幕暂停
   */
    pause () {
        this.canvas.pause();
    }

  /**
   * flow  mode 下寻找合适的行， 来存放这条弹幕，
   * @return {Number} 行号
   */
    _line () {
        const data = this.thread.pool;
        const len = data.length;
        const rows = new Array(this.thread.rows);
        let row = 0;

        for(let i = len - 1; i >= 0; i--) {
            if(data[i].mode === 'flow') {
                const r = data[i].row;
                rows[r] = rows[r] ? rows[r] : data[i];
            }

        }
        let maxX = 0;
        for(let j = 0; j < rows.length; j++) {
            if(!rows[j]) {
                row = j;
                break;
            }

            const left = rows[j].offset.x + rows[j].canvas.width;
            if(!maxX || left < maxX) {
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
    _vLine (data) {
        const rows = this.thread.vRows;
        const len = rows.length;
        let row = 0;
    // 固定模式下的弹幕其实是有两种状态
    // 1是全部数组的length 都相同的时候
    // 2是某个数组，比其他数组大一的情况

    // 判断是否全部相同
        const plain = rows.every(item => {
            return Array.isArray(rows[0]) && item.length === rows[0].length;
        });
        if(plain) {
            row = data.mode === 'top' ? 0 : len - 1;
        }else{
            row = this._cLine(rows, data);
        }
        rows[row] = rows[row] ? rows[row].concat(data) : [data];
        return row;
    }
    _cLine (r, d) {
        let row = 0;
        const len = r.length;
        const shortRow = [];
        for(let i = 0; i < len; i++) {
            const p = i === 0 ? len - 1 : i - 1;
            const n = i === len - 1 ? 0 : i + 1;
            const pLen = Array.isArray(r[p]) ? r[p].length : 0;
            const nLen = Array.isArray(r[n]) ? r[n].length : 0;
            const iLen = Array.isArray(r[i]) ? r[i].length : 0;

            if(!iLen || iLen < pLen || iLen < nLen) {
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
    emit (data) {
        if(!data) return;
        let danma = {};

        if(typeof data === 'string') {
            danma.text = data;
        }else{
            danma = data;
        }

        const defaultData = {
            text: '吃惊到都不知道说什么了！',
            mode: 'flow',
            fontSize: 'big',
            color: '#fff'
        };

        data = Object.assign(defaultData, danma);
        data.mode = data.mode || 'flow';
        const cvs = this.canvas.createPiece(data);
        const row = data.mode === 'flow' ? this._line() : this._vLine(data);
        this.thread.pool.push({
            canvas: cvs,
            text: data.text,
            mode: data.mode,
            speed: Math.pow(cvs.width, 1 / 3) * 0.3,
            row,
            offset: {
                x: data.mode === 'flow' ? this.canvas.layer.width : (this.canvas.layer.width - cvs.width) / 2,
                y: this.lineHeight * row
            }
        });
    }

  /**
   * 清屏操作, 往往用在, 进度拖动的时候
   */
    clear () {
        this.thread.empty();
    }

  /**
   * 屏幕缩放，引起重置
   */
    resize () {

    }

}

export default Danma;
window.Danma = Danma;
