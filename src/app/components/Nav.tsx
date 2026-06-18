"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const isStudio = pathname.includes("/studio");

  return isStudio ? null : (
    <nav>
      <div className="fixed top-0 left-0 flex pt-6 pl-18 pb-0 pr-6">
        <div className="pr-1">
          <Link href="/">Works,</Link>
        </div>
        <div>
          <Link href="/">Information</Link>
        </div>
      </div>
    </nav>
  );
}
