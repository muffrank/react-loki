"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  return _react2.default.createElement(
    "li",
    {
      className: "LokiStep " + (isActive && "LokiStep-Active") + " " + ((isComplete || isLokiComplete) && "LokiStep-Complete")
    },
    _react2.default.createElement(
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
      _react2.default.createElement(
        "div",
        { className: "LokiStep-Icon" },
        step.icon || step.index
      )
    )
  );
};

LokiStep.propTypes = process.env.NODE_ENV !== "production" ? {
  currentStep: _propTypes2.default.number.isRequired,
  totalSteps: _propTypes2.default.number.isRequired,
  step: _propTypes2.default.object.isRequired,
  isLokiComplete: _propTypes2.default.bool.isRequired
} : {};

exports.default = LokiStep;
module.exports = exports["default"];