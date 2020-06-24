window.onload = function _begin(){
	window.onresize = _begin;
	var _canvas = document.getElementById("canvas");
	var _turtleCtx = canvas.getContext("2d");
	var _turtle = document.getElementById("turtle");
	var _console = document.getElementById("console");
	var _input = document.getElementById("command_input");
	
	function _rad(deg){return (deg*Math.PI/180)};
	function _deg(rad){return (rad*180/Math.PI)};
	
	var pentouch;
	function penDown(){pentouch=true};
	function penUp(){pentouch=false};
	
	var turtleBounds = {
		"x" : _turtle.clientWidth,
		"y" : _turtle.clientHeight
	};
	var bounds = {
		"x" : _canvas.clientWidth,
		"y" : _canvas.clientHeight
	};
	var center = {
		"x" : bounds.x/2,
		"y" : bounds.y/2
	};
	var current = {
		"x" : 0,
		"y" : 0
	}
	var updateCurrentPos = function(posX, posY){
		current.x = posX;
		current.y = posY;
	}

	var _changeTurtlePos = function(changeByX, changeByY){
		prevPosY = parseInt(turtle.style.top)
		prevPosX = parseInt(turtle.style.left)
		
		turtle.style.top = (prevPosY+changeByY)+"px";
		turtle.style.left = (prevPosX+changeByX)+"px";
		
		currentPosX = parseInt(turtle.style.left);
		currentPosY = parseInt(turtle.style.top);
		if (currentPosX > bounds.x-turtleBounds.x || currentPosY > bounds.y-turtleBounds.y || currentPosY < 0 || currentPosX < 0){
			turtle.style.visibility = "hidden"
		} else {
			turtle.style.visibility = "visible"
		}
	}
	
	var _changeLineColor = function(r, g, b){
		_turtleCtx.strokeStyle = "rgb("+r+","+g+","+b+")"
	}
	
	var _changeLineSize = function(width){
		_turtleCtx.lineWidth = width;
	}
	
	var _clearScreen = function(){
		init();
	}
	
	var _lineTo = function(x1, y1, hyp, inc, dir){
		if (inc < 360){
			inc = inc;
		} else {
			inc %= 360;
		}
		var _quotient = parseInt(inc/90);
		var _angle = _rad(inc%90);
		var addX, addY;
		var x2, y2;
		if (dir == 0){
			if (_quotient == 0){
					addX = Math.ceil(Math.sin(_angle)*hyp)
					addY = Math.ceil(Math.cos(_angle)*hyp)
					
					x2 = x1+addX;
					y2 = y1-addY;
					_changeTurtlePos(addX, -addY);
			} else if (_quotient == 1){
				addX = Math.ceil(Math.cos(_angle)*hyp)
				addY = Math.ceil(Math.sin(_angle)*hyp)
					
				if (_angle == 0){
					x2 = x1+hyp;
					y2 = y1+0;
				} else {
					x2 = x1+addX;
					y2 = y1+addY;
				}
				_changeTurtlePos(addX, addY);
			} else if (_quotient == 2){
					addX = Math.ceil(Math.sin(_angle)*hyp)
					addY = Math.ceil(Math.cos(_angle)*hyp)
					
					x2 = x1-addX;
					y2 = y1+addY; 
					_changeTurtlePos(-addX, addY);
			} else if (_quotient == 3){
				addX = Math.ceil(Math.cos(_angle)*hyp)
				addY = Math.ceil(Math.sin(_angle)*hyp)
					
				if (_angle == 0){
					x2 = x1-hyp;
					y2 = y1-0;
				} else {
					x2 = x1-addX;
					y2 = y1-addY;
				}
				_changeTurtlePos(-addX, -addY);
			}else{
				return
			}
		} else if (dir == -1){
			if (_quotient == 0){
					addX = Math.ceil(Math.sin(_angle)*hyp)
					addY = Math.ceil(Math.cos(_angle)*hyp)
					
					x2 = x1-addX;
					y2 = y1+addY;
					_changeTurtlePos(-addX, addY);
			} else if (_quotient == 1){
				addX = Math.ceil(Math.cos(_angle)*hyp)
				addY = Math.ceil(Math.sin(_angle)*hyp)
				
				if (_angle == 0){
					x2 = x1-hyp;
					y2 = y1-0;
				} else {
					x2 = x1-addX;
					y2 = y1-addY;
				}
				_changeTurtlePos(-addX, -addY);
			} else if (_quotient == 2){
					addX = Math.ceil(Math.sin(_angle)*hyp)
					addY = Math.ceil(Math.cos(_angle)*hyp)
				
					x2 = x1+addX;
					y2 = y1-addY; 
					_changeTurtlePos(addX, -addY);
			} else if (_quotient == 3){
				addX = Math.ceil(Math.cos(_angle)*hyp)
				addY = Math.ceil(Math.sin(_angle)*hyp)
				
				if (_angle == 0){
					x2 = x1+hyp;
					y2 = y1+0;
				} else {
					x2 = x1+addX;
					y2 = y1+addY;
				}
				_changeTurtlePos(addX, addY);
			}else{
				return
			}
		} else {
			return
		}
		updateCurrentPos(x2, y2);
		if (pentouch){
			_turtleCtx.lineTo(x2, y2);
		} else {
			_turtleCtx.moveTo(x2, y2)
		}
	};
	
	
	var _rightTurn = function(currentAngle){
		var prevAngle = parseInt(_canvas.getAttribute("data-inclination-value"))
		var angleNat = _canvas.getAttribute("data-inclination-nature");
		var _angle;
		switch(angleNat) {
			case "pos" : _angle = prevAngle+currentAngle;break;
			case "neg" : if (currentAngle => prevAngle) _canvas.setAttribute("data-inclination-nature", "pos")
							_angle = Math.abs(prevAngle-currentAngle);
		}
		_canvas.setAttribute("data-inclination-value", _angle);
		_turtle.style.transform = "rotate("+_angle+"deg)";
	}
	
	var _leftTurn = function(currentAngle){
		var prevAngle = parseInt(_canvas.getAttribute("data-inclination-value"))
		var angleNat = _canvas.getAttribute("data-inclination-nature");
		var _angle;
		switch(angleNat) {
			case "neg" : _angle = prevAngle+currentAngle;break;
			case "pos" : if (currentAngle => prevAngle) _canvas.setAttribute("data-inclination-nature", "neg")
							_angle = Math.abs(prevAngle-currentAngle);
		}
		_canvas.setAttribute("data-inclination-value", _angle);
		_turtle.style.transform = "rotate(-"+_angle+"deg)";
	}
	
	var _repeatProcessor = function(str){
		var _cmdString = str.toUpperCase();
		var repeatLoopFr = parseInt(_cmdString.split(" ")[1]);
		var cmdToRepeat = _cmdString.slice(_cmdString.indexOf("[")+1, _cmdString.lastIndexOf("]"));
		var cmdLineSplit = cmdToRepeat.split(" ");
		var cmdCommandArray = [];
		var cmdValueArray = [];
		for (var i=0; i < cmdLineSplit.length; i+=2) {
			cmdCommandArray.push(cmdLineSplit[i]);
			cmdValueArray.push(cmdLineSplit[i+1]);
		}
		var singleCommand = "";
		var singleCommandArray = [];
		for (var i = 0; i < cmdCommandArray.length; i++){
			if (cmdCommandArray[i].search("REPEAT") > -1){
				var nestedRepeatStart = cmdToRepeat.indexOf("REPEAT");
				var nestedRepeatString = cmdToRepeat.slice(nestedRepeatStart, cmdToRepeat.indexOf("]")+1)
				singleCommandArray.push(nestedRepeatString);
			} else {
				var commandsList = ["FD", "BK", "RT", "LT", "PENUP", "PENDOWN", "PENCOLOR", "PENERASE", "PENNORMAL", "CLEARSCREEN"]
				var commandName = cmdCommandArray[i].search(commandsList.join("|"));
				var commandValue = parseInt(cmdValueArray[i].charAt(cmdValueArray[i].length-1))
				if (commandName == 0){
					if (!isNaN(commandValue)){
						singleCommand = cmdCommandArray[i]+" "+cmdValueArray[i];
						singleCommandArray.push(singleCommand);
					}
				}
			}
		}
		var obj = {
			"loop" : repeatLoopFr,
			"cmdArray" : singleCommandArray
		}
		return obj
	}
	
	var _errMsg = "";
	var _commandListen = function(COMMAND){
		command = COMMAND.split(" ");
		var _command = {
			"name" : command[0].toUpperCase(),
			"val" : command[1],
			"incVal" : parseInt(_canvas.getAttribute("data-inclination-value")),
			"incNat" : _canvas.getAttribute("data-inclination-nature")
		}
		if (_command.incNat == "neg"){
			_command.incVal = Math.abs(_command.incVal-360);
		}
		switch(_command.name){
			case "FD" : _turtleCtx.beginPath();
						_turtleCtx.moveTo(current.x, current.y);
						_lineTo(current.x, current.y, eval(_command.val), _command.incVal, 0);
						_turtleCtx.stroke();
						_turtleCtx.closePath();
						return true;
						break;
			case "BK" : _turtleCtx.beginPath();
						_turtleCtx.moveTo(current.x, current.y);
						_lineTo(current.x, current.y, eval(_command.val), _command.incVal, -1);
						_turtleCtx.stroke();
						_turtleCtx.closePath();
						return true;
						break;
			case "RT" : _rightTurn(eval(_command.val));
						return true;
						break;
			case "LT" : _leftTurn(eval(_command.val));
						return true;
						break;
			case "ST" : _turtle.style.visibility = "visible";
						return true;
						break;
			case "HT" : _turtle.style.visibility = "hidden";
						return true;
						break;
			case "PENUP" : penUp();
							return true;
							break;
			case "PENDOWN" : penDown();
							return true;
							break;
			case "PENSIZE" : _changeLineSize(_command.val);
								return true;
								break;
			case "PENCOLOR" : var colorArray = JSON.parse(_command.val);
								_changeLineColor(colorArray[0], colorArray[1], colorArray[2])
								return true;
								break;
			case "PENERASE" : _changeLineColor(255, 255, 255);
								return true;
								break;
			case "PENNORMAL" :  _changeLineColor(0, 0, 0);
								_changeLineSize(1);
								return true;
								break;
			case "CLEARSCREEN" : _turtleCtx.clearRect(0, 0, bounds.x, bounds.y)
									_clearScreen();
									return true;
									break;
			case "REPEAT" : var repeatCommandObj = _repeatProcessor(COMMAND);
							for (var i=0;i < repeatCommandObj.loop; i++){
								for (var j=0; j < repeatCommandObj.cmdArray.length; j++){
									_commandListen(repeatCommandObj.cmdArray[j]);
								}
							};
							return true;
							break;
			default : _errMsg = _command.name + " is not a valid command"
						return false;
		}
	}
			
	_input.addEventListener("keydown", function(e){
		if (e.keyCode == 13){
			var cmd = this.value.toUpperCase();
			var msgEvt = _commandListen(this.value);
			if (msgEvt){
				_console.innerHTML += "> "+cmd+"\n";
			} else {
				_console.innerHTML += "> "+_errMsg+"\n";
			}
			this.value = "";	
		} else {
			return
		}
	})
			
	function init(){
		_canvas.setAttribute("data-inclination-value", "0");
		_canvas.setAttribute("data-inclination-nature", "pos");
		_turtle.style.webkitTransform = "rotate(0deg)";
		_turtleCtx.beginPath();
		_turtleCtx.moveTo(center.x, center.y);
		updateCurrentPos(center.x, center.y);
		var turtlePosX = (bounds.x-turtleBounds.x)/2;
		var turtlePosY = (bounds.y-turtleBounds.y)/2;
		turtle.style.top = turtlePosY+"px";
		turtle.style.left = turtlePosX+"px";
		_console.value = '';
		_input.value = '';
		penDown();
	}
	init();
}
