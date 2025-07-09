"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
Select,
SelectContent,
SelectGroup,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const info = [
{
icon: <FaPhoneAlt />,
title: "Phone",
description: "(+46) 769 423 399",
},
{
icon: <FaEnvelope />,
title: "Email",
description: "ninosmorad@gmail.com",
},
{
icon: <FaMapMarkerAlt />,
title: "Address",
description: "Gothenburg Street 22, Gothenburg 42144",
},
];

export default function Contact() {
const [formData, setFormData] = useState({
firstname: "",
lastname: "",
email: "",
phone: "",
service: "",
message: "",
});

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();


const res = await fetch("/api/send-email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

if (res.ok) {
  toast({
    title: "Meddelandet skickades!",
    description: "Tack för ditt meddelande. Jag återkommer så snart jag kan.",
  });

  // Töm formuläret
  setFormData({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
} else {
  toast({
    title: "Något gick fel",
    description: "E-post kunde inte skickas. Försök igen senare.",
    variant: "destructive",
  });
}
};

return (
<motion.section
initial={{ opacity: 0 }}
animate={{
opacity: 1,
transition: { delay: 0.2, duration: 0.5, ease: "easeInOut" },
}}
className="py-12"
>
<div className="container mx-auto px-4">
<div className="flex flex-col xl:flex-row gap-10">
{/* Formulär */}
<div className="xl:w-[60%]">
<form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl" >
<h3 className="text-4xl font-bold text-[#00ff99]">
Let's work together
</h3>
<p className="text-white/60">
Send me a message - I will answer as soon as possible!
</p>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Firstname"
            />
            <Input
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Lastname"
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>

          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, service: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Web Development">Webbutveckling</SelectItem>
                <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                <SelectItem value="Logo Design">Logodesign</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="h-[200px]"
            placeholder="Write your message here..."
          />

          <Button type="submit" size="lg" className="max-w-[200px]">
            Send message
          </Button>
        </form>
      </div>

      {/* Kontaktinformation */}
      <div className="flex-1 flex items-center xl:justify-end">
        <ul className="flex flex-col gap-10">
          {info.map((item, index) => (
            <li key={index} className="flex items-center gap-6">
              <div className="w-[60px] h-[60px] bg-[#27272c] text-[#00ff99] rounded-md flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <div>
                <p className="text-white/60">{item.title}</p>
                <h3 className="text-lg text-white">{item.description}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</motion.section>
);
}
