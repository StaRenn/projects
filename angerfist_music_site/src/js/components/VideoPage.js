import React, {Component} from 'react';
import {videoIds} from "../database";

class VideoPage extends Component {

    state = {
        activeVideo: null,
        isOpen: false
    };

    handleOpenVideoClick = (videoId) => () => {
        this.setState({
            activeVideo: videoId,
            isOpen: true
        })
    };

    handleCloseVideoClick() {
        this.setState({
            activeVideo: null,
            isOpen: false
        })
    }

    getIframe() {
        const {isOpen, activeVideo} = this.state;
        if(!isOpen) return null;
        return (
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&enablejsapi=1`}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen={"true"}
            />
        )
    }

    componentWillUnmount() {
        this.handleCloseVideoClick()
    }

    render() {
        const {isOpen} = this.state;
        return (
            <main>
                <div className="video-wrapper">
                    <div onClick={this.handleCloseVideoClick.bind(this)} className="close-video">
                        <h3 className="close-video__button">C<br/>L<br/>O<br/>S<br/>E</h3>
                    </div>
                    <div className="youtube-video-container">
                        {this.getIframe()}
                    </div>
                    <div style={isOpen ? {left: "-50%"} : null} className="video-left-col">
                        <div onClick={this.handleOpenVideoClick(videoIds[0])} className="video-container">
                            <h3 className="video-container__title">ANGERFIST AT DEFQON.1 2018</h3>
                        </div>
                        <div onClick={this.handleOpenVideoClick(videoIds[1])} className="video-container">
                            <h3 className="video-container__title">ANGERFIST AT MASTERS OF HARDCORE 2019</h3>
                        </div>
                    </div>
                    <div style={isOpen ? {right: "-50%"} : null} className="video-right-col">
                        <div onClick={this.handleOpenVideoClick(videoIds[2])} className="video-container">
                            <h3 className="video-container__title">ANGERFIST AT QLIMAX 2016</h3>
                        </div>
                        <div onClick={this.handleOpenVideoClick(videoIds[3])} className="video-container">
                            <h3 className="video-container__title">ANGERFIST AT TOMORROWLAND 2017</h3>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default VideoPage;