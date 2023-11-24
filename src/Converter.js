import React from 'react';
import './Toolbox.css';
import Constants from './Constants';

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
    const scaleMap = Constants.SCALE_MAP;

    const scale = this.props.scale;
    const dim = this.props.dimension;

    const options = [];
    for (let i = 0; i < scaleMap.get(dim).length; i++) {
      options.push({value: scaleMap.get(dim)[i], text: scaleMap.get(dim)[i]});
    }

    return (
      <form>
        <label>
          Enter value in  
          <select value={scale} onChange={this.handleChange}>
            {options.map((item) => <option value={item.value}>{item.text}</option>)}
          </select>
        </label>
      </form>
    );
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
          <option value="temperature">temperature</option>
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
    // const temperatureScales = Constants.TEMPERATURE_SCALES;
    let initialQuantity = dim === 'temperature' ? 32 : 1;
    const dimUnit1 = Constants.SCALE_MAP.get(dim)[0];
    const dimUnit2 = Constants.SCALE_MAP.get(dim)[1];
    this.setState({quantity: initialQuantity, dimension: dim, scale: dimUnit1, from: dimUnit1, to: dimUnit2});
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
    const toMeters = Constants.TO_METERS;
    const toKilograms = Constants.TO_KILOGRAMS;
    const toLiters = Constants.TO_LITERS;

    if (this.state.dimension === 'length')
      return (quantity / toMeters.get(scaleFrom) * toMeters.get(scaleTo));
    else if (this.state.dimension === 'mass')
      return (quantity / toKilograms.get(scaleFrom) * toKilograms.get(scaleTo));
    else if (this.state.dimension === 'volume')
      return (quantity / toLiters.get(scaleFrom) * toLiters.get(scaleTo));
    else if (this.state.dimension === 'temperature')
      return this.convertTemperature(quantity, scaleFrom, scaleTo);
    else
      return 'Invalid dimension';
  }

  convertTemperature(temp, scaleFrom, scaleTo) {
    if (scaleFrom === scaleTo)
      return temp;
    
    if (scaleFrom === 'fahrenheit') {
      if (scaleTo === 'celsius')
        return (temp - 32) * 5 / 9;
      else if (scaleTo === 'kelvin')
        return (temp - 32) * 5 / 9 + 273.15;
    }
    else if (scaleFrom === 'celsius') {
      if (scaleTo === 'fahrenheit')
        return (temp * 9 / 5) + 32;
      else if (scaleTo === 'kelvin')
        return temp + 273.15;
    }
    else if (scaleFrom === 'kelvin') {
      if (scaleTo === 'fahrenheit')
      return (temp - 273.15) * 9 / 5 + 32;
    else if (scaleTo === 'celsius')
      return temp - 273.15;
    }
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

export default Converter;