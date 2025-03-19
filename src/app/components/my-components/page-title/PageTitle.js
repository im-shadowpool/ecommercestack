"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PageTitle = ({ title }) => {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").filter(Boolean) || [];

  return (
    <div className="w-full bg-skygreen-100 py-12 px-6 rounded-b-3xl">
      <div className="container">
        <nav className="text-sm text-gray-600 mb-2">
          <ol className="flex space-x-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            {pathSegments.map((segment, index) => {
              const href = "/" + pathSegments.slice(0, index + 1).join("/");
              const isLast = index === pathSegments.length - 1;
              return (
                <li key={href} className="flex items-center">
                  <span className="mx-1">/</span>
                  {isLast ? (
                    <span className="text-gray-800 font-medium">
                      {decodeURIComponent(segment)}
                    </span>
                  ) : (
                    <Link href={href} className="hover:underline">
                      {decodeURIComponent(segment)}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      </div>
    </div>
  );
};

export default PageTitle;
