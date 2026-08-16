// app/api/lang/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lang, dir } = body;

    const response = NextResponse.json({
      success: true,
      message: "Language set successfully",
    });

    response.cookies.set({
      name: "app_lang",
      value: JSON.stringify({ state: { lang, dir } }),
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to set language" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const cookieLang = req.cookies.get("app_lang")?.value;

    if (!cookieLang) {
      return NextResponse.json({
        success: true,
        lang: "en",
        dir: "ltr",
      });
    }

    const parsed = JSON.parse(cookieLang);
    return NextResponse.json({
      success: true,
      lang: parsed.state?.lang || "en",
      dir: parsed.state?.dir || "ltr",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, lang: "en", dir: "ltr" },
      { status: 500 }
    );
  }
}