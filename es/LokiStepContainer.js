import React from 'react';

var LokiStepContainer = function LokiStepContainer(_ref) {
    var children = _ref.children;
    return React.createElement(
        "ol",
        { className: "LokiSteps" },
        children
    );
};

export default LokiStepContainer;