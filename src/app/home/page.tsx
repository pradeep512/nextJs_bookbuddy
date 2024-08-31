import Link from "next/link";

export default function Home() {
  return (
    <section className="px-[5%] py-[5%]">
      <h1 className="mb-5">Home</h1>
      <Link
        className="rounded-sm bg-blue-600 text-white py-2 px-3 mt-5"
        href="/books"
      >
        View All Books
      </Link>
    </section>
  );
}
