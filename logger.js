"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var package_json_1 = __importDefault(require("./package.json"));
var loggerType;
(function (loggerType) {
    loggerType[loggerType["LOG"] = 0] = "LOG";
    loggerType[loggerType["DEBUG"] = 1] = "DEBUG";
    loggerType[loggerType["WARN"] = 2] = "WARN";
    loggerType[loggerType["ERROR"] = 3] = "ERROR";
})(loggerType || (loggerType = {}));
var Logger = (function () {
    function Logger(activeLogTypes) {
        this.__version = package_json_1.default.version;
        this.availableLoggerTypes = Object.keys(loggerType).filter(function (item) {
            return isNaN(parseInt(item));
        });
        this._activeLogTypes = activeLogTypes ? activeLogTypes.slice(0) : [];
    }
    Object.defineProperty(Logger.prototype, "version", {
        get: function () {
            return this.__version;
        },
        enumerable: false,
        configurable: true
    });
    Logger.prototype.isLogTypeEnabled = function (logType) {
        return this._activeLogTypes.includes(logType);
    };
    Object.defineProperty(Logger.prototype, "enableLogTypes", {
        set: function (activeLogTypes) {
            this._activeLogTypes = activeLogTypes.slice(0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "enableLogType", {
        set: function (logType) {
            if (this.isLogTypeEnabled(logType)) {
                this._activeLogTypes.push(logType);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "disableLogType", {
        set: function (logType) {
            if (this.isLogTypeEnabled(logType)) {
                this._activeLogTypes.filter(function (item) { return item !== logType; });
            }
        },
        enumerable: false,
        configurable: true
    });
    Logger.prototype.resetLogTypes = function () {
        this._activeLogTypes = [];
    };
    Logger.prototype._console = function (type, key, args) {
        var _a;
        key && args.unshift("[" + key + "]");
        (_a = window.console)[type].apply(_a, args);
    };
    Logger.prototype.log = function (message, key) {
        this._console("log", key, message);
    };
    Logger.prototype.debug = function (message, key) {
        this._console("debug", key, message);
    };
    Logger.prototype.warn = function (message, key) {
        this._console("warn", key, message);
    };
    Logger.prototype.error = function (message, key) {
        this._console("error", key, message);
    };
    return Logger;
}());
exports.default = Logger;
