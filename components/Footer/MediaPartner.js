import { useState, useEffect } from "react";
import { db, storage } from "../firebase/config";

const MediaPartner = () => {
  const [mediaPartner, setMediaPartner] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const fetchData = async (data) => {
    db.collection("media-partner")
      .get()
      .then((snap) => {
        if (snap.length == 0) return;
        snap.forEach(async (doc) => {
          const tempData = doc.data();
          const photo = await downloadImage(tempData.photo);
          const tempObj = {
            ...tempData,
            photo: photo,
          };
          setMediaPartner((temp) => {
            const tempList = [...temp];
            tempList.push(tempObj);
            return tempList;
          });
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const downloadImage = async (imageRef) => {
    const path = storage.refFromURL(imageRef);
    const urlRes = await path.getDownloadURL().then((url) => {
      return url;
    });
    return urlRes;
  };

  if (isLoading || mediaPartner.length === 0) return null;

  return (
    <div className="footer__mediaPartner">
      <p className="footer__mediaPartner__title">Media Partner</p>
      <div className="footer__mediaPartner__logoContainer">
        {mediaPartner.map((data, index) => (
          <img
            className="footer__mediaPartner__logo"
            src={data.photo}
            alt={data.name}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaPartner;
