import { useEffect, useState } from "react";
import CountdownItem from "./CountdownItem";
import { Time, Title, CountDownWrapper } from "./Countdown.style";
import useTranslations from "../../intl/useTranslations";

interface DateMap {
  [key: string]: number;
}

function getTimeRemaining(endtime: number): DateMap {
  const total = endtime - Date.now() / 1000;
  const seconds = Math.floor(total % 60);
  const minutes = Math.floor((total / 60) % 60);
  const hours = Math.floor((total / (60 * 60)) % 24);
  const days = Math.floor(total / (60 * 60 * 24));

  return {
    days: days < 0 ? 0 : days,
    hours: hours < 0 ? 0 : hours,
    minutes: minutes < 0 ? 0 : minutes,
    seconds: seconds < 0 ? 0 : seconds,
  };
}

type Props = {
  timestamp: number;
};

const Countdown = ({ timestamp }: Props) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(timestamp));
  const t = useTranslations("Countdown");

  useEffect(() => {
    const timeinterval = setInterval(() => {
      setTimeLeft(getTimeRemaining(timestamp));
    }, 1000);

    if (timestamp - Date.now() / 1000 <= 0) {
      return clearInterval(timeinterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CountDownWrapper>
      <div>
        <Title>{t("title")}</Title>
        <Time dateTime={new Date(timestamp * 1000).toISOString()}>
          {Object.entries(timeLeft).map(([key, value], index) => (
            <CountdownItem
              item={value}
              translation={t(`date.${key}`)}
              key={index}
              integetPad={key === "days" ? 0 : 2}
            />
          ))}
        </Time>
      </div>
    </CountDownWrapper>
  );
};

export default Countdown;
