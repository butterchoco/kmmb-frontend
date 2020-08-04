import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__top">
        <img src="/images/footer_top.svg" />
      </div>
      <div className="footer__content">
        <div className="footer__content__top">
          <div className="footer__logoContainer">
            <img className="footer__logo" src="/images/logo_KMMB.png" />
            <h3 className="footer__company">KMMB 2020</h3>
          </div>
        </div>
        <div className="footer__content__bottom">
          <div className="footer__sponsor">
            <p className="footer__sponsor__title">Disponsori Oleh</p>
          </div>
          <div className="footer__mediaPartner">
            <p className="footer__mediaPartner__title">Media Partner</p>
          </div>
          <div className="footer__contact">
            <div className="footer__contact__socialMedia">
              <p className="footer__contact__socialMedia__title">
                Sosial Media
              </p>
              <div className="footer__contact__socialMedia__logos"></div>
            </div>
            <div className="footer__contact__email">
              <p className="footer__contact__email__title">Kontak kami di</p>
              <p className="footer__contact__email__text">
                konferensimerdeka@gmail.com
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
