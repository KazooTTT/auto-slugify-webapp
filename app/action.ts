"use server";

import { getSlugResult } from "@kzttools/auto-slugify";

export async function create(value: string) {
  const newRes = await getSlugResult(value);
  return newRes;
}
