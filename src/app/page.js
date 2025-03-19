


// export default function Home() {
//   return (
//     <div>
     
//       </div>
//   );
// }


"use client";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/products"); // Redirects immediately
  return null; // No need to render anything
}
