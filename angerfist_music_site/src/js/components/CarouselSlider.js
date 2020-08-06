import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CarouselSlider extends Component {

    constructor(props) {
        super(props);
        this.sliderOffsetLeft = 0;
        this.state = {
            activeSlideID: this.props.activeSlideID || 0
        };
    }

    static propTypes = {
        slides: PropTypes.array.isRequired,
        slideVwWidth: PropTypes.number.isRequired,
        parentClassName: PropTypes.string.isRequired,
        totalVwWidth: PropTypes.number.isRequired,
        stateFunc: PropTypes.func,
        activeSlideID: PropTypes.number
    };

    setActiveSlide = (albumID) => () => {
        const {stateFunc} = this.props;
        stateFunc ? stateFunc(albumID) : null;
        this.setState({activeSlideID: albumID})
    };

    getOffset() {
        const {slideVwWidth} = this.props;
        return Math.round(this.sliderOffsetLeft / slideVwWidth) * slideVwWidth
    }

    getSlideId() {
        const {slideVwWidth} = this.props;
        const offsetWidth = (this.props.totalVwWidth - slideVwWidth)/2;
        return Math.round((-this.sliderOffsetLeft + offsetWidth)/slideVwWidth)
    }

    componentWillUnmount() {
        this.sliderDiv.onmousedown = null;
        window.onmousemove = null;
        window.onmouseup = null;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        const {slideVwWidth, totalVwWidth} = this.props;
        this.sliderOffsetLeft = (totalVwWidth - slideVwWidth) / 2 - nextState.activeSlideID * slideVwWidth;
        this.sliderDiv.style.left = this.sliderOffsetLeft + "vw";
    }

    componentDidMount() {

        const {slideVwWidth, totalVwWidth} = this.props;
        const stateFunc = this.props.stateFunc || null;
        const offsetWidth = (totalVwWidth - slideVwWidth)/2;
        const sliderPreOffset = offsetWidth - this.state.activeSlideID*slideVwWidth;

        this.sliderOffsetLeft = sliderPreOffset || 0;
        this.sliderDiv.style.left = this.sliderOffsetLeft + "vw";

        this.sliderDiv.onmousedown = function(ev) {

            let lastPageXPosition = ev.pageX;

            //comparing previous mouse position with a current one
            //accumulating it in offset and assigning it for slider.style.left

            window.onmousemove = function (ev) {

                this.sliderDiv.style.pointerEvents = "none"; //to prevent hover and onclick effect while sliding

                this.sliderOffsetLeft += ((ev.clientX - lastPageXPosition) / document.body.clientWidth)*200; //*200 for speed increasing

                if(this.sliderOffsetLeft > offsetWidth) this.sliderOffsetLeft = offsetWidth;    //limiting slider offset
                if(this.sliderOffsetLeft < -offsetWidth) this.sliderOffsetLeft = -offsetWidth;  //limiting slider offset

                this.sliderDiv.style.left = this.sliderOffsetLeft + "vw";
                lastPageXPosition = ev.pageX

            }.bind(this);

            window.onmouseup = function () {

                window.onmousemove = null;
                this.sliderDiv.style.pointerEvents = "auto";
                this.sliderOffsetLeft = this.getOffset();
                this.sliderDiv.style.left = this.sliderOffsetLeft + "vw";
                let active_slide_id = this.getSlideId();

                this.setActiveSlide(active_slide_id)();

            }.bind(this)
        }.bind(this)
    }

    render() {
        const {slides, parentClassName} = this.props;
        return (
            <div
                className={`${parentClassName}__slider`}
                ref={sliderDiv => this.sliderDiv = sliderDiv}
            >
                {slides(this.setActiveSlide)}
            </div>
        );
    }
}

export default CarouselSlider;