import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import './styles/style.css';

const API_KEY = 'AIzaSyAPJSG-LGNho5jh575nVe6bhzKKSwIAbog'; 

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selctedVideo: null
		 };

		this.videoSearch('Joma Tech');
	
	}

	videoSearch(term){
		YTSearch({ key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[1]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
