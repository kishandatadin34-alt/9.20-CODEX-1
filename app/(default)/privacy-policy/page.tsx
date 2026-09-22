import SeoLandingPage from "@/components/SeoLandingPage";
import { getDictionary } from "@/lib/dictionaries";
import { getContentPage } from "@/lib/page-content";
import { contentMetadata } from "@/lib/page-metadata";
export const metadata = contentMetadata("en", "privacy-policy");
export default function Page() { const dictionary = getDictionary("en"); return <SeoLandingPage locale="en" dictionary={dictionary} currentPath="/privacy-policy" content={getContentPage("en", "privacy-policy", dictionary)} />; }

