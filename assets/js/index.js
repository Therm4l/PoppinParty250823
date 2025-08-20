$(function (argument) {
	//自定义滚动条初始化
	// $(".body_list").mCustomScrollbar();
	

	var $audio = $("audio");
	var player = new Player($audio);

	//加载歌曲列表
	getMusicList();
	function getMusicList() {
		$.ajax({
			url:"assets/source/musiclist.json",
			dateType: "json",
			success:function (data) {
				player.musiclist = data;
				var musiclist = $(".body_list ul");
				//遍历获取的数据
				$.each(data,function(index,ele) {
					var music = createMusic(index,ele);
					
					musiclist.append(music);
				});

                // --- 新增：在这里调用滚动检查函数 ---
                if(window.checkAndApplyScrolling) {
                    window.checkAndApplyScrolling();
                }
                // --- 新增结束 ---

				initMusicInfo(data[0]);
				initMusicLyric(data[0]);
			},
			error:function(error) {
				console.log(error);
			}
		});
	}


	//初始化歌曲信息
	function initMusicInfo(music) {
		//获取对应的元素
		var $musicImg = $(".song_info_pic>img");
		var $musicName = $(".song_info_name>a");
		var $musicSinger = $(".song_info_singer>a");
		var $musicAlbum = $(".song_info_album>a");
		var $musicProName = $(".music_progress_name");
		var $musicProTime = $(".music_progress_time");
		var $musicBg =$(".bg_color");

		//给对应的元素赋值
		$musicImg.attr("src",music.cover);
		$musicImg.width(180);
		$musicImg.height(180);
		$musicName.text(music.name);
		$musicSinger.text(music.singer);
		$musicAlbum.text(music.album);
		$musicProName.text(music.name+" / " +music.singer);
		$musicProTime.text("00:00 / " +music.time);
		$musicBg.css("background","url('"+music.cover+"')");
	}
	//初始化歌词信息
	var lyric;
	function initMusicLyric(music) {
		lyric = new Lyric(music.link_lrc);
		var $song_lyric = $(".song_lyric");
		//清空上一首音乐的li
		$song_lyric.html("");
		lyric.loadLyric(function() {
			$.each(lyric.lyrics,function(index,ele) {
				var $item = $("<li>"+ele+"</li>")
				$song_lyric.append($item);
			})
		});
	}
	//初始化进度条
	var voiceProgress;
	var progress;
	initProgress();
	function initProgress() {
		//获取音乐进度条信息，创建Progress对象
		var $voiceBottom = $(".music_voice_bottom");
		var $voiceLine = $(".music_voice_line");
		var $voiceDot = $(".music_voice_dot");
		voiceProgress = Progress($voiceBottom,$voiceLine, $voiceDot);

		voiceProgress.progressClick(function(value) {
			player.musicVoiceSeekTo(value);
		});
		voiceProgress.$progressDot.mousedown(function(){
			voiceProgress.isMove = true;
		
			const dotWidth = voiceProgress.$progressDot.width();
			const lineWidth = voiceProgress.$progressBottom.width();
			const lineOffset = voiceProgress.$progressBottom.offset().left;
		
			function moveHandler(ev) {
				let left = ev.pageX - lineOffset;
		
				if(left < 0) left = 0;
				if(left > lineWidth - dotWidth) left = lineWidth - dotWidth;
		
				voiceProgress.$progressLine.css("width", left + "px");
				voiceProgress.$progressDot.css("left", left + "px");
		
				const value = left / (lineWidth - dotWidth);
		
				// 实时更新音量
				player.musicVoiceSeekTo(value);
			}
		
			function upHandler() {
				voiceProgress.isMove = false;
				$(document).off("mousemove", moveHandler);
				$(document).off("mouseup", upHandler);
			}
		
			$(document).on("mousemove", moveHandler);
			$(document).on("mouseup", upHandler);
		});

		//获取歌曲进度条信息，创建Progress对象
		var $progressBottom = $(".music_progress_bottom");
		var $progressLine = $(".music_progress_line");
		var $progressDot = $(".music_progress_dot");
		progress = Progress($progressBottom,$progressLine, $progressDot);
		progress.currentIndex = -1;
		progress.progressClick(function(value) {
			// if(player.currentIndex==-1)return;
			player.musicSeekTo(value);
			lyric.currentIndex(player.audio.duration*value);
		});
		progress.progressMove(function(value) {
			player.musicSeekTo(value);
			lyric.currentIndex(player.audio.duration*value);
		});
	}
	//初始化事件
	initEvent();
	function initEvent() {
		//监听歌曲的移入移出事件 因为歌曲是后来添加的 必须委托
		$(".body_list").on("mouseenter",".list_music",function() {
			// 展开子菜单
			$(this).find(".list_menu").stop().show();
		});
		$(".body_list").on("mouseleave",".list_music",function() {
			// 隐藏子菜单
			$(this).find(".list_menu").stop().hide();
		});
		//监听底部播放模式按钮
		var modeIndex = 1;
		$(".music_mode1").click(function() {
			
			$(this).removeClass("music_mode"+modeIndex);
			modeIndex++;
			if(modeIndex>4){
				modeIndex=1;
			}
			$(this).addClass("music_mode"+modeIndex);
		});
		//监听歌曲上的播放按钮点击事件
		var $mussicplay = $(".music_play");
		$(".body_list").on("dblclick",".list_music",function() {
			var list_music = $(this);
			var playButton = list_music.find(".list_menu_play");

			//切换自己的播放图标
			playButton.toggleClass("list_menu_play2");
			//其他播放图标复原
			list_music.siblings().find(".list_menu_play").removeClass("list_menu_play2");
			//切换底部播放图标
			if(playButton.hasClass("list_menu_play2")){
				//播放
				$mussicplay.addClass("music_play2");
				//文字高亮
				list_music.find("div").css("color", "gray");
				list_music.siblings().find("div").css("color","black");
			}
			else{
				//不播放
				$mussicplay.removeClass("music_play2");
				//文字不高亮
				list_music.find("div").css("color","black");
			}

			//切换序号数字的状态
			list_music.find(".list_number").toggleClass("list_number2");
			list_music.siblings().find(".list_number").removeClass("list_number2");

			//播放音乐
			player.playMusic(list_music[0].index,list_music[0].ele,function(currentIndex) {
				progress.currentIndex = currentIndex;
			});

			//切换歌曲信息
			initMusicInfo(list_music[0].ele);

			//切换歌词信息
			initMusicLyric(list_music[0].ele);
			
		});

		//监听底部播放按钮
		$mussicplay.click(function() {
			//判断有没有播放过音乐
			if(player.currentIndex==-1){
				//自动触发第一首音乐的点击事件
				$(".list_music").eq(0).find(".list_menu_play").trigger("dblclick");
			}else{
				$(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("dblclick");
			}
		})
		//监听底部播放上一首按钮
		$(".music_pre").click(function() {
			// alert(player.currentIndex-1); eq为负数的话会从后面数
			$(".list_music").eq(player.currentIndex-1).find(".list_menu_play").trigger("dblclick");
		})
		//监听底部播放下一首按钮 需要特殊处理
		$(".music_next").click(function() {
			// $(".list_music").eq(player.currentIndex+1).find(".list_menu_play").trigger("click");
			var nextIndex = player.nextIndex(modeIndex);
			$(".list_music").eq(nextIndex).find(".list_menu_play").trigger("dblclick");
		})
		

		//监听播放的进度
		var LyricIndex2 = -1;
		player.muiscTimeUpdate(function(currentTime,duration,time) {
			//同步时间
			$(".music_progress_time").text(time);
			//同步进度条
			var value = currentTime/duration *100;
			

			progress.setProgress(value);
			
			if(value<=1){
				$(".song_lyric").css({
					marginTop:0
				});
			}

			//实现歌词同步
			var LyricIndex = lyric.currentIndex(currentTime);
			
			$(".song_lyric>li").eq(LyricIndex).addClass("cur");
			$(".song_lyric>li").eq(LyricIndex).siblings().removeClass("cur");

			// if(LyricIndex<=2) return;
			
			if(LyricIndex2!=LyricIndex){
				var lyricHeight=0;
				for(var i = 0;i<=LyricIndex-3;i++){
					lyricHeight-=$(".song_lyric>li").eq(i).height();
				}
				LyricIndex2=LyricIndex;
			}
			
			$(".song_lyric").css({
				// marginTop:(-LyricIndex+2)*30
				marginTop:lyricHeight
			});

			//一首歌播放完后 播放下一首
			if (value >= 100) {
                if (modeIndex === 4) { // 单曲循环
                    player.audio.currentTime = 0;
                    player.audio.play();
					LyricIndex = -1;
                } else if (modeIndex === 2 && player.currentIndex === player.musiclist.length - 1) { // 列表顺序播放，且是最后一首
                    player.audio.pause();
                } else { // 列表循环或随机播放
                    var nextIndex = player.nextIndex(modeIndex);
                    $(".list_music").eq(nextIndex).find(".list_menu_play").trigger("dblclick");
                }
            }
		})


		//监听声音按钮的点击
		$(".music_voice_icon").click(function(argument) {
			// 切换图标
			$(this).toggleClass("music_voice_icon2");
			//声音切换
			if($(this).hasClass("music_voice_icon2")){
				//静音
				player.musicVoiceSeekTo(0);
			}
			else{
				player.musicVoiceSeekTo(1);
			}
		})

		
	}
	//创建一个音乐的函数
	function createMusic(index, ele) {
        // --- MODIFIED: 使用新的HTML结构来支持滚动效果 ---
        
        // 1. 为歌曲名创建带滚动容器的HTML
        var songNameHtml = 
            "<div class='marquee-container'>" +
                "<span class='marquee-text'>" + ele.name + "</span>" +
            "</div>";

        // 2. 为歌手名创建带滚动容器的HTML
        var singerNameHtml = 
            "<div class='marquee-container'>" +
                "<span class='marquee-text'>" + ele.singer + "</span>" +
            "</div>";

		var li =$(
			"			<li class=\"list_music\">"+
			"				<div class=\"list_check\"><i></i></div>"+
			"				<div class=\"list_number\">"+(index+1)+"</div>"+
			"				<div class=\"list_name\">"+ songNameHtml + // 在这里使用新的HTML
			"				</div>"+
			"				<div class=\"list_singer\">"+ singerNameHtml + // 在这里使用新的HTML
			"               </div>"+
			"				<div class=\"list_time\">"+ele.time+
			"					<div class=\"list_menu\">"+
			"						<a href=\"javascript:;\" title=\"播放\" class='list_menu_play'></a>"+
			"					</div>"+
			"				</div>"+
			"			</li>");
        // --- 修改结束 ---

		li.get(0).index = index;
		li.get(0).ele = ele;
		return li;
	}

})