package com.huanshare.huanSwaggerCore.core;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.ApiSelectorBuilder;
import springfox.documentation.spring.web.plugins.Docket;

import java.net.InetAddress;

/**  
* @Title: HuanSwagger.java
* @Package com.huanshare.huanSwaggerCore.core
* @Description: 
* @author tjc
* @date 2019-09-11 18:13 
* @version v1.0  
*/
@Configuration
public class HuanSwagger {
    @Value("${swagger.enable:true}")
    private boolean enable;
    @Value("${swagger.title:API查看器}")
    private String title;
    @Value("${swagger.description:适用于RESTful风格的API服务说明}")
    private String description;
    @Value("${swagger.contact.name:...略}")
    private String contactName;
    @Value("${swagger.contact.url:...略}")
    private String contactUrl;
    @Value("${swagger.contact.mail:...略}")
    private String contactMail;
    @Value("${swagger.version:v1.0}")
    private String version;
    @Value("${server.port:8080}")
    private String port;

    public HuanSwagger() {
    }

    @Bean
    public Docket allApi() { if (!this.enable) {
            return (new Docket(DocumentationType.SWAGGER_2)).select().apis(RequestHandlerSelectors.none()).paths(PathSelectors.none()).build();
        } else {
            ApiInfo apiInfo = (new ApiInfoBuilder()).title(this.title).description(this.description).contact(new Contact(this.contactName, this.contactUrl, this.contactMail)).version(this.version).build();
            ApiSelectorBuilder builder = (new Docket(DocumentationType.SWAGGER_2)).useDefaultResponseMessages(false).apiInfo(apiInfo).select();
            builder.apis(RequestHandlerSelectors.withClassAnnotation(RestController.class));
            return builder.build();
        }
    }

    @Bean
    public CorsFilter apiCorsFilter() {
        if (!this.enable) {
            return new CorsFilter(new UrlBasedCorsConfigurationSource());
        } else {
            UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.setAllowCredentials(true);
            corsConfiguration.addAllowedHeader("*");
            corsConfiguration.addAllowedMethod("*");
            corsConfiguration.addAllowedOrigin("*");
            urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
            return new CorsFilter(urlBasedCorsConfigurationSource);
        }
    }
    
    @Bean
    public String getStrings() {
    	InetAddress localHost;
		try {
			localHost = InetAddress.getLocalHost();
			System.out.println("访问地址：\n\thttp://"+localHost.getHostAddress()+":"+port+"/api-doc.html");
			System.out.println("微服务API文档地址：\n\thttp://"+localHost.getHostAddress()+
	                ":8102/webjars/swagger-ui/index.html#"+localHost.getHostAddress()+ ":" + port);
		} catch (Exception ignored) {}
    	return null;
    }
}
