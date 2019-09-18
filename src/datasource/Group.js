import olCollection from 'ol/Collection.js';


/**
 * The options required to create a `Group`.
 *
 * @typedef {Object} GroupOptions
 * @property {Array<import('ngeo/datasource/DataSource.js').default>} dataSources List of data source
 *    combined in the group.
 *    At least one must be defined upon the cration of the group.
 * @property {string} title A human-readable title for the group. Usually, the WMS Server title is
 * used for this property.
 */


/**
 * @typedef {'indeterminate' | 'off' | 'on'} VisibilityState
 */


/**
 * @private
 * @hidden
 */
class Group {

  /**
   * A Group data source combines multiple `ngeo.datasource.DataSource` objects.
   * Its main purpose is to provide a calculated `visibilityState` property
   * that can be used to determine if all its data source are all visible, all
   * hidden or some are hidden and other visible.
   *
   * @param {GroupOptions} options Options.
   */
  constructor(options) {

    // === DYNAMIC properties (i.e. that can change / be watched ===

    /**
     * @type {import("ol/Collection.js").default<import("ngeo/datasource/DataSource.js").default>}
     * @protected
     */
    this.dataSourcesCollection_ = new olCollection(options.dataSources);


    // === STATIC properties (i.e. that never change) ===

    /**
     * @type {string}
     * @private
     */
    this.title_ = options.title;
  }

  destroy() {
    this.dataSourcesCollection_.clear();
  }

  // ========================================
  // === Dynamic property getters/setters ===
  // ========================================

  /**
   * @return {Array<import("ngeo/datasource/DataSource.js").default>} Data sources
   */
  get dataSources() {
    return this.dataSourcesCollection_.getArray();
  }


  /**
   * @return {import("ol/Collection.js").default<import("ngeo/datasource/DataSource.js").default>}
   *    Data sources
   */
  get dataSourcesCollection() {
    return this.dataSourcesCollection_;
  }


  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @return {string} Title
   */
  get title() {
    return this.title_;
  }


  // ===================================
  // === Calculated property getters ===
  // ===================================

  /**
   * @return {VisibilityState} Visibility state
   */
  get visibilityState() {
    /** @type {VisibilityState} */
    let state;

    for (const dataSource of this.dataSources) {
      if (state === undefined) {
        state = this.getDataSourceState(dataSource);
      } else {
        const otherState = this.getDataSourceState(dataSource);
        if (otherState !== state) {
          state = 'indeterminate';
        }
      }
      if (state === 'indeterminate') {
        break;
      }
    }

    if (state === undefined) {
      throw new Error('missing state');
    }
    return state;
  }


  // =======================
  // === Utility Methods ===
  // =======================

  /**
   * @param {import("ngeo/datasource/DataSource.js").default} dataSource Data source.
   * @return {VisibilityState} Visible state of a data source
   */
  getDataSourceState(dataSource) {
    return dataSource.visible ? 'on' : 'off';
  }

  /**
   * @param {import("ngeo/datasource/DataSource.js").default} dataSource Data source to add.
   */
  addDataSource(dataSource) {
    this.dataSourcesCollection_.push(dataSource);
  }

  /**
   * @param {import("ngeo/datasource/DataSource.js").default} dataSource Data source to remove.
   */
  removeDataSource(dataSource) {
    this.dataSourcesCollection_.remove(dataSource);
  }

  /**
   * Update visible property of all data sources depending on the current
   * visibility state:
   *
   * - state ON --> visible false
   * - state OFF --> visible true
   * - state IND. --> visible true
   *
   */
  toggleVisibilityState() {
    const visibleToSet = this.visibilityState !== 'on';
    for (const dataSource of this.dataSources) {
      if (dataSource.visible !== visibleToSet) {
        dataSource.visible = visibleToSet;
      }
    }
  }
}


export default Group;
