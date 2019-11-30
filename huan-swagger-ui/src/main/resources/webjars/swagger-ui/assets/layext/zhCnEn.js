/*单词翻译*/
layui.define(['jquery','layer'], function(exports){
    var $ = layui.jquery,layer = layui.layer;

    function ContentFormat(elems, contents, sl, tl) {
    	/*是否为汉字*/
    	var regZH = new RegExp("[\\u4E00-\\u9FFF]+");
    	var reg = new RegExp("_+|-+");
    	var elss = [],contss = [];
    	
    	if(elems == null || elems.length == 0) {
    		return;
    	}
    	try{
    		/*java API单词翻译*/
    		if(sl == "en") {
    			
    			for(var i = 0; i < elems.length; i++) {
        			var con = contents[i];
        			if(con != null && regZH.test(con)) continue;
        			if(con != null && con.replace(/(^\s+)|(\s+$)/g,"") != "") {
        				var matchs = con.match(/[A-Z]+/g);
        				if(matchs != null) {
        					for(var j = 0; j < matchs.length; j++) {
        						con = con.replace(matchs[j]," "+matchs[j].toLowerCase());
        					}
        				}
        				
        				contents[i] = con.replace(reg," ");
        				elss.push(elems[i]);
        				contss.push(contents[i]);
        			}
        		}
    			
    		}
    		
    	}catch(e) {
    		console.error(e);
    		layer.msg('翻译失败，可能是元素个数与翻译内容个数不一致', {icon: 5});
    		return;
    	}
    	translations(elss, contss, sl, tl);
    }
    
    /*sl=zh-CN：source language为zh-CN，即需要翻译的文字是中文简体
     * zh-TW：中文繁体
    tl=en：to language，目标语言为en，即要翻译为英语
    ie=UTF-8：input encoding，输入的文字的编码为UTF-8
    oe=UTF-8：output encoding，输出，翻译后，的文字的编码为UTF-8*/
    function translations(elems, contents, sl, tl) {
    	var con = "";
    	if(contents != null && contents.length > 0) {
    		try{con = contents.join("^");}catch(e){}
    	}else {
    		return;
    	}
    	
    	$.ajax({
    		url: "http://localhost/translate_a/single?client=gtx&dt=t&dj=1" +
    				"&oe=UTF-8&ie=UTF-8&sl="+sl+"&tl="+tl+"&q="+con,
    		type: "GET",
    		dataType: 'json',
    		success: function(result) {
    			try{
    				var sentences = result["sentences"];
    				/*译文*/
        			var trans = sentences[0].trans;
        			/*原文
        			var orig = sentences[0].orig; */
        			contents = trans.split("^");
        			for(var i = 0; i < elems.length; i++) {
        				$(elems[i]).html(contents[i]);
        			}
    			}catch(e) {
    				console.error(e);
    				layer.msg('翻译失败！！！', {icon: 5});
    			}
    		},
    		error: function(e) {
    			console.error(e);
    			layer.msg('翻译失败，无法解析地址', {icon: 5});
    		}
    	});
    	
    }
    
    var obj = {
		/**
		 * 
		 * @param elems	目标数组
		 * @param contents	翻译内容数组
		 * @param en_zh		zh_en: 简体中文转英文, en_zh: 英文转中文
		 * @returns
		 */
    	translation: function(elems, contents, en_zh) {
    		if(en_zh == "zh-CN") {
    			/*汉译英*/
            	ContentFormat(elems, contents, "zh-CN", "en");
    		}else if(en_zh == "en") {
    			/*英译汉*/
            	ContentFormat(elems, contents, "en", "zh-CN");
    		}else {
    			/*自动译汉*/
            	ContentFormat(elems, contents, "auto", "zh-CN");
    		}
    	}
    };
    //输出接口
    exports('zhCnEn', obj);
});