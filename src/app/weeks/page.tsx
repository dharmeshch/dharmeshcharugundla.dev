import LifeInWeeks from "@/components/LifeInWeeks";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Life in Weeks · Dharmesh Charugundla",
};

export default function WeeksPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-20">
        <LifeInWeeks />
      </div>
    </main>
  );
}
