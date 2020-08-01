import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const textFormat = (text) => {
  const textTemp = text.split(" ");
  return textTemp.splice(0, 36).join(" ") + "....";
};

const AboutKMMB = () => {
  return (
    <div id="aboutLandingPage" className="landingPageContainer">
      <div className="landingPageContainer__textContainer landingPageContainer__textContainer--left">
        <h2 className="landingPageContainer__title">Apa itu KMMB 2020?</h2>
        <p className="landingPageContainer__description">
          {textFormat(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
          )}
        </p>
        <div className="landingPageContainer__cto">
          <button className="secondary">
            Baca Selanjutnya
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
      <div className="landingPageContainer__image"></div>
    </div>
  );
};

export default AboutKMMB;
