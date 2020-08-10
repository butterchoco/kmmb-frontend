import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Link from "next/link";

const AboutKMMB = () => {
  return (
    <div id="aboutLandingPage" className="landingPageContainer">
      <div className="landingPageContainer__textContainer landingPageContainer__textContainer--left">
        <h2 className="landingPageContainer__title">Apa itu KMMB 2020?</h2>
        <p className="landingPageContainer__description">
          Konferensi Mahasiswa Merdeka Belajar (disingkat: KMMB) 2020 merupakan
          acara yang diadakan oleh BEM KM Fakultas Psikologi Universitas
          Airlangga sebagai wadah bagi mahasiswa untuk mengaktualisasikan diri,
          menampilkan kemampuannya, serta menginisiasi dukungan dan kontribusi
          mahasiswa melalui peranannya sebagai pemuda merdeka untuk berinovasi
          dan berkreasi tanpa batas.
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
      <div className="landingPageContainer__image">
        <img src="/images/conference.jpg" alt="conference"/>
      </div>
    </div>
  );
};

export default AboutKMMB;
