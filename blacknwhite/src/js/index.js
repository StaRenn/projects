import "../styles/main.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {scrollToSmoothly} from "./helpers"

AOS.init();

const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
const submitButton = document.querySelector(".form-input.submit");

submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    //fetch
})


//smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const destination = document.querySelector(this.getAttribute('href'));

        if(supportsNativeSmoothScroll) {
            destination.scrollIntoView({
                behavior: 'smooth'
            });
        }else{
            scrollToSmoothly(destination.getBoundingClientRect().top, 500)
        }
    });
});