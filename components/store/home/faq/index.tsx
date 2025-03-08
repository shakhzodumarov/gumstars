// components/FAQ.tsx
'use client';

import React, { useState } from 'react';
import styles from './faq.module.scss';
import {useTranslations} from 'next-intl';

const Faq: React.FC = () => {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };
  const t = useTranslations('Company');

  return (
    <div className={styles.faq}>
      <div className={styles.faqHeader}>{t('loading')}</div>
      <div className={styles.faqContent}>
        <div className={styles.faqQuestion}>
          <div className={styles.panelTitle} onClick={() => toggleQuestion(0)}>
     
            <label>{t('wideadtitleone')}</label>
          </div>
          <div className={`${styles.panelContent} ${openQuestions.includes(0) ? styles.open : ''}`}>
          {t('wideadtitlefive')}
          </div>
        </div>

        {/* <div className={styles.faqQuestion}>
          <div className={styles.panelTitle} onClick={() => toggleQuestion(1)}>
        
            <label>{t('wideadtitletwo')}</label>
          </div>
          <div className={`${styles.panelContent} ${openQuestions.includes(1) ? styles.open : ''}`}>
          {t('wideadtitlefour')}
          </div>
        </div> */}

        <div className={styles.faqQuestion}>
          <div className={styles.panelTitle} onClick={() => toggleQuestion(2)}>
            {/* <div className={styles.plus}>+</div> */}
            <label>{t('wideadtitlethree')}</label>
          </div>
          <div className={`${styles.panelContent} ${openQuestions.includes(2) ? styles.open : ''}`}>
          {t('wideadtitlesix')}
            <a href="https://en.wikipedia.org/wiki/The_Unanswered_Question" target="_blank" rel="noopener noreferrer">unanswered</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
