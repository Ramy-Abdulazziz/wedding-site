"use server";
import ThanksContent from "@/components/thanksContent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Thanks() {
    return <ThanksContent />;
}
