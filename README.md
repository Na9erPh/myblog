# مدونة Next.js مع Decap CMS

مشروع مدونة ثابتة باستخدام Next.js 14 مع لوحة تحكم Decap CMS.

## التثبيت والتشغيل

```bash
npm install
npm run dev
```

## النشر على Netlify

### 1. استيراد المستودع
- ادخل على Netlify وانقر "New site from Git"
- اربط مستودع GitHub
- اختر الإعدادات:
  - Build command: `npm run build`
  - Publish directory: `out`

### 2. تفعيل Identity
- في إعدادات الموقع اذهب إلى "Identity"
- انقر "Enable Identity"
- في "Registration preferences" اختر "Invite only"

### 3. تفعيل Git Gateway
- في "Identity" اذهب إلى "Services"
- انقر "Enable Git Gateway"

### 4. الوصول للوحة التحكم
- اذهب إلى `موقعك.netlify.app/admin`
- ادع نفسك كمستخدم من إعدادات Identity
- ادخل وابدأ بكتابة المقالات

## النشر من الهاتف

### طريقة 1: عبر لوحة /admin
- ادخل على `موقعك.netlify.app/admin` من الهاتف
- سجل دخولك
- انقر "New مقالات" لإضافة مقال جديد
- اكتب العنوان والمحتوى
- انقر "Publish" لنشر المقال

### طريقة 2: عبر GitHub
- استخدم تطبيق GitHub للهاتف
- اذهب إلى مجلد `posts`
- أضف ملف جديد بصيغة `.md`
- اكتب المقال بتنسيق Markdown مع Front Matter
- احفظ التغييرات (Commit)

## هيكل المقال

```markdown
---
title: "عنوان المقال"
---

محتوى المقال هنا...
``` 