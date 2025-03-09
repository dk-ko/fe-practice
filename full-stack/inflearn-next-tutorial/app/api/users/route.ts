import { NextResponse } from "next/server";

const DB = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jade Ko",
  },
  {
    id: 3,
    name: "Alice",
  },
];

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const name = searchParams.get("name") as string;
  return NextResponse.json({
    users: DB.filter((user) => user.name.includes(name)),
  });
}
