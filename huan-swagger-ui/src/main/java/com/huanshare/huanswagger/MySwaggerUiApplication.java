package com.huanshare.huanswagger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
* @Title: MySwaggerUiApplication.java
* @Package com.huanshare.huanswagger
* @Description: API接口启动器
* @author tjc
* @date 2019-09-11 17:51
* @version v1.0
*/
@SpringBootApplication
public class MySwaggerUiApplication {

    public static void main(String[] args) {
        SpringApplication.run(MySwaggerUiApplication.class, args);
        InetAddress localHost = null;
        try {
            localHost = InetAddress.getLocalHost();
            String ip = localHost.getHostAddress() == null ? "127.0.0.1" : localHost.getHostAddress();
            System.out.println("\n微服务API文档地址：\n" + "http://" + ip + ":8102/webjars/swagger-ui/index.html#" + ip + ":8080");
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }

    }


}