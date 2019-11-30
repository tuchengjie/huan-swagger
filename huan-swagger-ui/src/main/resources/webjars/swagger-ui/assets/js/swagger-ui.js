/**
 * Created by liuhuan on 2017/5/11.
 */
layui.config({
    base: 'assets/layext/'
}).extend({
    nlaytpl: 'nlaytpl',
    ncmntool: 'ncmntool',
    nswagger: 'nswagger',
    nupload: 'nupload',
    zhCnEn: 'zhCnEn',
    responsesCode: 'responsesCode'
});
//
layui.use(['layer', 'element', 'form', 'nlaytpl', 'nswagger', 'ncmntool', 'upload', 'code', 'laydate', 'zhCnEn', 'responsesCode'], function () {
    var $ = layui.jquery,
        layer = layui.layer,
        element = layui.element,
        form = layui.form,
        ncmntool = layui.ncmntool,
        nlaytpl = layui.nlaytpl,
        nswagger = layui.nswagger,
        zhCnEn = layui.zhCnEn,
        responsesCode = layui.responsesCode;

    $(".logo").click(function () {
        $(".nav-home").click();
        $(".layui-side-scroll").scrollTop(0);
    });

    $("#iptApiUrl, .btn-clearurl").on('mouseover', function () {
        $(".btn-clearurl").show();
    }).on('mouseout', function () {
        $(".btn-clearurl").hide();
    });
    $(".btn-clearurl").click(function () {
        $("#iptApiUrl").val('');
    });
    //设置全局参数
    function setToken() {
        if(localStorage.getItem("tokenName") != null) {
            $("input[name='tokenName']").val(localStorage.getItem("tokenName"));
        }
        if(localStorage.getItem("tokenValue") != null) {
            $("input[name='tokenValue']").val(localStorage.getItem("tokenValue"));
        }
        if(localStorage.getItem("authorizationName") != null) {
            $("input[name='authorizationName']").val(localStorage.getItem("authorizationName"));
        }
        if(localStorage.getItem("authorizationValue") != null) {
            $("input[name='authorizationValue']").val(localStorage.getItem("authorizationValue"));
        }
    }
    //监听全局参数配置
    $(document).delegate("input[name='tokenName']", "change", function(e){
        localStorage.setItem("tokenName", $(this).val());
    });
    $(document).delegate("input[name='tokenValue']", "change", function(e){
        localStorage.setItem("tokenValue", $(this).val());
    });
    $(document).delegate("input[name='authorizationName']", "change", function(e){
        localStorage.setItem("authorizationName", $(this).val());
    });
    $(document).delegate("input[name='authorizationValue']", "change", function(e){
        localStorage.setItem("authorizationValue", $(this).val());
    });

    var apiTars = {
    	d: {},
    	p: {},
    	t: []
    };
    var ports_len = {i: 0, j: ""};
    //解析数据
    function setApidocs(apidoc) {
        // 设置页面标题
        document.title = apidoc.info.title;
        // 设置页面LOGO
        /*ncmntool.checkimg(apidoc.schemes[0] + "://" + apidoc.host + "/logo.png", function (imgurl) {
            $(".logo img").attr("src", imgurl);
        });*/
        location.hash = apidoc.host;
        // 渲染左侧菜单导航
        nlaytpl.render(".api-main")("comp/tplApiMain.html", {tags: apidoc["tags"]}, function () {
            // 重新渲染菜单效果
            element.init();
            // 监听导航点击事件
            element.on("nav(left-nav)", function (ele) {
                if ($(ele).hasClass("nav-home")) {
                    nlaytpl.render(".main-body")("comp/tplHomeBody.html", apidoc, function () {
                        // 重新渲染组件效果
                        element.init();
                        form.render(); //更新全部
                        //设置全局参数
                        setToken();
                    });
                } else {
                    $((".layui-nav-itemed")).removeClass(("layui-nav-itemed"));
                    $(ele).parents(".layui-nav-item").addClass("layui-nav-itemed");
                    var _a = $(ele).children(':first-child');
                    $(".layui-side-scroll").scrollTop($(_a).offset().top - $(".layui-side").offset().top + $(".layui-side").scrollTop());
                    var _dpath = $(_a).attr("dpath"), _dhttpmethod = $(_a).attr("dhttpmethod");
                    
                    nlaytpl.render(".main-body")("comp/tplApiBody.html", {
                        apidoc: apidoc,
                        tagname: $(_a).attr("dtag"),
                        dpath: _dpath,
                        dport: $(_a).attr("dport"),
                        dhttpmethod: _dhttpmethod,
                        mmeta: apidoc["paths"][_dpath][_dhttpmethod]
                    }, function () {
                        // 重新渲染组件效果
                        element.init();
                        form.render();
                        
                        /* 国际化 */
                    	execI18n("zh-CN",'.layui-zhTras:not(.zhTras-en)');
                    });
                }
            });
            // 监听处理导航的悬浮提示
            $('.layui-nav-item a[dtitle]').on('mouseover', function () {
                var that = this;
                layer.tips($(that).attr("dtitle"), that, {
                    time: 0
                });
            }).on('mouseout', function () {
                layer.closeAll('tips');
            });
            // 渲染主页
            $(".nav-home a").click();
            
            
            //菜单谷歌翻译
            /*var doms = $('.layui-zhTras');
            var elems = [], contents = [];
            for (var m = 0; m < doms.length; m++) {
            	elems.push($(doms).eq(m));
            	contents.push($(doms).eq(m).html());
			}
            zhCnEn.translation(elems,contents,"en");*/
            
            //国际化
            execI18n("zh-CN",'.layui-zhTras.zhTras-en');
            
        });
        // 渲染顶部导航搜索
        nlaytpl.render(".api-quick")("comp/tplApiQuick.html", {tags: apidoc["tags"]}, function () {
            form.on('select(api-quick)', function (data) {
                var pm = data.value.split("::");
                $(".left-nav a[dpath='" + pm[1] + "'][dhttpmethod='" + pm[0] + "']").click();
            });
            // 重新渲染表单组件效果
            form.render("select");
        });
         
    }
    //解析地址
    function getTarg(iptApiUrl, lens, por) {
    	// 弹出加载框
        var loader = layer.load();
        // 获取配置文档
    	$.ajax({
            url: iptApiUrl,
            dataType: "json",
            type: "get",
            header: {
            	"Access-Control-Allow-Origin": "*"
            },
            success: function (apidoc) {
            	// 解析数据
                try {
                    nswagger.resolve(apidoc);
                } catch (e) {
                    layer.msg('解析失败，请确认文档配置是否正确', {icon: 5});
                    console.error(e);
                    return;
                }
                for(var n=0; n<apidoc["tags"].length; n++){
                	apidoc["tags"][n]["port"] = por;
                	apiTars["t"].push(apidoc["tags"][n]);
                }
                
                for(var key in apidoc["paths"]) {
                	try{
                		var tems = apidoc["paths"][key];
                		for(var st in tems) {
                			tems[st]['responses'] = responsesCode;
                		}
            		}catch(e){}
            		apiTars["p"][key] = apidoc["paths"][key];
            	}
                
                if(lens == 1) {
                	apidoc["port"] = null;
                	setApidocs(apidoc);
                }else {	//多端口解析
                	for(var key in apidoc["definitions"]) {
                		apiTars["d"][key] = apidoc["definitions"][key];
                	}
                	
                	ports_len.j += por.substring(1) + "\t"; 
                    ports_len.i++;
                    if(ports_len.i == lens) {
                		apidoc["port"] = ports_len.j;
                		apidoc["tags"] = apiTars["t"];
                		apidoc["paths"] = apiTars["p"];
                		apidoc["definitions"] = apiTars["d"];
                		
                		setApidocs(apidoc);
                	}
                }
            },
            error: function () {
            	ports_len.i++;
                //layer.msg('加载失败，请确认API文档的地址是否正确', {icon: 5});
            	layer.msg('加载失败，请确认'+iptApiUrl.match(/:\d{4,}/g)[0]+'端口号是否正确', {icon: 5});
            },
            complete: function () {
                layer.close(loader);
            }
        });
    }
    
    
    $(".btn-gourl").click(function () {
    	apiTars = {
    		d: {},
    	    p: {},
	    	t: []
	    };
    	ports_len = {i: 0, j: ""};
        // 清理数据
        $(".api-main").empty();
        // 拉取数据
        var iptApiUrl = $("#iptApiUrl").val() || location.hash;
        
        if (iptApiUrl.charAt(0) == "#") {
            iptApiUrl = iptApiUrl.substr(1);
        }
        if (iptApiUrl == "") {
            iptApiUrl = location.protocol + "//" + location.host + "/v2/api-docs";
            if (location.search && location.search.indexOf("_ijt=") != -1) {
                iptApiUrl = "example.json";
            }
        }
        if (iptApiUrl != "example.json") {
            if (!/\/v2\/api-docs$/.test(iptApiUrl)) {
                iptApiUrl = iptApiUrl + "/v2/api-docs";
            }

            if (!/^http/.test(iptApiUrl)) {
                iptApiUrl = "http://" + iptApiUrl;
            }
        }
        var ports = iptApiUrl.match(/(-\d{4,})/g);
        ports = ports == null?new Array():ports;
        ports.unshift(iptApiUrl.match(/:\d{4,}/g)[0].replace(/:/g,"-"));
        for(var i=0; i<ports.length; i++) {
        	var por = ports[i].replace(/-/g,":");
        	ports[i] = (location.protocol + "//" + location.host + "/v2/api-docs").replace(/:\d{4,}/g, por);
        	
        	/*(function(m,ars,le,po) {
    	        setTimeout(function() {
    	            getTarg(ars, le, po);
    	        }, (m + 1) * 1000);
    	    })(i,ports[i], ports.length, por);*/
        	getTarg(ports[i], ports.length, por);
	
        }
        if(ports.length == 1) {
        	$("#iptApiUrl").val(ports[0]).attr("type","url");
        }else {
        	$("#iptApiUrl").val($("#iptApiUrl").val() || location.hash).attr("type","text");
        }
    }).on('mouseover', function () {
        var that = this;
        layer.tips("点击加载目标地址的API文档", that, {
            time: 0,
            tips: 3
        });
    }).on('mouseout', function () {
        layer.closeAll('tips');
    });
    //
    $(".btn-gourl").click();
});