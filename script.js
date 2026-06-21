// Troque imagens diretamente no HTML/CSS:
// capa principal: Img/Pagina0.png
// imagem do CD giratório: Img/Pagina1.png

// Para mudar músicas ou letras, edite apenas este array mantendo os caminhos reais.
const tracks = [
  {
    title: "Squad da Zoeira em Verdansk",
    audio: "Musicas/MP3/01 - Squad da Zoeira em Verdansk.mp3",
    lyrics: "Letras/01 - Squad da Zoeira em Verdansk.txt"
  },
  {
    title: "Terapia em Grupo com Arma Carregada",
    audio: "Musicas/MP3/02 - Terapia em Grupo com Arma Carregada.mp3",
    lyrics: "Letras/02 - Terapia em Grupo com Arma Carregada.txt"
  },
  {
    title: "O Esquadrão Perdido",
    audio: "Musicas/MP3/03 - O Esquadrão Perdido.mp3",
    lyrics: "Letras/03 - O Esquadrão Perdido.txt"
  },
  {
    title: "A Herdeira de Verdansk",
    audio: "Musicas/MP3/04 - A Herdeira de Verdansk.mp3",
    lyrics: "Letras/04 - A Herdeira de Verdansk.txt"
  },
  {
    title: "O Retorno do Cabo Recruta",
    audio: "Musicas/MP3/05 - O Retorno do Cabo Recruta.mp3",
    lyrics: "Letras/05 - O Retorno do Cabo Recruta.txt"
  },
  {
    title: "O Homem Cego",
    audio: "Musicas/MP3/06 - O Homem Cego.mp3",
    lyrics: "Letras/06 - O Homem Cego.txt"
  },
  {
    title: "The Blind Man (International Version)",
    audio: "Musicas/MP3/07 - The Blind Man (International Version).mp3",
    lyrics: "Letras/07 - The Blind Man (International Version).txt"
  },
  {
    title: "O Homem Que Não Consegue Jogar",
    audio: "Musicas/MP3/08 - O Homem Que Não Consegue Jogar.mp3",
    lyrics: "Letras/08 - O Homem Que Não Consegue Jogar.txt"
  },
  {
    title: "O Aprendiz Virou Mestre",
    audio: "Musicas/MP3/09 - O Aprendiz Virou Mestre.mp3",
    lyrics: "Letras/09 - O Aprendiz Virou Mestre.txt"
  },
  {
    title: "A Última Missão",
    audio: "Musicas/MP3/10 - A Última Missão.mp3",
    lyrics: "Letras/10 - A Última Missão.txt"
  },
  {
    title: "Sou a Delta Force Girl (Bônus Track)",
    audio: "Musicas/MP3/11 - Sou a Delta Force Girl (Bônus Track).mp3",
    lyrics: "Letras/11 - Sou a Delta Force Girl (Bônus Track) 1.txt"
  },
  {
    title: "O Último Rush",
    audio: "Musicas/MP3/12 - O Último Rush.mp3",
    lyrics: "Letras/12 - O Último Rush.txt"
  },
  {
    title: "The Last Rush (International Version)",
    audio: "Musicas/MP3/13 - The Last Rush (International Version).mp3",
    lyrics: "Letras/13 - The Last Rush (International Version).txt"
  },
  {
    title: "Reis da Guerra",
    audio: "Musicas/MP3/14 - Reis da Guerra.mp3",
    lyrics: "Letras/14 - Reis da Guerra.txt"
  }
];

// Se quiser parar no fim do álbum, mude para false.
const LOOP_ALBUM = true;

const audioPlayer = document.querySelector("#audioPlayer");
const trackNumber = document.querySelector("#trackNumber");
const trackTitle = document.querySelector("#trackTitle");
const lyricsTitle = document.querySelector("#lyrics-title");
const lyricsEyebrow = document.querySelector("#lyricsEyebrow");
const lyricsContent = document.querySelector("#lyricsContent");
const trackList = document.querySelector("#trackList");
const playPauseBtn = document.querySelector("#playPauseBtn");
const playIcon = document.querySelector("#playIcon");
const playLabel = document.querySelector("#playLabel");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const disc = document.querySelector("#disc");
const discStatus = document.querySelector("#discStatus");
const progressBar = document.querySelector("#progressBar");
const currentTimeLabel = document.querySelector("#currentTime");
const durationLabel = document.querySelector("#duration");
const bookletViewer = document.querySelector("#bookletViewer");
const bookletCoverImage = document.querySelector("#bookletCoverImage");
const bookletDiscImage = document.querySelector("#bookletDiscImage");
const bookletPageImage = document.querySelector("#bookletPageImage");
const bookletLeaf = document.querySelector("#bookletLeaf");
const openBookletBtn = document.querySelector("#openBookletBtn");
const prevBookletBtn = document.querySelector("#prevBookletBtn");
const nextBookletBtn = document.querySelector("#nextBookletBtn");
const closeBookletBtn = document.querySelector("#closeBookletBtn");
const bookletCounter = document.querySelector("#bookletCounter");

let currentTrackIndex = 0;
let isSeeking = false;

// Troque aqui as imagens da caixa fechada e do CD interno.
const bookletCover = "Img/Pagina0.png";
const bookletDisc = "Img/Pagina1.png";

// Para adicionar novas páginas ao livreto, inclua novos caminhos neste array.
// A quantidade exibida no contador usa bookletPages.length automaticamente.
const bookletPages = [
  "Img/Pagina2.png",
  "Img/Pagina3.png",
  "Img/Pagina4.png",
  "Img/Pagina5.png"
];

let currentBookletPage = 0;
let isBookletOpen = false;
let isBookletAnimating = false;
let touchStartX = 0;
let touchStartY = 0;

function formatTrackNumber(index) {
  return String(index + 1).padStart(2, "0");
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function renderTrackList() {
  const fragment = document.createDocumentFragment();

  tracks.forEach((track, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    const number = document.createElement("span");
    const title = document.createElement("span");

    button.type = "button";
    button.className = "track-button";
    button.dataset.index = index;
    button.setAttribute("aria-label", `Tocar faixa ${formatTrackNumber(index)}: ${track.title}`);

    number.className = "track-index";
    number.textContent = formatTrackNumber(index);

    title.className = "track-name";
    title.textContent = track.title;

    button.append(number, title);
    item.append(button);
    fragment.append(item);
  });

  trackList.append(fragment);
}

function updateActiveTrackButton() {
  document.querySelectorAll(".track-button").forEach((button, index) => {
    const isActive = index === currentTrackIndex;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

async function loadLyrics(track) {
  lyricsTitle.textContent = track.title;
  lyricsEyebrow.textContent = "Letra completa";
  lyricsContent.textContent = "Carregando letra do encarte...";

  try {
    const response = await fetch(track.lyrics);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    lyricsContent.textContent = text.trim() || "Esta letra está vazia no arquivo .txt.";
  } catch (error) {
    lyricsEyebrow.textContent = "Letra indisponível";
    lyricsContent.textContent = `Não consegui carregar a letra desta faixa.\n\nConfira se o arquivo existe neste caminho:\n${track.lyrics}`;
  }
}

function updatePlayerState(isPlaying) {
  disc.classList.toggle("is-spinning", isPlaying);
  discStatus.textContent = isPlaying ? "CD girando" : "CD em espera";
  playIcon.textContent = isPlaying ? "❚❚" : "▶";
  playLabel.textContent = isPlaying ? "Pausar" : "Tocar";
  playPauseBtn.setAttribute("aria-label", isPlaying ? "Pausar" : "Tocar");
}

async function playCurrentTrack() {
  try {
    await audioPlayer.play();
  } catch (error) {
    updatePlayerState(false);
  }
}

function loadTrack(index, shouldAutoplay = false) {
  currentTrackIndex = (index + tracks.length) % tracks.length;
  const track = tracks[currentTrackIndex];
  const number = formatTrackNumber(currentTrackIndex);

  audioPlayer.src = track.audio;
  audioPlayer.load();

  trackNumber.textContent = `Faixa ${number}`;
  trackTitle.textContent = track.title;
  progressBar.value = 0;
  currentTimeLabel.textContent = "0:00";
  durationLabel.textContent = "0:00";

  updateActiveTrackButton();
  loadLyrics(track);

  if (shouldAutoplay) {
    playCurrentTrack();
  } else {
    updatePlayerState(false);
  }
}

function playNextTrack(shouldAutoplay = true) {
  const isLastTrack = currentTrackIndex === tracks.length - 1;

  if (isLastTrack && !LOOP_ALBUM) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    updatePlayerState(false);
    return;
  }

  loadTrack(currentTrackIndex + 1, shouldAutoplay);
}

function playPreviousTrack() {
  loadTrack(currentTrackIndex - 1, !audioPlayer.paused);
}

playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    playCurrentTrack();
  } else {
    audioPlayer.pause();
  }
});

prevBtn.addEventListener("click", playPreviousTrack);
nextBtn.addEventListener("click", () => playNextTrack(!audioPlayer.paused));

trackList.addEventListener("click", (event) => {
  const button = event.target.closest(".track-button");

  if (!button) {
    return;
  }

  loadTrack(Number(button.dataset.index), true);
});

audioPlayer.addEventListener("play", () => updatePlayerState(true));
audioPlayer.addEventListener("pause", () => updatePlayerState(false));
audioPlayer.addEventListener("ended", () => playNextTrack(true));

audioPlayer.addEventListener("loadedmetadata", () => {
  durationLabel.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener("timeupdate", () => {
  if (isSeeking || !Number.isFinite(audioPlayer.duration)) {
    return;
  }

  progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
  currentTimeLabel.textContent = formatTime(audioPlayer.currentTime);
});

progressBar.addEventListener("input", () => {
  isSeeking = true;
});

progressBar.addEventListener("change", () => {
  if (Number.isFinite(audioPlayer.duration)) {
    audioPlayer.currentTime = (Number(progressBar.value) / 100) * audioPlayer.duration;
  }

  isSeeking = false;
});

function updateBookletControls() {
  if (!bookletCounter) {
    return;
  }

  const totalPages = bookletPages.length;
  const canUseBooklet = isBookletOpen && !isBookletAnimating;

  openBookletBtn.disabled = isBookletOpen;
  closeBookletBtn.disabled = !canUseBooklet;
  prevBookletBtn.disabled = !canUseBooklet || currentBookletPage === 0;
  nextBookletBtn.disabled = !canUseBooklet || currentBookletPage === totalPages - 1;
  bookletCounter.hidden = !canUseBooklet;
  bookletCounter.textContent = canUseBooklet ? `Página ${currentBookletPage + 1} de ${totalPages}` : "";
}

function showBookletPage(index, direction = "next") {
  const lastPageIndex = bookletPages.length - 1;
  const nextIndex = Math.min(Math.max(index, 0), lastPageIndex);

  if (nextIndex === currentBookletPage && bookletPageImage.src.includes(bookletPages[nextIndex])) {
    updateBookletControls();
    return;
  }

  currentBookletPage = nextIndex;
  bookletPageImage.src = bookletPages[currentBookletPage];
  bookletPageImage.alt = `Página ${currentBookletPage + 1} do livreto do álbum`;

  const turnClass = direction === "prev" ? "is-turning-prev" : "is-turning-next";
  bookletLeaf.classList.remove("is-turning-prev", "is-turning-next");
  void bookletLeaf.offsetWidth;
  bookletLeaf.classList.add(turnClass);
  window.setTimeout(() => bookletLeaf.classList.remove(turnClass), 480);

  updateBookletControls();
}

function openBooklet() {
  if (isBookletOpen) {
    return;
  }

  isBookletOpen = true;
  isBookletAnimating = true;
  currentBookletPage = 0;
  bookletViewer.classList.add("is-opening");
  updateBookletControls();

  window.setTimeout(() => {
    isBookletAnimating = false;
    bookletViewer.classList.remove("is-opening");
    bookletViewer.classList.add("is-open");
    showBookletPage(0);
  }, 720);
}

function closeBooklet() {
  if (isBookletAnimating) {
    return;
  }

  isBookletOpen = false;
  currentBookletPage = 0;
  bookletViewer.classList.remove("is-opening", "is-open");
  bookletPageImage.src = bookletPages[0];
  bookletPageImage.alt = "Página 1 do livreto do álbum";
  updateBookletControls();
}

function showNextBookletPage() {
  if (currentBookletPage < bookletPages.length - 1) {
    showBookletPage(currentBookletPage + 1, "next");
  }
}

function showPreviousBookletPage() {
  if (currentBookletPage > 0) {
    showBookletPage(currentBookletPage - 1, "prev");
  }
}

function initBooklet() {
  if (!bookletViewer) {
    return;
  }

  bookletCoverImage.src = bookletCover;
  bookletDiscImage.src = bookletDisc;
  bookletPageImage.src = bookletPages[0];

  openBookletBtn.addEventListener("click", openBooklet);
  closeBookletBtn.addEventListener("click", closeBooklet);
  nextBookletBtn.addEventListener("click", showNextBookletPage);
  prevBookletBtn.addEventListener("click", showPreviousBookletPage);

  bookletViewer.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  bookletViewer.addEventListener("touchend", (event) => {
    if (!isBookletOpen || isBookletAnimating) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
      return;
    }

    if (deltaX < 0) {
      showNextBookletPage();
    } else {
      showPreviousBookletPage();
    }
  }, { passive: true });

  updateBookletControls();
}

renderTrackList();
loadTrack(0);
initBooklet();
