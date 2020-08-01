import Paper from "@material-ui/core/Paper";
import "../../styles/Card.scss";

const EventKMMB = () => {
  const event = [
    {
      title: "E-Presentation Competition",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ",
    },
    {
      title: "Ikrar Mahasiswa Merdeka",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ",
    },
    {
      title: "Talkshow KMMB",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ",
    },
  ];

  return (
    <div className="eventKMMB">
      <h2 className="eventKMMB__title">Ada apa aja di KMMB 2020?</h2>
      <div className="eventKMMB__cards">
        {event.map((data, index) => (
          <Paper className="card" key={index} elevation={0}>
            <h3 className="card__title">{data.title}</h3>
            <p className="card__content">{data.description}</p>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default EventKMMB;
