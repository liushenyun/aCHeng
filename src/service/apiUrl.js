import { Domain } from '../config/index'
// genome-get_projects
const projectsApi = () => `${Domain}/rest/v1/projects`
const newprojectsApi = () => `${Domain}/rest/v1/newprojects`

// genome-get_samplesmetagenome_get_new_projects_with_category
const projectSamplesApi = (pid) => `${Domain}/rest/v1/project/samples/${pid}`

// genome-get_one_project
const projectsOneSamplesApi = (pid) => `${Domain}/rest/v1/project/${pid}`

// genome-get_one_project
const metadatasApi = (pid) => `${Domain}/rest/v1/metadatas`

// metadata-metadata_search
const metadatasSearchApi = () => `${Domain}/rest/v1/metadata/_search`

// metadata-get_one_metadata
const oneMetadataApi = (metaId) => `${Domain}/rest/v1/metadata/${metaId}`

// rest/v1/project/_search
const oneProjectSearchApi = () => `${Domain}/rest/v1/project/_search`
// /cart/_download
const cartDownloadApi = () => `${Domain}/rest/v1/cart/_download`
const reportBugApi = () => `${Domain}/rest/v1/report_bug`
const reportMetagenomeApi = () => `${Domain}/rest/v1/report_metagenome`
// const searchRulerApi = () => `${Domain}/rest/v1/project/search_ruler`
const searchRulerApi = () => `${Domain}/rest/v1/projects/search_ruler`
const globalSearchApi = () => `${Domain}/rest/v1/sample/global_search`
const metadataSummaryApi = (pid) => `${Domain}/rest/v1/project/metadata_summary/${pid}`
// project/metadata_summary/{pid}
export {
  projectsApi,
  newprojectsApi,
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
  globalSearchApi,
  metadataSummaryApi
};
