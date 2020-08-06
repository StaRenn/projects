import React, {Component} from 'react';
import PropTypes from "prop-types"

class Player extends Component {
    static propTypes = {
        currentTrack: PropTypes.string.isRequired,
        autoplay: PropTypes.bool
    };

    state = {
        currentSongDuration: null,
        songState: "paused"
    };

    // used to convert song duration to time (250 => 4:10)
    parseIntToTime = (int) => {
        int = Math.ceil(int);
        return `${Math.floor(int/60)}:${int%60 >= 10 ? int%60 : "0" + (int%60).toString()}`
    }

    handlePlayButton = () => {
        this.audio.play().catch(err => this.handlePauseButton());
        this.setState({songState: "unpaused"})
    };

    handlePauseButton = () => {
        this.audio.pause();
        this.setState({songState: "paused"})
    };

    handleVolumeChange = (ev) => {
        this.volume_level.value = ev.target.value;
        this.audio.volume = ev.target.value/100
        // divided by 100 cuz audio.volume accepts numbers only in range from 0 to 1
    };

    resetToDefault = () => {
        this.current_time.innerHTML = "0:00";
        this.setState({currentSongDuration: null});
        this.timeline.value = "0";
        this.audio.currentTime = 0;
        this.currentTimeInterval ? clearInterval(this.currentTimeInterval) : null
    };

    //clearing interval if song is being paused/played to prevent accumulation of intervals
    componentWillUpdate(nextProps, nextState, nextContext) {
        clearInterval(this.currentTimeInterval);
    }

    //pausing song and resetting timeline and current time if song is being changed
    componentWillReceiveProps(nextProps, nextContext) {
        this.audio.src = "";
        this.handlePauseButton();
        this.resetToDefault();
    }
    componentWillUnmount() {
        this.handlePauseButton();
    }

    componentDidMount(){

        this.resetToDefault();
        const autoplay = this.props.autoplay;

        this.audio.onloadedmetadata = function() {
            this.audio.volume = this.volume_level.value/100;
            this.setState({currentSongDuration: this.audio.duration});
            autoplay ? this.handlePlayButton() : null
        }.bind(this);

        //creating interval to update timeline
        this.audio.onplay = () => {
            this.currentTimeInterval = setInterval(() => {
                this.current_time.innerHTML = this.parseIntToTime(this.audio.currentTime);
                this.timeline.value = this.audio.currentTime
            }, 10)
        };

        this.audio.onpause = () => {
            clearInterval(this.currentTimeInterval)
        };

        //changing song current time with timeline range input
        this.timeline.onmousedown = (ev) => {
            this.timeline.value = ev.target.value;
            this.handlePauseButton();

            this.timeline.onmousemove = (ev) => {
                this.timeline.value = ev.target.value;
                this.current_time.innerHTML = this.parseIntToTime(ev.target.value);
            };

            this.timeline.onmouseup = () => {
                this.timeline.onmousemove = null; //resetting onmousemove to prevent bugs
                this.audio.currentTime = ev.target.value;
                this.handlePlayButton()
            }
        };

        this.audio.onended = () => {
            this.resetToDefault();
            this.handlePauseButton()
        }

    }

    render() {
        const {currentTrack} = this.props;
        const {songState, currentSongDuration} = this.state;
        return (
            <div className={"player"}>
                <audio
                    preload={"metadata"}
                    id="song"
                    src={currentTrack}
                    ref={audio => {this.audio = audio}}
                />
                {songState === "unpaused"
                    ? <span className="player__pause-button" onClick={this.handlePauseButton}/>
                    : <span className={`player__play-button ${currentSongDuration === null ? "inactive" : ""}`} onClick={this.handlePlayButton}/>
                }
                <div className="player__volume">
                    <span/>
                    <input
                        ref={volume_level => {this.volume_level = volume_level}}
                        className="player__volume__input"
                        type="range"
                        onChange={this.handleVolumeChange}
                    />
                </div>
                <div className="player__time-line">
                    <span
                        className="player__current-time"
                        ref={current_time => {this.current_time = current_time}}
                    >0:00</span>
                    <input
                        ref={timeline => {this.timeline = timeline}}
                        className={`player__time-line__input ${currentSongDuration === null ? "inactive" : ""}`}
                        type="range"
                        min = "0"
                        max = {`${this.state.currentSongDuration}`}
                    />
                    <span className="player__total-time">{this.parseIntToTime(this.state.currentSongDuration)}</span>
                </div>
            </div>
        );
    }
}

export default Player;