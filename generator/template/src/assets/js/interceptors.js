/*
 * @Author: wuhaiwei 
 * @Date: 2018-10-23 17:27:19 
 * @Last Modified by: wuhaiwei
 * @Last Modified time: 2018-10-26 17:31:21
 */
/**
 * 封装axios 请求的拦截配置
 */
import axios from 'axios';


function interceptors(router){
  /**
 * 路由拦截设置
 */
  router.beforeEach((to, from, next) => {
    next();
  });

  //http request 拦截器
  axios.interceptors.request.use(
    config => {
      console.log(config);
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  //http response 拦截器
  axios.interceptors.response.use(
    response => {
      console.log(response);
      
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );
}
export default  interceptors;
