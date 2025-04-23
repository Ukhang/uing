import Footer from "./components/footer";
import Navbar from "./components/navbar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
