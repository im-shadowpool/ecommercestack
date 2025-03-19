"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";


export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  localStorage.removeItem("cart");

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;
      const res = await fetch(`/api/checkout/session?session_id=${sessionId}`);
      const data = await res.json();
      setSession(data);
      setLoading(false);
    };
    fetchSession();
  }, [sessionId]);

  if (loading) return       <div className="flex h-lvh items-center gap-1 justify-center max-w-3xl mx-auto text-2xl font-bold text-green-600">       
  <FaSpinner className="mr-2 animate-spin" size={24} />
Processing Session...
</div>;

  return (
    <div className="h-lvh bg-white flex flex-col items-center justify-start pt-40 w-full text-center">
        <Image src="https://www.eucaonline.com.au/media/banner/Benny-euca-loader.gif" alt="Euca Logo" width={250} height={250} />
      <h1 className="text-2xl font-bold text-green-600">Thankyou for Your Purchase! ❤</h1>
      <p className="text-gray-900 mt-4">Your payment was successful.</p>
      <p className="text-gray-700">A confirmation email will be sent shortly.</p>
    </div>
  );
}
