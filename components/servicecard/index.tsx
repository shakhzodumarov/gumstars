// import Image from "next/image";
// import React from "react";
// import styles from "./ServicesCards.module.scss";
// import { useTranslations } from "next-intl";

// const ServicesCards: React.FC = () => {
//   const t = useTranslations("HomePage");

//   const servicesData = [
//     {
//       id: 1,
//       title: t("niggaonenine"), 
//       description: t("niggaonetene"),
//       image: "/images/images/ss.jpg",
//     },
//     {
//       id: 2,
//       title: t("niggaoneten"),
//       description: t("niggaonetenr"),
//       image: "/images/images/eqwe.jpg",
//     },

//   ];

//   return (
//     <div className={styles.servicesWrapper}>
//       {servicesData.map((service) => (
//         <div data-aos="fade-up" key={service.id} className={styles.serviceCard}>
//           <h2>{service.title}</h2>
//           <hr />
//           <div className={styles.imageWrapper}>
//             <div className={styles.servicesLayerOne}></div>
//             <div className={styles.servicesLayerTwo}></div>
//           </div>
//           <Image 
//             className={styles.image} 
//             src={service.image} 
//             alt={service.title} 
//             width={500} 
//             height={300} 
//           />
//           <br />
//           <hr />
//           <p className={styles.images}>{service.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ServicesCards;


import Image from "next/image";
import React from "react";
import styles from "./ServicesCards.module.scss";
import { useTranslations } from "next-intl";

const ServicesCards: React.FC = () => {
  const t = useTranslations("HomePage");

  const servicesData = [
    {
      id: 1,
      title: t("niggaonenine"), 
      description: t("niggaonetene"),
      image: "/images/images/ss.jpg",
    },
    {
      id: 2,
      title: t("niggaoneten"),
      description: t("niggaonetenr"),
      image: "/images/images/eqwe.jpg",
    },
  ];

  return (
    <div className={styles.servicesWrapper}>
      {servicesData.map((service, index) => (
        <div key={service.id} className={styles.serviceCard}>
          <div className={styles.imageWrapper}>
            <Image 
              className={styles.image} 
              src={service.image} 
              alt={service.title} 
              width={500} 
              height={300} 
            />
          </div>
          <div className={styles.content}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesCards;
