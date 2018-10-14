import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import iconE2E from '../../../src/assets/img/general/e2e.png';
import iconMonkey from '../../../src/assets/img/general/monkey.ico';
import iconBdd from '../../../src/assets/img/general/bdd.png';
import iconRvt from '../../../src/assets/img/general/vrt.png';
import iconGad from '../../../src/assets/img/general/gad.png';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  dataBox: PropTypes.func,
};

const defaultProps = {
  dataBox: () => ({ variant: 'facebook', friends: '-', feeds: '-' }),
};

class Widget03 extends Component {
  render() {

    // eslint-disable-next-line
    const { children, className, cssModule, dataBox, ...attributes } = this.props;

    // demo purposes only
    const data = dataBox();
    const variant = data.variant;

    if (!variant) {
      return (null);
    }

    const back = 'bg-' + data.friends;
    let icon = '';
    const keys = Object.keys(data);
    const vals = Object.values(data);

    switch (data.friends) {
      case 'e2e':
        icon = iconE2E;
        break;
      case 'monkey':
        icon = iconMonkey;
        break;
      case 'bdd':
        icon = iconBdd;
        break;
      case 'rvt':
        icon = iconRvt;
        break;
      case 'gad':
        icon = iconGad;
        break;
      default:
        icon = iconE2E;
        break;
    }

    const classCard = 'brand-card';
    const classCardHeader = classNames(`${classCard}-header`, back);
    const classCardBody = classNames(`${classCard}-body`);
    const classes = mapToCssModules(classNames(classCard, className), cssModule);

    return (
      <div className={classes}>
        {children}
        <div className={classCardHeader}>
          <img src={icon} width='80px'/>
        </div>
        <div className={classCardBody}>
          <div>
            <div className="text-value">{variant}</div>
          </div>
        </div>
      </div>
    );
  }
}

Widget03.propTypes = propTypes;
Widget03.defaultProps = defaultProps;

export default Widget03;
