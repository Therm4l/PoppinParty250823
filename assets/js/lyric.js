(function(window) {
	//对象player
	function Lyric(path) {
		return new Lyric.prototype.init(path);
	}

	Lyric.prototype = {
		constructor:Lyric,
		times:[],
		lyrics:[],
		index:0,
		init:function(path) {
			this.path = path;
		},
		//加载歌词
		loadLyric:function(callback) {
			var $this = this;
			//清空歌词 时间
			$this.times=[];
			$this.lyrics=[];
			$.ajax({
				url: $this.path,
				dateType: "text",
				success:function (data) {
					// console.log(date);
					$this.parseLyric(data);
					callback();
				},
				error:function(error) {
					console.log(error);
				}
			});
		},
		//格式化歌词
		parseLyric:function(data) {
			var $this = this;

			var array = data.split("\n");
			
			//正则表达式取出歌词和时间
			var timeReg = /\[(\d*:\d*\.\d*)\]/; //（）代表一个整体，会自动存储在res里
			//遍历取出每一行的歌词
			$.each(array,function(index,ele) {
				//处理歌词
				var  lrc = ele.split("]")[1];
				if(lrc.length <= 1) return true;//排除空字符串
				$this.lyrics.push(lrc);

				//处理时间
				var res = timeReg.exec(ele);
				if(res==null){
					return true;
				}

				var timer = res[1];// 索引0是带[]，1 是不带[]
				// console.log(timer);
				
				var res2 = timer.split(":");
				var min = parseInt(res2[0])*60;
				var sec = parseFloat(res2[1]);
				var time = Number(min+sec).toFixed(2);//toFixed(2)保留2位小数 但是返回的是字符串
				time = parseFloat(time);
				// console.log(time);
				
				$this.times.push(time);

				
			})
		},
		//根据时间找到歌词索引
		currentIndex:function(currentTime) {
			if(currentTime>=this.times[this.index]){
				this.index++;
				// this.times.shift();//删除数组最前面的一个元素
			}
			return this.index-1;
		},

		//寻找索引czk
		indexSeekTo:function(value) {
			for(var i = 0;i<this.times.length-1;i++){
				if(value<this.times[i]){
						this.index = i-1;
						return ;
				}
			}
		}
	}
	Lyric.prototype.init.prototype = Lyric.prototype;
	window.Lyric = Lyric;
})(window);