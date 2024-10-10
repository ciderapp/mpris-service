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
const dbus = require('dbus-next');
const MprisInterface = require('./mpris-interface');
const constants = require('../constants');
const {
  property,
  method,
  signal,
  ACCESS_READ
} = dbus.interface;
const DBusError = dbus.DBusError;
let PlayerInterface = _decorate(null, function (_initialize, _MprisInterface) {
  class PlayerInterface extends _MprisInterface {
    constructor(player) {
      super('org.mpris.MediaPlayer2.Player', player);
      _initialize(this);
    }
  }
  return {
    F: PlayerInterface,
    d: [{
      kind: "field",
      key: "_CanControl",
      value() {
        return true;
      }
    }, {
      kind: "field",
      key: "_CanPause",
      value() {
        return true;
      }
    }, {
      kind: "field",
      key: "_CanPlay",
      value() {
        return true;
      }
    }, {
      kind: "field",
      key: "_CanSeek",
      value() {
        return true;
      }
    }, {
      kind: "field",
      key: "_CanGoNext",
      value() {
        return true;
      }
    }, {
      kind: "field",
      key: "_CanGoPrevious",
      value() {
        return true;
      }
    }, {
      kind: "field",
      key: "_Metadata",
      value() {
        return {};
      }
    }, {
      kind: "field",
      key: "_MaximumRate",
      value() {
        return 1;
      }
    }, {
      kind: "field",
      key: "_MinimumRate",
      value() {
        return 1;
      }
    }, {
      kind: "field",
      key: "_Rate",
      value() {
        return 1;
      }
    }, {
      kind: "field",
      key: "_Shuffle",
      value() {
        return false;
      }
    }, {
      kind: "field",
      key: "_Volume",
      value() {
        return 0;
      }
    }, {
      kind: "field",
      key: "_LoopStatus",
      value() {
        return constants.LOOP_STATUS_NONE;
      }
    }, {
      kind: "field",
      key: "_PlaybackStatus",
      value() {
        return constants.PLAYBACK_STATUS_STOPPED;
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'b',
        access: ACCESS_READ
      })],
      key: "CanControl",
      value: function () {
        return this._CanControl;
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'b',
        access: ACCESS_READ
      })],
      key: "CanPause",
      value: function () {
        return this._CanPause;
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'b',
        access: ACCESS_READ
      })],
      key: "CanPlay",
      value: function () {
        return this._CanPlay;
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'b',
        access: ACCESS_READ
      })],
      key: "CanSeek",
      value: function () {
        return this._CanSeek;
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'b',
        access: ACCESS_READ
      })],
      key: "CanGoNext",
      value: function () {
        return this._CanGoNext;
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'b',
        access: ACCESS_READ
      })],
      key: "CanGoPrevious",
      value: function () {
        return this._CanGoPrevious;
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'a{sv}',
        access: ACCESS_READ
      })],
      key: "Metadata",
      value: function () {
        return this._Metadata;
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'd',
        access: ACCESS_READ
      })],
      key: "MaximumRate",
      value: function () {
        return this._MaximumRate;
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'd',
        access: ACCESS_READ
      })],
      key: "MinimumRate",
      value: function () {
        return this._MinimumRate;
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'd'
      })],
      key: "Rate",
      value: function () {
        return this._Rate;
      }
    }, {
      kind: "set",
      key: "Rate",
      value: function (value) {
        this._setPropertyInternal('Rate', value);
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'b'
      })],
      key: "Shuffle",
      value: function () {
        return this._Shuffle;
      }
    }, {
      kind: "set",
      key: "Shuffle",
      value: function (value) {
        this._setPropertyInternal('Shuffle', value);
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'd'
      })],
      key: "Volume",
      value: function () {
        return this._Volume;
      }
    }, {
      kind: "set",
      key: "Volume",
      value: function (value) {
        this._setPropertyInternal('Volume', value);
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 'x',
        access: ACCESS_READ
      })],
      key: "Position",
      value: function () {
        let playerPosition = this.player.getPosition();
        let position = Math.floor(playerPosition || 0);
        if (isNaN(position)) {
          const err = 'github.mpris_service.InvalidPositionError';
          const message = `The player has set an invalid position: ${playerPosition}`;
          throw new DBusError(err, message);
        }
        return position;
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 's'
      })],
      key: "LoopStatus",
      value: function () {
        if (!constants.isLoopStatusValid(this._LoopStatus)) {
          const err = 'github.mpris_service.InvalidLoopStatusError';
          const message = `The player has set an invalid loop status: ${this._LoopStatus}`;
          throw new DBusError(err, message);
        }
        return this._LoopStatus;
      }
    }, {
      kind: "set",
      key: "LoopStatus",
      value: function (value) {
        if (!constants.isLoopStatusValid(value)) {
          const err = 'github.mpris_service.InvalidLoopStatusError';
          const message = `Tried to set loop status to an invalid value: ${value}`;
          throw new DBusError(err, message);
        }
        this._setPropertyInternal('LoopStatus', value);
      }
    }, {
      kind: "get",
      decorators: [property({
        signature: 's',
        access: ACCESS_READ
      })],
      key: "PlaybackStatus",
      value: function () {
        if (!constants.isPlaybackStatusValid(this._PlaybackStatus)) {
          const err = 'github.mpris_service.InvalidPlaybackStatusError';
          const message = `The player has set an invalid playback status: ${this._PlaybackStatus}`;
          throw new DBusError(err, message);
        }
        return this._PlaybackStatus;
      }
    }, {
      kind: "method",
      decorators: [method({})],
      key: "Next",
      value: function Next() {
        this.player.emit('next');
      }
    }, {
      kind: "method",
      decorators: [method({})],
      key: "Previous",
      value: function Previous() {
        this.player.emit('previous');
      }
    }, {
      kind: "method",
      decorators: [method({})],
      key: "Pause",
      value: function Pause() {
        this.player.emit('pause');
      }
    }, {
      kind: "method",
      decorators: [method({})],
      key: "PlayPause",
      value: function PlayPause() {
        this.player.emit('playpause');
      }
    }, {
      kind: "method",
      decorators: [method({})],
      key: "Stop",
      value: function Stop() {
        this.player.emit('stop');
      }
    }, {
      kind: "method",
      decorators: [method({})],
      key: "Play",
      value: function Play() {
        this.player.emit('play');
      }
    }, {
      kind: "method",
      decorators: [method({
        inSignature: 'x'
      })],
      key: "Seek",
      value: function Seek(offset) {
        // XXX overflow
        offset = Number(offset);
        this.player.emit('seek', offset);
      }
    }, {
      kind: "method",
      decorators: [method({
        inSignature: 'ox'
      })],
      key: "SetPosition",
      value: function SetPosition(trackId, position) {
        let e = {
          trackId: trackId,
          // XXX overflow
          position: Number(position)
        };
        this.player.emit('position', e);
      }
    }, {
      kind: "method",
      decorators: [method({
        inSignature: 's'
      })],
      key: "OpenUri",
      value: function OpenUri(uri) {
        let e = {
          uri
        };
        this.player.emit('open', e);
      }
    }, {
      kind: "method",
      decorators: [signal({
        signature: 'x'
      })],
      key: "Seeked",
      value: function Seeked(position) {
        return position;
      }
    }]
  };
}, MprisInterface);
module.exports = PlayerInterface;
//# sourceMappingURL=player.js.map
