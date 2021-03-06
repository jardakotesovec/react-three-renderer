import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

class GeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('vertices', {
      type: PropTypes.arrayOf(propTypeInstanceOf(THREE.Vector3)).isRequired,
      update(threeObject, vertices) {
        if (threeObject.vertices !== vertices) {
          threeObject.vertices = vertices;

          threeObject.verticesNeedUpdate = true;
        }
      },
      updateInitial: true,
      default: [],
    });

    this.hasProp('colors', {
      type: PropTypes.arrayOf(propTypeInstanceOf(THREE.Color)),
      update(threeObject, colors, hasProp) {
        if (hasProp) {
          if (threeObject.colors !== colors) {
            threeObject.colors = colors;

            threeObject.colorsNeedUpdate = true;
          }
        }
      },
      updateInitial: true,
      default: [],
    });

    this.hasProp('faceVertexUvs', {
      type: PropTypes.arrayOf(PropTypes.arrayOf(THREE.Vector2)),
      update(threeObject, faceVertexUvs, hasProp) {
        if (hasProp) {
          if (threeObject.faceVertexUvs !== faceVertexUvs) {
            threeObject.faceVertexUvs = faceVertexUvs;

            threeObject.uvsNeedUpdate = true;
          }
        }
      },
      updateInitial: true,
      default: [],
    });

    this.hasProp('faces', {
      type: PropTypes.arrayOf(propTypeInstanceOf(THREE.Face3)),
      update(threeObject, faces) {
        if (threeObject.faces !== faces) {
          threeObject.faces = faces;

          threeObject.verticesNeedUpdate = true;
          threeObject.elementsNeedUpdate = true;
        }
      },
      updateInitial: true,
      default: [],
    });
  }

  construct() {
    return new THREE.Geometry();
  }
}

module.exports = GeometryDescriptor;
