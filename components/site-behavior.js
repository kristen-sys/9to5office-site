"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SiteBehavior() {
  const pathname = usePathname();

  useEffect(() => {
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");
    const revealItems = document.querySelectorAll(".reveal");

    const handleToggle = () => {
      if (!menuToggle || !siteNav) {
        return;
      }

      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    };

    if (menuToggle && siteNav) {
      menuToggle.addEventListener("click", handleToggle);

      siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          siteNav.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      if (menuToggle) {
        menuToggle.removeEventListener("click", handleToggle);
      }

      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
