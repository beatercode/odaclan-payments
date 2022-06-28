"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 408:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(930);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: ./components/Footer.js



class Footer extends external_react_.Component {
    render() {
        return(//<div style={{ position: "absolute", bottom: 0, width: "100%" }} className="bg-gray-100">
        /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
            textAlign: "center",
            width: "100vw",
            position: "absolute",
            children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                fontWeight: "700",
                width: "100vw",
                textAlign: "center",
                children: "\xa9 ODA Clan DAO. All rights reserved"
            })
        }));
    }
}
/* harmony default export */ const components_Footer = (Footer);

;// CONCATENATED MODULE: ./pages/_app.js





const config = {
    initialColorMode: "dark",
    useSystemColorMode: false
};
const theme = (0,react_.extendTheme)({
    config
});
function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.ChakraProvider, {
        theme: theme,
        cssVarsRoot: "body",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_Footer, {})
        ]
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(408));
module.exports = __webpack_exports__;

})();