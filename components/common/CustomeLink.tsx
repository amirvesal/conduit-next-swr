import Link from "next/link";
import React from "react";

interface CustomeLinkProps {
  href: string;
  as: string;
  className?: string;
  children: React.ReactNode;
}

const CustomeLink = ({ className, href, as, children }: CustomeLinkProps) => {
  return (
    <Link href={href} as={as} passHref>
      <a className={className || ""}>{children}</a>
    </Link>
  );
};

export default CustomeLink;
