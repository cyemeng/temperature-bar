function TempBar(el){
    var dom = document.querySelector(el)
    var canvas = document.createElement("canvas")
    var height = dom.clientHeight === 0? 300 : dom.clientHeight
    var width = dom.clientWidth === 0 || dom.clientWidth>100?40:dom.clientWidth
    canvas.height = height;
    canvas.width = width;
    dom.appendChild(canvas)

    var R = Math.floor((width-6)/2);
    var r = Math.round(R*1/2)
    var ctx = canvas.getContext("2d")

    this.min = 0 //最高气温
    this.max = 40 //zuidiqiwen
    //画骨架
    this.drawOuterLine = function () {
        ctx.beginPath()
        //上半个圆形
        ctx.arc(R, r, r, 0, Math.PI,true);
        //下半个圆形
        var theta = Math.acos(r * 1.0 / R)
        ctx.arc(R, height-R, R, theta+Math.PI, -theta, true); //逆时针
        ctx.closePath()
        ctx.stroke()
    }
    //画底色
    this.drawBasic = function () {
        var lingrad = ctx.createLinearGradient(0,0,width,height);
        lingrad.addColorStop(0, "mediumvioletred");
        lingrad.addColorStop(0.2, "darkorange");
        lingrad.addColorStop(0.4, "gold");
        lingrad.addColorStop(0.6, "limegreen");
        lingrad.addColorStop(0.8, "navy");
        lingrad.addColorStop(1, "purple");
        ctx.fillStyle=lingrad
        ctx.fill("evenodd")
    }
    //根据数值获取y坐标
    this.getYByValue = function (value) {
        //刻度线总高度
        var scale_height = height-2*R - 2*r
        //0刻度线所在位置
        var zero_scale_y = height - 2*R
        var dy_dtem = scale_height/(this.max-this.min)
        return zero_scale_y - dy_dtem*value
    }
    //画刻度线
    this.drawScale = function(){
        for (var i = this.min; i<= this.max ;i++){ //画刻度线
            var y = this.getYByValue(i)
            ctx.beginPath();
            ctx.moveTo( R+r, y)
            if (i % 10 == 0){
                ctx.lineWidth = 2;
                ctx.lineTo( R+r-r*2/3, y)
                //ctx.font = "15px bold";
                ctx.fillText(i, R+r, y+6)
                ctx.stroke()
            } else {
                ctx.lineWidth = 1;
                if (i % 5 == 0) {
                    ctx.lineTo(R + r - r / 2, y)
                }else {
                    ctx.lineTo(R + r - r / 3, y)
                }
                ctx.stroke()
            }
        }
    }
    this.setValue = function(value){
        this.drawOuterLine()
        this.drawBasic()
        ctx.clearRect(0,0,100,this.getYByValue(value))
        this.drawOuterLine()
        this.drawScale()
    }
    this.drawOuterLine()
    this.drawBasic()
    this.drawScale()
}
