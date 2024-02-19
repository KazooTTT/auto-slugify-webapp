"use client";
import { useState } from "react";
import { create } from "./action";
import Link from "next/link";

export default function Home() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState("");

  const startSlugify = async () => {
    setLoading(true);
    const newRes = await create(value);
    setRes(newRes);
    setLoading(false);
  };

  const loadingSvg = (
    <svg
      aria-hidden="true"
      role="status"
      className="inline w-4 h-4text-white animate-spin"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
  const searchSvg = (
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
  );
  const buttonDisabled = value.trim().length === 0;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-2 lg:px-24 ">
      <div className="w-full h-full max-w-xl space-y-2">
        <div className="flex items-center w-full flex-col lg:flex-row space-y-2">
          <label className="sr-only">Confirm</label>
          <div className="relative w-full">
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="input the string to slugify..."
              required
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && value.trim().length > 0) {
                  startSlugify();
                }
              }}
            />
          </div>
          <button
            type="submit"
            className={`p-2.5 lg:ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          ${buttonDisabled && "hover:cursor-not-allowed"}`}
            disabled={buttonDisabled}
            onClick={startSlugify}
          >
            {loading ? loadingSvg : searchSvg}

            <span className="sr-only">Confirm</span>
          </button>
        </div>
        {res.trim().length > 0 && (
          <div className="w-full text-center font-semibold text-gray-900 underline underline-offset-4 dark:text-white decoration-orange-500 decoration-wavy ">
            {res}
          </div>
        )}
      </div>
      <Link
        href="https://bento.me/kazoottt"
        className="font-semibold text-gray-900 underline underline-offset-4 dark:text-white decoration-sky-500 decoration-wavy hover:text-orange-500"
      >
        made by kazoottt
      </Link>
    </main>
  );
}
