/*状态码声明*/
layui.define(function(exports){
	var obj = {
		
//		"200" : {
//			//说明
//			description: "OK",
//			//返回值类型：默认string
//			itemtype: "Result",
//			//跳转链接，默认string
//			showtype: "<a href=\"javascript:gotoModel('Result');\">Result</a>"
//		},
		"20000": {
			description: "成功",
			itemtype: "QueryResponseResult",
			showtype: "<a href=\"javascript:gotoModel('QueryResponseResult');\">QueryResponseResult</a>"
		},
		"20001": {
			description: "失败",
			itemtype: "QueryResponseResult",
			showtype: "<a href=\"javascript:gotoModel('QueryResponseResult');\">QueryResponseResult</a>"
		}
		
	}
	
	/*输出接口*/
    exports('responsesCode', obj);
});