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
        
        {/* Reading Controls - أعلى الصفحة */}
        <div className={`sticky top-0 z-40 backdrop-blur-lg ${
          darkMode 
            ? "bg-slate-800/90 border-slate-700/50" 
            : "bg-white/90 border-emerald-200/50"
        } border-b shadow-lg shadow-emerald-500/5 dark:shadow-slate-900/20`}>
          <div className="px-6 py-5">
            <div className="flex items-center justify-center gap-6 flex-wrap max-w-4xl mx-auto">
              
              {/* اختيار الخط */}
              <div className={`flex items-center gap-3 p-3 rounded-2xl ${
                darkMode 
                  ? "bg-gradient-to-r from-slate-700/80 to-slate-600/80 shadow-lg shadow-slate-900/20" 
                  : "bg-gradient-to-r from-emerald-50/80 to-teal-50/80 shadow-md shadow-emerald-500/10"
              } backdrop-blur-sm border border-white/20 dark:border-slate-600/30`}>
                <label className={`text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-700"}`}>
                  نوع الخط:
                </label>
                <select 
                  value={fontFamily} 
                  onChange={(e) => changeFontFamily(e.target.value)}
                  className={`text-sm px-3 py-2 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-emerald-500 ${
                    darkMode 
                      ? "bg-slate-600 text-white border-slate-500 hover:bg-slate-500" 
                      : "bg-white text-gray-700 border-gray-300 hover:border-emerald-300"
                  }`}
                >
                  {fonts.map(font => (
                    <option key={font.value} value={font.value}>{font.name}</option>
                  ))}
                </select>
              </div>
              
              {/* تحكم في الإعدادات - النمط الليلي وحجم الخط */}
              <div className={`flex items-center gap-4 p-3 rounded-2xl ${
                darkMode 
                  ? "bg-gradient-to-r from-slate-700/80 to-slate-600/80 shadow-lg shadow-slate-900/20" 
                  : "bg-gradient-to-r from-emerald-50/80 to-teal-50/80 shadow-md shadow-emerald-500/10"
              } backdrop-blur-sm border border-white/20 dark:border-slate-600/30`}>
                
                {/* زر النمط الليلي */}
                <button 
                  onClick={toggleDarkMode}
                  className={`w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center ${
                    darkMode
                      ? "bg-yellow-500 text-yellow-900 hover:bg-yellow-400 active:scale-95"
                      : "bg-slate-700 text-slate-200 hover:bg-slate-600 active:scale-95"
                  }`}
                  title={darkMode ? "تبديل للنمط النهاري" : "تبديل للنمط الليلي"}
                >
                  {darkMode ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"></path>
                    </svg>
                  )}
                </button>
                
                {/* فاصل */}
                <div className={`w-px h-6 ${darkMode ? "bg-slate-600" : "bg-gray-300"}`}></div>
                
                {/* أيقونة الخط */}
                <div className={`p-1 rounded ${
                  darkMode 
                    ? "text-emerald-400" 
                    : "text-emerald-600"
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                {/* عرض حجم الخط الحالي */}
                <span className={`text-sm font-medium ${
                  darkMode ? "text-slate-200" : "text-slate-700"
                }`}>
                  {fontSize}px
                </span>
                
                {/* أزرار التحكم في حجم الخط */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={decreaseFontSize}
                    disabled={fontSize <= 18}
                    className={`w-8 h-8 rounded-lg font-bold transition-all duration-200 flex items-center justify-center text-lg ${
                      fontSize <= 18 
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                        : darkMode
                          ? "bg-slate-600 text-white hover:bg-slate-500 active:scale-95"
                          : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 active:scale-95"
                    }`}
                  >
                    −
                  </button>
                  
                  <button 
                    onClick={increaseFontSize}
                    disabled={fontSize >= 32}
                    className={`w-8 h-8 rounded-lg font-bold transition-all duration-200 flex items-center justify-center text-lg ${
                      fontSize >= 32 
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                        : darkMode
                          ? "bg-slate-600 text-white hover:bg-slate-500 active:scale-95"
                          : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 active:scale-95"
                    }`}
                  >
                    +
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