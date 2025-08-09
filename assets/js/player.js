(function(window) {
	//对象playerczk
	function Player($audio) {
		//这里的init实际上是一种构造方法，返回init对象 ，但是在playerczk构造函数里，相当于player对象
		return new Player.prototype.init($audio);
	}

	Player.prototype = {
		constructor:Player,
		musiclist:[],
		init:function($audio) {
			this.$audio = $audio;
			this.audio = $audio.get(0);
		},
		currentIndex:-1,//当前播放音乐的索引 -1表示未播放过音乐
		playMusic:function(index, ele,callback) {
			//判断是否是同一首音乐
			if(this.currentIndex == index){
				if(this.audio.paused){
					this.audio.play();
				}else{
					this.audio.pause();
				}
			}else{
				this.$audio.attr("src",ele.link_url);
				this.audio.play();
				this.currentIndex = index;
			}
			callback(this.currentIndex);
			// console.log("play+"+this.audio.currentTime);
		},
		//下一首函数
		nextIndex:function(modeIndex) {
            var index;
            // modeIndex 1: 列表循环
            // modeIndex 2: 列表顺序播放
            // modeIndex 3: 随机播放
            // modeIndex 4: 单曲循环
			if (modeIndex === 3) {
                index = Math.floor(Math.random() * this.musiclist.length); // 随机生成一个索引
            } else {
                index = this.currentIndex + 1;
                if (index > this.musiclist.length - 1) {
                    index = 0; // 列表循环回到第一首
                }
            }
            return index;
        },

		//根据索引删除对应的数据
		changeMusic:function(index) {
			this.musiclist.splice(index,1);

			//判读当前删除的音乐是否在正在播放音乐的前面
			if(index<this.currentIndex){
				this.currentIndex-=1;
			}
		},
		//更新进度条
		muiscTimeUpdate:function(callback) {
			var $this =this;
			this.$audio.on("timeupdate",function() {
				var duration = $this.audio.duration; //返回音乐时长
				var currentTime = $this.audio.currentTime;//返回音乐正在播放的实践
				// console.log("currentTime+"+currentTime);
				var time = $this.formatDate(currentTime,duration);
				callback(currentTime,duration,time);
			});
		},
		//根据百分比确定当前播放的时间
		musicSeekTo:function(value) {
			if(isNaN(value)||typeof(value) == "undefined"||this.audio.paused){

				return ;
			}
			this.audio.currentTime = this.audio.duration*value;
			// console.log("musicSeekTo+"+this.audio.currentTime);
		},
		//设置声音大小
		musicVoiceSeekTo:function(value) {
			if(isNaN(value)){
				return ;
			}
			//0 - 1
			if(value>=0&&value<=1){
				this.audio.volume = value;
			}
		},
		//格式化时间函数 用于进度条
		formatDate:function (currentTime,duration) {
			var min = parseInt(duration/60);
			var sec = parseInt(duration%60);

			if(min<10){
				min = "0"+min;
			}
			if(sec<10){
				sec = "0"+sec;
			}

			var startmin = parseInt(currentTime/60);
			var startsec = parseInt(currentTime%60);

			if(startmin<10){
				startmin = "0"+startmin;
			}
			if(startsec<10){
				startsec = "0"+startsec;
			}

			return startmin+":"+startsec +" / " +min+":"+sec;
		},
		
	}
	//让init的原型对象指向play的原型对象 没有这句代码 通过init创建的player对象指向的是init的原型对象
	Player.prototype.init.prototype = Player.prototype;
	window.Player = Player;
})(window);