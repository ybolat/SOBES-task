import {NextResponse} from "next/server";
import {questionTypes} from "@/data/questions";

export async function GET() {
    return NextResponse.json(questionTypes);
}
