import axios from 'axios'

export default {
  getApproveProjectDetailList (body) {
    return axios({
      url: '/api/approve_project_detail/page',
      method: 'post',
      data: body
    })
  }
}
