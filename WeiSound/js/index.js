//右布局
var RIGHTCONTENT = "rightcontent";
//左布局
var LEFTCONTENT = "liftcontent";
/**
 *左边显示id 
 */
var LiftId = 0;
/***
 * 左边音频显示id
 */
var VideoLiftId = 0;
/***
 * 右边显示id
 */
var RightId = 0;
/***
 * 右边音频显示id
 */
var VideoRightId = 0;
/**
 * 触摸开始坐标
 */
var startDistance = 0;
/**
 *触摸结束坐标 
 */
var endDistance = 0;
/**
 *记录开始秒数 
 */
var secStart = 0;
/***
 * 记录终止秒数 
 */
var secEnd = 0;
/**
 * 是否取消录音
 */
var isSound = false;
/**
 * 播放时间 
 */
var c_Sec = 0;
/**
 *计时器 
 */
var t_Time;

(function() {

})();
$("#img_play").click(function() {

	//var imgmark=$("#img_play").attr("src");
	var imgmark = $("#input_box_search").css("display")
	if(imgmark == "none") {
		$("#img_play").attr("src", "img/img_sound.png");
		$("#input_box_search").css("display", "block");
		$("#span_text").css("display", "none");
	} else {
		$("#img_play").attr("src", "img/img_play.png");
		$("#input_box_search").css("display", "none");
		$("#span_text").css("display", "block");
	}

})
/**
 *对话框的显示 
 * @todo 处理点击是有播放录音
 */
$("#span_text").bind({
	touchstart: function() {
		if(isSound) {
			isSound = false;
		}
		$(".play_video_right").attr("src","img/video_img.png");
		handlerShowVideoView(false);
		pingbi(event);
		startSec();
		starttouch(event);
		$(".dialog_body").show()
	},
	touchmove: function(e) {
		endtouch(event);

	},
	touchend: function(e) {
		endSec();
		$(".dialog_body").hide()
		var a = handlerSec();
		console.log("a===" + a);
		if(a == 0) {
			return;
		} else if(!isSound) {
			bindRightVideoViewData(a);
		} else {
			return;
		}
	}

})
/**
 *触摸开始位置 
 * @param {Object} e
 */
function starttouch(e) {
	w = e || window.event;
	if(e == null) {
		return;
	}
	startDistance = e.changedTouches[0].pageY
	console.log("开始坐标：" + startDistance)

}
/***
 *触摸结束位置 
 * @param {Object} e
 */
function endtouch(e) {
	w = e || window.event;
	if(e == null) {
		return;
	}
	endDistance = e.changedTouches[0].pageY
	console.log("结束坐标" + endDistance)
	var distacne = endDistance - startDistance;

	console.log("距离差" + mathabs(distacne))
	if(mathabs(distacne) > 100) {
		isSound = true;
		handlerShowVideoView(true)
	} else {
		isSound = false;
		handlerShowVideoView(false)
	}
}
/**
 * 开始记录秒数
 */
function startSec() {
	var myDate = new Date();
	secStart = myDate.getTime();
}
/**
 *结束秒数 
 */
function endSec() {
	var myDate = new Date();
	secEnd = myDate.getTime();
}
/**
 * 处理秒数
 */
function handlerSec() {
	var sec = secEnd - secStart;
	var s = sec / 1000;
	s = s.toFixed(0);
	console.log(s + "秒数")
	if(s <= 0) {
		return 0;
	} else {
		return s;
	}

}
/**
 * 处理显示录音界面
 * @param {Object} isShow 是否显示取消
 */
function handlerShowVideoView(isShow) {
	if(isShow != null && isShow) {
		$("#dialog_img").attr("src", "img/cancle.png");
		$("#dialog_tv").text("松开手指，取消发送");
		$("#dialog_tv").css("background", "red")
	} else {
		$("#dialog_img").attr("src", "img/sound_recording.png");
		$("#dialog_tv").text("手指上滑，取消发送");
		$("#dialog_tv").css("background", "transparent")
	}

}
/*
 *屏蔽文本事件
 */
function pingbi(e) {
	var e = window.event;
	e.preventDefault();
}
/**
 * 绝对值处理
 * @param {Object} s 值
 */
function mathabs(s) {
	if(s > 0) {
		return s;
	} else if(s == 0) {
		return 0;
	} else if(s < 0) {
		return s * -1;
	}
}

$("#id_send").click(function() {
	var val = $("#input_box_search").val();
	if(isEmpty(val)) {
		return;
	}
	showContent(RIGHTCONTENT, val);

})
/**
 * 
 * @param {Object} isShow 显示左右
 * @param {Object} content 内容
 */
function showContent(isShow, content) {

	if(isShow == LEFTCONTENT) {
		rightOrlift(false);
		bindLiftViewData(content);

	} else if(isShow == RIGHTCONTENT) {
		rightOrlift(true);
		bindRightViewData(content)
		rightOrlift(false);
		bindLiftViewData(content);
	}

}
/**
 * 
 * @param {Object} str 内容
 */
function isEmpty(str) {
	if(str == null || typeof(str) == "undefined" || str == "") {
		$.toast("输入框不能为空", "text");
		return true;
	}
	return false;

}
/**
 * 发送内容
 * @param {Object} content内容
 */
function sendContent(content) {
	//显示位置
	rightOrlift(false)
	//帮数据

}
/**
 * 
 * @param {Object} isright显示左右 
 */
function rightOrlift(isright) {
	if(isright) {
		$("#right_content").show();
		$("#left_content").hide()
		return;
	}
	$("#right_content").hide();
	$("#left_content").show()

}
/**
 * 
 * @param {Object} content 显示内容
 */
function bindRightViewData(content) {
	RightId++;
	var showContentBody = document.getElementById("div_showContent_body");
	var div1 = document.createElement("div");
	div1.setAttribute("class", "right_content");
	div1.setAttribute("id", "right_content" + RightId);

	var div_content = document.createElement("div");
	div_content.setAttribute("class", "div_span_content_right");
	var div_val = document.createTextNode(content);
	div_content.appendChild(div_val);

	var div_img = document.createElement("div");
	div_img.setAttribute("class", "div_img_right");

	var img1 = document.createElement("img");
	img1.setAttribute("src", "img/custom_service.png");
	div_img.appendChild(img1);

	div1.appendChild(div_content);
	div1.appendChild(div_img);
	showContentBody.appendChild(div1);
	var item = $("div[id*='right_content" + RightId + "']");

	autoScroll(item)

}

/**
 * 
 * @param {Object} content 显示内容
 */
function bindLiftViewData(content) {
	LiftId++;
	var showContentBody = document.getElementById("div_showContent_body");
	var div1 = document.createElement("div");
	div1.setAttribute("class", "left_content");
	div1.setAttribute("id", "left_content" + LiftId);

	var div_img = document.createElement("div");
	div_img.setAttribute("class", "div_img_lift");
	var img1 = document.createElement("img");
	img1.setAttribute("src", "img/user.png");
	div_img.appendChild(img1)

	var div_content = document.createElement("div");
	div_content.setAttribute("class", "div_span_content_left");
	var div_val = document.createTextNode(content);
	div_content.appendChild(div_val);

	div1.appendChild(div_img);
	div1.appendChild(div_content);
	showContentBody.appendChild(div1);
	var item = $("div[id*='left_content" + LiftId + "']");
	autoScroll(item)
}
/**
 * 
 * @param {Object} sec 显示音频秒数
 */
function bindRightVideoViewData(sec) {
	VideoRightId++;
	var showContentBody = document.getElementById("div_showContent_body");
	var div1 = document.createElement("div");
	div1.setAttribute("class", "right_content");
	div1.setAttribute("id", "right_content" + VideoRightId);

	var span = document.createElement("span");
	span.setAttribute("class", "content_video_sec");
	span.setAttribute("id", "content_sec_tv");
	var sec_val = document.createTextNode(sec + "s");
	span.appendChild(sec_val);

	var div_content = document.createElement("div");
	div_content.setAttribute("class", "div_span_content_video_right");
	var img = document.createElement("img");
	img.setAttribute("src", "img/video_img.png");
	img.setAttribute("class","play_video_right")

	if(sec > 0 && sec <= 4) {
		div_content.setAttribute("style", "width:auto;")
	} else if(sec > 4 && sec <= 10) {
		div_content.setAttribute("style", "width: 50px;")
	} else {
		div_content.setAttribute("style", "width: 100px;")
	}

	div_content.appendChild(img);

	var div_img = document.createElement("div");
	div_img.setAttribute("class", "div_img_right");

	var img1 = document.createElement("img");
	img1.setAttribute("src", "img/custom_service.png");
	div_img.appendChild(img1);

	div1.appendChild(span);
	div1.appendChild(div_content);
	div1.appendChild(div_img);
	showContentBody.appendChild(div1);
	
	var item = $("div[id*='right_content" + VideoRightId + "']");
	var item_img = $("div[id*='right_content" + VideoRightId + "'] img:first ");
	item.data("data",{sec_number:sec,id:""});
	onClickListenter(item, sec,item_img);
	autoScroll(item);

}
/**
 * 
 * @param {Object} sec 显示音频秒数
 */
function bindLeftVideoViewData(sec) {
	VideoLiftId++;
	var showContentBody = document.getElementById("div_showContent_body");
	var div1 = document.createElement("div");
	div1.setAttribute("class", "left_content");
	div1.setAttribute("id", "left_content" + VideoLiftId);

	var span = document.createElement("span");
	span.setAttribute("class", "content_video_sec");
	span.setAttribute("id", "content_sec_tv");
	var sec_val = document.createTextNode(sec);
	span.appendChild(sec_val);

	var div_content = document.createElement("div");
	div_content.setAttribute("class", "div_span_content_video_left");
	var img = document.createElement("img");
	img.setAttribute("src", "img/ video_left_img.png");
	img.setAttribute("class","play_video_left")
	var sec = parseInt(sec);
	if(sec > 0 && sec <= 4) {
		div_content.setAttribute("style", "width:auto;")
	} else if(sec > 4 && sec <= 10) {
		div_content.setAttribute("style", "width: 50;")
	} else {
		div_content.setAttribute("style", "width: 100;")
	}

	div_content.appendChild(img);

	var div_img = document.createElement("div");
	div_img.setAttribute("class", "div_img_lift");

	var img1 = document.createElement("img");
	img1.setAttribute("src", "img/user.png");
	div_img.appendChild(img1);

	div1.appendChild(div_img);
	div1.appendChild(div_content);
	div1.appendChild(span);
	showContentBody.appendChild(div1);
	var item = $("div[id*='left_content" + VideoLiftId + "']");
	autoScroll(item)

}　
/**
 * 监听按钮点击
 * @param {Object} item 选择对象
 * @param {Object} sec 秒数
 * @todo 处理点击是问题
 */


function onClickListenter(item, sec,item_img,other_img) {
	
	if(item == null) {
		alert("对象为空");
		return;
	}
	if(item_img==null){
	alert("图片为空");
	return;
	}
   item.click(function() {
   	    if (c_Sec!=0) {
   	    	c_Sec=0;
   	    	clearTimeout(t_Time);
   	    }
   	    $(".play_video_right").attr("src","img/video_img.png");
   	    sec=item.data("data").sec_number;
   	    console.log("读取的要播放的秒数="+sec);
	    showPaly(item,sec,item_img);
	})

}
/**
 * 
 * @param {Object} item 选择对象
 * @param {Object} sec 秒数
 */
function showPaly(item,sec,item_img,othrImg) {

	if(c_Sec > sec) {
		clearTimeout(t_Time);
		item_img.attr("src","img/video_img.png")
		return;
	}
    if(c_Sec==0){
     item_img.attr("src","img/play_video_right.gif")
    }
   	c_Sec+= 1;
   	console.log(c_Sec);
   	t_Time=setTimeout(function(){showPaly(item,sec,item_img)} ,1000);

}
/**
 * 
 * @param {Object} obj 父控件
 * @param {Object} id 展示子控件
 */
function autoScroll(id) {　　
	var boy = document.getElementById("div_showContent_body")
	var a = $("#div_showContent_body").height();
	var height = id.height();　
	//	boy.scrollTop+=height+a;
	console.log(height);
	window.scrollTo(0, height + a)

}

function clear_text() {
	$("#input_box_search").val();
}