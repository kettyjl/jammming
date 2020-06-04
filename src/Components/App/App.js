import React from 'react';
// import logo from './logo.svg';

import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Sportify from '../../util/Spotify';
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults:[],
      playlistName: 'New Playlist',
      playlistTracks:[]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);



  }
  addTrack(track){

    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
     return;
    }
    this.state.playlistTracks.push(track);
    this.setState({
      playlistTracks:this.state.playlistTracks
    });
  }
  removeTrack(track){
    let newTrack = this.state.playlistTracks;
    newTrack = newTrack.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({
      playlistTracks:newTrack
    });
      
     
  }

  updatePlaylistName(name){
    this.setState({
      playlistName:name
    });
  }

  savePlaylist(){
     let trackURIs = this.state.playlistTracks.map(savedTrack => savedTrack.uri);
    Sportify.savePlaylist(this.state.playlistName,trackURIs).then(() =>{
      this.setState({
        playlistName:'New Playlist',
        playlistTracks: []
      });
    });
    
  }
  search(term){
   Sportify.search(term).then(searchResults =>{
     this.setState({searchResults:searchResults});
   })
  }
  render(){
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <PlayList 
          playlistName={this.state.playlistName} 
          playlistTracks={this.state.playlistTracks} 
          onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>
    );
}

}

export default App;
