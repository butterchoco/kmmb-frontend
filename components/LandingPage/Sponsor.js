import { useState, useEffect } from "react";
import { db, storage } from "../firebase/config";

const Sponsor = () => {
  const [sponsor, setSponsor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const fetchData = async (data) => {
    db.collection("sponsors")
      .get()
      .then(async (snap) => {
        if (snap.length == 0) return;
        snap.forEach(async (doc) => {
          const tempData = doc.data();
          const photo = await downloadImage(tempData.photo);
          const tempObj = {
            ...tempData,
            photo: photo,
          };
          setSponsor((temp) => {
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

  if (isLoading || sponsor.length === 0) return null;

  return (
    <div className="sponsor">
      <h2 className="sponsor__title">Disponsori Oleh</h2>
      <div className="sponsor__logoContainer">
        <div className="sponsor__logoContainer__extralarge">
          {sponsor.map((data, index) => {
            if (data.size == "XL") {
              return (
                <img
                  className="sponsor__logo"
                  src={data.photo}
                  alt={data.name}
                  key={index}
                />
              );
            }
          })}
        </div>
        <div className="sponsor__logoContainer__large">
          {sponsor.map((data, index) => {
            if (data.size == "L") {
              return (
                <img
                  className="sponsor__logo"
                  src={data.photo}
                  alt={data.name}
                  key={index}
                />
              );
            }
          })}
        </div>
        <div className="sponsor__logoContainer__medium">
          {sponsor.map((data, index) => {
            if (data.size == "M") {
              return (
                <img
                  className="sponsor__logo"
                  src={data.photo}
                  alt={data.name}
                  key={index}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
