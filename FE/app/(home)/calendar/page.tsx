"use client";

import { useEffect, useState } from "react";
import { Calendar, WriteRecommendation } from "@/src/components";
import { getDateReadingRecords } from "@/src/api";

export default function CalendarPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [isTodayBookRecordExist, setIsTodayBookRecordExist] = useState(false);

  useEffect(() => {
    (async function () {
      const today = new Date();
      const dateReadingRecords = await getDateReadingRecords(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      setIsTodayBookRecordExist(() => !!dateReadingRecords.length);
    })();
  }, []);

  return (
    <main>
      {!isTodayBookRecordExist && <WriteRecommendation />}
      <Calendar />
    </main>
  );
}
