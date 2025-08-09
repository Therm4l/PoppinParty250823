(function(window) {
	
	function Progress($progressBottom,$progressLine, $progressDot) {
		
		return new Progress.prototype.init($progressBottom,$progressLine, $progressDot);
	}

	Progress.prototype = {
		constructor:Progress,
		isMove:false,
		currentIndex:1,
		init:function($progressBottom,$progressLine, $progressDot) {
			this.$progressBottom=$progressBottom; 
			this.$progressLine = $progressLine;
			this.$progressDot =  $progressDot;
		},
		progressClick:function(callback) {

			var $progress = this;//this 指 progress对象

			//监听背景的点击
			this.$progressBottom.click(function(event) {
				if($progress.currentIndex==-1)return ;
				// 获取背景距离窗口默认的位置
				var defualtLeft = $(this).offset().left;
				//获取鼠标点击的位置
				var eventLeft = event.pageX;
				//设置前景宽度
				$progress.$progressLine.css("width",eventLeft-defualtLeft);
				$progress.$progressDot.css("left",eventLeft-defualtLeft);

				//计算进度条的比例
				var value = (eventLeft-defualtLeft) / $(this).width();
				callback(value);
			});
		},
		//进度条移动
		progressMove:function (callback) {

			var $progress = this;//this 指 progress对象
			//监听鼠标按下事件
			this.$progressDot.mousedown(function(){
				if($progress.currentIndex==-1)return ;
				$progress.isMove = true;
				var defualtLeft = $progress.$progressBottom.offset().left;// 获取背景距离窗口默认的位置
				
				var value;
				//监听文档移动事件
				$(document).mousemove(function() {
					
					//获取鼠标点击的位置
					var eventLeft = event.pageX;

					var left = eventLeft-defualtLeft;
					if(left<0){
						left = 0;
					}
					else if(left>$progress.$progressBottom.width()){
						left = $progress.$progressBottom.width();
					}
					//设置进度条位置
					$progress.$progressLine.css("width",left);
					$progress.$progressDot.css("left",left);
					//计算进度条的比例
					value = left/$progress.$progressBottom.width();
				});

				//监听鼠标抬起事件
				$(document).mouseup(function() {
					
					callback(value);
					$progress.isMove = false;
					$(document).off("mousemove mouseup");
				});
			});
		},
		//设置进度条
		setProgress:function (value){
			if(this.isMove)return;
			if(value>0&&value<100){
				this.$progressLine.css({
					width:value+"%"
				});
				this.$progressDot.css({
					left:value+"%"
				});
			}
		},
	}
	Progress.prototype.init.prototype = Progress.prototype;
	window.Progress = Progress;
})(window);