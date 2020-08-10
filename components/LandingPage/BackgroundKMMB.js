import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Link from "next/link";

const BackgroundKMMB = () => {
  return (
    <div id="backgroundLandingPage" className="landingPageContainer">
      <div className="landingPageContainer__image">
        <img src="/images/innovation.jpg" alt="innovation"/>
      </div>
      <div className="landingPageContainer__textContainer landingPageContainer__textContainer--left">
        <h2 className="landingPageContainer__title">Latar Belakang</h2>
        <p className="landingPageContainer__description">
          Kami melihat tantangan perubahan saat ini sebagai kesempatan untuk
          bergerak dan berdaya. Kami berinisiatif menggerakkan mahasiswa dalam
          peranannya sebagai pemuda untuk berbagi ide melalui ruang-ruang
          diskursus dan karya-karya kreatif secara merdeka. Kami percaya
          terdapat banyak suara mahasiswa yang mampu melahirkan ide-ide kritis
          luar biasa sebagai salah satu bentuk aktualisasi dari ilmu yang ia
          pelajari di bangku perkuliahan.
        </p>
        <div className="landingPageContainer__cto">
          <Link href="/about">
            <button className="secondary">
              Baca Selanjutnya
              <KeyboardArrowRightIcon />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BackgroundKMMB;
