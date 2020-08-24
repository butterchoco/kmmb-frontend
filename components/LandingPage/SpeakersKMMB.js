import SpeakersCarousel from "../SpeakersCarousel";
import { useState, useEffect } from "react";
import { db, storage } from "../firebase/config";

const SpeakersKMMB = () => {
  const [speakers, setSpeakers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const fetchData = async (data) => {
    db.collection("speakers")
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
          setSpeakers((temp) => {
            const tempList = [...temp];
            tempList.unshift(tempObj);
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

  if (isLoading || speakers.length === 0) return null;

  return (
    <div className="speakers">
      <h2 className="speakers__title">Speakers</h2>
      <SpeakersCarousel speakers={speakers} />
    </div>
  );
};

export default SpeakersKMMB;
