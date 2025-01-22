import Image from "next/image"
import heroImage from "@/assets/hero.jpg" 
import simbolImage from "@/assets/simbolo.jpg" 

export function Hero() {

  return (
    <div className="relative h-[80vh] flex items-center justify-center">
      <Image
        src={heroImage}
        alt="Gotham City skyline"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black opacity-60" />
      <div className="relative z-10 text-center space-y-6 px-4">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl text-white">Welcome to Gotham City</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore the dark and complex world of Batman, from iconic characters to legendary locations
        </p>
        <div className="flex justify-center">
          <Image
            src={simbolImage} 
            alt="Explore Icon"
            width={100}  
            height={100}
          />
        </div>
      </div>
    </div>
  )
}
