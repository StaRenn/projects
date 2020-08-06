import React, {Component} from 'react';
import {musicAlbums} from "../database";
import Player from "./Player";
import CarouselSlider from "./CarouselSlider";

class MusicPage extends Component {

    state = {
        activeAlbumID: 0,
        currentTrackNumber: null,
        sliderPreOffset: 40
    };

    slidesToAnArrayOfElements() {
        //this function returns function with ready jsx template, so when i pass this function
        //to the carousel, i can call it there and assign onclick event handler function from carousel
        const albumNames = Object.keys(musicAlbums);
        const {activeAlbumID} = this.state;
        return (carouselFunc) => albumNames.map((album, index) => {
            return (
                <div
                    className={`music-page__slider__slide ${index === activeAlbumID ? "active" : ""}`}
                    onClick={carouselFunc(index)}
                >
                    <span className="music-page__slider__slide__logo" style={{
                        backgroundImage: `url(${musicAlbums[album].albumImagePath})`,
                        backgroundSize: `100% 100%`
                    }}/>
                    <p className="music-page__slider__slide__date">{musicAlbums[album].albumReleaseDate}</p>
                </div>)
        })
    }

    changeStateFromCarousel = () => (activeAlbumID) => { //function so i can set state of current class from other class
        if (this.state.activeAlbumID === activeAlbumID) return null;
        this.setState({
            activeAlbumID: activeAlbumID,
            currentTrackNumber: null
        })
    };

    handleSelectTrack = (trackId) => () => {
        if(this.state.currentTrackNumber === trackId) return null;
        this.setState({
            currentTrackNumber: trackId
        })
    };

    getCurrentAlbumName() {
        return Object.keys(musicAlbums)[this.state.activeAlbumID]
    }

    getTrackList() {
        const {currentTrackNumber} = this.state;
        const activeAlbumName = this.getCurrentAlbumName();
        const trackList = musicAlbums[activeAlbumName].albumTracks;
        const trackListElements = trackList.map((trackName, index) => {
            return (
                <li
                        className={`music-page__track-list__track ${index === currentTrackNumber ? "active" : ""}`}
                        onClick={this.handleSelectTrack(index)}
                    >
                        {trackName}
                </li>)
        });
        return (
            <div className="music-page__track-list">
                <ul id="music-page__track-list__first-column">
                    {trackListElements.slice(0, trackListElements.length/2)}
                </ul>
                <ul id="music-page__track-list__second-column">
                    {trackListElements.slice(trackListElements.length/2, trackListElements.length)}
                </ul>
            </div>
        )
    }

    render() {
        const {currentTrackNumber} = this.state;
        const activeAlbumName = this.getCurrentAlbumName();
        return (
            <main>
                <div className="music-page">
                    <div className={"music-page__player-wrapper"}>
                        <Player
                            currentTrack={musicAlbums[activeAlbumName].tracksPaths[currentTrackNumber]}
                            autoplay={true}
                        />
                    </div>
                    <span className="music-page__background" style={{backgroundImage: `url(${musicAlbums[activeAlbumName].albumImagePath})`}}/>

                    {this.getTrackList()}

                    <div className="music-page__slider__wrapper">
                            <CarouselSlider
                                slides={this.slidesToAnArrayOfElements()}
                                totalVwWidth={100}
                                slideVwWidth={20}
                                parentClassName={"music-page__slider__wrapper"}
                                stateFunc={this.changeStateFromCarousel()}
                                sliderPreOffset={this.state.sliderPreOffset}
                            />
                    </div>
                </div>
            </main>
        );
    }
}

export default MusicPage;