"use client";
import { useState } from "react";
import { getSlugResult } from "@kzttools/auto-slugify";

export default function Home() {
  const [value, setValue] = useState("");
  const [res, setRes] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-2">
      <div className="flex items-center max-w-sm mx-auto">
        <label className="sr-only">Confirm</label>
        <div className="relative w-full">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search branch name..."
            required
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={value.trim().length === 0}
          onClick={async () => {
            // TODO
            const newRes = await getSlugResult(value);
            setRes(newRes);
          }}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Confirm</span>
        </button>
      </div>
      {res.trim().length > 0 && <div>{res}</div>}
    </main>
  );
}
