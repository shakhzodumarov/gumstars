import React from 'react';
import styles from './Home.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const ServiceComponent: React.FC = () => {
  const t = useTranslations('HomePage');

  // Function to add line breaks after each sentence using a span
  const formatText = (text: string) => {
    const sentences = text.split('.'); // Split text by periods
    const formattedText = [];

    for (let i = 0; i < sentences.length; i++) {
      // Add each sentence inside a span
      formattedText.push(
        //@ts-ignore
        <span key={i} className={styles.sentence}>{sentences[i].trim()}</span>
      );

      // After every sentence, add a "split" class for styling
      if (i !== sentences.length - 1) {
        //@ts-ignore
        formattedText.push(<span key={`split-${i}`} className={styles.split}></span>);
      }
    }

    return formattedText;
  };

  const translatedText = t('niggaoneeight');

  // Fallback for invalid content
  const safeText = typeof translatedText === 'string' ? translatedText : 'Translation error: invalid content';

  return (<div>
    <Image
    src={"/images/images/image.png"}
    alt='img'
    width={800}
    height={800}
    className={styles.patrick}
    />
    <div className={styles.serviceContainer}>
      <div className={styles.hellomother}>
        <h2 className={styles.title}>{t('niggaoneseven')}</h2>
        <p className={styles.description}>
          {formatText(safeText)}
        </p>
      </div>
    </div>
    <Image
    src={"/images/images/image.png"}
    alt='img'
    width={800}
    height={800}
    className={styles.patricks}
    />
    </div>
  );
};

export default ServiceComponent;


