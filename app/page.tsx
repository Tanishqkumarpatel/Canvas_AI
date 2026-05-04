import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <Link href="/auth" className="flex items-center gap-5 self-start rounded-lg bg-cyan-400 px-6 py-3 text-sm font-medium text-white hover:bg-blue-400 md:text-base">
        <span>Log in</span>
      </Link>
    </main>
  );
}
