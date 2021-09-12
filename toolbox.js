var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var toMeters = new Map();
toMeters.set('feet', 3.28084);
toMeters.set('meters', 1);
toMeters.set('kilometers', 0.001);
toMeters.set('centimeters', 100);
toMeters.set('inches', 3.28084 * 12);
toMeters.set('yards', 3.28084 / 3);
toMeters.set('miles', 3.28084 / 5280);
var lengthScales = ['feet', 'meters', 'kilometers', 'centimeters', 'inches', 'yards', 'miles'];

var toKilograms = new Map();
toKilograms.set('pounds', 2.20462);
toKilograms.set('kilograms', 1);
toKilograms.set('ounces', 2.20462 * 16);
toKilograms.set('stone', 2.20462 / 14);
var massScales = ['pounds', 'kilograms', 'ounces', 'stone'];

var toLiters = new Map();
toLiters.set('liters', 1);
toLiters.set('milliliters', 1000);
toLiters.set('US gallons', 3.78541);
toLiters.set('US quarts', 3.78541 * 4);
toLiters.set('US pints', 3.78541 * 8);
toLiters.set('cubic meters', 0.001);
var volumeScales = ['liters', 'milliliters', 'US gallons', 'US quarts', 'US pints', 'cubic meters'];

var scaleMap = new Map();
scaleMap.set('length', lengthScales);
scaleMap.set('mass', massScales);
scaleMap.set('volume', volumeScales);

var UnitForm = function (_React$Component) {
  _inherits(UnitForm, _React$Component);

  function UnitForm(props) {
    _classCallCheck(this, UnitForm);

    var _this = _possibleConstructorReturn(this, (UnitForm.__proto__ || Object.getPrototypeOf(UnitForm)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(UnitForm, [{
    key: 'handleChange',
    value: function handleChange(e) {
      var version = this.props.version;
      this.props.onInputChange(e.target.value, version);
    }
  }, {
    key: 'render',
    value: function render() {
      var scale = this.props.scale;
      var dim = this.props.dimension;
      if (dim === 'length') return React.createElement(
        'form',
        null,
        React.createElement(
          'label',
          null,
          'Enter value in',
          React.createElement(
            'select',
            { value: scale, onChange: this.handleChange },
            React.createElement(
              'option',
              { value: 'feet' },
              'feet'
            ),
            React.createElement(
              'option',
              { value: 'meters' },
              'meters'
            ),
            React.createElement(
              'option',
              { value: 'kilometers' },
              'kilometers'
            ),
            React.createElement(
              'option',
              { value: 'centimeters' },
              'centimeters'
            ),
            React.createElement(
              'option',
              { value: 'inches' },
              'inches'
            ),
            React.createElement(
              'option',
              { value: 'yards' },
              'yards'
            ),
            React.createElement(
              'option',
              { value: 'miles' },
              'miles'
            )
          )
        )
      );else if (dim === 'mass') return React.createElement(
        'form',
        null,
        React.createElement(
          'label',
          null,
          'Enter value in',
          React.createElement(
            'select',
            { value: scale, onChange: this.handleChange },
            React.createElement(
              'option',
              { value: 'pounds' },
              'pounds'
            ),
            React.createElement(
              'option',
              { value: 'kilograms' },
              'kilograms'
            ),
            React.createElement(
              'option',
              { value: 'ounces' },
              'ounces'
            ),
            React.createElement(
              'option',
              { value: 'stone' },
              'stone'
            )
          )
        )
      );else if (dim === 'volume') return React.createElement(
        'form',
        null,
        React.createElement(
          'label',
          null,
          'Enter value in',
          React.createElement(
            'select',
            { value: scale, onChange: this.handleChange },
            React.createElement(
              'option',
              { value: 'liters' },
              'liters'
            ),
            React.createElement(
              'option',
              { value: 'milliliters' },
              'milliters'
            ),
            React.createElement(
              'option',
              { value: 'US gallons' },
              'US gallons'
            ),
            React.createElement(
              'option',
              { value: 'US quarts' },
              'US quarts'
            ),
            React.createElement(
              'option',
              { value: 'US pints' },
              'US pints'
            ),
            React.createElement(
              'option',
              { value: 'cubic meters' },
              'cubic meters'
            )
          )
        )
      );else return React.createElement(
        'h2',
        null,
        'invalid dimension'
      );
    }
  }]);

  return UnitForm;
}(React.Component);

var DimensionForm = function (_React$Component2) {
  _inherits(DimensionForm, _React$Component2);

  function DimensionForm(props) {
    _classCallCheck(this, DimensionForm);

    var _this2 = _possibleConstructorReturn(this, (DimensionForm.__proto__ || Object.getPrototypeOf(DimensionForm)).call(this, props));

    _this2.handleChange = _this2.handleChange.bind(_this2);
    return _this2;
  }

  _createClass(DimensionForm, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.props.onInputChange(e.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { 'class': 'dimensionForm' },
        React.createElement(
          'label',
          null,
          'Convert',
          React.createElement(
            'select',
            { value: this.props.dimension, onChange: this.handleChange },
            React.createElement(
              'option',
              { value: 'length' },
              'length'
            ),
            React.createElement(
              'option',
              { value: 'mass' },
              'mass'
            ),
            React.createElement(
              'option',
              { value: 'volume' },
              'volume'
            )
          )
        )
      );
    }
  }]);

  return DimensionForm;
}(React.Component);

var TextInput = function (_React$Component3) {
  _inherits(TextInput, _React$Component3);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this3 = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

    _this3.handleChange = _this3.handleChange.bind(_this3);
    return _this3;
  }

  _createClass(TextInput, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.props.onInputChange(e.target.value, this.props.scale);
    }
  }, {
    key: 'render',
    value: function render() {
      var quant = this.props.quantity;
      var scale = this.props.scale;

      return React.createElement(
        'fieldset',
        null,
        React.createElement('input', { value: quant, onChange: this.handleChange })
      );
    }
  }]);

  return TextInput;
}(React.Component);

var Converter = function (_React$Component4) {
  _inherits(Converter, _React$Component4);

  function Converter(props) {
    _classCallCheck(this, Converter);

    var _this4 = _possibleConstructorReturn(this, (Converter.__proto__ || Object.getPrototypeOf(Converter)).call(this, props));

    _this4.state = { quantity: '1', scale: 'feet', from: 'feet', to: 'meters', dimension: 'length' };
    _this4.handleTextInputChange = _this4.handleTextInputChange.bind(_this4);
    _this4.handleUnitFormChange = _this4.handleUnitFormChange.bind(_this4);
    _this4.handleDimensionFormChange = _this4.handleDimensionFormChange.bind(_this4);
    return _this4;
  }

  _createClass(Converter, [{
    key: 'handleTextInputChange',
    value: function handleTextInputChange(quantity, scale) {
      this.setState({ quantity: quantity, scale: scale });
    }
  }, {
    key: 'handleUnitFormChange',
    value: function handleUnitFormChange(scale, version) {
      if (version === 'from') this.setState({ from: scale });else if (version === 'to') this.setState({ to: scale });else alert('An error has occurred.');
    }
  }, {
    key: 'handleDimensionFormChange',
    value: function handleDimensionFormChange(dim) {
      var dimUnit1 = scaleMap.get(dim)[0];
      var dimUnit2 = scaleMap.get(dim)[1];
      this.setState({ quantity: '1', dimension: dim, scale: dimUnit1, from: dimUnit1, to: dimUnit2 });
    }
  }, {
    key: 'tryConvert',
    value: function tryConvert(quantity, scaleFrom, scaleTo) {
      var input = parseFloat(quantity);
      if (Number.isNaN(input)) {
        return '';
      }
      var output = this.convertQuantity(input, scaleFrom, scaleTo);
      var rounded = Math.round(output * 100000) / 100000;
      return rounded.toString();
    }
  }, {
    key: 'convertQuantity',
    value: function convertQuantity(quantity, scaleFrom, scaleTo) {
      if (this.state.dimension === 'length') return quantity / toMeters.get(scaleFrom) * toMeters.get(scaleTo);else if (this.state.dimension === 'mass') return quantity / toKilograms.get(scaleFrom) * toKilograms.get(scaleTo);else if (this.state.dimension === 'volume') return quantity / toLiters.get(scaleFrom) * toLiters.get(scaleTo);else return 'A problem occurred.';
    }
  }, {
    key: 'render',
    value: function render() {
      var quant = this.state.quantity;
      var scale = this.state.scale;
      var from = this.state.from;
      var to = this.state.to;
      var dim = this.state.dimension;
      var fromQuant = scale === from ? quant : this.tryConvert(quant, scale, from);
      var toQuant = scale === to ? quant : this.tryConvert(quant, scale, to);
      return React.createElement(
        'div',
        { 'class': 'converter' },
        React.createElement(
          'h2',
          null,
          'Unit Converter'
        ),
        React.createElement(DimensionForm, {
          dimension: dim,
          onInputChange: this.handleDimensionFormChange
        }),
        React.createElement(UnitForm, { scale: from, onInputChange: this.handleUnitFormChange, version: 'from', dimension: dim }),
        React.createElement(TextInput, {
          scale: from,
          quantity: fromQuant,
          onInputChange: this.handleTextInputChange
        }),
        React.createElement(UnitForm, { scale: to, onInputChange: this.handleUnitFormChange, version: 'to', dimension: dim }),
        React.createElement(TextInput, {
          scale: to,
          quantity: toQuant,
          onInputChange: this.handleTextInputChange
        })
      );
    }
  }]);

  return Converter;
}(React.Component);

var ToolBox = function (_React$Component5) {
  _inherits(ToolBox, _React$Component5);

  function ToolBox() {
    _classCallCheck(this, ToolBox);

    return _possibleConstructorReturn(this, (ToolBox.__proto__ || Object.getPrototypeOf(ToolBox)).apply(this, arguments));
  }

  _createClass(ToolBox, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Welcome to Toolbox'
        ),
        React.createElement(Converter, null)
      );
    }
  }]);

  return ToolBox;
}(React.Component);

ReactDOM.render(React.createElement(ToolBox, null), document.getElementById('root'));