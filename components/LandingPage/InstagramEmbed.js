import Instagram from "../Instagram/Instagram";

const InstagramEmbed = () => {
	return (
		<div className="landingPageContainer instagramEmbed">
			<div className="landingPageContainer__textContainer landingPageContainer__textContainer--center">
				<h2 className="landingPageContainer__title">
					Jangan Ketinggalan Info!
				</h2>
				<p className="landingPageContainer__textContainer__description">
					Follow Instagram dan sosial media kami lainnya agar mendapatkan berita
					terbaru tentang KMMB 2020. Kami tunggu untuk menjadi bagian dari
					#BreakOurBoundaries!
				</p>
			</div>
			<Instagram username="mahasiswamerdekabelajar" />
		</div>
	);
};

export default InstagramEmbed;
