import CloudVector from "../Vector/CloudVector";
import Paper from "@material-ui/core/Paper";
import "../../styles/Card.scss";

const EventKMMB = () => {
  const event = [
    {
      title: "E-Presentation Competition",
      description:
        "Kegiatan “National E-Presentation Competition” dengan tema “Wajah Baru Indonesia di Tangan Pemuda” ini mendorong mahasiswa sebagai pemuda Indonesia untuk memberikan solusi kritis tanpa batas yang kreatif, inovatif, serta berlandaskan ilmu pengetahuan dan dituangkan melalui presentasi elektronik yang berupaya untuk menyinergikan tuntutan dari kemajuan teknologi serta pemuda di era baru ini. Mahasiswa sebagai pemuda Indonesia generasi Z perlu mengembangkan keterampilan teknologi yang akan menjadi suatu kekuatan sekaligus tuntutan yang tidak dapat dielakkan dalam setiap aktivitas di era baru ini sekaligus merupakan gambaran wajah baru Indonesia berada di tangan pemuda.",
    },
    {
      title: "Ikrar Mahasiswa Merdeka",
      description:
        "Sebuah aksi untuk menyuarakan ikrar para mahasiswa dalam kontribusinya melanjutkan perjuangan pemberdayaan pemuda bagi Indonesia sekaligus menjadi awal sejarah pergerakan pemuda Indonesia yang merdeka di era baru. Ikrar Mahasiswa Merdeka merupakan sebuah naskah yang dibuat oleh para mahasiswa Indonesia dan akan mulai dihimpun sejak tanggal 28 Oktober bertepatan dengan peringatan Hari Sumpah Pemuda, dan nantinya naskah ikrar tersebut akan dibacakan pada puncak acara KMMB 2020.",
    },
    {
      title: "Talkshow KMMB",
      description:
        "Kegiatan ini menekankan pentingnya aktualisasi diri mahasiswa agar menjadi mahasiswa yang merdeka dari batasan-batasan yang selama ini ada, merdeka dalam menentukan pilihan mereka sendiri, merdeka dalam belajar, serta merdeka dalam berkontribusi untuk membangun Indonesia.",
    },
  ];

  return (
    <div id="eventLandingPage" className="eventKMMB">
      <CloudVector />
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
