"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegSmileBeam } from "react-icons/fa";
import LinkStyle from "@/app/styles/link.module.scss";

const NotFound = () => {
  const router = useRouter();

  return (
    <div>
      <h1>404 | Not Found</h1>
      <p>
        Return to{" "}
        <a className={LinkStyle.link} onClick={() => router.back()}>
          previous page
        </a>
        .
      </p>
      <p>
        Go to{" "}
        <Link className={LinkStyle.link} href="/">
          top page
        </Link>
        .
      </p>
      <p>
        As an aside, I really love this music{" "}
        <a
          className={LinkStyle.link}
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
