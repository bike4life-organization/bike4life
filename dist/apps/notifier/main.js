/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/notifier/src/pull-listener.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const commons_1 = __webpack_require__("./libs/commons/src/index.ts");
const { PUBSUB_PROJECT_ID, PUBSUB_SUBSCRIPTION_NAME, PUBSUB_TOPIC_NAME } = process.env;
const pubsubSettings = {
    projectId: PUBSUB_PROJECT_ID,
    subscriptionName: PUBSUB_SUBSCRIPTION_NAME,
    topicName: PUBSUB_TOPIC_NAME
};
function startPullListener() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const pubsubClient = new commons_1.PubSubClient(pubsubSettings.projectId, commons_1.logger);
        try {
            const subscription = yield pubsubClient.getSubscription(pubsubSettings.topicName, pubsubSettings.subscriptionName);
            commons_1.logger.info('listening messages from topics');
            subscription.on('message', (message) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const { attributes } = message;
                commons_1.logger.info(`received message from topic ${attributes.topic}: ${message.id}, ${message.data.toString()}`);
                message.ack(); // we ack or we will get it redelivered
            }));
            // Receive callbacks for errors on the subscription
            subscription.on('error', err => {
                console.log(err);
                commons_1.logger.error('error received from subscription');
            });
        }
        catch (err) {
            console.log(err);
            commons_1.logger.error({ error: err });
            process.exit(1);
        }
    });
}
exports["default"] = startPullListener;


/***/ }),

/***/ "./libs/commons/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/commons/src/lib/commons.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/commons/src/lib/logger.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/commons/src/lib/pubsub/client.ts"), exports);


/***/ }),

/***/ "./libs/commons/src/lib/commons.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.commons = void 0;
function commons() {
    return 'commons';
}
exports.commons = commons;


/***/ }),

/***/ "./libs/commons/src/lib/logger.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stream = exports.logger = void 0;
const winston_1 = __webpack_require__("winston");
// Define log format
const logFormat = winston_1.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), logFormat),
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.splat(), winston_1.format.colorize()),
        }),
    ],
});
exports.logger = logger;
const stream = {
    write: (message) => {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
};
exports.stream = stream;


/***/ }),

/***/ "./libs/commons/src/lib/pubsub/client.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PubSubClient = void 0;
const tslib_1 = __webpack_require__("tslib");
const pubsub_1 = __webpack_require__("@google-cloud/pubsub");
class PubSubClient {
    constructor(projectId, logger) {
        this.projectId = projectId;
        this.client = new pubsub_1.PubSub({ projectId });
        if (logger) {
            this.logger = logger;
        }
    }
    publishMessage(topicName, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { payload, attributes } = message;
            const topic = yield this.getTopic(topicName);
            const messageBuffer = Buffer.from(JSON.stringify(payload), 'utf8');
            const messageId = yield topic.publish(messageBuffer, attributes);
            yield topic.flush();
            return messageId;
        });
    }
    /**
    *
    * @param maxInProgress Limit how many messages can have the subscription in progress. 0 means unlimited
    * @returns A PubSub subscription
    */
    getSubscription(topicName, subscriptionName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const topic = yield this.getTopic(topicName);
            let subscription;
            try {
                [subscription] = yield topic.createSubscription(subscriptionName);
                this.logger.info({ subscription: subscriptionName, message: 'subscription created' });
            }
            catch (err) {
                const castedErr = err;
                if (castedErr.code === 6) { // Already exists
                    subscription = topic.subscription(subscriptionName);
                }
                else {
                    this.logger.error({ error: err, message: 'error creating subscription' });
                    throw err;
                }
            }
            return subscription;
        });
    }
    getTopic(topicName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let topic;
            try {
                [topic] = yield this.client.createTopic(topicName);
                this.logger.info({ topic: topic.name, message: 'topic created' });
            }
            catch (err) {
                const castedErr = err;
                if (castedErr.code === 6) { // Already exists
                    topic = this.client.topic(topicName);
                }
                else {
                    this.logger.error({ error: err, topic: topicName, message: 'error creating topic' });
                    throw err;
                }
            }
            return topic;
        });
    }
}
exports.PubSubClient = PubSubClient;


/***/ }),

/***/ "@google-cloud/pubsub":
/***/ ((module) => {

module.exports = require("@google-cloud/pubsub");

/***/ }),

/***/ "dotenv":
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "winston":
/***/ ((module) => {

module.exports = require("winston");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dotenv_1 = __webpack_require__("dotenv");
(0, dotenv_1.config)({ path: '../../.env' });
const pull_listener_1 = __webpack_require__("./apps/notifier/src/pull-listener.ts");
const start = () => {
    return (0, pull_listener_1.default)();
};
start();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map