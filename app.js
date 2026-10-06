/**
 * 오늘의 메뉴 랜덤 추천기 (Random Menu Recommender)
 * - 한식, 중식, 일식, 양식, 아시안 등 다채로운 메뉴 18종 제공
 * - 룰렛 셔플 애니메이션, Web Audio 신스 사운드, 캔버스 폭죽 효과 내장
 */

// 1. 메뉴 데이터베이스 (18종)
const MENU_DATABASE = [
  // --- 한식 (Korean) ---
  {
    name: "돼지고기 김치찌개",
    category: "korean",
    categoryLabel: "🍚 한식",
    emoji: "🍲",
    desc: "얼큰하고 진한 국물에 밥 두 공기 뚝딱! 한국인의 소울푸드.",
    tags: ["#칼칼한국물", "#밥도둑", "#소울푸드"]
  },
  {
    name: "노릇노릇 삼겹살",
    category: "korean",
    categoryLabel: "🍚 한식",
    emoji: "🥓",
    desc: "지글지글 구워 쌈장에 콕! 오늘 저녁은 삼겹살 파티 어떤가요?",
    tags: ["#육즙가득", "#파채필수", "#소주한잔"]
  },
  {
    name: "매콤달콤 제육볶음",
    category: "korean",
    categoryLabel: "🍚 한식",
    emoji: "🥩",
    desc: "불맛 가득 매콤한 양념에 쓱쓱 비벼먹는 직장인 최애 점심 메뉴!",
    tags: ["#불맛", "#점심스테디셀러", "#쌈싸먹기"]
  },
  {
    name: "전주식 오색 비빔밥",
    category: "korean",
    categoryLabel: "🍚 한식",
    emoji: "🥗",
    desc: "신선한 나물과 고추장, 참기름 듬뿍 넣어 건강하고 든든한 한 그릇!",
    tags: ["#건강한식", "#나물가득", "#고소한참기름"]
  },
  {
    name: "얼큰 닭볶음탕",
    category: "korean",
    categoryLabel: "🍚 한식",
    emoji: "🍗",
    desc: "포슬포슬 감자와 매콤달콤 양념이 쏙 밴 닭고기의 환상 조합.",
    tags: ["#매콤칼칼", "#감자포슬포슬", "#볶음밥필수"]
  },

  // --- 중식 (Chinese) ---
  {
    name: "짜장면과 바삭 탕수육",
    category: "chinese",
    categoryLabel: "🥟 중식",
    emoji: "🥢",
    desc: "달콤짭짤한 춘장 소스와 겉바속촉 탕수육의 영원한 단짝 콤보!",
    tags: ["#국민중식", "#부먹찍먹", "#단무지필수"]
  },
  {
    name: "불맛 해물 짬뽕",
    category: "chinese",
    categoryLabel: "🥟 중식",
    emoji: "🍜",
    desc: "각종 해산물과 야채를 볶아낸 칼칼하고 시원한 불맛 국물!",
    tags: ["#해장추천", "#얼큰시원", "#불맛가득"]
  },
  {
    name: "알싸한 마라탕",
    category: "chinese",
    categoryLabel: "🥟 중식",
    emoji: "🍲",
    desc: "내가 원하는 토핑만 쏙쏙! 얼얼하고 중독적인 마라의 매력.",
    tags: ["#혈중마라농도", "#얼얼한맛", "#취향맞춤"]
  },
  {
    name: "쫄깃 찹쌀 꿔바로우",
    category: "chinese",
    categoryLabel: "🥟 중식",
    emoji: "🥟",
    desc: "새콤달콤한 소스에 쫀득한 찹쌀 튀김옷이 입안 가득 감동을 선사합니다.",
    tags: ["#쫀득바삭", "#새콤달콤", "#겉바속쫀"]
  },

  // --- 일식 (Japanese) ---
  {
    name: "모둠 초밥 & 연어초밥",
    category: "japanese",
    categoryLabel: "🍣 일식",
    emoji: "🍣",
    desc: "신선한 회와 은은한 감칠맛의 밥알이 빚어내는 깔끔하고 고급스러운 맛!",
    tags: ["#신선함", "#와사비코끝찡", "#깔끔한한끼"]
  },
  {
    name: "두툼한 로스카츠 (돈가스)",
    category: "japanese",
    categoryLabel: "🍣 일식",
    emoji: "🍱",
    desc: "바사삭 소리까지 맛있는 바삭한 튀김옷 속 촉촉한 육즙의 두툼한 돈카츠.",
    tags: ["#겉바속촉", "#와사비소금", "#돈까스러버"]
  },
  {
    name: "진한 돈코츠 라멘",
    category: "japanese",
    categoryLabel: "🍣 일식",
    emoji: "🍜",
    desc: "오랜 시간 푹 우려낸 깊고 구수한 돼지뼈 육수와 부드러운 차슈 한 점!",
    tags: ["#깊은육수", "#반숙계란", "#차슈추가"]
  },
  {
    name: "바삭바삭 텐동 (튀김덮밥)",
    category: "japanese",
    categoryLabel: "🍣 일식",
    emoji: "🍤",
    desc: "새우, 온천계란, 채소 튀김에 달콤짭조름한 타레 소스를 얹은 일품 덮밥!",
    tags: ["#바삭식감", "#타레소스", "#온천계란톡"]
  },

  // --- 양식 (Western) ---
  {
    name: "꾸덕한 베이컨 크림 파스타",
    category: "western",
    categoryLabel: "🍕 양식",
    emoji: "🍝",
    desc: "진하고 고소한 크림소스와 짭조름한 베이컨이 어우러진 풍미 가득한 맛!",
    tags: ["#꾸덕꾸덕", "#고소한치즈", "#면치기"]
  },
  {
    name: "치즈 듬뿍 마르게리따 피자",
    category: "western",
    categoryLabel: "🍕 양식",
    emoji: "🍕",
    desc: "토마토의 산뜻함, 생 모짜렐라 치즈, 바질 향미가 완벽한 조화를 이루는 피자.",
    tags: ["#치즈쭉쭉", "#화덕피자", "#맥주친구"]
  },
  {
    name: "육즙 폭발 수제버거 & 감튀",
    category: "western",
    categoryLabel: "🍕 양식",
    emoji: "🍔",
    desc: "두툼한 소고기 패티에 멜팅 치즈, 바삭한 감자튀김과 함께 즐기는 미국맛!",
    tags: ["#헤비한행복", "#감튀필수", "#육즙가득"]
  },

  // --- 아시안 / 분식 (Asian & Snack) ---
  {
    name: "매콤 국물 떡볶이 & 튀김",
    category: "asian",
    categoryLabel: "🍜 아시안/분식",
    emoji: "🍢",
    desc: "매콤달콤 국물에 바삭한 김말이와 튀김을 푹 찍어 먹으면 스트레스 해소!",
    tags: ["#국민간식", "#어묵국물", "#순대튀김세트"]
  },
  {
    name: "담백 깔끔 베트남 소고기 쌀국수",
    category: "asian",
    categoryLabel: "🍜 아시안/분식",
    emoji: "🍲",
    desc: "맑고 깊은 양지 육수에 신선한 숙주와 레몬, 칠리소스 곁들여 속 편안하게!",
    tags: ["#속편한식사", "#해장추천", "#고수선택"]
  }
];

// 2. 상태 관리 변수
let currentCategory = "all";
let isRolling = false;
let soundEnabled = true;
let historyItems = [];
let audioCtx = null;

// 3. DOM 요소 참조
const displayCard = document.getElementById("display-card");
const foodEmoji = document.getElementById("food-emoji");
const foodCategory = document.getElementById("food-category");
const foodName = document.getElementById("food-name");
const foodDesc = document.getElementById("food-desc");
const foodTags = document.getElementById("food-tags");
const recommendBtn = document.getElementById("recommend-btn");
const naverMapBtn = document.getElementById("naver-map-btn");
const copyBtn = document.getElementById("copy-btn");
const actionLinks = document.getElementById("action-links");
const historyList = document.getElementById("history-list");
const soundToggleBtn = document.getElementById("sound-toggle");
const categoryChips = document.querySelectorAll(".cat-chip");
const toast = document.getElementById("toast");
const confettiCanvas = document.getElementById("confetti-canvas");

// 4. Web Audio API 사운드 효과 (신디사이저 방식 - 외부 파일 의존성 없음)
function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
}

// 셔플 중 째깍 째깍 효과음
function playTickSound() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(500 + Math.random() * 200, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // 오디오 실패 무시
  }
}

// 최종 추천 발표 성공 팡파레 효과음
function playTaDaSound() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5 코드
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const startTime = audioCtx.currentTime + idx * 0.08;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  } catch (e) {
    // 오디오 실패 무시
  }
}

// 5. 컨페티(폭죽) 파티클 시스템
const confettiParticles = [];
const confettiColors = ["#ff5e62", "#ffb347", "#00f2fe", "#4facfe", "#ffbe3d", "#a855f7", "#22c55e"];
let confettiAnimationId = null;

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function triggerConfetti() {
  const ctx = confettiCanvas.getContext("2d");
  const count = 70;
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 160,
      y: window.innerHeight * 0.45,
      w: Math.random() * 8 + 6,
      h: Math.random() * 6 + 4,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() * -12) - 4,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      opacity: 1
    });
  }

  if (!confettiAnimationId) {
    runConfettiAnimation(ctx);
  }
}

function runConfettiAnimation(ctx) {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.35; // 중력
    p.rotation += p.vRot;
    p.opacity -= 0.012;

    if (p.opacity <= 0 || p.y > window.innerHeight) {
      confettiParticles.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }

  if (confettiParticles.length > 0) {
    confettiAnimationId = requestAnimationFrame(() => runConfettiAnimation(ctx));
  } else {
    cancelAnimationFrame(confettiAnimationId);
    confettiAnimationId = null;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

// 6. 메뉴 필터링 헬퍼
function getFilteredMenus() {
  if (currentCategory === "all") {
    return MENU_DATABASE;
  }
  return MENU_DATABASE.filter(m => m.category === currentCategory);
}

// 7. 메인 추천 룰렛 로직
function pickRandomMenu() {
  if (isRolling) return;
  initAudio();

  const candidates = getFilteredMenus();
  if (candidates.length === 0) return;

  isRolling = true;
  recommendBtn.disabled = true;
  recommendBtn.querySelector(".btn-text").textContent = "메뉴 고르는 중...";

  displayCard.classList.remove("pop-success");
  displayCard.classList.add("is-rolling");
  foodEmoji.classList.add("rolling");

  let counter = 0;
  const totalShuffles = 18;
  const baseInterval = 65;

  function shuffleStep() {
    counter++;
    const randomPick = candidates[Math.floor(Math.random() * candidates.length)];
    
    // 롤링 중 화면에 스쳐 지나가는 메뉴 표시
    foodEmoji.textContent = randomPick.emoji;
    foodName.textContent = randomPick.name;
    foodCategory.textContent = randomPick.categoryLabel;
    foodDesc.textContent = "두근두근... 어떤 맛있는 메뉴가 나올까요?";
    
    playTickSound();

    if (counter < totalShuffles) {
      // 뒤로 갈수록 슬로우다운 효과 (긴장감 부여)
      const delay = baseInterval + Math.pow(counter, 1.8);
      setTimeout(shuffleStep, delay);
    } else {
      // 롤링 종료 -> 최종 선정
      finalizePick(randomPick);
    }
  }

  shuffleStep();
}

// 최종 메뉴 선정 확정 처리
function finalizePick(chosenMenu) {
  displayCard.classList.remove("is-rolling");
  foodEmoji.classList.remove("rolling");
  displayCard.classList.add("pop-success");

  foodEmoji.textContent = chosenMenu.emoji;
  foodCategory.textContent = chosenMenu.categoryLabel;
  foodCategory.classList.add("active-badge");
  foodName.textContent = chosenMenu.name;
  foodDesc.textContent = chosenMenu.desc;

  // 태그 렌더링
  foodTags.innerHTML = chosenMenu.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join("");

  // 네이버 지도 링크 업데이트
  naverMapBtn.href = `https://map.naver.com/p/search/${encodeURIComponent(chosenMenu.name)}`;
  actionLinks.style.display = "flex";

  // 사운드 및 폭죽
  playTaDaSound();
  triggerConfetti();

  // 히스토리에 추가
  addToHistory(chosenMenu);

  // 버튼 복원
  recommendBtn.disabled = false;
  recommendBtn.querySelector(".btn-text").textContent = "다시 추천받기";
  isRolling = false;
}

// 8. 히스토리 관리
function addToHistory(menu) {
  // 중복 방지 및 최신 추가
  historyItems = historyItems.filter(item => item.name !== menu.name);
  historyItems.unshift(menu);
  if (historyItems.length > 6) {
    historyItems.pop();
  }
  renderHistory();
}

function renderHistory() {
  if (historyItems.length === 0) {
    historyList.innerHTML = `<p class="history-empty">아직 뽑은 메뉴가 없어요.</p>`;
    return;
  }

  historyList.innerHTML = historyItems
    .map(
      item => `
      <div class="history-chip" title="${item.categoryLabel}">
        <span>${item.emoji}</span>
        <span>${item.name}</span>
      </div>
    `
    )
    .join("");
}

// 9. 복사 기능 및 토스트 팝업
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

copyBtn.addEventListener("click", () => {
  const currentMenuName = foodName.textContent;
  if (!currentMenuName || currentMenuName === "어떤 메뉴가 나올까요?") return;

  const shareText = `오늘의 추천 메뉴: ${foodEmoji.textContent} ${currentMenuName}! 맛있는 식사 되세요 😋`;
  navigator.clipboard.writeText(shareText).then(() => {
    showToast(`'${currentMenuName}' 메뉴가 복사되었습니다! 📋`);
  }).catch(() => {
    showToast(`메뉴명: ${currentMenuName}`);
  });
});

// 10. 카테고리 필터 클릭 이벤트
categoryChips.forEach(chip => {
  chip.addEventListener("click", () => {
    if (isRolling) return;
    categoryChips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    currentCategory = chip.dataset.category;
    
    // 안내 멘트 살짝 변경
    if (foodName.textContent === "어떤 메뉴가 나올까요?") {
      const catName = chip.textContent.trim();
      foodDesc.textContent = `'${catName}' 카테고리가 선택되었습니다. 추천 버튼을 눌러보세요!`;
    }
  });
});

// 11. 사운드 토글
soundToggleBtn.addEventListener("click", () => {
  initAudio();
  soundEnabled = !soundEnabled;
  const soundIcon = soundToggleBtn.querySelector(".sound-icon");
  const soundText = soundToggleBtn.querySelector(".sound-text");
  
  if (soundEnabled) {
    soundIcon.textContent = "🔊";
    soundText.textContent = "효과음 ON";
    playTickSound();
  } else {
    soundIcon.textContent = "🔇";
    soundText.textContent = "효과음 OFF";
  }
});

// 12. 추천 버튼 이벤트
recommendBtn.addEventListener("click", pickRandomMenu);
