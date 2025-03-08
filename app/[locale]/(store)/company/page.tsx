'use client'
import ServiceComponent from "@/components/blogs";
import MultiImageSlider from "@/components/boxanimation";
import Contact from "@/components/contactform";
import ConnectedDotsAnimation from "@/components/softskillslide";
import MultiImageSliderImages from "@/components/understandeach";
import Image from "next/image";
import styles from "./company.module.scss"
import TextImageComponent from "@/components/textimage";
import InteractiveManufacturingImage from "@/components/manufactureimage";


export default function Company() {

  return (
   <>
   <MultiImageSliderImages/>
    
   <ServiceComponent/>
   <h1 className={styles.adopted}>Bizning sertifikatlarimiz</h1>
   <Image
   src={"/images/images/sertif.png"}
   alt="img"
   width={100}
   height={100}
   className={styles.imagesertif}
   />
   <ConnectedDotsAnimation/>
   <InteractiveManufacturingImage 
        imageSrc="/images/images/zavod.jpg" 
        imageAlt="Our state-of-the-art manufacturing facility" 
      />
   <MultiImageSlider/>
   <TextImageComponent />
<Contact/>
<br />
<br />
<br />
<br />
      <br />
      <br />
      

   </>
  );
}




