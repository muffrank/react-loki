import React from "react";
import PropTypes from "prop-types";

var LokiStep = function LokiStep(_ref) {
  var currentStep = _ref.currentStep,
      stepsDone = _ref.stepsDone,
      totalSteps = _ref.totalSteps,
      step = _ref.step,
      isLokiComplete = _ref.isLokiComplete,
      goTo = _ref.goTo;

  var isActive = currentStep === step.index;
  var isComplete = currentStep > step.index;
  var isDisabled = !isActive && !isComplete;

  return React.createElement(
    "li",
    {
      className: "LokiStep " + (isActive && "LokiStep-Active") + " " + ((isComplete || isLokiComplete) && "LokiStep-Complete")
    },
    React.createElement(
      "a",
      {
        href: "#",
        onClick: function onClick(event) {
          event.preventDefault();

          if (isDisabled) {
            return;
          }

          goTo(step.index);
        },
        className: "LokiStep-Link " + (isDisabled && "disabled"),
        disabled: isDisabled
      },
      React.createElement(
        "div",
        { className: "LokiStep-Icon" },
        step.icon || step.index
      )
    )
  );
};

LokiStep.propTypes = process.env.NODE_ENV !== "production" ? {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  step: PropTypes.object.isRequired,
  isLokiComplete: PropTypes.bool.isRequired
} : {};

export default LokiStep;