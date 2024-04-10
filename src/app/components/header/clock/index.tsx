import { getTime } from "@/helpers/helpers";
import { useEffect, useState } from "react";
import styles from "../current-temp/CurrentTemp.module.scss";

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

export const Clock = () => {
  const dateTest = getTime(dateOptions);

  return <div className={styles.datetime}>{dateTest}</div>;
};
