"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useReducer } from "react";
import IconButton from "@/src/components/atoms/IconButton";
import Input from "@/src/components/atoms/Input";
import Button from "@/src/components/atoms/Button";

export default function WriteBookLogPage() {
  const router = useRouter();
  const title = useSearchParams().get("title");
  if (!title) {
    router.replace(`/wrong-approach`);
  }

  const [v, dispatch] = useReducer(reducer, {
    start: 0,
    end: 0,
  });

  const onStartChange = (v: string) => {
    dispatch({ type: "CHANGE_START", v });
  };

  const onEndChange = (v: string) => {
    dispatch({ type: "CHANGE_END", v });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`./write/confirm?title=${title}&start=${v.start}&end=${v.end}`);
  };

  return (
    <div className="flex h-lvh w-full flex-col gap-8 p-4 py-8">
      <IconButton />
      <h1 className="text-large-bold">읽은 페이지를 입력해주세요</h1>
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-8">
        <div className="mb-4">
          <Input
            value={v.start}
            handleValue={onStartChange}
            label="시작 페이지"
          />
          <Input value={v.end} handleValue={onEndChange} label="종료 페이지" />
        </div>
        <Button type="submit">페이지 입력 완료</Button>
      </form>
    </div>
  );
}

function reducer(state: any, action: { type: string; v: string }) {
  const transStrToNum = (v: string) => (v === "0" ? 0 : v.replace(/\D/g, ""));
  switch (action.type) {
    case "CHANGE_START": {
      return {
        ...state,
        start: transStrToNum(action.v),
      };
    }
    case "CHANGE_END": {
      return {
        ...state,
        end: transStrToNum(action.v),
      };
    }
  }
}
