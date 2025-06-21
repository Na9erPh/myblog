---
title: "دليل تنسيق المعادلات الرياضية"
excerpt: "شرح شامل لكيفية كتابة وتنسيق المعادلات الرياضية باستخدام KaTeX في المدونة مع أمثلة عملية."
---

## مقدمة

هذا المقال يوضح كيفية كتابة المعادلات الرياضية بطرق مختلفة في مدونتك.

## أنواع المعادلات

### 1. المعادلات المضمنة (Inline)

استخدم `$` لكتابة معادلة داخل النص مثل $E = mc^2$ أو $F = ma$ أو حتى معادلات أعقد مثل $\int_{0}^{\infty} e^{-x} dx = 1$.

### 2. المعادلات المنفصلة (Display Mode)

استخدم `$$` لكتابة معادلة في سطر منفصل ومتوسطة:

$$F = G \frac{m_1 m_2}{r^2}$$

هذه معادلة الجاذبية لنيوتن.

$$\nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0}$$

وهذه هي معادلة جاوس للكهرباء.

## المعادلات المعقدة

### التفاضل والتكامل

معادلة النمو الأسي:

$$\frac{dy}{dt} = ky$$

حلها:

$$y(t) = y_0 e^{kt}$$

### المصفوفات

مصفوفة الدوران في المستوى:

$$R(\theta) = \begin{pmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{pmatrix}$$

### المتسلسلات

متسلسلة فورييه:

$$f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \left( a_n \cos\left(\frac{n\pi x}{L}\right) + b_n \sin\left(\frac{n\pi x}{L}\right) \right)$$

## نصائح مهمة

### ❌ لا تستخدم `\begin{equation}`

```latex
\begin{equation}
  F = ma
\end{equation}
```

هذا **لا يعمل** مع KaTeX في MDX.

### ✅ استخدم `$$` بدلاً من ذلك

```markdown
$$F = ma$$
```

### ترقيم المعادلات

إذا كنت تريد ترقيم المعادلات، يمكنك إضافة الرقم يدوياً:

$$E = mc^2 \tag{1}$$

$$F = ma \tag{2}$$

## أمثلة متقدمة

### معادلات شرودنجر

المعادلة المستقلة عن الزمن:

$$\hat{H}\psi = E\psi$$

المعادلة المعتمدة على الزمن:

$$i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \hat{H}\Psi(\mathbf{r},t)$$

### معادلات ماكسويل

$$\nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0}$$

$$\nabla \cdot \mathbf{B} = 0$$

$$\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}$$

$$\nabla \times \mathbf{B} = \mu_0\mathbf{J} + \mu_0\epsilon_0\frac{\partial \mathbf{E}}{\partial t}$$

## الخلاصة

- استخدم `$معادلة$` للمعادلات المضمنة
- استخدم `$$معادلة$$` للمعادلات المنفصلة والمتوسطة
- تجنب `\begin{equation}` مع KaTeX
- جميع المعادلات ستظهر بخط جميل ومتوسطة تلقائياً 