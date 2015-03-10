var tangram = [
{ p: [{ x: 0, y: 0 }, { x: 400, y: 0 }, { x: 200, y: 200 }], color: "#4cff00" },
{ p: [{ x: 0, y: 0 }, { x: 200, y: 200 }, { x: 0, y: 400 }], color: "#00ffff" },
{ p: [{ x: 0, y: 400 }, { x: 100, y: 300 }, { x: 200, y: 400 }], color: "pink" },
{ p: [{ x: 100, y: 300 }, { x: 200, y: 400 }, { x: 300, y: 300 }, { x: 200, y: 200 }], color: "#b200ff" },
{ p: [{ x: 200, y: 200 }, { x: 300, y: 100 }, { x: 300, y: 300 }], color: "yellow" },
{ p: [{ x: 300, y: 100 }, { x: 400, y: 0 }, { x: 400, y: 200 }, { x: 300, y: 300 }], color: "red" },
{ p: [{ x: 200, y: 400 }, { x: 400, y: 200 }, { x: 400, y: 400 }], color: "#ff6a00" }
];

//获得初始化数据
function getBasicData() {
    var canvas = document.getElementById("canvas");
    canvas.width = 400;
    canvas.height = 400;
    var context = canvas.getContext("2d");
    for (var i = 0; i < tangram.length; i++) {
        draw(tangram[i], context);
    }

}

//画颜色块
function draw(obj, context) {
    context.beginPath();
    context.moveTo((obj.p)[0].x, (obj.p)[0].y);
    for (var i = 1; i < obj.p.length; i++) {
        context.lineTo((obj.p)[i].x, (obj.p)[i].y);
    }
    context.fillStyle = obj.color;
    context.closePath();
    context.fill();
}
addLoadEvent(getBasicData);