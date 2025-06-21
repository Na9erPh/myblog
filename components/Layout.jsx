import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>ناصر سلمان</title>
        <meta name="description" content="مدوّنة Next.js + Tailwind" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossOrigin="anonymous" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <header className="bg-primary text-white p-4 text-center">
        <h1 className="text-2xl font-bold">ناصر سلمان</h1>
      </header>

      <main className="container mx-auto p-4 text-right">{children}</main>

      <footer className="bg-gray-100 text-center p-4 mt-16">
        © {new Date().getFullYear()} جميع الحقوق محفوظة
      </footer>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        `
      }} />
    </>
  );
} 