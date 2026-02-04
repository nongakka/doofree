// ===== ตั้งค่าตรงนี้ =====
const BASE_URL = "https://API_TONTHANG"; // ใส่โดเมน API
const API_KEY  = "API_KEY";             // ใส่ key
// ========================

const list = document.getElementById("match-list");
const player = document.getElementById("player");

// ดึงรายการถ่ายทอดสด
fetch(`${BASE_URL}/ajax_channels.php?api_key=${API_KEY}`)
  .then(r => r.text()) // ส่วนใหญ่ส่ง HTML
  .then(html => {
    list.innerHTML = html;
  })
  .catch(() => {
    list.innerHTML = "<div>ไม่สามารถโหลดรายการได้</div>";
  });

// คลิกดู
document.addEventListener("click", e => {
  const id = e.target.dataset.id;
  if (!id) return;

  fetch(`${BASE_URL}/ajax_player.php?channel=${id}&api_key=${API_KEY}`)
    .then(r => r.text())
    .then(html => {
      player.innerHTML = html;
      player.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
