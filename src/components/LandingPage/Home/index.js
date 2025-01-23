import About from "../About";
import Contact from "../Contact";
import Features from "../Features";
import Header from "../Header";
import HeroSection from "../HeroSection";
import Login from "../Login ";

function Home(){
    return(
        <div>
            <Header/>
            <HeroSection/>
            <Features/>
            <About/>
            <Login/>
            {/* <Contact/> */}
        </div>
    )
}
export default Home;