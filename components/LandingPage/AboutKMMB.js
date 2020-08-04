import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const AboutKMMB = () => {
  return (
    <div id="aboutLandingPage" className="landingPageContainer">
      <div className="landingPageContainer__textContainer landingPageContainer__textContainer--left">
        <h2 className="landingPageContainer__title">Apa itu KMMB 2020?</h2>
        <p className="landingPageContainer__description">
          KMMB 2020 merupakan acara yang diadakan oleh BEM KM Fakultas Psikologi
          Universitas Airlangga dengan memberikan wadah bagi mahasiswa untuk
          mengaktualisasikan diri, menampilkan kemampuannya, serta menginisiasi
          dukungan dan kontribusi mahasiswa dalam peranannya dengan memberikan
          ruang gerak bagi mahasiswa untuk berinovasi dan berkreasi.
        </p>
        <div className="landingPageContainer__cto">
          <button className="secondary">
            Baca Selanjutnya
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
      <div className="landingPageContainer__image">
        <img src="/images/conference.jpg" />
      </div>
    </div>
  );
};

export default AboutKMMB;
