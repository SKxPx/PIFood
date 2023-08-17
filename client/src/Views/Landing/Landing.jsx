import { Link } from 'react-router-dom';
import './landing.css'

const LandingPage = () => {

  return (
    <div className="landing-page">
      <img src="https://s1.1zoom.me/big0/771/400926-svetik.jpg" alt="Imagen de fondo" className="background-image" />
      <div className="content">
        <h1>Bienvenidos Recetas y mas Recetas</h1>
        <Link to="/home" className="start-button">Ir al Home</Link>
      </div>
    </div>
  );
};

export default LandingPage;
