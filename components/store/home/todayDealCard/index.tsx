"use client";

import Image from "next/image";
import styles from "./todayDealCard.module.scss";
import { Link } from '@/i18n/routing';
import { useState } from "react";
import { ClockIcon } from "@/components/icons/svgIcons";

interface IProps {
  productName: string;
  image: [string, string];
  dealEndTime: Date;
  spec?: string[];
  url: string;
}

const TodayDealCard = ({
  productName,
  image,
  dealEndTime,
  spec = [],
  url,
}: IProps) => {
  const [remainedTime, setRemainedTime] = useState(dealEndTime);

  setTimeout(() => {
    setRemainedTime(new Date(remainedTime.getTime() - 1000));
  }, 1000);

  return (
    <div className={styles.dealCard}>
      <Link href={url} className={styles.imgWrapper}>
        <Image alt="" src={image[0]} fill sizes="(max-width:240px)" />
        <Image alt="" src={image[1]} fill sizes="(max-width:240px)" />
      </Link>
      <Link href={url}>
        <h3>{productName}</h3>
      </Link>
      <div className={styles.specWrapper}>
        {spec.length > 0 &&
          spec.map((item, index) => <span key={index}>{item}</span>)}
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.timeWrapper}>
          <ClockIcon width={14} />
          <span>
            {`${remainedTime
              .getHours()
              .toLocaleString("en-us", { minimumIntegerDigits: 2 })}
            :
            ${remainedTime
              .getMinutes()
              .toLocaleString("en-us", { minimumIntegerDigits: 2 })}
            :
            ${remainedTime
              .getSeconds()
              .toLocaleString("en-us", { minimumIntegerDigits: 2 })}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodayDealCard;
