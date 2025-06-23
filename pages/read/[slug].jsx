import { MDXRemote } from "next-mdx-remote";
import { getAllSlugs, getPostBySlug } from "../../lib/mdx";
import Head from "next/head";
import { useState, useEffect } from "react";

const components = {
  h1: (props) => (
    <h1 className="text-3xl font-bold mb-6 text-blue-500 dark:text-blue-400 text-center" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-8 mb-4 text-2xl font-semibold text-blue-500 dark:text-blue-400" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-6 mb-3 text-xl font-medium text-gray-800 dark:text-gray-200" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300 text-justify" {...props} />
  ),
  img: (props) => (
    <img className="my-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto" alt={props.alt} {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-r-4 border-blue-500 bg-gray-50 dark:bg-gray-800 p-4 my-6 italic" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
  ),
  code: (props) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm" {...props} />
  ),
  pre: (props) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-6" {...props} />
  ),
};

export async function getStaticPaths() {
  const slugs = await getAllSlugs();
  return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const { frontMatter, mdxSource } = await getPostBySlug(params.slug);
  return { props: { frontMatter, mdxSource } };
}

export default function ReadingPage({ frontMatter, mdxSource }) {
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

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const increaseFontSize = () => {
    if (fontSize < 32) {
      const newSize = fontSize + 2;
      setFontSize(newSize);
      localStorage.setItem("fontSize", newSize.toString());
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 18) {
      const newSize = fontSize - 2;
      setFontSize(newSize);
      localStorage.setItem("fontSize", newSize.toString());
    }
  };

  const changeFontFamily = (newFont) => {
    setFontFamily(newFont);
    localStorage.setItem("fontFamily", newFont);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // تطبيق تغييرات الخط فوراً
  useEffect(() => {
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

  return (
    <>
      <Head>
        <title>{frontMatter.title} - ناصر سلمان</title>
        <meta name="description" content={frontMatter.excerpt || frontMatter.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cairo:wght@300;400;600;700&family=Tajawal:wght@300;400;500;700&family=Almarai:wght@300;400;700;800&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />
      </Head>

      <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-white"}`}>
        
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
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-active:scale-110 transition-transform duration-150"></div>
          </button>
        </div>

        {/* Reading Controls - أعلى الصفحة */}
        <div className={`sticky top-0 z-40 ${darkMode ? "bg-gray-700" : "bg-gray-100"} border-b shadow-md`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-center gap-8 flex-wrap max-w-4xl mx-auto">
              
              {/* اختيار الخط */}
              <div className="flex items-center gap-3">
                <label className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
                  نوع الخط:
                </label>
                <select 
                  value={fontFamily} 
                  onChange={(e) => changeFontFamily(e.target.value)}
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
                    onChange={(e) => {
                      const newSize = parseInt(e.target.value);
                      setFontSize(newSize);
                      localStorage.setItem("fontSize", newSize.toString());
                    }}
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

        {/* Article Content */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          <article>
            
            {/* Article Header */}
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-bold mb-6 text-blue-500 dark:text-blue-400">{frontMatter.title}</h1>
              {frontMatter.excerpt && (
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">{frontMatter.excerpt}</p>
              )}
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6"></div>
            </header>

            {/* Article Content */}
            <div 
              style={{ 
                '--font-size': `${fontSize}px`,
                fontSize: `${fontSize}px !important`,
                fontFamily: `${fontFamily}, serif !important`,
                lineHeight: '1.8',
                textAlign: "justify"
              }}
              className={`article-content transition-all duration-300 prose prose-lg max-w-none dark:prose-invert mx-auto ${darkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              <MDXRemote {...mdxSource} components={components} />
            </div>
          </article>
        </main>

        {/* Footer */}
        <footer className={`${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"} text-center py-6 mt-12`}>
          <p>© {new Date().getFullYear()} ناصر سلمان - وضع القراءة</p>
        </footer>
      </div>
    </>
  );
} 