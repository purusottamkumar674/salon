import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const slots = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];
const availabilityItems = [
  '📅 Apr 15: 10AM, 12PM',
  '📅 Apr 16: 2PM, 4PM',
  '📅 Apr 17: 9AM, 1PM',
  '✨ Weekend slots available'
];

function App() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [clientName, setClientName] = useState('');
  const [bookingService, setBookingService] = useState('Haircut & Styling - $59');
  const [bookingMessage, setBookingMessage] = useState('');
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(23, 59, 59, 999);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        clearInterval(interval);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (86400000)) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setCountdown({
        days: days < 10 ? `0${days}` : `${days}`,
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBooking = () => {
    if (!clientName.trim()) {
      setBookingMessage('error: Please enter your name');
      return;
    }
    if (!selectedSlot) {
      setBookingMessage('error: Select a time slot');
      return;
    }
    setBookingMessage(
      `success: Thanks ${clientName}! Your ${bookingService} booked for ${selectedSlot}. A confirmation will be sent via SMS/Email.`
    );
    setTimeout(() => setBookingMessage(''), 4000);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top py-3">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3 text-white" href="#">
            LUMI<span className="neon-text">.</span>
          </a>
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            style={{ background: '#ff2a6d30', border: '1px solid #ff2a6d' }}
          >
            <i className="fas fa-bars text-white" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#pricing">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#gallery">
                  Gallery
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonials">
                  Reviews
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#booking">
                  Book
                </a>
              </li>
            </ul>
            <a href="#booking" className="btn btn-neon ms-3 d-none d-lg-inline-block">
              Book Now
            </a>
          </div>
        </div>
      </nav>

      <section id="home" className="hero-section min-vh-100 d-flex align-items-center pt-5">
        <div className="container position-relative z-1 py-5">
          <div className="row align-items-center">
            <div className="col-lg-7 text-center text-lg-start" data-aos="fade-up">
              <span className="badge bg-dark text-neon-pink px-3 py-2 rounded-pill mb-3" style={{ background: '#ff2a6d20', color: '#ff2a6d' }}>
                ✨ GLOW UP WITH NEON EDGE
              </span>
              <h1 className="display-3 fw-bold mb-3">
                Where Beauty Meets <span className="neon-text">Neon</span> Luxury
              </h1>
              <p className="lead mb-4 text-light-emphasis">
                Experience high-end hair, skincare & spa rituals in a futuristic ambiance. Book your signature session today.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <a href="#booking" className="btn btn-neon btn-lg">
                  <i className="fas fa-calendar-check me-2" />Book Appointment
                </a>
                <a href="#services" className="btn btn-outline-neon btn-lg">
                  <i className="fas fa-play-circle me-2" />Explore Services
                </a>
              </div>
              <div className="mt-4 d-flex gap-4 justify-content-center justify-content-lg-start">
                <div>
                  <i className="fas fa-star text-warning" /> 500+ 5-star reviews
                </div>
                <div>
                  <i className="fas fa-scissors" /> 15+ expert stylists
                </div>
              </div>
            </div>
            <div className="col-lg-5 mt-5 mt-lg-0" data-aos="fade-left">
              <div className="card-glow p-4 text-center">
                <h4 className="mb-3">
                  <i className="fas fa-spa neon-text" /> Flash Offer
                </h4>
                <div className="display-4 fw-bold neon-text">20% OFF</div>
                <p>on first visit + free hair mask</p>
                <div className="countdown-timer d-flex justify-content-center gap-3 mt-2" id="countdownTimer">
                  <div className="bg-dark p-2 rounded">
                    <span>{countdown.days}</span>
                    <br />Days
                  </div>
                  <div className="bg-dark p-2 rounded">
                    <span>{countdown.hours}</span>
                    <br />Hrs
                  </div>
                  <div className="bg-dark p-2 rounded">
                    <span>{countdown.minutes}</span>
                    <br />Min
                  </div>
                  <div className="bg-dark p-2 rounded">
                    <span>{countdown.seconds}</span>
                    <br />Sec
                  </div>
                </div>
                <a href="#booking" className="btn btn-sm btn-neon mt-3 w-100">
                  Grab Offer →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="display-5 fw-bold">
              Signature <span className="neon-text">Services</span>
            </h2>
            <p className="text-secondary">Precision cuts, rejuvenating facials, and holistic wellness</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="100">
              <div className="card-glow text-center p-4 h-100">
                <i className="fas fa-cut service-icon" />
                <h4 className="mt-3">Hair Styling</h4>
                <p>Modern cuts, balayage, vivid colors & keratin treatments.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="200">
              <div className="card-glow text-center p-4 h-100">
                <i className="fas fa-hand-sparkles service-icon" />
                <h4>Facial & Skin</h4>
                <p>HydraFacials, LED therapy & organic glow rituals.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="300">
              <div className="card-glow text-center p-4 h-100">
                <i className="fas fa-spa service-icon" />
                <h4>Spa Massage</h4>
                <p>Deep tissue, hot stone & aromatherapy massage.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="400">
              <div className="card-glow text-center p-4 h-100">
                <i className="fas fa-paint-brush service-icon" />
                <h4>Makeup Artistry</h4>
                <p>Bridal, editorial & airbrush makeup looks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-5 bg-black-50">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="display-5 fw-bold">
              Luxury <span className="neon-text">Pricing</span>
            </h2>
            <p className="text-secondary">Premium experience, flexible plans</p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-4" data-aos="flip-left">
              <div className="price-card h-100">
                <h3>Essential Glow</h3>
                <p className="text-muted">Haircut + Style</p>
                <div className="display-5 fw-bold neon-text">$59</div>
                <hr className="my-3 bg-secondary" />
                <ul className="list-unstyled">
                  <li>
                    <i className="fas fa-check-circle text-success me-2" /> Wash & Cut
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2" /> Blow-dry styling
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2" /> Scalp massage
                  </li>
                </ul>
                <a href="#booking" className="btn btn-outline-neon w-100 mt-3">
                  Select
                </a>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="flip-left" data-aos-delay="100">
              <div className="price-card featured h-100">
                <div className="badge bg-neon text-dark mb-2" style={{ background: '#ff2a6d' }}>
                  Most Popular
                </div>
                <h3>Spa Signature</h3>
                <p className="text-muted">Facial + Massage + Manicure</p>
                <div className="display-5 fw-bold neon-text">$149</div>
                <hr />
                <ul className="list-unstyled">
                  <li>
                    <i className="fas fa-check-circle text-success me-2" /> 75min Deep Tissue
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2" /> HydraFacial
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2" /> Express Manicure
                  </li>
                </ul>
                <a href="#booking" className="btn btn-neon w-100 mt-3">
                  Book Now →
                </a>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="flip-left" data-aos-delay="200">
              <div className="price-card h-100">
                <h3>Bridal Luxe</h3>
                <p className="text-muted">Full glam + Hairdo</p>
                <div className="display-5 fw-bold neon-text">$279</div>
                <hr />
                <ul className="list-unstyled">
                  <li>
                    <i className="fas fa-check-circle text-success me-2" /> Trial session included
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2" /> Airbrush makeup
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2" /> Updo styling
                  </li>
                </ul>
                <a href="#booking" className="btn btn-outline-neon w-100 mt-3">
                  Inquire
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-5">
        <div className="container">
          <div className="text-center mb-4" data-aos="fade-up">
            <h2 className="display-5 fw-bold">
              Transformations <span className="neon-text">Gallery</span>
            </h2>
            <p>Real results, real glow</p>
          </div>
          <div className="row g-3" data-aos="fade-up">
            <div className="col-6 col-md-3">
              <img
                src="https://placehold.co/600x600/1a1a1a/ff2a6d?text=Before+After+1"
                className="img-fluid rounded-4 w-100"
                style={{ objectFit: 'cover', height: 200 }}
                alt="Before After 1"
              />
            </div>
            <div className="col-6 col-md-3">
              <img
                src="https://placehold.co/600x600/1a1a1a/ff2a6d?text=Hair+Styling"
                className="img-fluid rounded-4 w-100"
                style={{ objectFit: 'cover', height: 200 }}
                alt="Hair Styling"
              />
            </div>
            <div className="col-6 col-md-3">
              <img
                src="https://placehold.co/600x600/1a1a1a/ff2a6d?text=Neon+Nails"
                className="img-fluid rounded-4 w-100"
                style={{ objectFit: 'cover', height: 200 }}
                alt="Neon Nails"
              />
            </div>
            <div className="col-6 col-md-3">
              <img
                src="https://placehold.co/600x600/1a1a1a/ff2a6d?text=Spa+Ambience"
                className="img-fluid rounded-4 w-100"
                style={{ objectFit: 'cover', height: 200 }}
                alt="Spa Ambience"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-5 bg-black">
        <div className="container">
          <h2 className="text-center display-5 fw-bold mb-4" data-aos="fade-up">
            Client <span className="neon-text">Love</span>
          </h2>
          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="testimonial-card text-center mx-auto" style={{ maxWidth: 600 }}>
                  <i className="fas fa-quote-left fa-2x neon-text mb-3" />
                  <p className="fs-5">
                    "LUMI gave me the best balayage of my life! The neon vibe is unreal, and staff is super professional."
                  </p>
                  <div className="star-rating">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                  <h5 className="mt-3">— Sophia R.</h5>
                </div>
              </div>
              <div className="carousel-item">
                <div className="testimonial-card text-center mx-auto" style={{ maxWidth: 600 }}>
                  <i className="fas fa-quote-left fa-2x neon-text mb-3" />
                  <p className="fs-5">
                    "The spa package was heavenly. Facial + massage combo melted all stress. Highly recommend!"
                  </p>
                  <div className="star-rating">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                  <h5 className="mt-3">— Amanda K.</h5>
                </div>
              </div>
              <div className="carousel-item">
                <div className="testimonial-card text-center mx-auto" style={{ maxWidth: 600 }}>
                  <i className="fas fa-quote-left fa-2x neon-text mb-3" />
                  <p className="fs-5">
                    "Best bridal makeup team in the city. Felt like a goddess on my big day!"
                  </p>
                  <div className="star-rating">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                  <h5 className="mt-3">— Priya M.</h5>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon bg-dark rounded-circle p-3" style={{ background: '#ff2a6d80' }} />
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon bg-dark rounded-circle p-3" style={{ background: '#ff2a6d80' }} />
            </button>
          </div>
        </div>
      </section>

      <section id="booking" className="py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="display-5 fw-bold">
                Reserve Your <span className="neon-text">Spot</span>
              </h2>
              <p>Online appointment booking — quick, easy, and confirmed instantly.</p>
              <div className="appointment-preview p-4">
                <h5>
                  <i className="fas fa-calendar-alt neon-text me-2" /> Pick a time slot
                </h5>
                <div id="timeSlotsContainer" className="d-flex flex-wrap mt-3">
                  {slots.map((slot) => (
                    <div
                      key={slot}
                      className={`calendar-slot ${selectedSlot === slot ? 'slot-selected' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <label className="form-label" htmlFor="bookingService">
                    Select Service
                  </label>
                  <select
                    id="bookingService"
                    className="form-select glass-input"
                    value={bookingService}
                    onChange={(e) => setBookingService(e.target.value)}
                  >
                    <option>Haircut & Styling - $59</option>
                    <option>Spa Signature Package - $149</option>
                    <option>Bridal Luxe - $279</option>
                    <option>HydraFacial - $99</option>
                  </select>
                </div>
                <div className="mt-3">
                  <label className="form-label" htmlFor="clientName">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    className="form-control glass-input"
                    placeholder="Jessica"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <button id="confirmBookingBtn" className="btn btn-neon w-100 mt-4" type="button" onClick={handleBooking}>
                  <i className="fas fa-check-circle" /> Confirm Booking
                </button>
                <div id="bookingMessage" className="mt-3 small text-center text-success">
                  {bookingMessage.startsWith('error:') ? (
                    <span className="text-danger">{bookingMessage.replace('error:', '')}</span>
                  ) : (
                    bookingMessage.startsWith('success:') ? (
                      <span>
                        <i className="fas fa-check-circle" /> {bookingMessage.replace('success:', '')}
                      </span>
                    ) : (
                      bookingMessage
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="card-glow p-4">
                <h4 className="mb-3">
                  <i className="fas fa-clock neon-text" /> Today's Availability
                </h4>
                <div className="row" id="calendarPreview">
                  {availabilityItems.map((item, index) => (
                    <div className="col-6" key={index}>
                      {item}
                    </div>
                  ))}
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span>
                    <i className="fab fa-whatsapp" /> +1 (555) 789-2345
                  </span>
                  <span>
                    <i className="far fa-envelope" /> hello@lumi.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-5 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h3 className="fw-bold">
                LUMI<span className="neon-text">.</span>
              </h3>
              <p>Neon elegance meets holistic beauty. Elevate your glow.</p>
              <div className="social-icons fs-4">
                <a href="#" className="text-white me-3">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#" className="text-white me-3">
                  <i className="fab fa-facebook" />
                </a>
                <a href="#" className="text-white me-3">
                  <i className="fab fa-tiktok" />
                </a>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#services" className="text-secondary text-decoration-none">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-secondary text-decoration-none">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#booking" className="text-secondary text-decoration-none">
                    Appointments
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-5 mb-4">
              <h5>Newsletter</h5>
              <div className="input-group">
                <input type="email" className="form-control glass-input" placeholder="Email for offers" />
                <button className="btn btn-neon" type="button">
                  Subscribe
                </button>
              </div>
              <p className="mt-3 small text-muted">© 2025 LUMI Salon & Spa — all rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/1234567890?text=Hi%20LUMI%2C%20I%20want%20to%20book%20an%20appointment%21"
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-whatsapp" />
      </a>
    </>
  );
}

export default App;
