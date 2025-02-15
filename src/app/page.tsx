import Image from "next/image";
import EmailForm from "@/components/EmailForm";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  font-[family-name:var(--font-geist-sans)] bg-[#212121]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert rounded-md shadow-[0_0_10px_rgb(0,0,255)] mx-auto"
          src="/logo.png"
          alt="Email Calm logo"
          width={180}
          height={38}
          priority
        />
        <p className="text-black font-bold font-mono drop-shadow-[0_0_10px_rgb(255,255,255)]">
          Write with Clarity, Connect with Confidence.
        </p>
        <EmailForm />
         {/* <Link href="/history" className="text-blue-500 hover:underline">
          View Analysis History
        </Link> */}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-white mb-8">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://twitter.com/elliot_awe"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <Image
            aria-hidden
            src="/twitter.svg"
            alt="Twitter icon"
            width={16}
            height={16}
          /> */}
          Twitter
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/ell20-sys"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <Image
            aria-hidden
            src="/github.svg"
            alt="GitHub icon"
            width={16}
            height={16}
          /> */}
          GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://linkedin.com/in/elliot-awe"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <Image
            aria-hidden
            src="/linkedin.svg"
            alt="LinkedIn icon"
            width={16}
            height={16}
          /> */}
          LinkedIn
        </a>
      </footer>
    </div>
  );
}
