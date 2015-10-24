package com.ctbri.config.api;

/*
 *
 * <p>Description: 读取系统配置文件</p>
 */
public interface Configer {
     /**
     * 根据名字查询参数
     *
     * @param id String
     *
     * @return String
     */
     String  getParameter(String id);

     /**
     * 从配置文件重新加载参数
     *
     * @return 系统配置对象
     */
    Configer reload() throws ConfigException;
}