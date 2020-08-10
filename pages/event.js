import Layout from "../components/Layout";
import "../styles/ExplainationPage.scss";

const Event = (props) => {
  return (
    <Layout {...props}>
      <div className="explainationPage">
        <div className="explainationPage__hero">
          <div className="explainationPage__hero__wrapper">
            <h2 className="explainationPage__hero__title">Rangkaian Acara</h2>
          </div>
        </div>
        <div className="explainationPage__content">
          <h3>E-Presentation Competition</h3>
          <p>
            “Wajah Baru Indonesia di Tangan Pemuda”
            <br />
            <br />
            Kegiatan “National E-Presentation Competition” dengan tema “Wajah
            Baru Indonesia di Tangan Pemuda” ini mendorong mahasiswa sebagai
            pemuda Indonesia untuk memberikan solusi kritis tanpa batas yang
            kreatif, inovatif, serta berlandaskan ilmu pengetahuan dan
            dituangkan melalui presentasi elektronik yang berupaya untuk
            menyinergikan tuntutan dari kemajuan teknologi serta pemuda di era
            baru ini. Mahasiswa sebagai pemuda Indonesia generasi Z perlu
            mengembangkan keterampilan teknologi yang akan menjadi suatu
            kekuatan sekaligus tuntutan yang tidak dapat dielakkan dalam setiap
            aktivitas di era baru ini sekaligus merupakan gambaran wajah baru
            Indonesia berada di tangan pemuda.
          </p>
          <img src="/images/competition.jpg" alt="competition"/>
          <h3>Talkshow KMMB</h3>
          <p>
            “Aktualisasi Diri Pemuda di Indonesia yang Baru”
            <br />
            <br />
            Kegiatan ini menekankan pentingnya aktualisasi diri mahasiswa agar
            menjadi mahasiswa yang merdeka dari batasan-batasan yang selama ini
            ada, merdeka dalam menentukan pilihan mereka sendiri, merdeka dalam
            belajar, serta merdeka dalam berkontribusi untuk membangun
            Indonesia. Ada kegiatan apa aja di Talkshow KMMB?
            <br />
            <br />
            1. Sesi Keynote Speaker Mahasisa secara perseorangan akan
            menyuarakan pandangan, ide, gagasan, serta perspektifnya untuk
            mendorong pemberdayaan pemuda serta mahasiswa di era baru Indonesia.
            <br />
            <br />
            2. Sesi Talkshow Interaktif Sesi diskusi interaktif antara
            narasumber ahli dan mahasiswa yang telah telah mengisi sesi Keynote
            Speaker. Pada sesi ini, para pembicara akan mendiskusikan tema
            terkait dengan bagaimana mahasiswa sebagai individu merdeka belajar
            dapat memberikan peran kepada masyarakat.
          </p>
          <img src="/images/talkshow.jpg" alt="talkshow"/>
          <h3>Ikrar Mahasiswa Merdeka</h3>
          <p>
            Sebuah aksi untuk menyuarakan ikrar para mahasiswa dalam
            kontribusinya melanjutkan perjuangan pemberdayaan pemuda bagi
            Indonesia sekaligus menjadi awal sejarah pergerakan pemuda Indonesia
            yang merdeka di era baru. Ikrar Mahasiswa Merdeka merupakan sebuah
            naskah yang dibuat oleh para mahasiswa Indonesia dan akan mulai
            dihimpun sejak tanggal 28 Oktober bertepatan dengan peringatan Hari
            Sumpah Pemuda, dan nantinya naskah ikrar tersebut akan dibacakan
            pada puncak acara KMMB 2020.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Event;
