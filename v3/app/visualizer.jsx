// main.js

import React from 'react';
import d3 from 'd3';

class CountMap {
  constructor() {
    this.map = new Map()
  }
  add(i,n) {
    if (this.map.has(i)) {
      this.map.set(i,this.map.get(i) + n)
    }
    else {
      this.map.set(i,n)
    }
    return [i,this.map.get(i)]
  }
  get(i) {
    return this.map.get(i)
  }
  keys() {
    return this.map.keys()
  }
  keyvals() {
    return Array.from(this.map.entries());
  }
};


var Bar = React.createClass({
  render: function() {
    var sentimap = {
      "+":"positive",
      "-":"negative",
      "0":"neutral"
    }
    return (<div className={sentimap[this.props.data]}></div>)
  }
})

var BarGraph = React.createClass({
  render: function() {
    var concept = this.props.concept
    var count = 0
    var barmap = this.props.data.split("").map(function(s){
      count++//needed for unique keys
      return(<Bar key={concept+count} data={s} />)
    })
    return (<div className="graph">{barmap}</div>)
  }
});

var Visualizer = React.createClass({
  render: function() {
      var concept_set = new CountMap()
      var concept_vis = new CountMap()
      this.props.data['paragraphs'].forEach(function(p){
        p['concepts'].forEach(function(c) {
          concept_set.add(c['label'],1)
          concept_vis.add(c['label'],c['s'])
        });
      });

      var pairs = concept_set.keyvals().map(function([k,v]){
      var vis = concept_vis.get(k)
      return(<div key={k} className="concept">
              <div className="concept_text">
                <strong>{k}</strong> : {v}
              </div>
              <BarGraph concept={k} data={vis} />
             </div>
      )
    })

    return (
      <div className="sentiments">
        {pairs}
      </div>
    )
  },
});


module.exports = Visualizer;