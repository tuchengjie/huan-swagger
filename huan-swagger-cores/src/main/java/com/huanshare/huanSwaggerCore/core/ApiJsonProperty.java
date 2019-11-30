package com.huanshare.huanSwaggerCore.core;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
 
/**  
* @Title: ApiJsonProperty.java
* @Package com.huanshare.huanSwaggerCore.core
* @Description: 
* @author tjc
* @date 2019-09-11 18:09
* @version v1.0  
*/
@Target(ElementType.ANNOTATION_TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiJsonProperty {
	
	String key();  //key
	 
    String example() default "";
 
    String type() default "string";  //支持string 和 int
 
    String description() default "";

}
