package com.huanshare.huanSwaggerCore.core;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;

/**  
* @Title: ApiJsonObject.java
* @Package com.huanshare.huanSwaggerCore.core
* @Description:
* @author tjc
* @date 2019-09-11 18:09
* @version v1.0  
*/
@Target({ElementType.PARAMETER, ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiJsonObject {

    ApiJsonProperty[] value(); //对象属性值
    
    String name();  //对象名称

    /**
     * Describes the default value for the parameter.
     */
    String defaultValue() default "";

    /**
     * Specifies if the parameter is required or not.
     * <p>
     * Path parameters should always be set as required.
     */
    boolean required() default false;


    /**
     * The data type of the parameter.
     * <p>
     * This can be the class name or a primitive.
     */
    String dataType() default "";

    /**
     * The class of the parameter.
     * <p>
     * Overrides {@code dataType} if provided.
     */
    Class<?> dataTypeClass() default Void.class;

    /**
     * The parameter type of the parameter.
     * <p>
     * Valid values are {@code path}, {@code query}, {@code body},
     * {@code header} or {@code form}.
     */
    String paramType() default "";

    /**
     * Adds the ability to override the detected type
     *
     * @since 1.5.11
     *
     * @return
     */
    String type() default "";

    /**
     * Adds the ability to provide a custom format
     *
     * @since 1.5.11
     *
     * @return
     */
    String format() default "";

    /**
     * Adds the ability to set a format as empty
     *
     * @since 1.5.11
     *
     * @return
     */
    boolean allowEmptyValue() default false;

    /**
     * adds ability to be designated as read only.
     *
     * @since 1.5.11
     *
     */
    boolean readOnly() default false;

    /**
     * adds ability to override collectionFormat with `array` types
     *
     * @since 1.5.11
     *
     */
    String collectionFormat() default "";

}
