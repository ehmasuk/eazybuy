"use server";

import { revalidatePath } from "next/cache";

export const revalidate = (url) => {
    revalidatePath(url);
};

export const fetchData = async (url) => {
    if (!process.env.NEXT_PUBLIC_API_URL) return [];
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        // cache: "no-store",
        next: {
            revalidate: 10 * 60,
        },
    });
    if (!res.ok) {
        throw new Error("Error fetching from " + url);
    }
    const result =  await res.json();
    console.log(result);
    return result;
};
