import Link from "next/link";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">VideoAno</h2>
        <p className="text-sm sm:text-base">
          Landing page was inspired by{" "}
          <a href="https://linear.app/" className="text-blue-500">
            linear.app
          </a>
        </p>

        <div className="flex items-center justify-center mt-4 text-sm sm:text-base">
          <span>Built by</span>
          <span className="inline-flex items-center justify-center rounded-full mx-1">
            <span className="text-green-600 text-xs sm:text-sm">
              Jashwanth S Poojary
            </span>
          </span>
          <span>and Check out my portfolio</span>
          <span className="ml-2 border border-black rounded-sm sm:w-24 w-30 h-5 my-2">
            <Link
              href="https://jashwanth.me"
              className="text-blue-500 text-xs sm:text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              jashwanth.me
            </Link>
          </span>
        </div>

        <div className="mt-6">
          <ul className="flex flex-wrap justify-center gap-6">
            <li>
              <Link
                href="https://x.com/JashwantPoojary"
                className="inline-flex items-center text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5 mr-2" />
                X (Twitter)
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/jashwanth-s-poojary/"
                className="inline-flex items-center text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/JashwanthSPoojary"
                className="inline-flex items-center text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </Link>
            </li>
            <li>
              <Link
                href="mailto:jaswanthspoojary@gmail.com"
                className="inline-flex items-center text-sm"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
