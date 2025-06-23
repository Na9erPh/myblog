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

  // دالة تبديل سريعة للوضع الليلي
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    // تطبيق فوري للتغيير
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // تطبيق الوضع الليلي فوراً
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // تطبيق تغييرات الخط
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize.toString());
    localStorage.setItem("fontFamily", fontFamily);

    // تطبيق تغيير الخط فوراً على الـ DOM
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
      articleContent.style.setProperty('--font-size', `${fontSize}px`);
      articleContent.style.fontSize = `${fontSize}px`;
      articleContent.style.fontFamily = `${fontFamily}, serif`;
      
      // تطبيق على جميع العناصر الفرعية
      const allElements = articleContent.querySelectorAll('*');
      allElements.forEach(element => {
        element.style.fontSize = `${fontSize}px`;
        element.style.fontFamily = `${fontFamily}, serif`;
      });
    }
  }, [fontSize, fontFamily]);

  const increaseFontSize = () => {
    if (fontSize < 32) {
      const newSize = fontSize + 2;
      console.log('Increasing font size from', fontSize, 'to', newSize);
      setFontSize(newSize);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 18) {
      const newSize = fontSize - 2;
      console.log('Decreasing font size from', fontSize, 'to', newSize);
      setFontSize(newSize);
    }
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
        <header className={`${darkMode ? "bg-gray-800" : "bg-blue-600"} text-white py-12 relative`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center">
              <h1 className="text-5xl font-bold text-center">ناصر سلمان</h1>
            </div>
          </div>
        </header>

        {/* Dark Mode Toggle - Fixed Position */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleDarkMode}
            className={`group relative overflow-hidden rounded-full p-3 transition-all duration-150 transform hover:scale-105 active:scale-95 ${
              darkMode 
                ? "bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/30" 
                : "bg-gray-800 text-white shadow-lg shadow-gray-800/30"
            }`}
          >
            <div className="relative z-10 transition-transform duration-100">
              {darkMode ? (
                <svg className="w-6 h-6 transition-all duration-100" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 transition-all duration-100" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </div>
            
            {/* Quick Ripple Effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-active:scale-110 transition-transform duration-150"></div>
          </button>
        </div>

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
            
            {/* Reading Toolbar - مثبت في الأعلى */}
            <div className={`sticky top-0 z-40 ${darkMode ? "bg-gray-700" : "bg-gray-100"} border-b shadow-md`}>
              <div className="px-6 py-4">
                <div className="reading-toolbar flex items-center justify-center gap-8 flex-wrap">
                  
                  {/* اختيار الخط */}
                  <div className="flex items-center gap-3">
                    <label className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
                      نوع الخط:
                    </label>
                    <select 
                      value={fontFamily} 
                      onChange={(e) => setFontFamily(e.target.value)}
                      className={`text-sm px-3 py-2 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
                        darkMode 
                          ? "bg-gray-600 text-white border-gray-500 hover:bg-gray-500" 
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {fonts.map(font => (
                        <option key={font.value} value={font.value}>{font.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* تحكم في حجم الخط */}
                  <div className="flex items-center gap-4">
                    <label className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
                      حجم الخط: <span className="font-bold text-blue-500">{fontSize}px</span>
                    </label>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={decreaseFontSize}
                        disabled={fontSize <= 18}
                        className={`w-8 h-8 rounded-full font-bold transition-all duration-200 flex items-center justify-center ${
                          fontSize <= 18 
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                            : darkMode
                              ? "bg-gray-600 text-white hover:bg-gray-500 active:scale-95"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 active:scale-95"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <input
                        type="range"
                        min="18"
                        max="32"
                        step="2"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                        className="w-20 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                      />
                      
                      <button 
                        onClick={increaseFontSize}
                        disabled={fontSize >= 32}
                        className={`w-8 h-8 rounded-full font-bold transition-all duration-200 flex items-center justify-center ${
                          fontSize >= 32 
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                            : darkMode
                              ? "bg-gray-600 text-white hover:bg-gray-500 active:scale-95"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 active:scale-95"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* المحتوى */}
            <div className="content-wrapper p-8 max-w-4xl mx-auto">
              <div 
                style={{ 
                  '--font-size': `${fontSize}px`,
                  fontSize: `${fontSize}px !important`,
                  fontFamily: `${fontFamily}, serif !important`,
                  lineHeight: '1.8',
                  textAlign: "justify"
                }}
                className={`article-content transition-all duration-300 ${darkMode ? "text-gray-100" : "text-gray-900"}`}
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
