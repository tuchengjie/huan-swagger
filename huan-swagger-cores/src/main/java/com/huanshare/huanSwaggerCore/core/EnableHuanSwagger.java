package com.huanshare.huanSwaggerCore.core;

import org.springframework.context.annotation.Import;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.lang.annotation.*;

/**  
* @Title: EnableHuanSwagger.java
* @Package com.huanshare.huanSwaggerCore.core
* @Description: 
* @author tjc
* @date 2019-09-11 18:09 
* @version v1.0  
*/
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
@EnableSwagger2
@Import({HuanSwagger.class})
public @interface EnableHuanSwagger {
}
