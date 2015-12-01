;(function (window) {

	window.EasyCanvas = EasyCanvas = function (selector, root_id, tag) {
		return new CanvasObj(selector, root_id, tag);
	};

	var CanvasObj = function (canvasId) {
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.defaults = {
			ccw: false,
			closed: false,
			endAngle: 2 * Math.PI,
			fillColor: "transparent",
			fontColor: "#000",
			fontStroke: false,
			lineCap: "butt",
			lineJoin: "miter",
			lineMiterLimit: 100,
			lineWidth: 1,
			fillLinerGradient: false,
			fillRradialGradient: false,
			font: "14px Arial Black",
			points: [[0, 0], [0, 0]],
			shadow:[0, "#fff"],
			startAngle: 0,
			strokeColor: "#000",
			strokeLinerGradient: false,
			strokeRradialGradient: false,
			stop: [[0, "black"], [1, "white"]],
			text: null,
			textBaseline: "alphabetic",
			textAlign: "start"
		};

		/*
		*  Renew defaults with original defaults
		*/
		this._renewDefaults = function () {
			this.defaults = JSON.parse(JSON.stringify(g_defaults));
		}
	};

	var g_defaults = {
		ccw: false,
		closed: false,
		endAngle: 2 * Math.PI,
		fillColor: "transparent",
		fontColor: "#000",
		fontStroke: false,
		lineCap: "butt",
		lineJoin: "miter",
		lineMiterLimit: 100,
		lineWidth: 1,
		fillLinerGradient: false,
		fillRradialGradient: false,
		font: "14px Arial Black",
		points: [[0, 0], [0, 0]],
		shadow:[0, "#fff"],
		startAngle: 0,
		strokeColor: "#000",
		strokeLinerGradient: false,
		strokeRradialGradient: false,
		stop: [[0, "black"], [1, "white"]],
		text: null,
		textBaseline: "alphabetic",
		textAlign: "start"
	};

	/*
	*  Extend defaults with user options
	*/
	function _extendDefaults (source, settings) {
		var property;
		for (property in settings) {
			if (settings.hasOwnProperty(property)) {
				source[property] = settings[property];
			}
		}
		return source;
	}
	
	/*
	*  Deal with fillStyle for color/gridient/patten
	*/
	function _fillStyle (ctx, opt) {
		if (opt.fillLinerGradient) {
			var parameter = opt.fillLinerGradient;
			var liner_grd = ctx.createLinearGradient(parameter[0], parameter[1], parameter[2], parameter[3]);

			for (var i = 0; i < opt.stop.length; i++) {
				liner_grd.addColorStop(opt.stop[i][0], opt.stop[i][1]);
			}

			return liner_grd;

		} else if (opt.fillRradialGradient) {
			var parameter = opt.fillRradialGradient;
			var radial_grd = ctx.createRadialGradient(parameter[0], parameter[1], parameter[2], parameter[3], parameter[4], parameter[5]);

			for (var i = 0; i < opt.stop.length; i++) {
				radial_grd.addColorStop(opt.stop[i][0], opt.stop[i][1]);
			}

			return radial_grd;

		} else {
			return opt.fillColor;
		}
	}

	/*
	*  Deal with strokeStyle for color/gridient/patten
	*/
	function _strokeStyle (ctx, opt) {
		if (opt.strokeLinerGradient) {
			var parameter = opt.strokeLinerGradient;
			var liner_grd = ctx.createLinearGradient(parameter[0], parameter[1], parameter[2], parameter[3]);

			for (var i = 0; i < opt.stop.length; i++) {
				liner_grd.addColorStop(opt.stop[i][0], opt.stop[i][1]);
			}

			return liner_grd;

		} else if (opt.strokeRradialGradient) {
			var parameter = opt.strokeRradialGradient;
			var radial_grd = ctx.createRadialGradient(parameter[0], parameter[1], parameter[2], parameter[3], parameter[4], parameter[5]);

			for (var i = 0; i < opt.stop.length; i++) {
				radial_grd.addColorStop(opt.stop[i][0], opt.stop[i][1]);
			}

			return radial_grd;

		} else {
			return opt.strokeColor;
		}
	}

	/*
	*  Set basic style
	*/
	function _setOpt (ctx, opt) {
		ctx.fillStyle = _fillStyle(ctx, opt);
		ctx.strokeStyle = _strokeStyle(ctx, opt);
		ctx.lineWidth = opt.lineWidth;
		ctx.lineCap = opt.lineCap;
		ctx.lineJoin = opt.lineJoin;
		ctx.miterLimit = opt.lineMiterLimit;
		ctx.shadowBlur = opt.shadow[0];
		ctx.shadowColor = opt.shadow[1];
		ctx.beginPath();
	}

	CanvasObj.prototype = {
		/*
		*  Draw line
		*/
		drawLine: function (settings) {
			var opt = _extendDefaults(this.defaults , settings);
			
			_setOpt(this.ctx, opt);
			this.ctx.moveTo(opt.points[0][0], opt.points[0][1]);

			for (var i = 1; i < opt.points.length; i++) {
				this.ctx.lineTo(opt.points[i][0], opt.points[i][1]);
			}

			if (opt.closed) {
				this.ctx.lineTo(opt.points[0][0], opt.points[0][1]);
			}

			this.ctx.fill();
			this.ctx.stroke();
			this.ctx.closePath();

			this._renewDefaults();

			return this;
		},

		/*
		*  Draw arc
		*/
		drawArc: function (settings) {
			var opt = _extendDefaults(this.defaults, settings);
			
			_setOpt(this.ctx, opt);

			this.ctx.arc(opt.points[0], opt.points[1], opt.radius, opt.startAngle, opt.endAngle, opt.ccw);

			this.ctx.fill();
			this.ctx.stroke();
			this.ctx.closePath();

			this._renewDefaults();

			return this;
		},

		/*
		 *  Draw Quadratic
		 */
		drawQuadratic: function(settings) {
			var opt = _extendDefaults(this.defaults, settings);

			_setOpt(this.ctx, opt);
			
			this.ctx.moveTo(opt.points[0][0], opt.points[0][1]);
			this.ctx.quadraticCurveTo(opt.points[1][0], opt.points[1][1], opt.points[2][0], opt.points[2][1]);

			this.ctx.fill();
			this.ctx.stroke();
			this.ctx.closePath();

			this._renewDefaults();
			
			return this;
		},

		/*
		*  Draw rectangle
		*/
		drawRect: function (settings) {
			var opt = _extendDefaults(this.defaults , settings);

			_setOpt(this.ctx, opt);

			this.ctx.rect(opt.points[0], opt.points[1], opt.rectWidth, opt.rectHeight);

			this.ctx.fill();
			this.ctx.stroke();
			this.ctx.closePath();

			this._renewDefaults();

			return this;
		},

		/*
		*  Draw rectangle
		*/
		drawSquare: function (settings) {
			var opt = _extendDefaults(this.defaults , settings);

			_setOpt(this.ctx, opt);

			this.drawRect({
				points: [opt.points[0], opt.points[1]],
				rectWidth: opt.rectWidth,
				rectHeight: opt.rectWidth,
			});

			this._renewDefaults();

			return this;
		},
		
		/*
		*  Draw text
		*/
		drawText: function (settings) {
			this.defaults.fillColor = "#000";
			this.defaults.strokeColor = "transparent";

			var opt = _extendDefaults(this.defaults, settings);

			_setOpt(this.ctx, opt);

			this.ctx.font = opt.font;
			this.ctx.textBaseline = opt.textBaseline;
			this.ctx.textAlign = opt.textAlign;
			this.ctx.fillText(opt.text, opt.points[0], opt.points[1]);
			this.ctx.strokeText(opt.text, opt.points[0], opt.points[1]);

			this.ctx.closePath();

			this._renewDefaults();

			return this;
		},

		/*
		*  Draw layer coordinate
		*/
		coordinate: function (grid_width, coodiful, color) {
			grid_width = grid_width || 50;
			coodiful = coodiful || false;
			color = color || "#000";

			var cs_width = this.canvas.width;
			var cs_height = this.canvas.height;
			var x = cs_width / grid_width;
			var y = cs_height / grid_width;

			if (coodiful) {
				for (var i = 0; i <= x; i++) {  //绘制列
					this.drawLine({
						points: [[i * grid_width, 0], [i * grid_width, y * grid_width]]
				    }).drawText({
				    	text: i * grid_width,
				    	points: [[i * grid_width, 10]],
				    	fontColor: color
				    });
				}

				for (var i = 0; i <= y; i++) {  //绘制行
				    this.drawLine({
				        points: [[0, i * grid_width], [x * grid_width, i * grid_width]]
				    }).drawText({
				    	text: i * grid_width,
				    	points: [[0, i * grid_width]]
				    });
				}

			} else {
				for (var i = 0; i <= x; i++) {  //绘制列
					this.drawLine({
						points: [[i * grid_width, 0], [i * grid_width, y * grid_width]]
				    });
				}

				for (var i = 0; i <= y; i++) {  //绘制行
				    this.drawLine({
				        points: [[0, i * grid_width], [x * grid_width, i * grid_width]]
				    });
				}
			}

			return this;
		},

		/*
		*  Clean the whole or a part of canvas
		*/
		clean: function () {
		    if (arguments[0]) {
		    	this.ctx.clearRect(arguments[0], arguments[1], arguments[2], arguments[3]);
		    } else {
		    	this.ctx.clearRect(0, 0, this.width, this.height);
		    }

			return this;
		}
	};

}(window));
