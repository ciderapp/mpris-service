"use strict";

function _decorate(e, r, t, i) { var o = _getDecoratorsApi(); if (i) for (var n = 0; n < i.length; n++) o = i[n](o); var s = r(function (e) { o.initializeInstanceElements(e, a.elements); }, t), a = o.decorateClass(_coalesceClassElements(s.d.map(_createElementDescriptor)), e); return o.initializeClassElements(s.F, a.elements), o.runClassFinishers(s.F, a.finishers); }
function _getDecoratorsApi() { _getDecoratorsApi = function () { return e; }; var e = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function (e, r) { ["method", "field"].forEach(function (t) { r.forEach(function (r) { r.kind === t && "own" === r.placement && this.defineClassElement(e, r); }, this); }, this); }, initializeClassElements: function (e, r) { var t = e.prototype; ["method", "field"].forEach(function (i) { r.forEach(function (r) { var o = r.placement; if (r.kind === i && ("static" === o || "prototype" === o)) { var n = "static" === o ? e : t; this.defineClassElement(n, r); } }, this); }, this); }, defineClassElement: function (e, r) { var t = r.descriptor; if ("field" === r.kind) { var i = r.initializer; t = { enumerable: t.enumerable, writable: t.writable, configurable: t.configurable, value: void 0 === i ? void 0 : i.call(e) }; } Object.defineProperty(e, r.key, t); }, decorateClass: function (e, r) { var t = [], i = [], o = { static: [], prototype: [], own: [] }; if (e.forEach(function (e) { this.addElementPlacement(e, o); }, this), e.forEach(function (e) { if (!_hasDecorators(e)) return t.push(e); var r = this.decorateElement(e, o); t.push(r.element), t.push.apply(t, r.extras), i.push.apply(i, r.finishers); }, this), !r) return { elements: t, finishers: i }; var n = this.decorateConstructor(t, r); return i.push.apply(i, n.finishers), n.finishers = i, n; }, addElementPlacement: function (e, r, t) { var i = r[e.placement]; if (!t && -1 !== i.indexOf(e.key)) throw new TypeError("Duplicated element (" + e.key + ")"); i.push(e.key); }, decorateElement: function (e, r) { for (var t = [], i = [], o = e.decorators, n = o.length - 1; n >= 0; n--) { var s = r[e.placement]; s.splice(s.indexOf(e.key), 1); var a = this.fromElementDescriptor(e), l = this.toElementFinisherExtras((0, o[n])(a) || a); e = l.element, this.addElementPlacement(e, r), l.finisher && i.push(l.finisher); var c = l.extras; if (c) { for (var p = 0; p < c.length; p++) this.addElementPlacement(c[p], r); t.push.apply(t, c); } } return { element: e, finishers: i, extras: t }; }, decorateConstructor: function (e, r) { for (var t = [], i = r.length - 1; i >= 0; i--) { var o = this.fromClassDescriptor(e), n = this.toClassDescriptor((0, r[i])(o) || o); if (void 0 !== n.finisher && t.push(n.finisher), void 0 !== n.elements) { e = n.elements; for (var s = 0; s < e.length - 1; s++) for (var a = s + 1; a < e.length; a++) if (e[s].key === e[a].key && e[s].placement === e[a].placement) throw new TypeError("Duplicated element (" + e[s].key + ")"); } } return { elements: e, finishers: t }; }, fromElementDescriptor: function (e) { var r = { kind: e.kind, key: e.key, placement: e.placement, descriptor: e.descriptor }; return Object.defineProperty(r, Symbol.toStringTag, { value: "Descriptor", configurable: !0 }), "field" === e.kind && (r.initializer = e.initializer), r; }, toElementDescriptors: function (e) { if (void 0 !== e) return _toArray(e).map(function (e) { var r = this.toElementDescriptor(e); return this.disallowProperty(e, "finisher", "An element descriptor"), this.disallowProperty(e, "extras", "An element descriptor"), r; }, this); }, toElementDescriptor: function (e) { var r = e.kind + ""; if ("method" !== r && "field" !== r) throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "' + r + '"'); var t = _toPropertyKey(e.key), i = e.placement + ""; if ("static" !== i && "prototype" !== i && "own" !== i) throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "' + i + '"'); var o = e.descriptor; this.disallowProperty(e, "elements", "An element descriptor"); var n = { kind: r, key: t, placement: i, descriptor: Object.assign({}, o) }; return "field" !== r ? this.disallowProperty(e, "initializer", "A method descriptor") : (this.disallowProperty(o, "get", "The property descriptor of a field descriptor"), this.disallowProperty(o, "set", "The property descriptor of a field descriptor"), this.disallowProperty(o, "value", "The property descriptor of a field descriptor"), n.initializer = e.initializer), n; }, toElementFinisherExtras: function (e) { return { element: this.toElementDescriptor(e), finisher: _optionalCallableProperty(e, "finisher"), extras: this.toElementDescriptors(e.extras) }; }, fromClassDescriptor: function (e) { var r = { kind: "class", elements: e.map(this.fromElementDescriptor, this) }; return Object.defineProperty(r, Symbol.toStringTag, { value: "Descriptor", configurable: !0 }), r; }, toClassDescriptor: function (e) { var r = e.kind + ""; if ("class" !== r) throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "' + r + '"'); this.disallowProperty(e, "key", "A class descriptor"), this.disallowProperty(e, "placement", "A class descriptor"), this.disallowProperty(e, "descriptor", "A class descriptor"), this.disallowProperty(e, "initializer", "A class descriptor"), this.disallowProperty(e, "extras", "A class descriptor"); var t = _optionalCallableProperty(e, "finisher"); return { elements: this.toElementDescriptors(e.elements), finisher: t }; }, runClassFinishers: function (e, r) { for (var t = 0; t < r.length; t++) { var i = (0, r[t])(e); if (void 0 !== i) { if ("function" != typeof i) throw new TypeError("Finishers must return a constructor."); e = i; } } return e; }, disallowProperty: function (e, r, t) { if (void 0 !== e[r]) throw new TypeError(t + " can't have a ." + r + " property."); } }; return e; }
function _createElementDescriptor(e) { var r, t = _toPropertyKey(e.key); "method" === e.kind ? r = { value: e.value, writable: !0, configurable: !0, enumerable: !1 } : "get" === e.kind ? r = { get: e.value, configurable: !0, enumerable: !1 } : "set" === e.kind ? r = { set: e.value, configurable: !0, enumerable: !1 } : "field" === e.kind && (r = { configurable: !0, writable: !0, enumerable: !0 }); var i = { kind: "field" === e.kind ? "field" : "method", key: t, placement: e.static ? "static" : "field" === e.kind ? "own" : "prototype", descriptor: r }; return e.decorators && (i.decorators = e.decorators), "field" === e.kind && (i.initializer = e.value), i; }
function _coalesceGetterSetter(e, r) { void 0 !== e.descriptor.get ? r.descriptor.get = e.descriptor.get : r.descriptor.set = e.descriptor.set; }
function _coalesceClassElements(e) { for (var r = [], isSameElement = function (e) { return "method" === e.kind && e.key === o.key && e.placement === o.placement; }, t = 0; t < e.length; t++) { var i, o = e[t]; if ("method" === o.kind && (i = r.find(isSameElement))) { if (_isDataDescriptor(o.descriptor) || _isDataDescriptor(i.descriptor)) { if (_hasDecorators(o) || _hasDecorators(i)) throw new ReferenceError("Duplicated methods (" + o.key + ") can't be decorated."); i.descriptor = o.descriptor; } else { if (_hasDecorators(o)) { if (_hasDecorators(i)) throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + o.key + ")."); i.decorators = o.decorators; } _coalesceGetterSetter(o, i); } } else r.push(o); } return r; }
function _hasDecorators(e) { return e.decorators && e.decorators.length; }
function _isDataDescriptor(e) { return void 0 !== e && !(void 0 === e.value && void 0 === e.writable); }
function _optionalCallableProperty(e, r) { var t = e[r]; if (void 0 !== t && "function" != typeof t) throw new TypeError("Expected '" + r + "' to be a function"); return t; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
const MprisInterface = require('./mpris-interface');
const dbus = require('dbus-next');
const types = require('./types');
const {
  property,
  method,
  signal,
  ACCESS_READ
} = dbus.interface;
let TracklistInterface = _decorate(null, function (_initialize, _MprisInterface) {
  class TracklistInterface extends _MprisInterface {
    constructor(player) {
      super('org.mpris.MediaPlayer2.TrackList', player);
      _initialize(this);
    }
  }
  return {
    F: TracklistInterface,
    d: [{
      kind: "field",
      key: "_Tracks",
      value() {
        return [];
      }
    }, {
      kind: "field",
      key: "_CanEditTracks",
      value() {
        return false;
      }
    }, {
      kind: "method",
      key: "setTracks",
      value: function setTracks(tracksPlain) {
        this.setProperty('Tracks', tracksPlain);
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'ao',
        access: ACCESS_READ
      })],
      key: "Tracks",
      value: function () {
        return this._Tracks;
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'b',
        access: ACCESS_READ
      })],
      key: "CanEditTracks",
      value: function () {
        return this._CanEditTracks;
      }
    }, {
      kind: "method",
      decorators: [method({
        inSignature: 'ao',
        outSignature: 'aa{sv}'
      })],
      key: "GetTracksMetadata",
      value: function GetTracksMetadata(trackIds) {
        return this.player.tracks.filter(t => {
          return trackIds.some(id => id === t['mpris:trackid']);
        }).map(types.metadataToDbus);
      }
    }, {
      kind: "method",
      decorators: [method({
        inSignature: 'sob'
      })],
      key: "AddTrack",
      value: function AddTrack(uri, afterTrack, setAsCurrent) {
        this.player.emit('addTrack', {
          uri,
          afterTrack,
          setAsCurrent
        });
      }
    }, {
      kind: "method",
      decorators: [method({
        inSignature: 'o'
      })],
      key: "RemoveTrack",
      value: function RemoveTrack(trackId) {
        this.player.emit('removeTrack', trackId);
      }
    }, {
      kind: "method",
      decorators: [method({
        inSignature: 'o'
      })],
      key: "GoTo",
      value: function GoTo(trackId) {
        this.player.emit('goTo', trackId);
      }
    }, {
      kind: "method",
      decorators: [signal({
        signature: 'aoo'
      })],
      key: "TrackListReplaced",
      value: function TrackListReplaced(replacedPlain) {
        this.setTracks(replacedPlain);
        // TODO what's the active track?
        return [this._Tracks, '/org/mpris/MediaPlayer2/TrackList/NoTrack'];
      }
    }, {
      kind: "method",
      decorators: [signal({
        signature: 'a{sv}'
      })],
      key: "TrackAdded",
      value: function TrackAdded(metadata) {
        return types.metadataToDbus(metadata);
      }
    }, {
      kind: "method",
      decorators: [signal({
        signature: 'o'
      })],
      key: "TrackRemoved",
      value: function TrackRemoved(path) {
        return path;
      }
    }, {
      kind: "method",
      decorators: [signal({
        signature: 'oa{sv}'
      })],
      key: "TrackMetadataChanged",
      value: function TrackMetadataChanged(path, metadata) {
        return [path, types.metadataToDbus(metadata)];
      }
    }]
  };
}, MprisInterface);
module.exports = TracklistInterface;
//# sourceMappingURL=tracklist.js.map
