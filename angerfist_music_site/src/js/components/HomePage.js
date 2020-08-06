import React, {Component} from 'react';
import {tracklist} from "../database";
import Player from "./Player";

class HomePage extends Component {

    state = {
        currentTrackNumber: 0,
    };

    render() {
        const trackNumber = this.state.currentTrackNumber;
        return (
            <main>
                <div className="home-page">
                    <div className="home-page__sidebar">
                        <div className="home-page__sidebar__socials">
                            <a className="home-page__sidebar__socials__link" href="#">Instagram</a>
                            <a className="home-page__sidebar__socials__link" href="#">Youtube</a>
                            <a className="home-page__sidebar__socials__link" href="#">Twitter</a>
                            <a className="home-page__sidebar__socials__link" href="#">Facebook</a>
                        </div>
                    </div>
                    <span className="bg-logo"/>
                    <span className="angerfist-photo"/>
                    <div className={"home-page__player-block"}>
                        <div className="home-page__player-block__data">
                            <h3 className="home-page__player-block__data__author">{tracklist[trackNumber][0]}</h3>
                            <h4 className="home-page__player-block__data__songname">{tracklist[trackNumber][1]}</h4>
                        </div>
                        <span className="home-page__player-block__line"/>
                        <Player currentTrack={tracklist[trackNumber][2]}/>
                    </div>
                    <div className="home-page__song-list-container">
                        <div className="home-page__song-list-container__song-list">
                            <div className="home-page__song-list-container__song-list__change-song">
                                <div className="home-page__song-list-container__song-list__change-song__next"
                                     onClick={this.handleTrackChange("next")}>
                                    <p>next song</p>
                                    <span/>
                                </div>
                                <div className="home-page__song-list-container__song-list__change-song__prev"
                                     onClick={this.handleTrackChange("prev")}>
                                    <p>prev song</p>
                                    <span/>
                                </div>
                            </div>
                            <span className="home-page__song-list-container__song-list__frame" style={
                                {
                                    backgroundImage: `url(${tracklist[trackNumber][3]})`,
                                    backgroundSize: `100% 100%`
                                }
                            }/>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    handleTrackChange = (type) => () => {
        if(type === "next") {
            this.setState({
                currentTrackNumber: (++this.state.currentTrackNumber) % tracklist.length
            })
        } else {
            this.setState({
                currentTrackNumber: (tracklist.length + --this.state.currentTrackNumber) % tracklist.length
            })
        }
    }

}

export default HomePage;