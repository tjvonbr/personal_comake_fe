"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiURL = process.env.REACT_APP_API_URL;

function login(credentials) {
  return _axios["default"].post("".concat(apiURL, "/auth/login"), credentials).then(function (response) {
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject("Sorry, but something went wrong during your login!");
    }
  });
}