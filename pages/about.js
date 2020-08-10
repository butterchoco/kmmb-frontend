import Layout from "../components/Layout";
import "../styles/ExplainationPage.scss";

const About = (props) => {
  return (
    <Layout {...props}>
      <div className="explainationPage">
        <div className="explainationPage__hero">
          <div className="explainationPage__hero__wrapper">
            <h2 className="explainationPage__hero__title">
              Apa itu KMMB 2020?
            </h2>
          </div>
        </div>
        <div className="explainationPage__content">
          <h3>Tentang Kami</h3>
          <p>
            KMMB 2020 merupakan acara yang diadakan oleh BEM KM Fakultas
            Psikologi Universitas Airlangga dengan memberikan wadah bagi
            mahasiswa untuk mengaktualisasikan diri, menampilkan kemampuannya,
            serta menginisiasi dukungan dan kontribusi mahasiswa dalam
            peranannya dengan memberikan ruang gerak bagi mahasiswa untuk
            berinovasi dan berkreasi. Keberadaan acara ini mensinergikan spirit
            "Kampus Merdeka" yang digagas oleh Kementerian Pendidikan dan
            Kebudayaan Indonesia (Kemendikbud) dan “Indonesia Butuh Anak Muda”
            melalui sebuah acara yang berjudul “Konferensi Mahasiswa Merdeka
            Belajar”. Konferensi ini adalah satu rangkaian acara dalam Dies
            Natalis Fakultas Psikologi Universitas Airlangga yang ke-37 yang
            bertemakan ‘Merdeka Belajar Sepanjang Hayat" Hari Sumpah Pemuda pada
            bulan Oktober juga akan menjadi momentum yang baik untuk
            penyelenggaraan kegiatan “Konferensi Mahasiswa Merdeka Belajar” ini
            sebagai bentuk deklarasi akan peran mahasiswa dalam pembangunan
            Indonesia.
            <br />
            <br />
            #BreakOurBondaries!
            <br />
            KMMB 2020 mengangkat tema “Break Our Boundaries!” yang merupakan
            wadah unjuk diri bagi mahasiswa dalam peranannya sebagai pemuda
            dengan memberikan pemikiran kritisnya untuk mengkaji fenomena yang
            terjadi di Indonesia beberapa waktu terakhir ini dengan berbagai
            perspektif keilmuan yang dimiliki.
          </p>
          <img src="/images/innovation.jpg" />
          <h3>Latar Belakang</h3>
          <p>
            Kami melihat tantangan perubahan saat ini sebagai kesempatan untuk
            bergerak dan berdaya. Kami berinisiatif untuk menggerakkan mahasiswa
            sebagai generasi muda untuk berbagi ide melalui ruang-ruang
            diskursus dan karya-karya kreatif. Kami percaya terdapat banyak
            suara mahasiswa yang membawa ide-ide kritisnya sebagai perwujudan
            dari ilmu yang ia pelajari di bangku perkuliahan. Sekali lagi,
            mahasiswa sebagai generasi muda ini perlu mendapat ruang gerak untuk
            menunjukkan karya dan bersuara, dan kami ada untuk itu.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
