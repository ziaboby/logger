(
    function () {

        'use strict';

        const GLOBAL = self || window;

        const LEVEL = {
            ALL: -1,
            OFF: 0,
            INFO: 1,
            DEBUG: 2,
            WARN: 3,
            ERROR: 4
        };

        Object.freeze(LEVEL);

        const mapMethodsLevels = {
            log: LEVEL.INFO,
            debug: LEVEL.DEBUG,
            warm: LEVEL.WARN,
            error: LEVEL.ERROR
        };
        /* 
        const mapMethodsLevels = new Map([
            ['log', LEVEL.INFO],
            ['debug', LEVEL.DEBUG],
            ['warm', LEVEL.WARN],
            ['error', LEVEL.ERROR]
        ])
         */
        function Logger() {
            /*     
                this._statusMapping = {
                    0: 'none',
                    1: 'log',
                    2: 'debug',
                    3: 'error'
                };
                this._maxLevelByStatus = {
                    'log': 1,
                }; 
            */
            this.key = '';
            this.status = 0;
            Object.defineProperty(this, '_console', {
                value: GLOBAL.console,
                configurable: false,
                enumerable: false,
                writable: false
            });
            Object.defineProperty(this, '_logger', {
                value: function (type, message, key) {
                    if (!this.key || this.key === key) {
                        this._console[type](message);
                    }
                },
                configurable: false,
                enumerable: false,
                writable: false
            });
            Object.defineProperty(this, 'LEVEL', {
                value: LEVEL,
                configurable: false,
                enumerable: true,
                writable: false
            });
            Object.defineProperty(this, 'VERSION', {
                value: 'alpha@1.0.0',
                configurable: false,
                enumerable: false,
                writable: false
            });

        }

        Logger.prototype = {
            log: function (message, key) {
                this._logger('log', message, key);
            },
            debug: function (message, key) {
                this._logger('debug', message, key);
            },
            error: function (message, key) {
                this._logger('error', message, key);
            },
            setStatus: function () { return; },
            resetStatus: function () { return; },
        };

        GLOBAL.Logger = new Logger();

    }

)();
/**
 * * make read only some props and methods
 * TODO
 * * handle number of params based on log level function type
 * * support standard log levels
 * * storaging
 * * handle constant, log levels
 * * show more levels with setStatus, like php
 * * store old logs, even the not visible ones, to recover later
 *  * option for storing to save them in case of refresh
 */