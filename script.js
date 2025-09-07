const songs = [
      { title: "New Rules", album: "Dua Lipa", year: 2017, duration: "3:29" },
      { title: "Don't Start Now", album: "Future Nostalgia", year: 2019, duration: "3:03" },
      { title: "Levitating", album: "Future Nostalgia", year: 2020, duration: "3:23" },
      { title: "Physical", album: "Future Nostalgia", year: 2020, duration: "3:13" },
      { title: "Break My Heart", album: "Future Nostalgia", year: 2020, duration: "3:41" },
      { title: "Love Again", album: "Future Nostalgia", year: 2020, duration: "4:18" },
      { title: "Hallucinate", album: "Future Nostalgia", year: 2020, duration: "3:28" },
      { title: "Cool", album: "Future Nostalgia", year: 2020, duration: "3:29" },
      { title: "Future Nostalgia", album: "Future Nostalgia", year: 2020, duration: "3:04" },
      { title: "Be the One", album: "Dua Lipa", year: 2015, duration: "3:23" },
      { title: "Hotter Than Hell", album: "Dua Lipa", year: 2016, duration: "3:07" },
      { title: "Blow Your Mind (Mwah)", album: "Dua Lipa", year: 2016, duration: "2:59" },
      { title: "IDGAF", album: "Dua Lipa", year: 2017, duration: "3:38" },
      { title: "Genesis", album: "Dua Lipa", year: 2017, duration: "3:25" },
      { title: "Lost in Your Light (feat. Miguel)", album: "Dua Lipa", year: 2017, duration: "3:23" },
      { title: "Garden", album: "Dua Lipa", year: 2017, duration: "3:48" },
      { title: "Homesick", album: "Dua Lipa", year: 2017, duration: "3:50" },
      { title: "Scared to Be Lonely (with Martin Garrix)", album: "Single / Colab", year: 2017, duration: "3:41" },
      { title: "One Kiss (with Calvin Harris)", album: "Single / Colab", year: 2018, duration: "3:35" },
      { title: "We're Good", album: "Future Nostalgia (Moonlight Edition)", year: 2021, duration: "2:45" }
    ];

    const musicGrid = document.getElementById('musicGrid');
    const searchInput = document.getElementById('search');
    const albumFilter = document.getElementById('albumFilter');
    const sortSelect = document.getElementById('sort');
    const trackCount = document.getElementById('trackCount');

   
    const albums = [...new Set(songs.map(s => s.album))];
    albums.forEach(album => {
      const option = document.createElement('option');
      option.value = album;
      option.textContent = album;
      albumFilter.appendChild(option);
    });

    function createSpotifyUrl(title) {
      const query = title.replace(/[()]/g, '');
      return `https://open.spotify.com/search/${encodeURIComponent(query + ' Dua Lipa')}`;
    }

    function renderTracks() {
      musicGrid.innerHTML = '<div class="loading-state">Carregando faixas<span class="loading-dots"></span></div>';
      
      setTimeout(() => {
        const query = searchInput.value.toLowerCase().trim();
        const selectedAlbum = albumFilter.value;
        
        let filteredSongs = songs.filter(song => {
          const matchesSearch = song.title.toLowerCase().includes(query);
          const matchesAlbum = !selectedAlbum || song.album === selectedAlbum;
          return matchesSearch && matchesAlbum;
        });

        if (sortSelect.value === 'title') {
          filteredSongs.sort((a, b) => a.title.localeCompare(b.title));
        } else {
          filteredSongs.sort((a, b) => a.year - b.year);
        }

        trackCount.textContent = `${filteredSongs.length} ${filteredSongs.length === 1 ? 'faixa' : 'faixas'}`;
        musicGrid.innerHTML = '';

        if (filteredSongs.length === 0) {
          musicGrid.innerHTML = `
            <div class="empty-state">
              <h3>Nenhuma faixa encontrada</h3>
              <p>Tente ajustar os filtros de busca</p>
            </div>
          `;
          return;
        }

        filteredSongs.forEach((song, index) => {
          const card = document.createElement('div');
          card.className = 'track-card';
          card.style.animationDelay = `${index * 0.1}s`;
          
          card.innerHTML = `
            <div class="track-number">${index + 1}</div>
            <h3 class="track-title">${song.title}</h3>
            <div class="track-meta">
              <span class="album-badge">${song.album}</span>
              <span>${song.year}</span>
            </div>
            <div class="track-actions">
              <a href="${createSpotifyUrl(song.title)}" target="_blank" class="play-btn">
                <svg class="play-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polygon stroke-linejoin="round" points="5 3 19 12 5 21 5 3"/>
                </svg>
                Ouvir
              </a>
              <span class="duration">${song.duration}</span>
            </div>
          `;
          
          musicGrid.appendChild(card);
        });
      }, 800);
    }

   
    searchInput.addEventListener('input', renderTracks);
    albumFilter.addEventListener('change', renderTracks);
    sortSelect.addEventListener('change', renderTracks);

    
    renderTracks();

    
    function typeWriter(element, text, speed = 100) {
      let i = 0;
      element.textContent = '';
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
    }

    
    setTimeout(() => {
      const title = document.querySelector('header h1');
      const originalText = title.textContent;
      typeWriter(title, originalText, 80);
    }, 1000);

    
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const header = document.querySelector('header');

  
    header.addEventListener('click', () => {
      modal.style.display = 'block';
    });

    
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
