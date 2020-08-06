import React, {Component} from 'react';
import {tourdates} from "../database";
import CarouselSlider from "./CarouselSlider";


class TourDatesPage extends Component {

    state = {
        centeredSlide: 5
    };

    toursToArrayOfElements(tourdates) {
        return (closureFunc) => tourdates.map((tourdate, index) => <div
            className={`page-tourdates__slider-wrapper__slider__slide ${index === this.state.centeredSlide ? "active" : ""}`}
            onClick={closureFunc(index)}
        >
            <h3 className="page-tourdates__slider-wrapper__slider__slide__date">{tourdate.date}</h3>
            <h2 className="page-tourdates__slider-wrapper__slider__slide__name">{tourdate.clubname}</h2>
            <p className="page-tourdates__slider-wrapper__slider__slide__location">{tourdate.location}</p>
        </div>)
    }

    changeStateFromCarousel = () => (slideId) => {
        this.setState({
            centeredSlide: slideId
        })
    };

    render() {
        const tourdatesElements = this.toursToArrayOfElements(tourdates);
        return (
            <main>
                <div className="page-tourdates">
                    <div className={"page-tourdates__slider-wrapper"}>
                        <CarouselSlider
                            slides={tourdatesElements}
                            parentClassName={"page-tourdates__slider-wrapper"}
                            slideVwWidth={25}
                            totalVwWidth={275}
                            activeSlideID={this.state.centeredSlide}
                            stateFunc={this.changeStateFromCarousel()}
                        />
                    </div>
                </div>
            </main>
        );
    }
}

export default TourDatesPage;