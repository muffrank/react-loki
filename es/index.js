var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import LokiStep from "./LokiStep";
import LokiStepContainer from "./LokiStepContainer";

var Loki = (_temp2 = _class = function (_Component) {
  _inherits(Loki, _Component);

  function Loki() {
    var _temp, _this, _ret;

    _classCallCheck(this, Loki);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      currentStep: _this.props.activeStep || 1,
      stepsDone: [],
      complete: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Loki.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.activeStep !== this.state.currentStep) {
      this.setState(_extends({}, this.state, { currentStep: nextProps.activeStep }));
    }
  };

  Loki.prototype._back = function _back(data) {
    this.props.onBack && this.props.onBack(data);
    this.setState({ currentStep: this.state.currentStep - 1 });
  };

  Loki.prototype._next = function _next(data) {
    if (this.state.currentStep === this.props.steps.length) {
      this.props.onFinish(data);
      return this.setState({ complete: true });
    }

    this.props.onNext && this.props.onNext(data);
    this.setState({
      currentStep: this.state.currentStep + 1,
      stepsDone: this.state.stepsDone.concat([this.state.currentStep])
    });
  };

  Loki.prototype._lokiData = function _lokiData() {
    return {
      currentStep: this.state.currentStep,
      stepIndex: this.state.currentStep - 1,
      cantBack: this.state.currentStep === 1,
      isInFinalStep: this.state.currentStep === this.props.steps.length,
      backHandler: this._back.bind(this),
      nextHandler: this._next.bind(this)
    };
  };

  Loki.prototype._renderSteps = function _renderSteps() {
    var _this2 = this;

    if (!this.props.steps) {
      return;
    }

    if (this.props.renderSteps) {
      return this.props.renderSteps(this._lokiData());
    }

    var steps = this.props.steps.map(function (step, index) {
      return React.createElement(LokiStep, {
        key: index,
        stepsDone: _this2.state.stepsDone,
        currentStep: _this2.state.currentStep,
        totalSteps: _this2.props.steps.length,
        step: _extends({}, step, { index: index + 1 }),
        goTo: function goTo(newStep) {
          return _this2.setState({ currentStep: newStep });
        },
        isLokiComplete: _this2.state.complete
      });
    });

    return React.createElement(
      LokiStepContainer,
      null,
      steps
    );
  };

  Loki.prototype._renderComponents = function _renderComponents() {
    if (!this.props.steps) {
      return;
    }

    if (this.props.renderComponents) {
      return this.props.renderComponents(this._lokiData());
    }

    var _lokiData2 = this._lokiData(),
        stepIndex = _lokiData2.stepIndex,
        cantBack = _lokiData2.cantBack,
        isInFinalStep = _lokiData2.isInFinalStep,
        backHandler = _lokiData2.backHandler,
        nextHandler = _lokiData2.nextHandler;

    var component = this.props.steps[stepIndex].component;

    if (this.props.noActions) {
      return React.cloneElement(component, {
        isComplete: this.state.complete,
        backLabel: this.props.backLabel,
        nextLabel: isInFinalStep ? this.props.finishLabel : this.props.nextLabel,
        cantBack: cantBack,
        isInFinalStep: isInFinalStep,
        onBack: backHandler,
        onNext: nextHandler
      });
    }

    return component;
  };

  Loki.prototype._renderActions = function _renderActions() {
    // If we don't want the buttons we do not render them
    if (!this.props.steps || this.props.noActions) {
      return;
    }

    var cantBack = this.state.currentStep === 1;
    var isInFinalStep = this.state.currentStep === this.props.steps.length;

    // If we want custom actions we render them
    if (this.props.renderActions) {
      return this.props.renderActions(this._lokiData());
    }

    return React.createElement(
      "div",
      { className: "Loki-Actions" },
      React.createElement(
        "button",
        {
          type: "button",
          onClick: this._back.bind(this),
          disabled: cantBack || this.state.complete
        },
        this.props.backLabel
      ),
      React.createElement(
        "button",
        {
          type: "button",
          onClick: this._next.bind(this),
          disabled: this.state.complete
        },
        isInFinalStep ? this.props.finishLabel : this.props.nextLabel
      )
    );
  };

  Loki.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "Loki" },
      this._renderSteps(),
      this._renderComponents(),
      this._renderActions()
    );
  };

  return Loki;
}(Component), _class.defaultProps = {
  backLabel: "Back",
  nextLabel: "Next",
  finishLabel: "Finish",
  activeStep: 1
}, _temp2);


Loki.propTypes = process.env.NODE_ENV !== "production" ? {
  steps: PropTypes.array.isRequired,
  onFinish: PropTypes.func.isRequired,
  activeStep: PropTypes.number
} : {};

export { Loki as default, LokiStepContainer, LokiStep };