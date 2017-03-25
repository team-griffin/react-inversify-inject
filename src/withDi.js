import React, { Component } from 'react';
import forOwn from 'lodash.forown';
import reduce from 'lodash.reduce';

const withDi = (config) => (WrappedComponent) => {
  const {
    lazyInject,
    ...injections,
  } = config;

  class Di extends Component {
    constructor(props) {
      super(props);

      forOwn(injections, (token, name) => {
        lazyInject(token)(this.__proto__, name);
      });
    }

    mapInjectionsToDi() {
      return reduce(injections, (result, token, name) => {
        return {
          ...result,
          [name]: this[name],
        }
      }, {});
    };

    render() {


      return (
        <WrappedComponent
          {...this.props}
          di={this.mapInjectionsToDi()}
        >
          {this.props.children}
        </WrappedComponent>
      );
    }
  }

  return Di;
};

export default withDi;