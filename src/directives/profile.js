/**
 * @fileoverview Provides a directive used to insert an elevation profile chart
 * in the DOM.
 *
 * Example:
 *
 * <div ngeo-profile="ctrl.profileData"
 *      ngeo-profile-options="ctrl.profileOptions"></div>
 *
 * Note: "ctrl.profileOptions" is of type ngeox.profile.ProfileOptions.
 */
goog.provide('ngeo.profileDirective');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ngeo.profile');


/**
 * @return {angular.Directive} Directive Definition Object.
 */
ngeo.profileDirective = function() {
  return {
    restrict: 'A',
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         */
        function(scope, element, attrs) {

          var optionsAttr = attrs['ngeoProfileOptions'];
          goog.asserts.assert(goog.isDef(optionsAttr));

          var selection = d3.select(element[0]);
          var profile, options, data;

          scope.$watchCollection(optionsAttr, function(newVal) {
            options = newVal;
            if (goog.isDef(options)) {
              profile = ngeo.profile(options);
              refreshData();
            }
          });

          scope.$watch(attrs['ngeoProfile'], function(newVal, oldVal) {
            data = newVal;
            refreshData();
          });

          function refreshData() {
            if (goog.isDef(profile) && goog.isDef(data)) {
              selection.datum(data).call(profile);
            }
          }
        }
  };
};

ngeoModule.directive('ngeoProfile', ngeo.profileDirective);
