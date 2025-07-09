"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {CiMenuFries} from 'react-icons/ci'
import { useEffect } from 'react';
 
const links = [
    {
        name: 'home',
        path: '/',
    },
    {
        name: 'services',
        path: '/services',
    },
    {
        name: 'resume',
        path: '/resume',
    },
    {
        name: 'work',
        path: '/work',
    },
    {
        name: 'contact',
        path: '/contact',
    },
]

const MobileNav = () => {
    const pathname = usePathname();

    useEffect(() => {
        document.body.classList.add("overflow-x-hidden");
        return () => document.body.classList.remove("overflow-x-hidden");
    }, []);

    return (
        <div className="fixed top-10 md:top-12 right-4 z-50">
            <Sheet>
                <SheetTrigger className="flex justify-center items-center">
                    <CiMenuFries className="text-[32px] text-[#00ff99]" />
                </SheetTrigger>
                <SheetContent side="right" className="w-[80%] sm:w-[50%] bg-[#1c1c22] text-white">
                    {/* Logo */}
                    <div className='mt-32 mb-40 text-center text-2xl'>
                        <Link href="/">
                            <h1 className='text-4xl font-semibold'>
                                Ninos<span className='text-[#00ff99]'>.</span>
                            </h1>
                        </Link>
                    </div>
                    {/* Navigation Links */}
                    <nav className='flex flex-col justify-center items-center gap-8'>
                        {links.map((link, index) => (
                            <Link 
                                href={link.path} 
                                key={index}
                                className={`${link.path === pathname ? "text-[#00ff99] border-b-2 border-[#00ff99]" : ""} text-xl capitalize hover:text-[#00ff99] transition-all`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                    <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileNav;

