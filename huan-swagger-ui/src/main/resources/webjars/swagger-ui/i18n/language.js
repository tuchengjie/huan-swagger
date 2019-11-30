(function() {
	
	/*设置语言类型： 默认为中文*/
    var i18nLanguage = "zh-CN";
    /*设置一下网站支持的语言种类
	zh-CN(中文简体)、en(英语)*/
    var webLanguage = ['zh-CN', 'en'];
    /*获取网站语言,需要下载jQuery.cookie.js*/
    function getWebLanguage(){
        /*1.cookie是否存在*/
        if (jQuery.cookie("userLanguage")) {
            i18nLanguage = jQuery.cookie("userLanguage");
            console.log("language cookie is "+i18nLanguage);
        } else {
            /*2.1 获取用户设置的浏览器语言*/
            var navLanguage = getNavLanguage();
            console.log("user set browser language is "+navLanguage);
            if (navLanguage) {
                /* 判断是否在网站支持语言数组里*/
                var charSize = $.inArray(navLanguage, webLanguage);
                if (charSize > -1) {
                    i18nLanguage = navLanguage;
                    /* 存到缓存中*/
                    jQuery.cookie("userLanguage ",navLanguage, {
                        expires : 7
                    });
                };
            } else{
                console.log("not navigator");
                return false;
            }
        }
    }

    /**
     * 执行页面i18n方法
     * @return
     * @author LH
     */
    window.execI18n = function(language,elem){
        i18nLanguage = language == null? i18nLanguage:language;
        /*获取网站语言(i18nLanguage,默认为中文简体)*/
        /*getWebLanguage();*/
        /*国际化页面*/
        jQuery.i18n.properties({
            name : "common", /*资源文件名称*/
            path : "i18n/"+i18nLanguage+"/", /*资源文件路径*/
            mode: 'map', /*模式：变量或 Map*/
            language : i18nLanguage,
            cache:false, /*指定浏览器是否对资源文件进行缓存,默认false*/
            encoding: 'UTF-8', /*加载资源文件时使用的编码。默认为 UTF-8。*/
            callback : function() {/*加载成功后设置显示内容*/
                /*以下是将要国际化的文字内容*/
        		var doms = [];
        		if(i18nLanguage=="zh-CN") {
        			doms = $(elem || '.layui-zhTras:not(.zhTras-en)');
        		}else if(i18nLanguage == "en") {
        			doms = $(elem || '.layui-zhTras.zhTras-en');
        		}
                /*是否为汉字*/
            	var regZH = new RegExp("[\\u4E00-\\u9FFF]+");
                for (var m = 0; m < doms.length; m++) {
                	var dom = $(doms).eq(m);
                	var con = $(dom).attr("layui-ech");
                	if(con == null || con == "")continue;
                	con = con.replace(/\s+/g,"");
                	/*不包含汉字*/
                	if(i18nLanguage=="zh-CN" && !regZH.test(con)){
                		try{
                			var html = $.i18n.map[con];
                			if(html == null) {
                				console.info(i18nLanguage+"国际化失败："+con);
                			}else if(html != ""){
                				$(dom).html(html);
                			}
                		}catch(e) {
                			console.error(e);
                		}
                	}
                	if(i18nLanguage == "en") {
                		$(dom).html(con.split("_")[1]);
                	}
                	
    			}
                
            }
        });
    }

})();