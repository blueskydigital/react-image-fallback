"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _filterInvalidDomProps = require("filter-invalid-dom-props");

var _filterInvalidDomProps2 = _interopRequireDefault(_filterInvalidDomProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactImageFallback = function (_Component) {
	_inherits(ReactImageFallback, _Component);

	function ReactImageFallback(props) {
		_classCallCheck(this, ReactImageFallback);

		var _this = _possibleConstructorReturn(this, (ReactImageFallback.__proto__ || Object.getPrototypeOf(ReactImageFallback)).call(this, props));

		_this.state = {
			imageSource: props.initialImage
		};
		_this.setDisplayImage = _this.setDisplayImage.bind(_this);
		return _this;
	}

	_createClass(ReactImageFallback, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.displayImage = this.props.img || new window.Image();
			this.setDisplayImage({ image: this.props.src, fallbacks: this.props.fallbackImage });
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.src !== this.props.src) {
				this.setDisplayImage({ image: nextProps.src, fallbacks: nextProps.fallbackImage });
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.displayImage.onerror = null;
			this.displayImage.onload = null;
			this.displayImage = null;
		}
	}, {
		key: "setDisplayImage",
		value: function setDisplayImage(_ref) {
			var _this2 = this;

			var image = _ref.image,
			    fallbacks = _ref.fallbacks;

			var imagesArray = [image].concat(fallbacks);
			this.displayImage.onerror = function () {
				if (imagesArray.length > 2 && typeof imagesArray[1] === "string") {
					var updatedFallbacks = imagesArray.slice(2);
					_this2.setDisplayImage({ image: imagesArray[1], fallbacks: updatedFallbacks });
					return;
				}
				_this2.setState({
					imageSource: imagesArray[1]
				}, function () {
					if (_this2.props.onError) {
						_this2.props.onError(_this2.props.src);
					}
				});
			};
			this.displayImage.onload = function () {
				_this2.setState({
					imageSource: imagesArray[0]
				}, function () {
					if (_this2.props.onLoad) {
						_this2.props.onLoad(imagesArray[0]);
					}
				});
			};
			this.displayImage.src = imagesArray[0];
			if (this.props.img && this.displayImage.complete) {
				this.setState({
					imageSource: imagesArray[0]
				});
			};
		}
	}, {
		key: "render",
		value: function render() {
			return typeof this.state.imageSource === "string" ? _react2.default.createElement("img", _extends({}, (0, _filterInvalidDomProps2.default)(this.props), { src: this.state.imageSource })) : this.state.imageSource;
		}
	}]);

	return ReactImageFallback;
}(_react.Component);

exports.default = ReactImageFallback;

ReactImageFallback.displayName = "ReactImageFallback";

ReactImageFallback.propTypes = {
	src: _react.PropTypes.string.isRequired,
	fallbackImage: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.array]).isRequired,
	initialImage: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
	onLoad: _react.PropTypes.func,
	onError: _react.PropTypes.func,
	img: _react.PropTypes.object
};

ReactImageFallback.defaultProps = {
	initialImage: null
};