const toggleBtn = document.getElementById("theme-toggle-button");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  
  // حفظ الحالة في المتصفح عشان لما يعمل ريفريش يفضل الوضع زي ما هو
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  }
});

// عند تحميل الصفحة، نتحقق من الحالة المحفوظة
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleBtn.textContent = "☀️";
}