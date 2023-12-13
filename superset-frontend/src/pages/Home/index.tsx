import React, { useEffect, useState } from 'react';
import './GreyBackgroundPage.css'; // Import the CSS file

const BlackBackgroundPage = () => {
  const [dataOpacity, setDataOpacity] = useState(0);
  const [subTitleOpacity, setsubTitleOpacity] = useState(0);
  const [gifOpacity, setgifOpacity] = useState(0);
  const [subTextOpacity, setsubTextOpacity] = useState(0);
  const [subTextOpacity1, setsubTextOpacity1] = useState(0);
  const [subTextOpacity2, setsubTextOpacity2] = useState(0);
  const loadingGif = '/static/assets/images/animation.gif';

  useEffect(() => {
    setDataOpacity(1);
    const timer1 = setTimeout(() => setsubTitleOpacity(1), 1500);
    const timer2 = setTimeout(() => setgifOpacity(1), 2500);
    const timer3 = setTimeout(() => setsubTextOpacity(1), 3500);
    const timer4 = setTimeout(() => setsubTextOpacity1(1), 8500);
    const timer5 = setTimeout(() => setsubTextOpacity2(1), 14000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="word" style={{  opacity: dataOpacity }}>
        DATA DISSECTION PLATFORM
      </h1>
      <h2 className="subTitle" style={{  opacity: subTitleOpacity }}>
        Enhancing Data Analytics With AI Technology
      </h2>
      <p className="subText" style={{ opacity: subTextOpacity }}>
        Our ETL layer adeptly manages both dynamic and static data for efficient integration.
      </p>
      <p className="subText1" style={{ opacity: subTextOpacity1 }}>
        While AI layer will effectively transform data, it yields profound and valuable insights.
      </p>
      <p className="subText2" style={{ opacity: subTextOpacity2 }}>
        Finally, Visualization layer brings these insights with striking visuals together creating
      </p>
      <p className="subText3" style={{ opacity: subTextOpacity2 }}>
        the seamless fusion of the data intelligence for smarter decision-making.
      </p>
      <img
        src={loadingGif}
        alt="Loading"
        className="loadingGif"
        style={{ left: '50%', top: '11%', opacity: gifOpacity }}
      />
    </div>
  );
};

export default BlackBackgroundPage;
