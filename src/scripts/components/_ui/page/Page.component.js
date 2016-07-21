import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'

// component
import { PAGE } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import pageTheme from './page.scss'

/**
 * UI: Page component
 *
 */
export const Page = ({ children, theme }) => (
  <section
    className={ theme.page }
  >
    { children }
  </section>
)

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  theme: PropTypes.object
}

export default themr(PAGE, pageTheme)(Page)
