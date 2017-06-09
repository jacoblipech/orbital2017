import React from 'react';
const Header = ({message}) => {
  return(
      <div className="header">
      <div className="bg-color">
        <header id="main-header">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Ba<span class="logo-dec">ker</span></a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav navbar-right">
                <li className="active"><a href="#main-header">Home</a></li>
                <li className=""><a href="#feature">About</a></li>
                <li className=""><a href="#service">Services</a></li>
                <li className=""><a href="#portfolio">Portfolio</a></li>
                <li className=""><a href="#testimonial">Testimonial</a></li>
                <li className=""><a href="#blog">Blog</a></li>
                <li className=""><a href="#contact">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </nav>
        </header>
        <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="banner-info text-center wow fadeIn delay-05s">
              <h1 className="bnr-title">We are at ba<span>ker</span></h1>
              <h2 className="bnr-sub-title">{message}</h2>
              <p className="bnr-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip <br>ex ea commodo consequat.</p>
              <div className="brn-btn">
                <a href="#" class="btn btn-download">Download now!</a>
                <a href="#" class="btn btn-more">Learn More</a>
              </div>
              <div className="overlay-detail">
                <a href="#feature"><i class="fa fa-angle-down"></i></a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
  
}; 

Header.propTypes = {
  message: React.PropTypes.string.isRequired
};

export default Header;
