import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import classNames from 'classnames'

// Component
import '../../styles/_commons.less'
import utilsTheme from '../../styles/_utils.scss'
import brickTheme from '../components/brick/brick.scss'
import Page from '../components/_ui/page/Page.component'
import Brick from '../components/brick/Brick.component'
import { setNavVisibility } from '../components/app/app.actions'
import { updateMenuPath } from '../components/menu/menu.actions'
// import { updateProject } from '../components/project/project.actions'
import { getProjectConfig, getProjectConfigAndProject } from '../components/projectConfig/projectConfig.actions'

export class StacksPage extends Component {

  static propTypes = {
    getProjectConfig: PropTypes.func,
    getProjectConfigAndProject: PropTypes.func,
    intl: intlShape.isRequired,
    location: PropTypes.object.isRequired,
    projectConfigId: PropTypes.string,
    projectId: PropTypes.string,
    setNavVisibility: PropTypes.func.isRequired,
    stacks: PropTypes.array,
    updateMenuPath: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.socket = undefined
  }

  componentWillMount = () => {
    const { getProjectConfig, getProjectConfigAndProject, location, projectConfigId, projectId, stacks, updateMenuPath } = this.props // eslint-disable-line no-shadow

    this.initNav()
    if (projectConfigId && !projectId) {
      getProjectConfig(projectConfigId)
        .then(() => {
          updateMenuPath(location.pathname)
        })
    } else if (projectConfigId && projectId) {
      getProjectConfigAndProject(projectConfigId, projectId)
        .then(() => {
          updateMenuPath(location.pathname)
        })
    } else if (stacks) {
      updateMenuPath(location.pathname)
    } else if (!projectConfigId) {
      // TODO no projectConfigId case
    }
  }

  initNav = () => {
    const { setNavVisibility } = this.props // eslint-disable-line no-shadow

    setNavVisibility(true)
  }

  render() {
    const { stacks } = this.props // eslint-disable-line no-shadow
    const brickClasses = classNames(brickTheme.brick, brickTheme['brick-header'])

    return (
      <Page>
        <h1 className={ utilsTheme['secondary-color--1'] }>
          <FormattedMessage id={'stacks-label'} />
        </h1>
        <div className="paragraph">
          <div className={ brickClasses }>
            <div className={ brickTheme['brick-type'] }>
              <FormattedMessage id={ 'type-label' } />
            </div>
            <div className={ brickTheme['brick-name'] }>
              <FormattedMessage id={ 'name-label' } />
            </div>
            <div className={ brickTheme['brick-state'] }>
              <FormattedMessage id={ 'status-label' } />
            </div>
            <div className={ brickTheme['brick-version'] }>
              <FormattedMessage id={ 'version-label' } />
            </div>
            <div className={ brickTheme['brick-link'] }>
              <FormattedMessage id={ 'link-label' } />
            </div>
          </div>
          { stacks && stacks[0] && stacks[0].bricks &&
            stacks[0].bricks.map((brick, index) => (
              <Brick brick={ brick } key={ index } />
            ))
          }
        </div>
      </Page>
    )
  }
}

// StacksPage container
const mapStateProps = (state, ownProps) => (
  {
    location: ownProps.location,
    projectConfigId: state.projectConfig ? state.projectConfig.id : '',
    projectId: state.projectConfig && state.projectConfig.project ? state.projectConfig.project.id : '',
    stacks: state.projectConfig.stacks
  }
)

const StacksPageContainer = compose(
  connect(
    mapStateProps,
    {
      getProjectConfig,
      getProjectConfigAndProject,
      setNavVisibility,
      updateMenuPath
    }
  ),
  injectIntl
)(StacksPage)


export default StacksPageContainer
