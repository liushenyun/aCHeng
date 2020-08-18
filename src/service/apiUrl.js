import { Domain } from '../config/index'
// genome-get_projects
const projectsApi = () => `${Domain}/rest/v1/projects`

// genome-get_samples
const projectSamplesApi = (pid) => `${Domain}/rest/v1/project/samples/${pid}`

// genome-get_one_project
const projectsOneSamplesApi = (pid) => `${Domain}/rest/v1/project/${pid}`

export {
  projectsApi,
  projectSamplesApi,
  projectsOneSamplesApi
};
