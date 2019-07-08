import React from 'react';
import ReactSVG from 'react-svg';

class SvgRender extends React.Component {
  render() {
    const { path, svgClassName, className, style } = this.props;

    return (
      <ReactSVG
        path={path}
        svgClassName={svgClassName ? svgClassName : ''}
        svgStyle={style}
        className={`svg-wrap d-flex align-items-center ${className ? className : ''}`}
      />
    );
  }
}

export default SvgRender;
