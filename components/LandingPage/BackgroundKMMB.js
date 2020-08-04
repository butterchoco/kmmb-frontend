import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const BackgroundKMMB = () => {
  return (
    <div id="backgroundLandingPage" className="landingPageContainer">
      <div className="landingPageContainer__image">
        <img src="/images/innovation.jpg" />
      </div>
      <div className="landingPageContainer__textContainer landingPageContainer__textContainer--left">
        <h2 className="landingPageContainer__title">Latar Belakang</h2>
        <p className="landingPageContainer__description">
          Kami melihat tantangan perubahan saat ini sebagai kesempatan untuk
          bergerak dan berdaya. Kami berinisiatif untuk menggerakkan mahasiswa
          sebagai generasi muda untuk berbagi ide melalui ruang-ruang diskursus
          dan karya-karya kreatif. Kami percaya terdapat banyak suara mahasiswa
          yang membawa ide-ide kritisnya sebagai perwujudan dari ilmu yang ia
          pelajari di bangku perkuliahan.
        </p>
        <div className="landingPageContainer__cto">
          <button className="secondary">
            Baca Selanjutnya
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundKMMB;
