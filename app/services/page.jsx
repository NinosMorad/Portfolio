"use client";

import { BsArrowDownRight } from "react-icons/bs"
import Link from "next/link";

const services = [
    {
        num: '01',
        title: 'Web Development',
        description: 'Create functional, user-friendly websites and web applications.',
        href:"/contact"
    },
    {
        num: '02',
        title: 'UI/UX Design',
        description: 'I make the interaction with the visual elements to be smoothly and the user experience to be including usability, accessibility, and satisfaction.',
        href:"/contact"
    },
    {
        num: '03',
        title: 'Logo Design',
        description: 'Programming symbols, even many types of logos like many big brands.',
        href:"/contact"
    },
    {
        num: '04',
        title: 'Networking',
        description: 'I have many types of connections, and in different line of businesses.',
        href:"/contact"
    },
];

import { motion } from "framer-motion";



const Services = () => {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
                >
                    {services.map((service, index) => {
                        return (
                            <div 
                                key={index}
                                className="flex-1 flex flex-col justify-center gap-6 group"
                            >
                                {/* top */}
                                <div className="w-full flex justify-between items-center">
                                    <div className="text-5xl font-extrabold
                                        text-outline text-transparent
                                        group-hover:text-outline-hover transition-all duration-500">
                                        {service.num}
                                    </div>
                                    <Link 
                                        href={service.href} 
                                        className="w-[70px] h-[70px] rounded-full bg-white
                                        group-hover:bg-[#00ff99] transition-all duration-500 flex
                                        justify-center items-center hover:-rotate-45"
                                    >
                                        <BsArrowDownRight className="text-[#1c1c22] text-3xl"/>
                                    </Link>
                                </div>
                                {/* title */}
                                <h2 className="text-[42px] font-bold leading-none text-white
                                group-hover:text-[#00ff99] transition-all duration-500">{service.title}</h2>
                                {/* description */}
                                <p className="text-white/60">{service.description}</p>
                                {/* border */}
                                <div className="border-b border-white/20 w-full"></div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Services

