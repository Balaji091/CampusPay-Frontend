import Styles from './hero.module.css';
function HeroSection(){
    return(
        
        <div  id="home"className={Styles.mainContainer}>
            <h1 className={Styles.heading}> Welcome to CampusPay </h1>
            <p className={Styles.info}>The easiest way to manage fees and payments for Students and University.Get startde with a free account. </p>
            <a href='#login'><button className={Styles.button}> Get Started</button></a>
        </div>
    )
}
export default HeroSection;