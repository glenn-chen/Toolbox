let toMeters = new Map();
toMeters.set('feet', 3.28084);
toMeters.set('meters', 1);
toMeters.set('kilometers', 0.001);
toMeters.set('centimeters', 100);
toMeters.set('inches', 3.28084*12);
toMeters.set('yards', 3.28084/3);
toMeters.set('miles', 3.28084/5280);
const lengthScales = ['feet', 'meters', 'kilometers', 'centimeters', 'inches', 'yards', 'miles'];

let toKilograms = new Map();
toKilograms.set('pounds', 2.20462);
toKilograms.set('kilograms', 1);
toKilograms.set('ounces', 2.20462*16);
toKilograms.set('stone', 2.20462/14);
const massScales = ['pounds', 'kilograms', 'ounces', 'stone'];

let toLiters = new Map();
toLiters.set('liters', 1);
toLiters.set('milliliters', 1000);
toLiters.set('US gallons', 3.78541);
toLiters.set('US quarts', 3.78541*4);
toLiters.set('US pints', 3.78541*8);
toLiters.set('cubic meters', 0.001);
const volumeScales = ['liters', 'milliliters', 'US gallons', 'US quarts', 'US pints', 'cubic meters'];

let scaleMap = new Map();
scaleMap.set('length', lengthScales);
scaleMap.set('mass', massScales);
scaleMap.set('volume', volumeScales);

class UnitForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    const version = this.props.version;
    this.props.onInputChange(e.target.value, version);
  }
  
  render() {
    const scale = this.props.scale;
    const dim = this.props.dimension;
    if (dim === 'length')
      return (
      <form>
        <label>
          Enter value in  
          <select value={scale} onChange={this.handleChange}>
            <option value="feet">feet</option>
            <option value="meters">meters</option>
            <option value="kilometers">kilometers</option>
            <option value="centimeters">centimeters</option>
            <option value="inches">inches</option>
            <option value="yards">yards</option>
            <option value="miles">miles</option>
          </select>
        </label>
      </form>
      );
    else if (dim === 'mass') 
      return (
      <form>
        <label>
          Enter value in  
          <select value={scale} onChange={this.handleChange}>
            <option value="pounds">pounds</option>
            <option value="kilograms">kilograms</option>
            <option value="ounces">ounces</option>
            <option value="stone">stone</option>
          </select>
        </label>
      </form>   
      );
    else if (dim === 'volume') 
      return (
      <form>
        <label>
          Enter value in  
          <select value={scale} onChange={this.handleChange}>
            <option value="liters">liters</option>
            <option value="milliliters">milliters</option>
            <option value="US gallons">US gallons</option>
            <option value="US quarts">US quarts</option>
            <option value="US pints">US pints</option>
            <option value="cubic meters">cubic meters</option>
          </select>
        </label>
      </form>   
      );
    else
      return (<h2>invalid dimension</h2>);
  }
}

class DimensionForm extends React.Component {
  constructor(props) { 
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    this.props.onInputChange(e.target.value);
  }
  
  render() {
    return (
    <form class="dimensionForm">
      <label>
        Convert 
        <select value={this.props.dimension} onChange={this.handleChange}>
          <option value="length">length</option>
          <option value="mass">mass</option>
          <option value="volume">volume</option>
        </select>
      </label>
    </form> 
    );
  }
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    this.props.onInputChange(e.target.value, this.props.scale);
  }
  
  render() {
    const quant = this.props.quantity;
    const scale = this.props.scale;
 
    return (
      <fieldset>
        <input value={quant} onChange={this.handleChange} />
      </fieldset>  
    );
  }
}

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quantity: '1', scale: 'feet', from: 'feet', to: 'meters', dimension: 'length'};
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleUnitFormChange = this.handleUnitFormChange.bind(this);
    this.handleDimensionFormChange = this.handleDimensionFormChange.bind(this);
  }
  
  handleTextInputChange(quantity, scale) {
    this.setState({quantity: quantity, scale: scale});
  }
  handleUnitFormChange(scale, version) {
    if (version === 'from')
      this.setState({from: scale});
    else if (version === 'to')
      this.setState({to: scale});
    else alert('An error has occurred.');
  }
  handleDimensionFormChange(dim) {
    const dimUnit1 = scaleMap.get(dim)[0];
    const dimUnit2 = scaleMap.get(dim)[1];
    this.setState({quantity: '1', dimension: dim, scale: dimUnit1, from: dimUnit1, to: dimUnit2});
  }
  
  tryConvert(quantity, scaleFrom, scaleTo) {
    const input = parseFloat(quantity);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = this.convertQuantity(input, scaleFrom, scaleTo);
    const rounded = Math.round(output * 100000) / 100000;
    return rounded.toString();
  }
  
  convertQuantity(quantity, scaleFrom, scaleTo) {
    if (this.state.dimension === 'length')
      return (quantity / toMeters.get(scaleFrom) * toMeters.get(scaleTo));
    else if (this.state.dimension === 'mass')
      return (quantity / toKilograms.get(scaleFrom) * toKilograms.get(scaleTo));
    else if (this.state.dimension === 'volume')
      return (quantity / toLiters.get(scaleFrom) * toLiters.get(scaleTo));
    else
      return 'A problem occurred.';
  }
  
  render() {
    const quant = this.state.quantity;
    const scale = this.state.scale;
    const from = this.state.from; 
    const to = this.state.to; 
    const dim = this.state.dimension;
    const fromQuant = scale === from ? quant : this.tryConvert(quant, scale, from);
    const toQuant = scale === to ? quant: this.tryConvert(quant, scale, to);
    return (
      <div class="converter">
        <h2>Unit Converter</h2>
        <DimensionForm 
          dimension={dim}
          onInputChange={this.handleDimensionFormChange}
        />
        <UnitForm scale={from} onInputChange={this.handleUnitFormChange} version='from' dimension={dim}/>
        <TextInput 
          scale={from}
          quantity={fromQuant}
          onInputChange={this.handleTextInputChange}
        />
        <UnitForm scale={to} onInputChange={this.handleUnitFormChange} version='to' dimension={dim}/>
        <TextInput
          scale={to}
          quantity={toQuant}
          onInputChange={this.handleTextInputChange}
        />
      </div>
    );
  }
}

class ToolBox extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Toolbox</h1>
        <Converter />
      </div>
    );
  }
}

ReactDOM.render(
  <ToolBox />,
  document.getElementById('root')
);

