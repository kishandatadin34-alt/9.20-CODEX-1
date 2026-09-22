import SeoLandingPage from "@/components/SeoLandingPage";
import { getDictionary } from "@/lib/dictionaries";
import { getContentPage } from "@/lib/page-content";
import { contentMetadata } from "@/lib/page-metadata";
export const metadata = contentMetadata("en", "oem-odm");
export default function Page() { const dictionary = getDictionary("en"); return <SeoLandingPage locale="en" dictionary={dictionary} currentPath="/oem-odm" content={getContentPage("en", "oem-odm", dictionary)} />; }

