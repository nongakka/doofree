let groupsData = [];
let viewMode = "groups";
let currentSeries = null;

function initPlayer(data){
    const normalized = normalizePlaylist(data);
    if(normalized.groups){
        groupsData = normalized.groups;
        renderAnimeGrid();
    }
}

/* =========================
   Normalize JSON Series
========================= */
function normalizePlaylist(input){
    if (Array.isArray(input) && input[0]?.episodes) {

        const groups = input.map(series => {

            const stations = [];

            (series.episodes || []).forEach(ep => {
                if (ep.servers && ep.servers.length > 0) {
                    stations.push({
                        name: ep.name,
                        image: series.image || "",
                        servers: ep.servers
                    });
                }
            });

            return {
                name: series.title,
                image: series.image || "",
                stations: stations
            };
        });

        return { groups };
    }

    return {};
}

/* =========================
   Render Series Grid
========================= */
function renderAnimeGrid(){
    const grid = document.getElementById("animeGrid");
    grid.innerHTML = "";

    groupsData.forEach((group, index) => {
        const card = document.createElement("div");
        card.className = "anime-card";
        card.innerHTML = `
            <img src="${group.image}" />
            <div class="title">${group.name}</div>
        `;
        card.onclick = () => renderEpisodes(index);
        grid.appendChild(card);
    });
}

/* =========================
   Render Episodes
========================= */
function renderEpisodes(index){
    currentSeries = groupsData[index];
    const container = document.getElementById("episodeContainer");
    container.innerHTML = "";

    currentSeries.stations.forEach(ep => {

        const btn = document.createElement("button");
        btn.textContent = ep.name;
        btn.onclick = () => openServerPopup(ep);
        container.appendChild(btn);
    });
}

/* =========================
   Server Popup
========================= */
function openServerPopup(ep){
    const popup = document.getElementById("serverPopup");
    const list = document.getElementById("serverList");

    list.innerHTML = "";

    ep.servers.forEach(server => {
        const btn = document.createElement("button");
        btn.textContent = server.name;
        btn.onclick = () => {
            playStream(server.url);
            popup.style.display = "none";
        };
        list.appendChild(btn);
    });

    popup.style.display = "block";
}

/* =========================
   Player
========================= */
function playStream(url){
    const container = document.getElementById("playerContainer");
    container.innerHTML = "";

    if(url.includes("m3u8")){
        const video = document.createElement("video");
        video.controls = true;
        video.src = url;
        container.appendChild(video);
    }
    else{
        const iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.allowFullscreen = true;
        iframe.style.width = "100%";
        iframe.style.height = "500px";
        container.appendChild(iframe);
    }
}
