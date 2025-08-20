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

			this.$progressBottom.click(function(event) {
                if ($progress.currentIndex == -1) return;

                const dotWidth = $progress.$progressDot.width();
                const lineWidth = $(this).width();
                let left = event.pageX - $(this).offset().left;

                // 限制 left 范围
                if (left < 0) left = 0;
                if (left > lineWidth - dotWidth) left = lineWidth - dotWidth;

                $progress.$progressLine.css("width", left + "px");
                $progress.$progressDot.css("left", left + "px");

                const value = left / (lineWidth - dotWidth); // 0~1
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
				var dotWidth = $progress.$progressDot.width(); // 小圆点的宽度
				
				var value;
				//监听文档移动事件
				$(document).mousemove(function() {
					
					//获取鼠标点击的位置
					var eventLeft = event.pageX;

					var left = eventLeft-defualtLeft;
					if(left<0){
						left = 0;
					}
					else if(left>$progress.$progressBottom.width() - dotWidth){
						left = $progress.$progressBottom.width() - dotWidth;
					}
					//设置进度条位置
					$progress.$progressLine.css("width",left);
					$progress.$progressDot.css("left",left);
					//计算进度条的比例
					value = left/($progress.$progressBottom.width() - dotWidth);
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
			const dotWidth = this.$progressDot.width();
            const lineWidth = this.$progressBottom.width();
			value = Math.max(0, Math.min(100, value));
			const left = (lineWidth - dotWidth) * (value / 100);

            this.$progressLine.css("width", left + "px");
            this.$progressDot.css("left", left + "px");
		},
	}
	Progress.prototype.init.prototype = Progress.prototype;
	window.Progress = Progress;
})(window);