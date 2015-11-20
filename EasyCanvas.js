// 立即执行的匿名函数
// 开头的分号，意在防止与其他js文件合并压缩时，由于上一个文件没有用分号结尾而产生问题
;(function (window) {

	window.EasyCanvas = EasyCanvas = function (selector, root_id, tag) {
		return new CanvasObj(selector, root_id, tag);
	};
	
	var CanvasObj = function (canvasId) {
	    this.canvas = document.getElementById(canvasId);
	    this.ctx = this.canvas.getContext("2d");
	    this.defaults = {
			color: "#000",
			closed: false,
			fillColor: "transparent",
			filled: false,
			lineCap: "butt",	//round, square
			lineWidth: 1,
			points: [[0, 0], [0, 0]]
		};
	};

	// Utility method to extend defaults with user options
	function extendDefaults(source, settings) {
		var property;
		for (property in settings) {
			if (settings.hasOwnProperty(property)) {
				source[property] = settings[property];
			}
		}
		return source;
	}

	CanvasObj.prototype = {
		drawLine: function (settings) {
			var opt = extendDefaults(this.defaults , settings);
			console.log(opt);
			this.ctx.strokeStyle = opt.color;
			this.ctx.lineWidth = opt.lineWidth;
			this.ctx.lineCap = opt.lineCap;
			this.ctx.fillStyle = opt.fillColor;
			this.ctx.moveTo(opt.points[0][0], opt.points[0][1]);
			for (var i = 1; i < opt.points.length; i++) {
				this.ctx.lineTo(opt.points[i][0], opt.points[i][1]);
			};
			if (opt.closed) {
				console.log("close");
				this.ctx.lineTo(opt.points[0][0], opt.points[0][1]);
			};
			if (opt.filled) {
				this.ctx.fill();
			};			
			this.ctx.stroke();
			this.ctx.closePath();
			return this;
		},

		drawRect: function (argument) {
			// body...
		}
	}
}(window));