"use strict";
(() => {
var exports = {};
exports.id = 621;
exports.ids = [621];
exports.modules = {

/***/ 663:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 699:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const mongoose = __webpack_require__(663);
const PaymentSchema = new mongoose.Schema({
    "status": String,
    "chain": String,
    "coin": String,
    "toPayUSD": Number,
    "toPayCrypto": Number,
    "fromWallet": String,
    "toWallet": String,
    "dateStart": Date,
    "dateEnd": Date,
    "plan": String,
    "mail": String
});
module.exports = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);


/***/ }),

/***/ 908:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ payments)
});

// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__(663);
var external_mongoose_default = /*#__PURE__*/__webpack_require__.n(external_mongoose_);
;// CONCATENATED MODULE: ./utils/dbConnect.js

const connection = {};
async function dbConnect() {
    if (connection.isConnected) {
        return;
    }
    const db = await external_mongoose_default().connect("mongodb+srv://odaclan:ODAclan1!@odaclan.negcqcl.mongodb.net/odaclan?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected);
}
/* harmony default export */ const utils_dbConnect = (dbConnect);

// EXTERNAL MODULE: ./models/Payment.js
var Payment = __webpack_require__(699);
var Payment_default = /*#__PURE__*/__webpack_require__.n(Payment);
;// CONCATENATED MODULE: ./pages/api/payments/index.js


utils_dbConnect();
// eslint-disable-next-line import/no-anonymous-default-export
/* harmony default export */ const payments = (async (req, res)=>{
    const { method  } = req;
    switch(method){
        case "GET":
            try {
                const payments = await Payment_default().find({});
                res.status(200).json({
                    success: true,
                    data: payments
                });
            } catch (err) {
                res.status(400).json({
                    success: false
                });
            }
            break;
        case "POST":
            try {
                const payment = await Payment_default().create(req.body);
                res.status(201).json({
                    success: true,
                    data: payment
                });
            } catch (err1) {
                res.status(400).json({
                    success: false
                });
            }
            break;
        default:
            res.status(400).json({
                success: false
            });
            break;
    }
});


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(908));
module.exports = __webpack_exports__;

})();