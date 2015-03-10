var gWindowWidth = 1024;
var gWindowHeight = 768;
var gRadius = 8;
var gMarginTop = 60;
var gMarginLeft = 30;

var endTime = new Date();
var year = endTime.getFullYear();
var month = endTime.getMonth();
var day = endTime.getDate();
const gcEndTime = new Date(year, month,day,18,0,0,0);
var gCurShowTimeSeconds = 0

var gBalls = [];
const gColorsalls = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]

function getBasicData() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = gWindowWidth;
    canvas.height = gWindowHeight;

    gCurShowTimeSeconds = getCurrentShowTimeSeconds()
    setInterval(
        function () {
            render(context);
            update();
        }
        ,
        50
    );
}
addLoadEvent(getBasicData);

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = gcEndTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000)

    return ret >= 0 ? ret : 0;
}

function update() {

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
    var nextSeconds = nextShowTimeSeconds % 60

    var curHours = parseInt(gCurShowTimeSeconds / 3600);
    var curMinutes = parseInt((gCurShowTimeSeconds - curHours * 3600) / 60)
    var curSeconds = gCurShowTimeSeconds % 60

    if (nextSeconds != curSeconds) {
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addgBalls(gMarginLeft + 0, gMarginTop, parseInt(curHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addgBalls(gMarginLeft + 15 * (gRadius + 1), gMarginTop, parseInt(curHours / 10));
        }

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addgBalls(gMarginLeft + 39 * (gRadius + 1), gMarginTop, parseInt(curMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addgBalls(gMarginLeft + 54 * (gRadius + 1), gMarginTop, parseInt(curMinutes % 10));
        }

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addgBalls(gMarginLeft + 78 * (gRadius + 1), gMarginTop, parseInt(curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addgBalls(gMarginLeft + 93 * (gRadius + 1), gMarginTop, parseInt(nextSeconds % 10));
        }

        gCurShowTimeSeconds = nextShowTimeSeconds;
    }

    updategBalls();

    console.log(gBalls.length)
}

function updategBalls() {

    for (var i = 0 ; i < gBalls.length ; i++) {

        gBalls[i].x += gBalls[i].vx;
        gBalls[i].y += gBalls[i].vy;
        gBalls[i].vy += gBalls[i].g;

        if (gBalls[i].y >= gWindowHeight - gRadius) {
            gBalls[i].y = gWindowHeight - gRadius;
            gBalls[i].vy = -gBalls[i].vy * 0.75;
        }
    }

    var cnt = 0
    for (var i = 0 ; i < gBalls.length ; i++)
        if (gBalls[i].x + gRadius > 0 && gBalls[i].x - gRadius < gWindowWidth)
            gBalls[cnt++] = gBalls[i]

    while (gBalls.length > cnt) {
        gBalls.pop();
    }
}

//将彩色小球添加到数组中
function addgBalls(x, y, num) {

    for (var i = 0  ; i < digit[num].length ; i++)
        for (var j = 0  ; j < digit[num][i].length ; j++)
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (gRadius + 1) + (gRadius + 1),
                    y: y + i * 2 * (gRadius + 1) + (gRadius + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: gColorsalls[Math.floor(Math.random() * gColorsalls.length)]
                }

                gBalls.push(aBall)
            }
}

//渲染时钟和动态小球
function render(cxt) {

    //渲染之前先清除
    cxt.clearRect(0, 0, gWindowWidth, gWindowHeight);

    var hours = parseInt(gCurShowTimeSeconds / 3600);
    var minutes = parseInt((gCurShowTimeSeconds - hours * 3600) / 60)
    var seconds = gCurShowTimeSeconds % 60

    renderDigit(gMarginLeft, gMarginTop, parseInt(hours / 10), cxt)
    renderDigit(gMarginLeft + 15 * (gRadius + 1), gMarginTop, parseInt(hours % 10), cxt)
    renderDigit(gMarginLeft + 30 * (gRadius + 1), gMarginTop, 10, cxt)
    renderDigit(gMarginLeft + 39 * (gRadius + 1), gMarginTop, parseInt(minutes / 10), cxt);
    renderDigit(gMarginLeft + 54 * (gRadius + 1), gMarginTop, parseInt(minutes % 10), cxt);
    renderDigit(gMarginLeft + 69 * (gRadius + 1), gMarginTop, 10, cxt);
    renderDigit(gMarginLeft + 78 * (gRadius + 1), gMarginTop, parseInt(seconds / 10), cxt);
    renderDigit(gMarginLeft + 93 * (gRadius + 1), gMarginTop, parseInt(seconds % 10), cxt);

    for (var i = 0 ; i < gBalls.length ; i++) {
        cxt.fillStyle = gBalls[i].color;

        cxt.beginPath();
        cxt.arc(gBalls[i].x, gBalls[i].y, gRadius, 0, 2 * Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }
}

//绘制数字
function renderDigit(x, y, num, cxt) {

    cxt.fillStyle = "rgb(0,102,153)";

    for (var i = 0 ; i < digit[num].length ; i++)
        for (var j = 0 ; j < digit[num][i].length ; j++)
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (gRadius + 1) + (gRadius + 1), y + i * 2 * (gRadius + 1) + (gRadius + 1), gRadius, 0, 2 * Math.PI)
                cxt.closePath()

                cxt.fill()
            }
}

