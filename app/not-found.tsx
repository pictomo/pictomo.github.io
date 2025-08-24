"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegSmileBeam } from "react-icons/fa";

const NotFound = () => {
  const router = useRouter();

  return (
    <div>
      <h1>404 | Not Found</h1>
      <p>
        Return to <a onClick={() => router.back()}>previous page</a>.
      </p>
      <p>
        Go to <Link href="/">top page</Link>.
      </p>
      <p>
        As an aside, I really love this music{" "}
        <a
          href="https://youtu.be/gnnIrTLlLyA?si=JRpU6ue7rnpy9Xsd"
          target="_blank"
        >
          Knife Party - 404
        </a>{" "}
        <FaRegSmileBeam />
      </p>
    </div>
  );
};

export default NotFound;
