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

// links vavbar

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

//! llllllllllllllllllllllllllllllllllllllllllll
// ==========================================
// 1. فتح وقفل القائمة الجانبية (Sidebar)
// ==========================================
var settingsToggle = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettings = document.getElementById("close-settings");

if (settingsToggle && settingsSidebar && closeSettings) {
  // عند الضغط على الترس: افتح
  settingsToggle.addEventListener("click", function () {
    settingsSidebar.classList.remove("translate-x-full");
    settingsSidebar.classList.add("translate-x-0");
  });

  // عند الضغط على الـ X: اقفل
  closeSettings.addEventListener("click", function () {
    settingsSidebar.classList.remove("translate-x-0");
    settingsSidebar.classList.add("translate-x-full");
  });
}

// ==========================================
// 2. تغيير نوع الخط (Fonts)
// ==========================================
var fontOptions = document.querySelectorAll(".font-option");

fontOptions.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var chosenFont = btn.getAttribute("data-font"); // بيلقط (cairo أو tajawal أو alexandria)

    // بنغير كلاس الخط في الـ body بالكامل
    document.body.style.fontFamily = chosenFont + ", sans-serif";

    // بننظف علامة الصح الزرقاء من كل الأزرار ونحطها للي اتداس عليه بس
    fontOptions.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");

    localStorage.setItem("saved-font", chosenFont);
  });
});

// ==========================================
// 3. رسم وتشغيل ألوان الثيم (Colors)
// ==========================================
var colorsGrid = document.getElementById("theme-colors-grid");

// لستة الألوان والدرجات اللي كانت في الصورة بتاعتك (أزرق، أخضر، برتقالي، أصفر...)
var availableColors = [
  { name: "indigo", hex: "#6366f1" },
  { name: "emerald", hex: "#10b981" },
  { name: "amber", hex: "#f59e0b" },
  { name: "rose", hex: "#f43f5e" },
  { name: "sky", hex: "#0ea5e9" },
  { name: "violet", hex: "#8b5cf6" },
  { name: "teal", hex: "#14b8a6" },
  { name: "fuchsia", hex: "#d946ef" },
];

if (colorsGrid) {
  // بنرسم الدوائر جوة الـ Grid الفاضي تلقائيًا
  availableColors.forEach(function (color) {
    var button = document.createElement("button");
    button.type = "button";
    // كلاسات تايلويند لعمل دائرة أنيقة
    button.className =
      "w-10 h-10 rounded-full border-2 border-transparent hover:scale-110 transition-transform shadow-sm cursor-pointer";
    button.style.backgroundColor = color.hex;
    button.setAttribute("data-color", color.hex);

    button.addEventListener("click", function () {
      // بنغير اللون الأساسي للموقع (المتغير المسؤول في الديزاين الجاهز)
      document.documentElement.style.setProperty("--color-primary", color.hex);
      document.documentElement.style.setProperty("--primary", color.hex); // زيادة أمان لو مسمّع كدة

      // حركة جمالية: نحدد الدائرة النشطة
      document
        .querySelectorAll("#theme-colors-grid button")
        .forEach(function (b) {
          b.style.borderColor = "transparent";
        });
      button.style.borderColor = "#000"; // بيعمل إطار أسود حول اللون المختار

      localStorage.setItem("saved-color", color.hex);
    });

    colorsGrid.appendChild(button);
  });
}

// ==========================================
// 4. زرار إعادة الضبط (Reset)
// ==========================================
var resetBtn = document.getElementById("reset-settings");
if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    localStorage.removeItem("saved-font");
    localStorage.removeItem("saved-color");
    location.reload(); // ريفريش يرجع كل حاجة زيرو
  });
}

// ==========================================
// 5. عند الريفريش: افتكر الاختيارات القديمة
// ==========================================
var savedFont = localStorage.getItem("saved-font");
var savedColor = localStorage.getItem("saved-color");

if (savedFont) {
  document.body.style.fontFamily = savedFont + ", sans-serif";
  // بنرجع ننشط الزرار اللي كان مختار
  var activeFontBtn = document.querySelector(`[data-font="${savedFont}"]`);
  if (activeFontBtn) activeFontBtn.classList.add("active");
}
if (savedColor) {
  document.documentElement.style.setProperty("--color-primary", savedColor);
  document.documentElement.style.setProperty("--primary", savedColor);
}
