import Link from "next/link";

export default function notFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">We hit a Brick Wall</h2>
      <p>We could not find the ticket you were looking for.</p>
      <p>
        Go back to all <Link href="/tickets">Tickets</Link>
      </p>
    </main>
  );
}
