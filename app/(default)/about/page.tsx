import SeoLandingPage from "@/components/SeoLandingPage";
import { getDictionary } from "@/lib/dictionaries";
import { getContentPage } from "@/lib/page-content";
import { contentMetadata } from "@/lib/page-metadata";
export const metadata = contentMetadata("en", "about");
export default function Page() { const dictionary = getDictionary("en"); return <SeoLandingPage locale="en" dictionary={dictionary} currentPath="/about" content={getContentPage("en", "about", dictionary)} />; }

