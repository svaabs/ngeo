import angular from 'angular';

import ngeoDrawFeatures from 'ngeo/draw/features.js';

import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';
import {interaction as ngeoMiscDecorateInteraction} from 'ngeo/misc/decorate.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import olFeature from 'ol/Feature.js';

/**
 * @param {!angular.IScope} $scope Scope.
 * @param {angular.ISCEService} $sce Angular sce service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @param {import("ngeo/misc/FeatureHelper.js").default} ngeoFeatureHelper Ngeo feature helper service.
 * @param {import("ol/Collection.js").default.<import("ol/Feature.js").default>} ngeoFeatures Collection of features.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoDrawfeatureController
 */
export function DrawController($scope, $sce, gettextCatalog,
  ngeoFeatureHelper, ngeoFeatures) {

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  if (this.active === undefined) {
    this.active = false;
  }

  /**
   * Alternate collection of features in which to push the drawn features.
   * If not defined, then `ngeoFeatures` is used instead.
   * @type {!import("ol/Collection.js").default.<!import("ol/Feature.js").default>|undefined}
   * @export
   */
  this.features;

  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map;

  /**
   * @type {boolean}
   * @export
   */
  this.showMeasure;

  /**
   * @type {angular.gettext.gettextCatalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;
  // Fill the string collection
  gettextCatalog.getString('Point');
  gettextCatalog.getString('LineString');
  gettextCatalog.getString('Polygon');
  gettextCatalog.getString('Circle');
  gettextCatalog.getString('Rectangle');
  gettextCatalog.getString('Text');

  /**
   * @type {import("ngeo/misc/FeatureHelper.js").default}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {import("ol/Collection.js").default.<import("ol/Feature.js").default>}
   * @private
   */
  this.ngeoFeatures_ = ngeoFeatures;

  /**
   * @type {Array.<import("ol/interaction/Interaction.js").default>}
   * @private
   */
  this.interactions_ = [];

  /**
   * @type {import("ol/interaction/Draw.js").default}
   * @export
   */
  this.drawPoint;

  /**
   * @type {import("ngeo/interaction/MeasureLength.js").default}
   * @export
   */
  this.measureLength;

  /**
   * @type {import("ngeo/interaction/MeasureArea.js").default}
   * @export
   */
  this.measureArea;

  /**
   * @type {import("ngeo/interaction/MeasureAzimut.js").default}
   * @export
   */
  this.measureAzimut;

  /**
   * @type {import("ol/interaction/Draw.js").default}
   * @export
   */
  this.drawRectangle;

  /**
   * @type {import("ol/interaction/Draw.js").default}
   * @export
   */
  this.drawText;


  // Watch the "active" property, and disable the draw interactions
  // when "active" gets set to false.
  $scope.$watch(
    () => this.active,
    (newVal) => {
      if (newVal === false) {
        this.interactions_.forEach((interaction) => {
          interaction.setActive(false);
        });
      }
    }
  );

}


/**
 * Register a draw|measure interaction by setting it inactive, decorating it
 * and adding it to the map
 * @param {import("ol/interaction/Interaction.js").default} interaction Interaction to register.
 * @export
 */
DrawController.prototype.registerInteraction = function(
  interaction) {
  this.interactions_.push(interaction);
  interaction.setActive(false);
  ngeoMiscDecorateInteraction(interaction);
  this.map.addInteraction(interaction);
};


/**
 * Called when any of the draw or measure interaction active property changes.
 * Set the active property of this directive accordingly, i.e. if at least
 * one of the draw or measure is active then the active property is set to true.
 * @param {import("ol/Object/Event.js").default} event Event.
 * @export
 */
DrawController.prototype.handleActiveChange = function(event) {
  this.active = this.interactions_.some(interaction => interaction.getActive(), this);
};


/**
 * Called when a feature is finished being drawn. Set the default properties
 * for its style, then set its style and add it to the features collection.
 * @param {string} type Type of geometry being drawn.
 * @param {import("ol/interaction/Draw/Event.js").default|MeasureEvent} event Event.
 * @export
 */
DrawController.prototype.handleDrawEnd = function(type, event) {
  let sketch;
  if (event.feature) {
    // ol.interaction.Draw.Event
    sketch = event.feature;
  } else {
    // MeasureEvent
    sketch = event.detail.feature;
  }
  console.assert(sketch);

  const azimut = sketch.get('azimut');

  const features = this.features || this.ngeoFeatures_;

  const feature = new olFeature(sketch.getGeometry());

  const prop = ngeoFormatFeatureProperties;

  switch (type) {
    case ngeoGeometryType.CIRCLE:
      feature.set(prop.IS_CIRCLE, true);
      if (azimut !== undefined) {
        feature.set(prop.AZIMUT, azimut);
      }
      break;
    case ngeoGeometryType.TEXT:
      feature.set(prop.IS_TEXT, true);
      break;
    case ngeoGeometryType.RECTANGLE:
      feature.set(prop.IS_RECTANGLE, true);
      break;
    default:
      break;
  }

  /**
   * @type {string}
   */
  const name = this.gettextCatalog_.getString(type);
  feature.set(prop.NAME, `${name} ${features.getLength() + 1}`);

  /**
   * @type {string}
   */
  const color = type !== ngeoGeometryType.TEXT ? '#DB4436' : '#000000';
  feature.set(prop.COLOR, color);

  feature.set(prop.ANGLE, 0);
  feature.set(prop.OPACITY, 0.2);
  feature.set(prop.SHOW_MEASURE, this.showMeasure ? true : false);
  feature.set(prop.SHOW_LABEL, false);
  feature.set(prop.SIZE, 10);
  feature.set(prop.STROKE, 2);

  // set style
  this.featureHelper_.setStyle(feature);

  // push in collection
  features.push(feature);
};


/**
 * @type {!angular.IModule}
 */
const module = angular.module('ngeoDrawfeatureController', [
  ngeoDrawFeatures.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscFeatureHelper.name,
]);
module.controller('ngeoDrawfeatureController', DrawController);


export default module;
