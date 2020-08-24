import Slider from "react-slick";

const SpeakersCarousel = ({ speakers }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {speakers.map((data, index) => (
        <div className="speakers__photo" key={index}>
          <div className="speakers__photo__wrapper">
            <img src={data.photo} />
          </div>
          <div className="speakers__photo__text">
            <h4 className="speakers__name">{data.name}</h4>
            <p className="speakers__profession">{data.profesi}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SpeakersCarousel;
