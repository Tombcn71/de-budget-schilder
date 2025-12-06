"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-1.5 lg:gap-2 hover:opacity-80 transition-opacity">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 lg:w-7 lg:h-7"
            >
              <path 
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                fill="currentColor"
                className="text-primary"
              />
            </svg>
            <span className="font-normal text-base lg:text-2xl text-foreground">De </span>
            <span className="text-base lg:text-2xl text-foreground">
              <span className="font-bold">Budget</span>
              <span className="font-normal">schilder</span>
            </span>
          </Link>

          <div className="flex items-center gap-4 lg:gap-6">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm lg:text-base" asChild>
              <a 
                href="https://calendly.com/budgetgroep/30min?month=2025-11" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sm:hidden">Gratis Adviesgesprek</span>
                <span className="hidden sm:inline">Gratis Adviesgesprek</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
