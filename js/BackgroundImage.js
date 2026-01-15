document.addEventListener('DOMContentLoaded', function() {
//获取页面header元素
    const BackGround=document.getElementById('web_bg');
   //获取div宽高
   const computedStyle=window.getComputedStyle(BackGround)
   console.log(computedStyle.width)
   console.log(computedStyle.height)
    //创建canvas绘图对象
    const picture=document.createElement('canvas')
    const canvas=picture.getContext('2d')
    InitCanvas()


//-----------------------------------------流星部分
//流星类
class Meteor
{
    constructor(){
        this.x=Math.random()*picture.width//起始x
        this.y=Math.random()*picture.height/2//起始y
        this.length=Math.random()*20+10//流星长度
        this.speed=Math.random()*5+3//流星速度
        this.angle = Math.PI / 6; // 流星下落角度（30度，模拟自然下落轨迹）
                this.opacity = Math.random() * 0.8 + 0.2; // 透明度（0.2~1，避免过亮或过暗）
        this.colorList = [
      '#ff9a9e', // 浅粉
      '#fad0c4', // 浅橙
      '#fcb69f', // 暖橙
      '#a8edea', // 浅蓝
      '#d4fc79', // 浅绿
      '#96fbc4', // 青柠
      '#fcfefe'  // 白色（保留少量白色流星）
    ];
    // 随机选取列表中的颜色
    this.color = this.colorList[Math.floor(Math.random() * this.colorList.length)];
                this.vx = Math.cos(this.angle) * this.speed; // x 轴移动速度（水平向右）
                this.vy = Math.sin(this.angle) * this.speed; // y 轴移动速度（垂直向下）
    }
    Update()
    {
         this.x += this.vx;
                this.y += this.vy;
                this.opacity -= 0.005; // 移动过程中逐渐透明，模拟流星消失
                // 流星超出可视区域或完全透明时，重置流星属性（实现循环流星雨）
                if (this.x > picture.width || this.y > picture.height || this.opacity <= 0) {
                    this.Reset();

    }
    }
    Reset()
    {
        this.x = Math.random() * picture.width;
                this.y = Math.random() * picture.height / 2;
                this.speed = Math.random() * 5 + 3;
                this.opacity = Math.random() * 0.8 + 0.2;
                this.vx = Math.cos(this.angle) * this.speed;
                this.vy = Math.sin(this.angle) * this.speed;
    }
    Draw()
    {
        canvas.save(); // 保存当前绘图状态
                canvas.beginPath();
                canvas.strokeStyle = this.color;
                canvas.globalAlpha = this.opacity; // 设置透明度
                canvas.lineWidth = 2; // 流星线宽
                // 绘制流星主体（从起始点到末端点的直线）
                canvas.moveTo(this.x, this.y);
                canvas.lineTo(
                    this.x - this.length * Math.cos(this.angle),
                    this.y - this.length * Math.sin(this.angle)
                );
                canvas.stroke(); // 执行绘制
                canvas.restore(); // 恢复绘图状态，避免影响其他流星

                // 绘制流星尾迹（可选，增加模糊效果，更逼真）
                canvas.save();
                canvas.beginPath();
                canvas.strokeStyle = this.color;
                canvas.globalAlpha = this.opacity / 2;
                canvas.lineWidth = 1;
                canvas.moveTo(this.x, this.y);
                canvas.lineTo(
                    this.x - this.length * 1.5 * Math.cos(this.angle),
                    this.y - this.length * 1.5 * Math.sin(this.angle)
                );
                canvas.stroke();
                canvas.restore();

    }
    
}    
    //创建流星数组
    const meteorList=[]
    const meteorCount=25
    //初始化流星
    for(let i=0;i<meteorCount;i++)
    {
        meteorList.push(new Meteor())
    }
//插入canvas
  BackGround.insertBefore(picture,BackGround.firstChild)
    //间隔时间
let intervalTime=1000/60
//设置计时器执行
let intervalTimer=setInterval(RepeatChangeBg,intervalTime)




//----------------------------------------------//辅助部分
//流星函数
function RepeatChangeBg()
{
    canvas.fillStyle='rgba(0,0,0,0.1)'
    canvas.fillRect(0,0,picture.width,picture.height)
    meteorList.forEach(meteor=>{meteor.Update()
        meteor.Draw()
    })
    console.log('每三秒执行一次')
}

//初始化canvas函数
function InitCanvas()
{
    picture.width=parseFloat(computedStyle.width)
    picture.height=parseFloat(computedStyle.height)
    console.log(picture.width)
    console.log(computedStyle.width)
}

    })

