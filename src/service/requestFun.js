import Vue from "vue";
import fetch from './index';
import packagePromise from './packagePromise'
import {
  projectsApi,
  projectSamplesApi,
  projectsOneSamplesApi
} from './apiUrl';
// import Validate from './Validate';
// import { aesEncrypt } from "../utils/dtAes";
// import isEmpty from "../utils/isEmpty";
// import { send } from './formdata';
// import formatParams from '../utils/formatParams';

/* ==== 用户http请求提示 =====  */
// const SuccessTips = (con, callbck, type = 'success') => {
//   Vue.prototype.$message({
//     showClose: true,
//     message: con,
//     duration: 1500,
//     type: type
//   });
//   setTimeout(() => {
//     callbck && callbck()
//   }, 1400);
// };

// genome-get_projects
const projectsApiF = (data = {}, fun) => packagePromise((resolve, reject) => {
  fetch({
    url: projectsApi(),
    method: 'GET',
    data: {}
  }, fun)
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})

// genome-get_projects
const projectSamplesApiF = (pid, fun) => packagePromise((resolve, reject) => {
  fetch({
    url: projectSamplesApi(pid),
    method: 'GET',
    data: {}
  }, fun)
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})
// genome-get_projects
const projectsOneSamplesApiF = (pid, fun) => packagePromise((resolve, reject) => {
  fetch({
    url: projectsOneSamplesApi(pid),
    method: 'GET',
    data: {}
  }, fun)
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})
export {
  projectsApiF,
  projectSamplesApiF,
  projectsOneSamplesApiF
}
