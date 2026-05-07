import hongik_logotype from "./hongik_logotype.svg"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="flex h-24 items-center justify-center bg-hongik-black text-center text-sm text-hongik-white selection:bg-hongik-white selection:text-hongik-black!">
      <div className="flex size-full max-w-350 items-center justify-between px-6">
        <div className="flex items-center">
          <span className="text-xl font-bold text-hongik-white">[LOGO] TRIA LAB</span>
          <span className="mx-2 text-xl font-bold">@</span>
          <Image
            src={hongik_logotype}
            alt="Hongik logotype"
            width={321}
            height={98}
            className="aspect-321/98 w-28"
          />
        </div>
        <div>© {new Date().getFullYear()} TRIA Lab. All rights reserved.</div>
      </div>
    </footer>
  )
}
