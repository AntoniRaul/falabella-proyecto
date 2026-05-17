import Header from '../../components/Header/Header';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="home-main">
        <HeroCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
