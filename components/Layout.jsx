import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>مدوّنتي</title>
        <meta name="description" content="مدوّنة Next.js + Tailwind" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className="bg-primary text-white p-4 text-center">
        <h1 className="text-2xl font-bold">مدوّنتي التجريبية</h1>
      </header>

      <main className="container mx-auto p-4 text-right">{children}</main>

      <footer className="bg-gray-100 text-center p-4 mt-16">
        © {new Date().getFullYear()} جميع الحقوق محفوظة
      </footer>
    </>
  );
} 