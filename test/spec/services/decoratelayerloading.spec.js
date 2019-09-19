import angular from 'angular';
import {layerLoading} from 'ngeo/misc/decorate.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerGroup from 'ol/layer/Group.js';
import olSourceImage from 'ol/source/Image.js';


describe('ngeo.misc.DecorateLayerLoading test suite', () => {
  /** @type {angular.IScope} */
  let scope;

  beforeEach(angular.mock.inject(($rootScope) => {
    scope = $rootScope.$new();
  }));

  it('should increment layerLoadingCount recursively', () => {
    const imageSource = new olSourceImage({
      projection: undefined, // should be removed in next OL version
    });
    const layer = new olLayerImage({source: imageSource});
    const lg_1 = new olLayerGroup();
    const lg_2 = new olLayerGroup();

    layerLoading(/** @type {import('ol/layer/Base.js').default} */(layer), scope);
    layerLoading(/** @type {import('ol/layer/Base.js').default} */(lg_1), scope);
    layerLoading(/** @type {import('ol/layer/Base.js').default} */(lg_2), scope);

    lg_1.getLayers().insertAt(0, /** @type {import('ol/layer/Base.js').default} */(layer));
    lg_2.getLayers().insertAt(0, /** @type {import('ol/layer/Base.js').default} */(lg_1));

    expect(layer.get('load_count')).toBe(0);
    expect(lg_1.get('load_count')).toBe(0);
    expect(lg_2.get('load_count')).toBe(0);

    imageSource.dispatchEvent('imageloadstart');

    expect(layer.get('load_count')).toBe(1);
    expect(lg_1.get('load_count')).toBe(1);
    expect(lg_2.get('load_count')).toBe(1);

    imageSource.dispatchEvent('imageloadend');

    expect(layer.get('load_count')).toBe(0);
    expect(lg_1.get('load_count')).toBe(0);
    expect(lg_2.get('load_count')).toBe(0);
  });
});
