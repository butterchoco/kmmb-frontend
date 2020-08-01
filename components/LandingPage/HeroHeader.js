import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      text: {
        background: "white",
        borderRadius: 5,
        border: 0,
        color: "#841361",
        height: 48,
        padding: "0 20px",
      },
    },
  },
});

const HeroHeader = () => {
  return (
    <div className="hero">
      <div className="hero__textContainer--left">
        <h1 className="hero__title">KMMB 2020</h1>
        <p className="hero__tag">#BreakOurBoundaries!</p>
        <div className="hero__cto">
          <button className="primary">Daftar Sekarang</button>
          <button className="secondary">Download booklet</button>
        </div>
      </div>
      <div className="hero__image"></div>
    </div>
  );
};

export default HeroHeader;
