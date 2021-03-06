import express from 'express'
const router = express.Router() // eslint-disable-line new-cap

import config from '../config/config'
import endpoints from '../config/shared/api.endpoints'
import * as user from './user.server.controller'
import * as project from './project.server.controller'
import * as brick from './brick.server.controller'

router.post(config.api.routes.user, user.initUser)

router.post(`${config.api.routes.user}/:id`, user.postUser)

router.get(`${config.api.routes.user}/`, user.getUserAccount)

router.get(`${config.api.routes.user}/:userId`, user.getUser)

router.post(`${config.api.routes.projectConfig}/`, project.postProjectConfig)

router.put(`${config.api.routes.projectConfig}/:projectConfigId${endpoints.projectConfigUser}`, project.putUserToProjectConfig)

router.get(`${config.api.routes.projectConfig}/:projectConfigId`, project.getProjectConfig)

router.post(`${config.api.routes.project}/:projectConfigId`, project.postProject)

router.get(`${config.api.routes.project}/:projectId`, project.getProject)

router.get(`${config.api.routes.brick}`, brick.getBricks)

export default (app) => {
  app.use(router)
}
