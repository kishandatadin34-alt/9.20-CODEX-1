import SeoLandingPage from "@/components/SeoLandingPage";
import { getDictionary } from "@/lib/dictionaries";
import { getContentPage } from "@/lib/page-content";
import { contentMetadata } from "@/lib/page-metadata";
export const metadata = contentMetadata("en", "quality-control");
export default function Page() { const dictionary = getDictionary("en"); return <SeoLandingPage locale="en" dictionary={dictionary} currentPath="/quality-control" content={getContentPage("en", "quality-control", dictionary)} />; }

