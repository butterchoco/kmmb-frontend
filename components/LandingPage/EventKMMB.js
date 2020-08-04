import Paper from "@material-ui/core/Paper";
import "../../styles/Card.scss";

const EventKMMB = () => {
  const event = [
    {
      title: "E-Presentation Competition",
      description:
        "Konferensi keilmuan yang dikemas dalam sebuah kompetisi bertaraf nasional dimana mahasiswa didorong untuk mempresentasikan suatu ide kreatif, inovatif, dan solutif dalam bentuk electronic presentation yang menggambarkan wajah baru Indonesia pasca berbagai fenomena yang terjadi beberapa waktu terakhir ini.",
    },
    {
      title: "Ikrar Mahasiswa Merdeka",
      description:
        "Pembacaan naskah Ikrar Mahasiswa Merdeka yang merupakan sebuah naskah dibuat oleh para mahasiswa Indonesia, dengan pengumpulan aspirasi dan diskusi oleh para mahasiswa untuk menyuarakan ikrar atas kontribusi nyata untuk pembangunan Indonesia di era yang baru.",
    },
    {
      title: "Talkshow KMMB",
      description:
        "Kegiatan ini menekankan pentingnya aktualisasi diri mahasiswa agar menjadi mahasiswa yang merdeka dari batasan-batasan yang selama ini ada, merdeka dalam menentukan pilihan mereka sendiri, merdeka dalam belajar, serta merdeka dalam berkontribusi untuk membangun Indonesia.",
    },
  ];

  return (
    <div id="eventLandingPage" className="eventKMMB">
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
