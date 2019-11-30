package com.huanshare.huanswagger.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**  
* @Title: WebMvcConfig.java
* @Package com.huanshare.huanswagger.config
* @Description: 
* @author tjc
* @date 2019-09-16 11:04 
* @version v1.0  
*/
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //将所有/static/** 访问都映射到classpath:/static/ 目录下
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/webjars/");
        registry.addResourceHandler("/api-doc.html").addResourceLocations("classpath:/api-doc.html");

    }
}