import './notification.css';
import 'bootstrap/js/src/tooltip.js';
import angular from 'angular';

import ngeoMessageNotification from 'ngeo/message/Notification.js';


/** @type {angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoMessageNotification.name,
]);


/**
 * @param {import("ngeo/message/Notification.js").MessageNotification} ngeoNotification
 *    Ngeo notification service.
 * @ngInject
 * @constructor
 */
function MainController(ngeoNotification) {

  /**
   * @type {import("ngeo/message/Notification.js").MessageNotification}
   */
  this.notification = ngeoNotification;

  /**
   * @type {number}
   * @private
   */
  this.i_ = 1;

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });

}


/**
 * Demonstrates how to display multiple messages at once with the notification
 * service.
 */
MainController.prototype.notifyMulti = function() {
  this.notification.notify([{
    msg: ['Error #', this.i_++].join(''),
    type: 'error'
  }, {
    msg: ['Warning #', this.i_++].join(''),
    type: 'warning'
  }, {
    msg: ['Information #', this.i_++].join(''),
    type: 'information'
  }, {
    msg: ['Success #', this.i_++].join(''),
    type: 'success'
  }]);
};


/**
 * Demonstrates how to display a message in an other target than the original
 * one defined by the notification service.
 */
MainController.prototype.notifyTarget = function() {
  this.notification.notify({
    msg: 'Error in an other target',
    target: '#my-messages',
    type: 'error'
  });
};

/**
 * Demonstrates how to display a message for a specific number of seconds.
 */
MainController.prototype.notifyQuick = function() {
  this.notification.notify({
    delay: 1000,
    msg: 'Lasts one second',
    type: 'success'
  });
};


module.controller('MainController', MainController);


export default module;
