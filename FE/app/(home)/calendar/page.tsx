"use client";

import { useEffect, useState } from "react";
import { Calendar, WriteRecommendation } from "@/src/components";
import { getIsTodayBookRecordExist } from "@/src/api";

export default function CalendarPage() {
  const [isTodayBookRecordExist, setIsTodayBookRecordExist] = useState(false);

  useEffect(() => {
    const data = getIsTodayBookRecordExist();
    setIsTodayBookRecordExist(() => data);
  }, []);

  return (
    <main>
      {!isTodayBookRecordExist && <WriteRecommendation />}
      <Calendar />
    </main>
  );
}
