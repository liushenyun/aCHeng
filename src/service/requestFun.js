import Vue from "vue";
import fetch from './index';
import packagePromise from './packagePromise'
import {
  projectsApi,
  newprojectsApi,
  projectSamplesApi,
  projectsOneSamplesApi,
  metadatasApi,
  metadatasSearchApi,
  oneMetadataApi,
  oneMetadataBynameApi,
  oneProjectSearchApi,
  cartDownloadApi,
  reportBugApi,
  reportMetagenomeApi,
  searchRulerApi,
  searchOneRulerApi,
  globalSearchApi,
  metadataSummaryApi
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
const newprojectsApiF = (data = {}, fun) => packagePromise((resolve, reject) => {
  fetch({
    url: newprojectsApi(),
    method: 'GET',
    data: {}
  }, fun)
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})

// newprojectsApi
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
const oneMetadataBynameApiF = (name) => packagePromise((resolve, reject) => {
  fetch({
    url: oneMetadataBynameApi(name),
    method: 'GET',
    data: {}
  })
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})
// oneMetadataBynameApi
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
const searchRulerApiF = (data) => packagePromise((resolve, reject) => {
  fetch({
    url: searchRulerApi(),
    method: 'POST',
    data
  })
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})
const searchOneRulerApiF = (id) => packagePromise((resolve, reject) => {
  fetch({
    url: searchOneRulerApi(id),
    method: 'GET',
    data: {}
  })
    .then(msg => {
      resolve(msg)
    })
    .catch(err => reject(err))
})
// searchOneRulerApi
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

const metadataSummaryApiF = (pid) => packagePromise((resolve, reject) => {
  fetch({
    url: metadataSummaryApi(pid),
    method: 'GET',
    data: {}
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
  newprojectsApiF,
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
  searchOneRulerApiF,
  globalSearchApiF,
  metadataSummaryApiF,
  oneMetadataBynameApiF
}
