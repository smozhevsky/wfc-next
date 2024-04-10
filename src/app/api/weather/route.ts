import { NextResponse } from "next/server";

const baseURL = "https://api.openweathermap.org/data/2.5/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");
  const zipCode = searchParams.get("zip");
  const zipCountry = searchParams.get("country");
  const isOnecall = searchParams.get("onecall");

  let url = "";

  if (address) {
    url = `${baseURL}weather?q=${address}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
  }

  if (latitude && longitude) {
    url = `${baseURL}weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
  }

  if (zipCode && zipCountry) {
    url = `${baseURL}weather?zip=${zipCode},${zipCountry}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
  }

  if (isOnecall) {
    url = `${baseURL}onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
