import React from 'react';
import styles from './Home.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';


const ServiceComponent: React.FC = () => {
  const t = useTranslations('HomePage');

  // Function to add a double line break after the first sentence
  const formatText = (text: string) => {
    const sentences = text.split('.'); // Split text by periods
    const formattedText = [];

    for (let i = 0; i < sentences.length; i++) {
      // Add each sentence inside a span
      formattedText.push(
        //@ts-ignore
        <span key={i} className={styles.sentence}>{sentences[i].trim()}</span>
      );

      // After the first sentence, add a double line break
      if (i === 0) {
        //@ts-ignore
        formattedText.push(<br key={`br-${i}`} />);
        //@ts-ignore
        formattedText.push(<br key={`br2-${i}`} />);
      }
    }

    return formattedText;
  };

  const translatedText = t('niggaonetenq');

  // Fallback for invalid content
  const safeText = typeof translatedText === 'string' ? translatedText : 'Translation error: invalid content';

  return (
    <div>
      <Image
        src={"/images/images/image.png"}
        alt='img'
        width={600}
        height={600}
        className={styles.patrick}
      />
      <div className={styles.serviceContainer}>
        <div className={styles.hellomother}>
          
          <h2 className={styles.title}>{t('niggaoneten')}</h2>
          <p className={styles.description}>
            {formatText(safeText)}
          </p>
    <div className={styles.runniggarun}>
      <p>
      {t('runniggarun')}
      </p>
      <p>
      {t('runniggaruns')}
      </p>
      <p>
      {t('runniggaruna')}
      </p>
    </div>
    <p className={styles.description}>
    {t('runniggarune')}
    </p>
        </div>
      </div>
      <Image
        src={"/images/images/image.png"}
        alt='img'
        width={600}
        height={600}
        className={styles.patricks}
      />
    </div>
  );
};

export default ServiceComponent;
