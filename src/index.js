import React, { Component } from "react";
import PropTypes from "prop-types";

import LokiStep from "./LokiStep";
import LokiStepContainer from "./LokiStepContainer";

class Loki extends Component {
  static defaultProps = {
    backLabel: "Back",
    nextLabel: "Next",
    finishLabel: "Finish",
    activeStep: 1,
  };

  state = {
    currentStep: this.props.activeStep || 1,
    stepsDone: [],
    complete: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeStep !== this.state.currentStep) {
      this.setState({ ...this.state, currentStep: nextProps.activeStep });
    }
  }

  _back(data) {
    this.props.onBack && this.props.onBack(data);
    this.setState({ currentStep: this.state.currentStep - 1 });
  }

  _next(data) {
    if (this.state.currentStep === this.props.steps.length) {
      this.props.onFinish(data);
      return this.setState({ complete: true });
    }

    this.props.onNext && this.props.onNext(data);
    this.setState({
      currentStep: this.state.currentStep + 1,
      stepsDone: this.state.stepsDone.concat([this.state.currentStep]),
    });
  }

  _lokiData() {
    return {
      currentStep: this.state.currentStep,
      stepIndex: this.state.currentStep - 1,
      cantBack: this.state.currentStep === 1,
      isInFinalStep: this.state.currentStep === this.props.steps.length,
      backHandler: this._back.bind(this),
      nextHandler: this._next.bind(this),
    };
  }

  _renderSteps() {
    if (!this.props.steps) {
      return;
    }

    if (this.props.renderSteps) {
      return this.props.renderSteps(this._lokiData());
    }

    const steps = this.props.steps.map((step, index) => (
      <LokiStep
        key={index}
        stepsDone={this.state.stepsDone}
        currentStep={this.state.currentStep}
        totalSteps={this.props.steps.length}
        step={{ ...step, index: index + 1 }}
        goTo={(newStep) => this.setState({ currentStep: newStep })}
        isLokiComplete={this.state.complete}
      />
    ));

    return <LokiStepContainer>{steps}</LokiStepContainer>;
  }

  _renderComponents() {
    if (!this.props.steps) {
      return;
    }

    if (this.props.renderComponents) {
      return this.props.renderComponents(this._lokiData());
    }

    const { stepIndex, cantBack, isInFinalStep, backHandler, nextHandler } =
      this._lokiData();

    const component = this.props.steps[stepIndex].component;

    if (this.props.noActions) {
      return React.cloneElement(component, {
        isComplete: this.state.complete,
        backLabel: this.props.backLabel,
        nextLabel: isInFinalStep
          ? this.props.finishLabel
          : this.props.nextLabel,
        cantBack,
        isInFinalStep,
        onBack: backHandler,
        onNext: nextHandler,
      });
    }

    return component;
  }

  _renderActions() {
    // If we don't want the buttons we do not render them
    if (!this.props.steps || this.props.noActions) {
      return;
    }

    const cantBack = this.state.currentStep === 1;
    const isInFinalStep = this.state.currentStep === this.props.steps.length;

    // If we want custom actions we render them
    if (this.props.renderActions) {
      return this.props.renderActions(this._lokiData());
    }

    return (
      <div className="Loki-Actions">
        <button
          type="button"
          onClick={this._back.bind(this)}
          disabled={cantBack || this.state.complete}
        >
          {this.props.backLabel}
        </button>
        <button
          type="button"
          onClick={this._next.bind(this)}
          disabled={this.state.complete}
        >
          {isInFinalStep ? this.props.finishLabel : this.props.nextLabel}
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="Loki">
        {this._renderSteps()}
        {this._renderComponents()}
        {this._renderActions()}
      </div>
    );
  }
}

Loki.propTypes = {
  steps: PropTypes.array.isRequired,
  onFinish: PropTypes.func.isRequired,
  activeStep: PropTypes.number,
};

export { Loki as default, LokiStepContainer, LokiStep };
