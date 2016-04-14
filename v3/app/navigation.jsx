import React from 'react';
import d3 from 'd3';

var TextInput = React.createClass({
	getInitialState: function() {
    	return {value: this.props.startvalue};
  	},
  	handleChange: function(event) {
    	this.props.callbackParent(this.props.startvalue,event.target.value);
    	// this.setState(event.target.value)
  	},
  	render: function() {
    	return (
      	<input
      		className="date_input"
        	type="text"
        	placeholder={this.props.placeholder}
        	onChange={this.handleChange} />
    );
  }
})

var Concepts = React.createClass({
	getInitialState: function() {
		return { concepts: Array.from(this.props.data.values()) }
	},
	onChildChanged: function(k,v) {
		var tags = v.split(' ')
		var concepts = Array.from(this.props.data.values())
							.filter(function(c){
								var ret = tags.reduce(function(prev,cur,i,arr){
									return (prev || c.includes(cur));
								},false)
								return ret
							});
		console.log(concepts)
		this.setState({concepts:concepts})
		this.props.setConcepts(concepts)
	},
	render: function() {
		var concepts = this.state.concepts.map(function(c){
			return (<li>{c}</li>)
		})
		return(
			<div>
				<TextInput startvalue="Enter concepts" callbackParent={this.onChildChanged} placeholder="Enter concepts..."/>
				<ul>{concepts}</ul>
			</div>)
	}
});


var Navigation = React.createClass({
	getInitialState: function() {
        return {start: new Date(),end: new Date(), concepts:this.props.concepts};
    },
  	onChildChanged: function(k,v) {
  		var date = new Date(v);
  		// console.log("In Nav",this.state)
  		var obj = {
  			start: this.state.start,
  			end: this.state.end,
  			concepts: this.state.concepts
  		};

  		if (k=="end date") {
  			obj.end = date;
  		} else if (k=="start date") {
  			obj.start = date;
  		}
  		this.props.callbackParent(obj);
  		this.setState(obj)
    },

    setConcepts: function(c) {
    	this.props.callbackParent({concepts:c});
    },

  render: function() {
    return (<div className="navigation">
    			<p>Search texts between 
    				
    				<p><strong>{this.props.start.toDateString()}</strong></p>
    				<TextInput startvalue="start date" callbackParent={this.onChildChanged} placeholder="Start date (YYYY/MM/DD)"/>
    				
    				<p><strong>{this.props.end.toDateString()}</strong></p></p>
    				<TextInput startvalue="end date" callbackParent={this.onChildChanged} placeholder="End date (YYYY/MM/DD)"/>
    			<hr / >
    			<p>Search concepts</p>
    			<Concepts data={this.props.concepts} setConcepts={this.setConcepts} />
    		</div>)
  }
});

module.exports = Navigation;