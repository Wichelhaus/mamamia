(() => {
  const STORAGE_KEY = 'mamamia.brasilien.v1';
  const DAY_MS = 864e5;
  const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const MONTHS = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const parseDate = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  };
  const shortDate = (d) => `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.`;
  const placeById = Object.fromEntries(PLACES.map((p) => [p.id, p]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const state = loadState();

  function loadState() {
    const fallback = { packed: {}, custom: [], visited: {}, hidePacked: false };
    try {
      return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
    } catch {
      return fallback;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }

  function distanceKm([lat1, lon1], [lat2, lon2]) {
    const rad = (x) => (x * Math.PI) / 180;
    const a = Math.sin(rad(lat2 - lat1) / 2) ** 2
      + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  const routeDays = {};
  ITINERARY.forEach((day) => day.places.forEach((id) => (routeDays[id] ||= []).push(shortDate(parseDate(day.date)))));

  const mapsUrl = (p) => `https://www.google.com/maps/search/?api=1&query=${p.coords[0]},${p.coords[1]}`;

  function renderCountdown() {
    const start = parseDate(TRIP.start);
    const end = parseDate(TRIP.end);
    const total = Math.round((end - start) / DAY_MS) + 1;
    let text;
    if (today < start) {
      const n = Math.round((start - today) / DAY_MS);
      text = n === 1 ? 'Morgen geht’s los! ✈️' : `Noch ${n} Tage bis Rio ✈️`;
    } else if (today <= end) {
      text = `Tag ${Math.round((today - start) / DAY_MS) + 1} von ${total} – Boa viagem! 🌴`;
    } else {
      text = 'Obrigado, Brasil! 💛';
    }
    $('#countdown').textContent = text;
  }

  const TABS = ['route', 'karte', 'packliste'];
  const tabLinks = document.querySelectorAll('[data-tab]');
  const tabBar = $('.tabs');

  function showTab(name) {
    if (!TABS.includes(name)) name = 'route';
    tabLinks.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === name)));
    TABS.forEach((t) => {
      $(`#panel-${t}`).hidden = t !== name;
    });
    const barTop = tabBar.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > barTop) window.scrollTo({ top: barTop });
    if (name === 'karte') initMap();
  }

  window.addEventListener('hashchange', () => showTab(location.hash.slice(1)));

  function renderRoute() {
    const phaseDays = PHASES.map((ph) => ({ ...ph, days: ITINERARY.filter((d) => d.phase === ph.id) }));

    $('#phase-bar').innerHTML = `
      <div class="phase-bar__track">
        ${phaseDays.map((ph) => `<span style="flex:${ph.days.length};background:${REGIONS[ph.region].color}"></span>`).join('')}
      </div>
      <ul class="phase-bar__legend">
        ${phaseDays.map((ph) => `<li><i style="background:${REGIONS[ph.region].color}"></i>${esc(ph.title)} · ${ph.days.length} ${ph.days.length === 1 ? 'Tag' : 'Tage'}</li>`).join('')}
      </ul>`;

    $('#timeline').innerHTML = phaseDays.map((ph) => {
      const first = parseDate(ph.days[0].date);
      const last = parseDate(ph.days[ph.days.length - 1].date);
      const range = ph.days.length > 1 ? `${shortDate(first)} – ${shortDate(last)}` : shortDate(first);
      return `
        <section class="phase" style="--region:${REGIONS[ph.region].color}">
          <div class="phase__head">
            <h3 class="phase__title">${esc(ph.title)}</h3>
            <span class="phase__dates">${range}</span>
          </div>
          <ol class="days">${ph.days.map(renderDay).join('')}</ol>
        </section>`;
    }).join('');

    $('#tips').innerHTML = TIPS.map((t) => `
      <article class="tip">
        <span class="tip__icon" aria-hidden="true">${t.icon}</span>
        <h3 class="tip__title">${esc(t.title)}</h3>
        <p class="tip__text">${esc(t.text)}</p>
      </article>`).join('');
  }

  function renderDay(day) {
    const d = parseDate(day.date);
    const isToday = d.getTime() === today.getTime();
    const main = placeById[day.places[0]];
    return `
      <li class="day${isToday ? ' is-today' : ''}">
        <div class="day__date">
          <span class="day__wd">${WEEKDAYS[d.getDay()]}</span>
          <span class="day__num">${d.getDate()}</span>
          <span class="day__month">${MONTHS[d.getMonth()]}</span>
        </div>
        <div class="day__body">
          <h4 class="day__title">${esc(day.title)}${isToday ? ' <span class="badge">Heute</span>' : ''}</h4>
          <ul class="day__items">${day.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
          <div class="day__meta">
            ${day.travel ? `<span class="meta-chip">🚗 ${esc(day.travel)}</span>` : ''}
            ${day.stay ? `<span class="meta-chip">🛏️ ${esc(day.stay)}</span>` : ''}
            <button class="mini-btn" type="button" data-show="${main.id}">📍 Auf der Karte</button>
          </div>
        </div>
      </li>`;
  }

  $('#timeline').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-show]');
    if (!btn) return;
    history.pushState(null, '', '#karte');
    showTab('karte');
    focusPlace(btn.dataset.show);
  });

  const filter = { region: 'alle', routeOnly: false };
  const isVisible = (p) => (filter.region === 'alle' || p.region === filter.region) && (!filter.routeOnly || routeDays[p.id]);
  let map = null;
  const markers = {};

  function renderFilters() {
    const chips = [['alle', 'Alle', '#0d4c92'], ...Object.entries(REGIONS).map(([id, r]) => [id, r.label, r.color])];
    $('#filters').innerHTML = `
      ${chips.map(([id, label, color]) => `
        <button class="chip" type="button" data-region="${id}" style="--region:${color}" aria-pressed="${filter.region === id}">
          ${id === 'alle' ? '' : '<i aria-hidden="true"></i>'}${esc(label)}
        </button>`).join('')}
      <label class="switch">
        <input type="checkbox" id="route-only" ${filter.routeOnly ? 'checked' : ''}>
        <span>Nur Orte der Route</span>
      </label>`;
  }

  $('#filters').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-region]');
    if (!chip) return;
    filter.region = chip.dataset.region;
    applyFilter(true);
  });

  $('#filters').addEventListener('change', (e) => {
    if (e.target.id !== 'route-only') return;
    filter.routeOnly = e.target.checked;
    applyFilter(true);
  });

  function applyFilter(fit) {
    document.querySelectorAll('[data-region]').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.region === filter.region)));
    $('#route-only').checked = filter.routeOnly;
    renderPlaceList();
    if (!map) return;
    PLACES.forEach((p) => {
      const m = markers[p.id];
      if (isVisible(p)) m.addTo(map);
      else m.remove();
    });
    if (fit) fitVisible();
  }

  function fitVisible() {
    const visible = PLACES.filter(isVisible);
    if (visible.length) map.fitBounds(L.latLngBounds(visible.map((p) => p.coords)), { padding: [40, 40], maxZoom: 12 });
  }

  function placeMeta(p) {
    return `≈ ${Math.round(distanceKm(TRIP.center, p.coords))} km Luftlinie · ${esc(p.time)}`;
  }

  function renderPlaceList() {
    const order = Object.keys(REGIONS);
    const groups = order
      .filter((r) => filter.region === 'alle' || filter.region === r)
      .map((r) => ({
        region: r,
        places: PLACES.filter((p) => p.region === r && isVisible(p))
          .sort((a, b) => distanceKm(TRIP.center, a.coords) - distanceKm(TRIP.center, b.coords)),
      }))
      .filter((g) => g.places.length);

    $('#place-list').innerHTML = groups.map((g) => {
      const r = REGIONS[g.region];
      return `
        <section class="place-group" style="--region:${r.color}">
          <h3 class="place-group__title"><i aria-hidden="true"></i>${esc(r.label)} <small>${esc(r.sub)} · ${g.places.length}</small></h3>
          ${g.places.map(renderPlace).join('')}
        </section>`;
    }).join('') || '<p class="empty">Keine Orte für diesen Filter.</p>';
  }

  function renderPlace(p) {
    const visited = !!state.visited[p.id];
    const days = routeDays[p.id];
    return `
      <article class="place" id="place-${p.id}" data-id="${p.id}">
        <div class="place__head">
          <h4 class="place__name">${esc(p.name)}</h4>
          <button class="mini-btn visited" type="button" data-visited="${p.id}" aria-pressed="${visited}">${visited ? '✓ Besucht' : 'Besucht?'}</button>
        </div>
        <p class="place__meta">${placeMeta(p)}</p>
        <div class="tags">
          ${days ? `<span class="tag tag--route">Route: ${days.join(', ')}</span>` : ''}
          ${p.cats.map((c) => `<span class="tag">${CATEGORIES[c]}</span>`).join('')}
        </div>
        <p class="place__text">${esc(p.text)}</p>
        <p class="place__tip">💡 ${esc(p.tip)}</p>
        <div class="place__actions">
          <button class="mini-btn" type="button" data-show="${p.id}">📍 Auf der Karte</button>
          <a class="mini-btn" href="${mapsUrl(p)}" target="_blank" rel="noopener">Google Maps ↗</a>
        </div>
      </article>`;
  }

  $('#place-list').addEventListener('click', (e) => {
    const show = e.target.closest('[data-show]');
    if (show) {
      focusPlace(show.dataset.show);
      return;
    }
    const visitedBtn = e.target.closest('[data-visited]');
    if (visitedBtn) {
      const id = visitedBtn.dataset.visited;
      state.visited[id] = !state.visited[id];
      if (!state.visited[id]) delete state.visited[id];
      saveState();
      visitedBtn.setAttribute('aria-pressed', String(!!state.visited[id]));
      visitedBtn.textContent = state.visited[id] ? '✓ Besucht' : 'Besucht?';
    }
  });

  function popupHtml(p) {
    const days = routeDays[p.id];
    return `
      <div class="popup">
        <strong class="popup__name">${esc(p.name)}</strong>
        <span class="popup__meta">${placeMeta(p)}</span>
        ${days ? `<span class="tag tag--route">Route: ${days.join(', ')}</span>` : ''}
        <p>${esc(p.text)}</p>
        <a href="${mapsUrl(p)}" target="_blank" rel="noopener">In Google Maps öffnen ↗</a>
      </div>`;
  }

  function initMap() {
    if (map) {
      map.invalidateSize();
      return;
    }
    if (!window.L) {
      $('#map').innerHTML = '<p class="map-fallback">Die Karte konnte nicht geladen werden – bitte Internetverbindung prüfen und neu laden.</p>';
      return;
    }

    map = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende',
    }).addTo(map);

    L.circle(TRIP.center, {
      radius: TRIP.radiusKm * 1000,
      color: '#0d4c92',
      weight: 2,
      dashArray: '6 8',
      fillColor: '#1aa6c4',
      fillOpacity: 0.05,
      interactive: false,
    }).addTo(map);

    ROUTE_LINES.forEach((line) => {
      const coords = line.stops.map((id) => placeById[id].coords);
      L.polyline(coords, { color: '#fff', weight: 7, opacity: 0.9, interactive: false }).addTo(map);
      L.polyline(coords, { color: REGIONS[line.region].color, weight: 4, interactive: false }).addTo(map);
    });

    PLACES.forEach((p) => {
      const color = REGIONS[p.region].color;
      const inRoute = !!routeDays[p.id];
      markers[p.id] = L.circleMarker(p.coords, {
        radius: inRoute ? 10 : 8,
        weight: 3,
        color: inRoute ? '#fff' : color,
        fillColor: inRoute ? color : '#fff',
        fillOpacity: 1,
      })
        .bindTooltip(p.name, { direction: 'top', offset: [0, -10] })
        .bindPopup(popupHtml(p), { maxWidth: 280 })
        .on('click', () => highlightPlace(p.id));
    });

    applyFilter(false);
    fitVisible();
  }

  function highlightPlace(id) {
    document.querySelectorAll('.place.is-active').forEach((el) => el.classList.remove('is-active'));
    const card = document.getElementById(`place-${id}`);
    if (card) card.classList.add('is-active');
  }

  function focusPlace(id) {
    const p = placeById[id];
    if (!isVisible(p)) {
      filter.region = 'alle';
      filter.routeOnly = false;
      applyFilter(false);
    }
    highlightPlace(id);
    const mapEl = $('#map');
    const rect = mapEl.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (!map) return;
    map.once('moveend', () => markers[id].openPopup());
    map.flyTo(p.coords, p.region === 'rio' ? 13 : 11, { duration: 0.8 });
  }

  const allItems = () => PACKLIST.flatMap((cat) => [
    ...cat.items.map((text) => ({ id: `${cat.id}:${text}`, cat: cat.id, text })),
    ...state.custom.filter((c) => c.cat === cat.id).map((c) => ({ ...c, custom: true })),
  ]);

  function renderPacklist() {
    const items = allItems();
    $('#pack-grid').classList.toggle('hide-packed', state.hidePacked);
    $('#pack-grid').innerHTML = PACKLIST.map((cat) => {
      const catItems = items.filter((i) => i.cat === cat.id);
      return `
        <section class="pack-cat" data-cat="${cat.id}">
          <div class="pack-cat__head">
            <span class="pack-cat__icon" aria-hidden="true">${cat.icon}</span>
            <h3 class="pack-cat__title">${esc(cat.title)}</h3>
            <span class="pack-cat__count"></span>
          </div>
          <ul class="pack-items">
            ${catItems.map((i) => `
              <li class="pack-item${state.packed[i.id] ? ' is-packed' : ''}">
                <label>
                  <input type="checkbox" data-item="${esc(i.id)}" ${state.packed[i.id] ? 'checked' : ''}>
                  <span>${esc(i.text)}</span>
                </label>
                ${i.custom ? `<button class="pack-item__del" type="button" data-del="${esc(i.id)}" aria-label="${esc(i.text)} löschen">×</button>` : ''}
              </li>`).join('')}
          </ul>
          <form class="pack-add" data-add="${cat.id}">
            <input type="text" name="text" placeholder="Eigener Eintrag …" aria-label="Eigener Eintrag für ${esc(cat.title)}" maxlength="80">
            <button type="submit" aria-label="Hinzufügen">+</button>
          </form>
        </section>`;
    }).join('');
    $('#hide-packed').checked = state.hidePacked;
    updatePackProgress();
  }

  function updatePackProgress() {
    const items = allItems();
    const done = items.filter((i) => state.packed[i.id]).length;
    const pct = items.length ? Math.round((done / items.length) * 100) : 0;
    $('#pack-progress').style.setProperty('--p', `${pct}%`);
    $('#pack-progress').setAttribute('aria-valuenow', String(pct));
    $('#pack-status').textContent = pct === 100 ? 'Alles gepackt – boa viagem! 🎉' : `${done} von ${items.length} erledigt (${pct} %)`;
    PACKLIST.forEach((cat) => {
      const catItems = items.filter((i) => i.cat === cat.id);
      const catDone = catItems.filter((i) => state.packed[i.id]).length;
      const el = document.querySelector(`[data-cat="${cat.id}"] .pack-cat__count`);
      if (el) el.textContent = `${catDone}/${catItems.length}`;
    });
  }

  $('#pack-grid').addEventListener('change', (e) => {
    const id = e.target.dataset.item;
    if (!id) return;
    if (e.target.checked) state.packed[id] = true;
    else delete state.packed[id];
    saveState();
    e.target.closest('.pack-item').classList.toggle('is-packed', e.target.checked);
    updatePackProgress();
  });

  $('#pack-grid').addEventListener('click', (e) => {
    const del = e.target.closest('[data-del]');
    if (!del) return;
    const id = del.dataset.del;
    state.custom = state.custom.filter((c) => c.id !== id);
    delete state.packed[id];
    saveState();
    renderPacklist();
  });

  $('#pack-grid').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const text = form.elements.text.value.trim();
    if (!text) return;
    const cat = form.dataset.add;
    state.custom.push({ id: `custom:${Date.now()}`, cat, text });
    saveState();
    renderPacklist();
    document.querySelector(`[data-add="${cat}"] input`).focus();
  });

  $('#hide-packed').addEventListener('change', (e) => {
    state.hidePacked = e.target.checked;
    saveState();
    $('#pack-grid').classList.toggle('hide-packed', state.hidePacked);
  });

  $('#pack-reset').addEventListener('click', () => {
    if (!confirm('Alle Häkchen entfernen? Eigene Einträge bleiben erhalten.')) return;
    state.packed = {};
    saveState();
    renderPacklist();
  });

  renderCountdown();
  renderRoute();
  renderFilters();
  renderPlaceList();
  renderPacklist();
  showTab(location.hash.slice(1));

  const todayCard = document.querySelector('.day.is-today');
  if (todayCard && !$('#panel-route').hidden) todayCard.scrollIntoView({ block: 'center' });
})();
