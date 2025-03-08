import HomeBlogCard from '@/components/store/home/blogCard'
import React from 'react'
import styles from "./news.module.scss"
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/contactform';
import Map from '@/components/map';
import Partners from '@/components/porductgallery';





function News() {
    const t = useTranslations('HomePage');

  return (<div>
    <Partners/>
    <div className={styles.blogCardContainers}>
  <ContactForm/>
  <br />
  <br />
  {/* <Map/> */}
  </div></div>
  )
}

export default News
