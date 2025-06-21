import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Layout({ children, posts = [] }) {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState("Amiri");

  const fonts = [
    { name: "Amiri", value: "Amiri" },
    { name: "Cairo", value: "Cairo" },
    { name: "Tajawal", value: "Tajawal" },
    { name: "Almarai", value: "Almarai" },
    { name: "Noto Sans Arabic", value: "Noto Sans Arabic" }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    const savedFontSize = localStorage.getItem("fontSize");
    const savedFontFamily = localStorage.getItem("fontFamily");
    
    if (savedTheme) setDarkMode(JSON.parse(savedTheme));
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedFontFamily) setFontFamily(savedFontFamily);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    localStorage.setItem("fontSize", fontSize.toString());
    localStorage.setItem("fontFamily", fontFamily);
    
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, fontSize, fontFamily]);

  const increaseFontSize = () => {
    if (fontSize < 32) setFontSize(prev => prev + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 18) setFontSize(prev => prev - 2);
  };

  return (
    <>
      <Head>
        <title>ناصر سلمان</title>
        <meta name="description" content="مدونة Next.js + Tailwind" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cairo:wght@300;400;600;700&family=Tajawal:wght@300;400;500;700&family=Almarai:wght@300;400;700;800&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />
      </Head>

      <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-white"}`}>
        
        {/* Header */}
        <header className={`${darkMode ? "bg-gray-800" : "bg-blue-600"} text-white py-8 relative`}>
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold">ناصر سلمان</h1>
          </div>

          {/* Dark Mode Toggle */}
          <div className="absolute top-6 left-6">
            <label className="inline-flex items-center relative cursor-pointer">
              <input 
                className="sr-only" 
                type="checkbox" 
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <div className={`relative w-14 h-8 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}>
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${darkMode ? "transform translate-x-6" : ""}`}>
                  {darkMode ? (
                    <svg className="w-4 h-4 text-gray-800 mt-1 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-yellow-500 mt-1 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                    </svg>
                  )}
                </div>
              </div>
            </label>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex">
          
          {/* Sidebar */}
          <aside className={`w-80 min-h-screen ${darkMode ? "bg-gray-800" : "bg-gray-50"} border-l`}>
            <div className="p-6">
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
                المقالات
              </h2>
              <nav className="space-y-3">
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <Link 
                      key={post.frontMatter.slug || index}
                      href={`/blog/${post.frontMatter.slug || post.frontMatter.title}`}
                      className={`block p-4 rounded-lg ${
                        darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-white hover:bg-gray-100 text-gray-800"
                      }`}
                    >
                      <h3 className="font-medium text-sm">{post.frontMatter.title}</h3>
                    </Link>
                  ))
                ) : (
                  <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}>
                    <h3 className="font-medium text-sm">مقال تجريبي</h3>
                  </div>
                )}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            
            {/* Toolbar فوق النص */}
            <div className={`sticky top-0 z-10 ${darkMode ? "bg-gray-800" : "bg-white"} border-b p-4 shadow-sm`}>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                
                {/* اختيار الخط */}
                <div className="flex items-center gap-2">
                  <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    الخط:
                  </label>
                  <select 
                    value={fontFamily} 
                    onChange={(e) => setFontFamily(e.target.value)}
                    className={`text-sm p-2 border rounded ${
                      darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                    }`}
                  >
                    {fonts.map(font => (
                      <option key={font.value} value={font.value}>{font.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* حجم الخط */}
                <div className="flex items-center gap-3">
                  <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    الحجم: {fontSize}px
                  </label>
                  <button 
                    onClick={decreaseFontSize}
                    className="w-10 h-10 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min="18"
                    max="32"
                    step="2"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-24"
                  />
                  <button 
                    onClick={increaseFontSize}
                    className="w-10 h-10 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* المحتوى */}
            <div className="p-8 max-w-4xl mx-auto">
              <div 
                style={{ 
                  fontSize: `${fontSize}px`,
                  fontFamily: fontFamily,
                  lineHeight: 1.8,
                  textAlign: "justify"
                }}
                className={`transition-all duration-300 ${darkMode ? "text-gray-100" : "text-gray-900"}`}
              >
                {children}
              </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className={`${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"} text-center py-6`}>
          © {new Date().getFullYear()} ناصر سلمان
        </footer>
      </div>
    </>
  );
}
