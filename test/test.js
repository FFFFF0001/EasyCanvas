$(document).ready(function() {
    var a = new EasyCanvas("canvas");
    a.drawLine({
        color: "#f00",
        startPoint: {x: 20, y: 20},
        endPoint: {x: 50, y: 50}
    }).drawLine({
    	color: "#00f",
    	startPoint: {x: 50,	y: 50},
        endPoint: {x: 0, y: 60}
    });
console.log("====");
    var b = new EasyCanvas("canvas2");
    b.drawLine({
    	startPoint: {x: 10,	y: 50}
    });
});