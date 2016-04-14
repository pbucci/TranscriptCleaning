// main.js

import React from 'react';

var Visualizer = require('./visualizer.jsx');
var Navigation = require('./navigation.jsx');
var Story      = require('./story.jsx');
////////////////////////////////////////////////////////////////////////////////////
// Dummy data for testing
//
////////////////////////////////////////////////////////////////////////////////////
var data = {
  paragraphs: [
    { id: 1, 
      speaker: "Bill O'Reilly", 
      text: ["I","have","opinions","."],
      concepts:[
        {i:2,j:3,label:"opinions",s:"0"},
      ]
    },
    { id: 2, 
      speaker: "Jordan Walke",
      text: ["I","have", "much", "better", "opinions", "and", "a", "life","."],
      concepts:[
        {i:2,j:5,label:"opinions",s:"+"},
        {i:7,j:8,label:"life",s:"-"},
      ]
    }
   ],
   title:"Look ma, I'm a title",
}

var nparray = ["ideas","laughter","ears","opinions","life","amazing"]
var nps = new Set(nparray)


var texts = [
  {title:"Title1",tags:["tag1","tag2"],date:"2003/01/01",concepts:["opinions","ears"]},
  {title:"Title2",tags:["tag2","tag3"],date:"2003/01/02",concepts:["opinions","life"]},
  {title:"Title3",tags:["tag3","tag4"],date:"2003/01/03",concepts:["opinions","laughter"]},
  {title:"Title4",tags:["tag4","tag5"],date:"2003/01/04",concepts:["opinions","ideas"]},
  {title:"Title5",tags:["tag5","tag6"],date:"2003/01/05",concepts:["opinions","amazing"]},
  {title:"Title6",tags:["tag5","tag6"],date:"2003/01/06",concepts:["ideas","amazing"]}
]

var OneText = React.createClass({
  render: function() {
    return(<li className="text_list_item"
               onClick={this.props.updateTitle.bind(this,this.props.text.title)}>
               {this.props.text.title}
           </li>)
  }
});

var Texts = React.createClass({
  render: function() {
    var updateTitle = this.props.updateTitle
    var all_texts = this.props.texts.map(function(t){
        return (<OneText text={t} updateTitle={updateTitle}/>)
    });
    return(<ul>{all_texts}</ul>)
  }
});


var Chooser = React.createClass({
  render: function() {

    var start = this.props.start
    var end = this.props.end
    var concepts = new Set(this.props.concepts)
    var title = this.props.title

    var texts = this.props.texts
                  .filter(function(t){
                    if (title == 'null' || t.title == title) {
                      return true;
                    } else {
                      return false;
                    }
                  })
                  .filter(function(t){
                     var d = new Date(t.date);
                     return (d >= start && d <= end)})
                  .filter(function(t){
                     var c = t.concepts;
                     // console.log(c)
                     return (c.filter(x => concepts.has(x)).length > 0)
                })
    // console.log(texts)
    if (texts.length == 1) {
      return (<Story data={this.props.data} reset={this.props.updateTitle.bind(this,"null")}/>)
    } else {
      return (<Texts texts={texts} updateTitle={this.props.updateTitle} />)
    }
    
  }
})

// Main function
var Main = React.createClass({
  getInitialState: function() {
    var o = {start: new Date("2001/01/01"),end: new Date(),concepts:[],title:"null"}
    // this.setState(o)
    return o;
  },
  onChildChanged: function(o) {
    this.setState(o)
  },
  updateTitle: function(x) {
    console.log(x)
    if (x) {this.setState({title:x});}
  },
  render: function() {
    // console.log(this.state)
    return (  
      <div>
        <div className="header"><h1 className="header_title">CharVis</h1></div>
        <div className="the_content">
          <Navigation start={this.state.start} end={this.state.end} concepts={nps} callbackParent={this.onChildChanged} />
          <div className="story">
            <Chooser data={data} 
                     start={this.state.start} 
                     end={this.state.end} 
                     concepts={this.state.concepts} 
                     texts={texts}
                     title={this.state.title}
                     updateTitle={this.updateTitle} />
          </div>
          <Visualizer data={data} />
        </div>
      </div>
    )
  }
})

module.exports = Main;