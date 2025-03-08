import React from 'react'
import styles from './SectionHeadings.module.scss'

const SectionHeadings: React.FC<{ heading: string }> = ({ heading }) => {
  return (
    <div className={styles.sectionWrapper}>
      <h1 className={styles.heading}>{heading}</h1>
      <div className={styles.decorativeLineWrapper}>
        <div className={styles.decorativeLine}></div>
      </div>
    </div>
  )
}

export default SectionHeadings
