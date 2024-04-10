import { NextResponse } from "next/server";

const baseURL = "https://countriesnow.space/api/v0.1/";
// baseURL: `https://restcountries.eu/rest/v2`,

export async function GET() {
  let url = `${baseURL}countries`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data.data);
}
