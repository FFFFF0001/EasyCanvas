$(document).ready(function() {
/*    var a = new EasyCanvas("canvas");
    a.drawLine({
        color: "#f00",
        startPoint: {x: 20, y: 20},
        endPoint: {x: 50, y: 50}
    }).drawLine({
    	color: "#00f",
    	startPoint: {x: 50,	y: 50},
        endPoint: {x: 0, y: 60}
    });*/
// console.log("====");
    var b = new EasyCanvas("canvas2");
    b.drawArc({
    	points: [[10, 100,10],[0,1.5]],
        lineWidth: 2,
        fillColor: "rgb(255,165,0)",
        filled:true,
    });
});