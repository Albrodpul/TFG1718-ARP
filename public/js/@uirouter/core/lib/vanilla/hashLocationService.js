"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internalapi
 * @module vanilla
 */
/** */
var strings_1 = require("../common/strings");
var baseLocationService_1 = require("./baseLocationService");
/** A `LocationServices` that uses the browser hash "#" to get/set the current location */
var HashLocationService = /** @class */ (function (_super) {
    __extends(HashLocationService, _super);
    function HashLocationService(router) {
        var _this = _super.call(this, router, false) || this;
        self.addEventListener('hashchange', _this._listener, false);
        return _this;
    }
    HashLocationService.prototype._get = function () {
        return strings_1.trimHashVal(this._location.hash);
    };
    HashLocationService.prototype._set = function (state, title, url, replace) {
        this._location.hash = url;
    };
    HashLocationService.prototype.dispose = function (router) {
        _super.prototype.dispose.call(this, router);
        self.removeEventListener('hashchange', this._listener);
    };
    return HashLocationService;
}(baseLocationService_1.BaseLocationServices));
exports.HashLocationService = HashLocationService;
//# sourceMappingURL=hashLocationService.js.map