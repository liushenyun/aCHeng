import Vue from "vue";
import fetch from './index';
import packagePromise from './packagePromise'
import {
  projectsApi,
  projectSamplesApi,
  projectsOneSamplesApi,
  metadatasApi,
  metadatasSearchApi,
  oneMetadataApi,
  oneProjectSearchApi,
  cartDownloadApi,
  reportBugApi,
  reportMetagenomeApi,
  searchRulerApi,
  globalSearchApi
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

// genome-get_projects
const metadatasApiF = (fun) => packagePromise((resolve, reject) => {
  fetch({
    url: metadatasApi(),
    method: 'GET',
    data: {}
  }, fun)
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})

// genome-get_projects
const metadatasSearchApiF = (data, fun) => packagePromise((resolve, reject) => {
  fetch({
    url: metadatasSearchApi(),
    method: 'POST',
    data
  }, fun)
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})

// genome-get_projects
const oneMetadataApiF = (id) => packagePromise((resolve, reject) => {
  fetch({
    url: oneMetadataApi(id),
    method: 'GET',
    data: {}
  })
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})

const oneProjectSearchApiF = (data) => packagePromise((resolve, reject) => {
  fetch({
    url: oneProjectSearchApi(),
    method: 'POST',
    data
  })
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})

// cartDownloadApi
const cartDownloadApiF = (data) => packagePromise((resolve, reject) => {
  fetch({
    url: cartDownloadApi(),
    method: 'POST',
    data
  })
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})

const reportBugApiF = (data) => packagePromise((resolve, reject) => {
  fetch({
    url: reportBugApi(),
    method: 'POST',
    data
  })
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})

const reportMetagenomeApiF = (data) => packagePromise((resolve, reject) => {
  fetch({
    url: reportMetagenomeApi(),
    method: 'POST',
    data
  })
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})
const searchRulerApiF = (id) => packagePromise((resolve, reject) => {
  fetch({
    url: searchRulerApi(id),
    method: 'GET',
    data: {}
  })
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})
const globalSearchApiF = (data) => packagePromise((resolve, reject) => {
  fetch({
    url: globalSearchApi(),
    method: 'POST',
    data
  })
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})

// searchRulerApi
// reportBugApi,
//   reportMetagenomeApi
// metadataSsearchApi
export {
  projectsApiF,
  projectSamplesApiF,
  projectsOneSamplesApiF,
  metadatasApiF,
  metadatasSearchApiF,
  oneMetadataApiF,
  oneProjectSearchApiF,
  cartDownloadApiF,
  reportBugApiF,
  reportMetagenomeApiF,
  searchRulerApiF,
  globalSearchApiF
}
