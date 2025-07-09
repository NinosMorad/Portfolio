import Link from "next/link";
import { Button } from "./ui/button";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
    return (
        <header className="py-8 xl:py-12 text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* logo */}
                <Link href="/">
                <h1 className="text-4xl font-semibold">
                    Ninos<span className="text-[#00ff99]">.</span>
                </h1>
                </Link>


                {/* desktop nav & hire me button */}
                <div className="invisible md:visible items-center flex gap-8">
                 <Nav />   
                 <Link href="/contact">
                    <Button>Hire me</Button>
                 </Link>
                </div>
                
                {/* mobile nav */}
                <div className="xl:visible md:invisible text-right">
                <MobileNav />
                </div>

            </div>
        </header>
    );
};

export default Header

