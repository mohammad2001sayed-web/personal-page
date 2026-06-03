// تبديل الوضع الداكن
var toggleButton = document.getElementById("theme-toggle-button");
var htmlTag = document.documentElement;
function switchTheme() {
  if (htmlTag.classList.contains("dark")) {
    htmlTag.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    htmlTag.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

toggleButton.addEventListener("click", switchTheme);

var currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  htmlTag.classList.add("dark");
}
var currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  htmlTag.classList.add("dark");

  if (toggleButton) {
    toggleButton.setAttribute("aria-pressed", "true");
  }
} else {
  htmlTag.classList.remove("dark");
  if (toggleButton) {
    toggleButton.setAttribute("aria-pressed", "false");
  }
}

//! links vavbar

var sections = document.querySelectorAll("section");
var navLinks = document.querySelectorAll(".nav-links a");

// متغير "قفل الأمان" - في الأول بيكون false يعني الجافا سكريبت بتراقب عادي
var isClickScrolling = false;

// الدالة الأساسية اللي بتحسب احنا واقفين فين
function spyScroll() {
  // لو قفل الأمان متفعل (يعني بنعمل سكرول بسبب ضغطة زرار)، اِخرج من الدالة ومتحسبش حاجة
  if (isClickScrolling) return;

  var currentSectionId = "";

  sections.forEach(function (section) {
    var sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 160) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSectionId) {
      link.classList.add("active");
    }
  });
}

// 1. تشغيل الدالة مع السكرول الطبيعي
window.addEventListener("scroll", spyScroll);

// [حل المشكلة 1]: تشغيل الدالة فوراً أول ما الصفحة تفتح عشان تلّون أول سكشن
spyScroll();
// [حل المشكلة 2]: هنلف على اللينكات ونقولهم لما تتداسو، اقفلوا مراقبة السكرول مؤقتاً
navLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    // نفعل قفل الأمان
    isClickScrolling = true;

    // بنشيل الـ active من الكل ونحطها فوراً على اللينك اللي اتداس عليه بس
    navLinks.forEach(function (l) {
      l.classList.remove("active");
    });
    link.classList.add("active");

    // بنستنى ثانية واحدة (1000 مللي ثانية) لحد ما الـ smooth scroll يخلص، وبعدين نفتح المراقبة تاني
    setTimeout(function () {
      isClickScrolling = false;
    }, 1000);
  });
});

// ==========================================
// كود زرار العودة للأعلى (Scroll To Top)
// ==========================================
var scrollToTopBtn = document.getElementById("scroll-to-top");

if (scrollToTopBtn) {
  // 1. مراقبة السكرول عشان نظهر أو نخفي الزرار
  window.addEventListener("scroll", function () {
    // window.pageYOffset بيقيس احنا نزلنا كام بكسل من فوق
    // 400 بكسل دي مسافة مناسبة جداً تكون دخلت في السكشن التاني
    if (window.pageYOffset > 400) {
      // بنشيل كلاسات الإخفاء وبنحط كلاسات الإظهار بتاعت تايلويند
      scrollToTopBtn.classList.remove("opacity-0", "invisible");
      scrollToTopBtn.classList.add("opacity-100", "visible");
    } else {
      // لو رجعنا فوق خالص، بنخفيه تاني
      scrollToTopBtn.classList.remove("opacity-100", "visible");
      scrollToTopBtn.classList.add("opacity-0", "invisible");
    }
  });

  // 2. عند الضغط على الزرار (الطلوع للأعلى بنعومة)
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // حركة ناعمة تخليه يطلع كأنه صاروخ فعلاً
    });
  });
}

// model slide
// ==========================================
// Testimonials Slider
// ==========================================

let carousel = document.getElementById("testimonials-carousel");

let cards = document.querySelectorAll(".testimonial-card");

let nextBtn = document.getElementById("next-testimonial");

let prevBtn = document.getElementById("prev-testimonial");

let indicators = document.querySelectorAll(".carousel-indicator");

let currentIndex = 0;

// كام كارد ظاهر حسب حجم الشاشة
function getCardsPerView() {
  if (window.innerWidth >= 1024) {
    return 3;
  } else if (window.innerWidth >= 640) {
    return 2;
  } else {
    return 1;
  }
}

function updateCarousel() {
  let cardsPerView = getCardsPerView();

  // عرض الكارد الواحدة
  let cardWidth = 100 / cardsPerView;

  carousel.style.transform = `translateX(${currentIndex * cardWidth}%)`;

  indicators.forEach(function (indicator) {
    indicator.classList.remove("bg-accent");

    indicator.classList.add("bg-slate-400", "dark:bg-slate-600");
  });

  if (indicators[currentIndex]) {
    indicators[currentIndex].classList.add("bg-accent");

    indicators[currentIndex].classList.remove(
      "bg-slate-400",
      "dark:bg-slate-600",
    );
  }
}

// Next
nextBtn.addEventListener("click", function () {
  let maxIndex = cards.length - getCardsPerView();

  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  updateCarousel();
});

// Prev
prevBtn.addEventListener("click", function () {
  let maxIndex = cards.length - getCardsPerView();

  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = maxIndex;
  }

  updateCarousel();
});

// Indicators
indicators.forEach(function (indicator, index) {
  indicator.addEventListener("click", function () {
    currentIndex = index;

    updateCarousel();
  });
});

// لما الشاشة يتغير حجمها
window.addEventListener("resize", updateCarousel);

// أول تشغيل
updateCarousel();

//*! ==========================================
// Settings Sidebar
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. عناصر التحكم في فتح وغلق السايدبار
  const settingsToggle = document.getElementById("settings-toggle");
  const settingsSidebar = document.getElementById("settings-sidebar");
  const closeSettings = document.getElementById("close-settings");

  // فتح السايدبار (مع منع انتشار الـ Click عشان متقفلش في نفس اللحظة)
  settingsToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    settingsSidebar.classList.remove("translate-x-full");
    settingsToggle.setAttribute("aria-expanded", "true");
    settingsSidebar.setAttribute("aria-hidden", "false");
  });

  // غلق السايدبار
  closeSettings.addEventListener("click", () => {
    settingsSidebar.classList.add("translate-x-full");
    settingsToggle.setAttribute("aria-expanded", "false");
    settingsSidebar.setAttribute("aria-hidden", "true");
  });

  // غلق السايدبار عند الضغط في أي مكان خارجها
  document.addEventListener("click", (e) => {
    if (
      !settingsSidebar.contains(e.target) &&
      !settingsToggle.contains(e.target)
    ) {
      settingsSidebar.classList.add("translate-x-full");
    }
  });

  // ==========================================
  // 2. تخصيص الخطوط (Fonts)
  // ==========================================
  const fontOptions = document.querySelectorAll(".font-option");

  const fonts = {
    tajawal: "font-tajawal",
    alexandria: "font-alexandria",
    cairo: "font-cairo",
  };

  function setFont(fontName) {
    Object.values(fonts).forEach((className) =>
      document.body.classList.remove(className),
    );
    if (fonts[fontName]) {
      document.body.classList.add(fonts[fontName]);
    }

    fontOptions.forEach((btn) => {
      if (btn.getAttribute("data-font") === fontName) {
        btn.classList.add("active");
        btn.setAttribute("aria-checked", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-checked", "false");
      }
    });

    localStorage.setItem("selected-font", fontName);
  }

  fontOptions.forEach((button) => {
    button.addEventListener("click", () => {
      const fontName = button.getAttribute("data-font");
      setFont(fontName);
    });
  });

  // ==========================================
  // 3. تخصيص ألوان الثيم (Colors)
  // ==========================================
  const colorsGrid = document.getElementById("theme-colors-grid");

  const themeColors = [
    { name: "emerald", primary: "#10b981", accent: "#059669" },
    { name: "blue", primary: "#3b82f6", accent: "#1d4ed8" },
    { name: "purple", primary: "#a855f7", accent: "#7e22ce" },
    { name: "rose", primary: "#f43f5e", accent: "#be123c" },
    { name: "amber", primary: "#f59e0b", accent: "#b45309" },
  ];

  themeColors.forEach((color) => {
    const colorBtn = document.createElement("button");
    colorBtn.type = "button";
    colorBtn.className =
      "w-10 h-10 rounded-full border-2 border-transparent hover:scale-110 transition-transform shadow-sm relative cursor-pointer";
    colorBtn.style.backgroundColor = color.primary;
    colorBtn.setAttribute("data-color", color.name);
    colorBtn.title = color.name;

    colorBtn.addEventListener("click", () => setThemeColor(color));
    colorsGrid.appendChild(colorBtn);
  });

  function setThemeColor(colorObj) {
    // تحديث المتغيرات الأساسية والفرعية للتخلص من تداخل الألوان القديمة في الديفات الداخلية
    document.documentElement.style.setProperty(
      "--color-primary",
      colorObj.primary,
    );
    document.documentElement.style.setProperty(
      "--color-accent",
      colorObj.accent,
    );
    document.documentElement.style.setProperty(
      "--color-primary-light",
      colorObj.primary + "22",
    ); // درجة شفافة جداً للخلفيات الفاتحة
    document.documentElement.style.setProperty(
      "--color-primary-dark",
      colorObj.accent,
    );

    const buttons = colorsGrid.querySelectorAll("button");
    buttons.forEach((btn) => {
      if (btn.getAttribute("data-color") === colorObj.name) {
        btn.classList.add("border-slate-800", "dark:border-white", "scale-110");
      } else {
        btn.classList.remove(
          "border-slate-800",
          "dark:border-white",
          "scale-110",
        );
      }
    });

    localStorage.setItem("selected-theme-color", JSON.stringify(colorObj));
  }

  // ==========================================
  // 4. إعادة الضبط (Reset)
  // ==========================================
  const resetButton = document.getElementById("reset-settings");
  resetButton.addEventListener("click", () => {
    localStorage.removeItem("selected-font");
    localStorage.removeItem("selected-theme-color");

    setFont("tajawal");

    document.documentElement.style.removeProperty("--color-primary");
    document.documentElement.style.removeProperty("--color-accent");
    document.documentElement.style.removeProperty("--color-primary-light");
    document.documentElement.style.removeProperty("--color-primary-dark");

    const buttons = colorsGrid.querySelectorAll("button");
    buttons.forEach((btn) =>
      btn.classList.remove(
        "border-slate-800",
        "dark:border-white",
        "scale-110",
      ),
    );
  });

  // ==========================================
  // 5. تحميل الإعدادات المحفوظة عند فتح الموقع
  // ==========================================
  const savedFont = localStorage.getItem("selected-font") || "tajawal";
  setFont(savedFont);

  const savedColor = localStorage.getItem("selected-theme-color");
  if (savedColor) {
    setThemeColor(JSON.parse(savedColor));
  }
});
