"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LokiStepContainer = function LokiStepContainer(_ref) {
    var children = _ref.children;
    return _react2.default.createElement(
        "ol",
        { className: "LokiSteps" },
        children
    );
};

exports.default = LokiStepContainer;
module.exports = exports["default"];