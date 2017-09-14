import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';

const API_KEY = "AIzaSyBYhWMvlJQSCPzAz9LEn9gsCUzXvoPFYwk";

// Create new component which produces HTML
class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      videos : [],
      selectedVideo : null
    };

    this.videoSearch("surfboards");
  }

  videoSearch(term){
    YTSearch({key : API_KEY, term}, (videos) => {
      this.setState({
        videos : videos,
        selectedVideo : videos[0]
      });
      //same as this.setState({ videos:videos });
    });
  }

  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 3000);

    return(
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

//Functional version
  /*const App = () => {
  return (
    //JSX
    <div>
      <SearchBar />
    </div>
  );
};*/

// Take this component's generated HTML and render it in the DOM

ReactDOM.render(<App />, document.querySelector(".container"));
