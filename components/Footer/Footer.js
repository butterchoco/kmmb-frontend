import "./Footer.scss";
import { Link } from "@material-ui/core";
import { useState } from "react";

const Footer = () => {
  const [mediaPartner, setMediaPartner] = useState([]);
  const [sponsor, setSponsor] = useState([]);

  return (
    <div className="footer">
      <div className="footer__top">
        <img src="/images/footer_top.svg" alt="wave"/>
      </div>
      <div className="footer__content">
        <div className="footer__content__top">
          <div className="footer__logoContainer">
            <img className="footer__logo" src="/images/logo_KMMB.png" alt="logo"/>
            <h3 className="footer__company">KMMB 2020</h3>
          </div>
        </div>
        <div className="footer__content__bottom">
          {sponsor.length !== 0 ? (
            <div className="footer__sponsor">
              <p className="footer__sponsor__title">Disponsori Oleh</p>
            </div>
          ) : null}
          {mediaPartner.length !== 0 ? (
            <div className="footer__mediaPartner">
              <p className="footer__mediaPartner__title">Media Partner</p>
            </div>
          ) : null}
          <div className="footer__contact">
            <div className="footer__contact__socialMedia">
              <p className="footer__contact__socialMedia__title">
                Sosial Media
              </p>
              <div className="footer__contact__socialMedia__logos">
                <Link
                  className="footer__contact__socialMedia__logos__facebook"
                  href=""
                >
                  <img src="/images/facebook.png" alt="facebook"/>
                </Link>
                <Link
                  className="footer__contact__socialMedia__logos__youtube"
                  href=""
                >
                  <img src="/images/youtube.png" alt="youtube"/>
                </Link>
                <Link
                  className="footer__contact__socialMedia__logos__instagram"
                  href="https://instagram.com/mahasiswamerdekabelajar"
                >
                  <img src="/images/instagram.png" alt="instagram"/>
                </Link>
                <Link
                  className="footer__contact__socialMedia__logos__line"
                  href=""
                >
                  <img src="/images/line.png" alt="line"/>
                </Link>
              </div>
            </div>
            <div className="footer__contact__email">
              <p className="footer__contact__email__title">Kontak kami di</p>
              <p className="footer__contact__email__text">
                konferensimahasiswamerdeka@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="footer__copyright">
          <p className="footer__copyright__kmmb">© KMMB 2020</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
