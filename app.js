const EMAIL = "callista.hendarto@gmail.com";

const devicon = name => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;
const simpleIcon = name => `https://cdn.simpleicons.org/${name}`;

const SKILLS = {
    "Coding": [
        ["Python", devicon("python")],
        ["HTML", devicon("html5")],
        ["CSS", devicon("css3")],
        ["JavaScript", devicon("javascript")],
        ["C++", devicon("cplusplus")],
        ["MIT App Inventor", ""],
    ],
    "Design & Office": [
        ["Canva", simpleIcon("canva")],
        ["Word", simpleIcon("googledocs")],
        ["Excel", simpleIcon("googlesheets")],
        ["PowerPoint", simpleIcon("googleslides")],
    ],
};

const LANGUAGES = [
    ["English", "IELTS", "Overall Band 8", "", ""],
    ["Mandarin", "TOCFL", "A2", "", ""],
    ["Bahasa Indonesia", "Mother tongue", "", ""],
];

const PROJECTS = [
    {
        title: "Study Dots",
        label: "app, 2026",
        text: "A study helper app made with MIT App Inventor.",
        link: "https://drive.google.com/drive/folders/1GfHBotMAayaTxGJ0V3baL9f9UzRL-xc9?usp=sharing",
    },
    {
        title: "Hospital Website",
        label: "web project",
        text: "A hospital website built with HTML and CSS.",
        link: "https://drive.google.com/YOUR_HOSPITAL_LINK",
    },
];

const ORGANISATIONS = [
    ["Second Class Ranger Scout", "assets/Bantara.jpg"],
    ["Chairman of INFLAMÄ", "assets/INFLAMA.jpg"],
    ["Student Council President", "assets/osis.jpg"],
    ["REGROVVE Design Division", "assets/REGROVVE.jpeg"],
    ["Canisius College Model United Nation 2025", "assets/CCMUN.jpg"],
    ["PSKG Model United Nation 2025", "assets/PSKG.jpg"],
    ["2026 Language Study Program for Compatriot Youth", "assets/Summercamp.jpg"],
    ["LIDAR Workshop (Light Detection and Ranging)", "assets/Lidar.jpg"],
];


const CERTIFICATES = [
    ["Kumon Math Completer, 2019", "assets/kumonm.jpeg"],
    ["Kumon English Completer, 2019", "assets/kumone.jpeg"],
    ["ABRSM Grade 4 Theory, Distiction", "assets/ABRSM.jpg"],
    ["1st Rank Student, 2th Grade", "assets/kls2.jpeg"],
    ["1st Rank Student, 4th Grade", "assets/kls4.jpeg"],
    ["Mitra Keluarga Drawing Competition 2017, 5th runner-up", "assets/mitra.jpeg"],
    ["Science Poster Competition 2017", "assets/sains.jpeg"],
    ["Indonesian Children's Painting Competition in JaBoDeTaBek for 19th Indonesian-Japanese Children's Painting Exhibition, 2nd place", "assets/japangf.jpeg"],
];

const $ = selector => document.querySelector(selector);

function pictureOrText(src, fallbackText) {
    if (!src) return fallbackText;
    return `<img src="${src}" alt="" onerror="this.replaceWith(document.createTextNode('${fallbackText}'))">`;
}

const preview = $("#lb");

function showPreview(src, caption, canDownload) {
    $("#lbImg").src = src;
    $("#lbCap").textContent = caption;

    const downloadButton = $("#lbDl");
    if (downloadButton) {
        downloadButton.style.display = canDownload ? "inline-block" : "none";
        downloadButton.href = src;
        downloadButton.download = decodeURIComponent(src.split("/").pop());
    }

    preview.showModal();
}


function buildSkills() {
    const wrap = $("#skillWrap");
    if (!wrap) return;

    for (const group in SKILLS) {
        const card = document.createElement("div");
        card.className = "sg";
        card.innerHTML = `<h3 class="hand">${group}</h3><div class="chips"></div>`;

        const chips = card.querySelector(".chips");
        for (const [name, logo] of SKILLS[group]) {
            const chip = document.createElement("span");
            chip.className = "chip";
            const image = logo ? `<img class="ic" src="${logo}" alt="" onerror="this.remove()">` : "";
            chip.innerHTML = image + name;
            chips.append(chip);
        }

        wrap.append(card);
    }
}

function buildLanguages() {
    const grid = $("#langGrid");
    if (!grid) return;

    for (const [name, level, picture, caption] of LANGUAGES) {
        const card = document.createElement(picture ? "button" : "div");
        card.className = "lang";
        card.innerHTML = `<b>${name}</b><small>${level}</small>`;

        if (picture) {
            card.innerHTML += `<span class="hand">view certificate</span>`;
            card.onclick = () => {
                // only open once the picture really exists
                const test = new Image();
                test.onload = () => showPreview(picture, caption, true);
                test.src = picture;
            };
        }

        grid.append(card);
    }
}

function buildContact() {
    const emailButton = $("#mailBtn");
    if (!emailButton) return;

    emailButton.href = "mailto:" + EMAIL + "?subject=Hello%20Callista";
}


function buildIdCard() {
    const stage = $("#stage");
    if (!stage) return;

    const card = $("#card");
    const rope = $("#ropePath");

    const ROPE_LENGTH = 300;
    const SPRING = 0.012;
    const GRAVITY = 0.35;
    const DAMPING = 0.97;

    let pivotX = 0;
    let pivotY = 0;
    let x = 0;
    let y = 0;
    let speedX = 0;
    let speedY = 0;
    let dragging = false;
    let grabX = 0;
    let grabY = 0;

    function placePivot() {
        pivotX = stage.clientWidth / 2;
        if (!dragging) {
            x = pivotX;
            y = ROPE_LENGTH;
        }
    }

    placePivot();
    window.addEventListener("resize", placePivot);

    x = pivotX + 120;
    y = 250;

    card.addEventListener("pointerdown", event => {
        dragging = true;
        card.setPointerCapture(event.pointerId);
        const box = stage.getBoundingClientRect();
        grabX = event.clientX - box.left - x;
        grabY = event.clientY - box.top - y;
    });

    card.addEventListener("pointermove", event => {
        if (!dragging) return;
        const box = stage.getBoundingClientRect();
        x = event.clientX - box.left - grabX;
        y = event.clientY - box.top - grabY;
        speedX = 0;
        speedY = 0;
    });

    card.addEventListener("pointerup", () => {
        dragging = false;
    });

    function animate() {
        if (!dragging) {
            speedX += (pivotX - x) * SPRING;
            speedY += (pivotY + ROPE_LENGTH - y) * SPRING + GRAVITY;
            speedX *= DAMPING;
            speedY *= DAMPING;
            x += speedX;
            y += speedY;

            const distance = Math.hypot(x - pivotX, y - pivotY);
            if (distance > ROPE_LENGTH) {
                x = pivotX + (x - pivotX) * ROPE_LENGTH / distance;
                y = pivotY + (y - pivotY) * ROPE_LENGTH / distance;
            }
        }

        const angle = Math.atan2(x - pivotX, y - pivotY);
        card.style.transform = `translate(${x - card.offsetWidth / 2}px, ${y}px) rotate(${-angle}rad)`;

        const bend = (pivotX + x) / 2 + (x - pivotX) * 0.1;
        rope.setAttribute("d", `M${pivotX} ${pivotY} Q ${bend} ${(pivotY + y) / 2 + 14} ${x} ${y + 4}`);

        requestAnimationFrame(animate);
    }

    animate();
}



function buildProjects() {
    const grid = $("#projGrid");
    if (!grid) return;

    const popup = $("#dlg");

    for (const project of PROJECTS) {
        const card = document.createElement("button");
        card.className = "proj";
        card.innerHTML = `<h3>${project.title}</h3><small>${project.label}</small><p>${project.text}</p>`;

        card.onclick = () => {
            $("#dT").textContent = project.title;
            $("#dP").textContent = project.text;
            $("#dL").href = project.link;
            popup.showModal();
        };

        grid.append(card);
    }
}

function buildCourseCertificates() {
    for (const figure of document.querySelectorAll(".zoomable")) {
        figure.onclick = () => {
            const image = figure.querySelector("img");
            if (image) showPreview(image.src, figure.dataset.cap, true);
        };
    }
}

function buildPolaroids() {
    const board = $("#board");
    if (!board) return;

    let topLayer = 10;

    ORGANISATIONS.forEach(([name, picture], index) => {
        const polaroid = document.createElement("div");
        polaroid.className = "pol";
        polaroid.innerHTML = `<div class="pic">${pictureOrText(picture, "")}</div><p>${name}</p>`;

        const column = index % 4;
        const row = Math.floor(index / 4);
        polaroid.style.left = (8 + column * 21.34) + "%";
        polaroid.style.top = (6 + row * 44) + "%";
        polaroid.style.transform = `rotate(${(Math.random() * 6 - 3).toFixed(1)}deg)`;
        board.append(polaroid);

        let dragging = false;
        let offsetX = 0;
        let offsetY = 0;
        let startX = 0;
        let startY = 0;

        polaroid.addEventListener("pointerdown", event => {
            dragging = true;
            polaroid.setPointerCapture(event.pointerId);
            polaroid.style.zIndex = ++topLayer;
            polaroid.style.cursor = "grabbing";
            offsetX = event.clientX - polaroid.offsetLeft;
            offsetY = event.clientY - polaroid.offsetTop;
            startX = event.clientX;
            startY = event.clientY;
        });

        polaroid.addEventListener("pointermove", event => {
            if (!dragging) return;

            const maxLeft = board.clientWidth - polaroid.offsetWidth;
            const maxTop = board.clientHeight - polaroid.offsetHeight;
            polaroid.style.left = Math.max(0, Math.min(maxLeft, event.clientX - offsetX)) + "px";
            polaroid.style.top = Math.max(0, Math.min(maxTop, event.clientY - offsetY)) + "px";
        });

        polaroid.addEventListener("pointerup", event => {
            const moved = Math.hypot(event.clientX - startX, event.clientY - startY);
            const wasClick = dragging && moved < 5;

            dragging = false;
            polaroid.style.cursor = "grab";

            const image = polaroid.querySelector("img");
            if (wasClick && image) showPreview(image.src, name, false);
        });
    });
}


function buildCertificates() {
    const grid = $("#certGrid");
    if (!grid) return;

    for (const [name, picture] of CERTIFICATES) {
        const placeholder = picture ? "add " + picture : "your picture here";

        const card = document.createElement("div");
        card.className = "cert";
        card.innerHTML = `<div class="sq">${pictureOrText(picture, placeholder)}</div><p>${name}</p>`;

        card.onclick = () => {
            const image = card.querySelector("img");
            if (image) showPreview(image.src, name, true);
        };

        grid.append(card);
    }
}


buildSkills();
buildLanguages();
buildContact();
buildIdCard();
buildProjects();
buildCourseCertificates();
buildPolaroids();
buildCertificates();
