import h from './helper.js';

class Canvas {
    constructor (pDom, thread) {
        this.create(pDom);
        this.thread = thread;
        this.timer = null;
        this.isMobile = h.isMobile();
        this.pDom = pDom;
    }
  /**
   * 根据父节点创建 canvas 画布，增加 canvas 属性
   * @param {String} id
   */
    create (pDom) {
        const canvas = document.createElement('canvas');
        h.css(canvas, {
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
    createPiece (d) {
        const cvs = document.createElement('canvas');
        const ctx = cvs.getContext('2d');
        const fontSize = this.isMobile ? '16px' : d.fontSize === 'small' ? '16px' : '24px';
        const fontFamily = d.fontFamily || 'serif';
        ctx.font = `${fontSize} ${fontFamily}`;
        cvs.width = ctx.measureText(d.text).width;
        cvs.height = this.isMobile ? 20 : 24;
        ctx.font = `${fontSize} ${fontFamily}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        ctx.fillStyle = d.color || '#ffffff';
        ctx.fillText(d.text, 0, 0);
        return cvs;
    }
    start () {
        this.render();
    }
    pause () {
        h._CAF.call(window, this.timer);
    }
    draw (d) {
        this.context.drawImage(d.canvas, d.offset.x, d.offset.y, d.canvas.width, d.canvas.height);
    }
  /**
   * 逐条读取弹幕池中的弹幕数据并根据弹幕样式展示
   * @param {Array} pool
   */
    render () {
        this.clear();
        this.thread.pool.forEach((item, i) => {
            this.draw(item);
            if(item.mode === 'flow') {
                item.offset.x -= item.speed;
                item.offset.x < -item.canvas.width && this.thread.remove(i);
            }else{
                const time = new Date();
                const index = item.row;
                item.startTime = item.startTime || new Date();
                time - item.startTime > 5000 && this.thread.remove(i) && this.thread.vRows[index].shift;
            }

        });
        this.timer = h._RAF.call(window, () => {this.render();});
    }

  /**
   * 清除画布
   */
    clear () {
        this.context.clearRect(0, 0, this.layer.width, this.layer.height);
    }

}

export default Canvas;
