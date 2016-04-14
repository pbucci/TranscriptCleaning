import React from 'react';
import d3 from 'd3';

// highlight ------------------------------------------------------------------------
// returns the css class for concept
// tbd whether this is the best way yet
function highlight(concept) {
  var the_map = {
    opinions:"chartreuse",
    life:"yellow",
  }
  return the_map[concept]
}

// Words ---------------------------------------------------------------
// Render all the words with concepts highlighted
var Words = React.createClass({
  render: function() {
    var text = this.props.text
    var concepts = this.props.concepts
    
    var out = []
    var temp = []
    var s = 0
    var e = text.length

    concepts.forEach(function(c,i,arr){
      var before = {text:text.slice(s,c['i']),concept:"none",sentiment:"none"}
      if (before['text'].length > 0) {
        out.push(before)
      }
      var slice = {text:text.slice(c['i'],c['j']),concept:c['label'],sentiment:c['s']}
      out.push(slice)
      s = c['j']
    });
    var end = {text:text.slice(s,e),concept:"none",sentiment:"none"}
    out.push(end)
    
    var spacer = function(text) {
        return text.map(function(t){
          if (t == "," || t == ".") {
            return t
          }
          else {
            return " " + t
          }
        })
    }

    var ret = out.map(function(s){
      return (<span className={highlight(s['concept'])} data-sentiment={s['sentiment']} key={s['text']}>{spacer(s['text'])}</span>)
    })

    return (<span>{ret}</span>)
  }

  });

// Paragraph ------------------------------------------------------------
// Render a single paragraph
var Paragraph = React.createClass({
  render: function() {
    return (
      <div className="paragraph">
        <p><strong>{this.props.speaker}: </strong><Words text={this.props.text} concepts={this.props.concepts}/></p>
      </div>
    );
  }
});

// Paragraphs -----------------------------------------------------------
// Render all paragraphs
var Paragraphs = React.createClass({
  render: function() {
    var paragraphs = this.props.paragraphs.map(function(paragraph) {
      return (
        <Paragraph 
          speaker  = {paragraph['speaker']} 
          text     = {paragraph['text']} 
          concepts = {paragraph['concepts']}
          key      = {paragraph['id']} />
      );
    });
    return (
      <div className="paragraphList">
        {paragraphs}
      </div>
    );
  }
});

// Story ---------------------------------------------------------------
// Render a whole story
var Story = React.createClass({
  render: function() {
    return (
      <div className="story">
        <p className="back_button" onClick={this.props.reset}>Back to all texts</p>
        <h3 className="title">{this.props.data.title}</h3>
        <hr />
        <Paragraphs paragraphs={this.props.data.paragraphs}/>
      </div>
    )
  }
});

module.exports = Story;