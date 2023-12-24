import CustomCalendar from "../customCalendar/customCalendar";
import Footer from "../footer/footer";
import "./home.css";

const Home = () => {
  return (
    <div className="div_container_home">
      <CustomCalendar/>
      <Footer/>
    </div>
  )
};
export default Home;
