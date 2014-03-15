/*
  jQuery grapher
	(c) 2014 Jake Christensen - jakec43@gmail.com
	license: MIT
	adapted from http://www.javascripter.net/faq/plotafunctiongraph.htm
*/


(function($){
	function Grapher(options, canvas)
	{
		var c = $(canvas);
		var parent = c.parent();
		var holder = $(document.createElement("span"));
		holder.css("width", canvas.width + "px").css("height", canvas.height + "px").css("display", c.css("display"));
		var position = c.css("position");
		if(position == "static")
			holder.css("position", "relative");
		else
			holder.css("position", position);
		holder.css("left", c.css("left"));
		holder.css("top", c.css("top"));
		holder.append(c);
		parent.append(holder);
		options = options || {};
		this.xMax = options.xMax == undefined ? 10 : options.xMax;
		this.xMin = options.xMin == undefined ? -10 : options.xMin;
		this.yMax = options.yMax == undefined ? 5 : options.yMax;
		this.yMin = options.yMin == undefined ? -5 : options.yMin;
		this.scale = options.scale == undefined ? 1 : options.scale;
		this.canvas = canvas;
		this.getX = function(x){
			return this.canvas.width * Math.abs(x - this.xMin) / (this.xMax - this.xMin);
		};
		this.getY = function(y){
			return this.canvas.height - this.canvas.height * Math.abs(y - this.yMin) / (Math.abs(this.yMax) + Math.abs(this.yMin));
		}; 
		this.drawGraph = function(func, options)
		{
			options = options || {};
			var ctx = this.canvas.getContext("2d");
			ctx.lineWidth = options.lineWidth || 1;
			ctx.strokeStyle = options.color || "black";
			ctx.beginPath();
			ctx.moveTo(this.getX(this.xMin), this.getY(func(this.xMin)));
			var step = (this.xMax - this.xMin) / this.canvas.width / this.scale;
			var i = this.xMin + step;
			while(i <= this.xMax)
			{
				ctx.lineTo(this.getX(i), this.getY(func(i)));
				i += step;
			}
			if(i != this.xMax)
			{
				ctx.lineTo(this.canvas.width, this.getY(func(this.xMax)));
			}
			ctx.stroke();
			return this;
		}
		this.destroy = function()
		{
			canvas.data("grapher", undefined);
			return this;
		}
		this.plot = function(elem, x, y){
			elem = $(elem);
			elem.css("position", "absolute");
			elem.css("left", this.getX(x) + "px");
			elem.css("top", this.getY(y) + "px");
			$(this.canvas).parent().append(elem);
		};
		var ctx = canvas.getContext("2d");
		ctx.lineWidth = options.axesWidth || 1;
		ctx.strokeStyle = options.axesColor || "black";
		ctx.beginPath();
		ctx.moveTo(0, this.getY(0)); ctx.lineTo(canvas.width, this.getY(0));
		ctx.moveTo(this.getX(0), 0); ctx.lineTo(this.getX(0), canvas.height);
		ctx.stroke();
	}

	$.fn.grapher = function(options)
	{
		if(this.data("grapher") == undefined)
		{
			this.data("grapher", new Grapher(options, this[0]));
		}	
		return this.data("grapher");
	}

	$.fn.drawGraph = function(func, options)
	{
		if(this.data("grapher") == undefined)
		{
			this.data("grapher", new Grapher(null, this[0]));
		}
		return this.data("grapher").drawGraph(func, options);
	}

	$.fn.drawPoint = function(x, y, radius, options)
	{
		if(this.data("grapher") == undefined)
		{
			this.data("grapher", new Grapher(null, this[0]));
		}
		return this.data("grapher").drawPoint(x, y, radius, options);
	}

	$.fn.destroyGrapher()
	{
		var grapher = this.data("grapher");
		this.data("grapher", undefined);
		return grapher;
	}

})(jQuery);

