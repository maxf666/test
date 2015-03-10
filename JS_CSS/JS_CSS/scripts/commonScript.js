//向window.onload中追加方法
function addLoadEvent(func) {
    var oldEvent = window.onload;
    if (typeof oldEvent != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldEvent();
            func();
        }
    }
}