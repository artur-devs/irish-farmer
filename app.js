// Irish Garden Planner - Main Application

// State management
let state = {
    plantings: [],      // Current garden plantings
    harvests: [],       // Harvest log
    householdSize: 2    // Number of people in household
};

// LocalStorage keys
const STORAGE_KEYS = {
    plantings: 'irishGarden_plantings',
    harvests: 'irishGarden_harvests',
    household: 'irishGarden_household'
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initNavigation();
    initForms();
    renderAll();
});

// =====================
// STATE MANAGEMENT
// =====================

function loadState() {
    const savedPlantings = localStorage.getItem(STORAGE_KEYS.plantings);
    const savedHarvests = localStorage.getItem(STORAGE_KEYS.harvests);
    const savedHousehold = localStorage.getItem(STORAGE_KEYS.household);

    if (savedPlantings) state.plantings = JSON.parse(savedPlantings);
    if (savedHarvests) state.harvests = JSON.parse(savedHarvests);
    if (savedHousehold) state.householdSize = parseInt(savedHousehold);
}

function saveState() {
    localStorage.setItem(STORAGE_KEYS.plantings, JSON.stringify(state.plantings));
    localStorage.setItem(STORAGE_KEYS.harvests, JSON.stringify(state.harvests));
    localStorage.setItem(STORAGE_KEYS.household, state.householdSize.toString());
}

// =====================
// NAVIGATION
// =====================

function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Update content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.toggle('active', tab.id === tabId);
    });

    // Refresh content for the active tab
    switch (tabId) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'calendar':
            renderCalendar();
            break;
        case 'garden':
            renderGarden();
            break;
        case 'harvest':
            renderHarvestLog();
            break;
        case 'sufficiency':
            renderSufficiency();
            break;
    }
}

// =====================
// FORMS INITIALIZATION
// =====================

function initForms() {
    // Populate crop selects
    populateCropSelects();

    // Set default dates
    document.getElementById('plant-date').valueAsDate = new Date();
    document.getElementById('harvest-date').valueAsDate = new Date();

    // Household size
    document.getElementById('household-size').value = state.householdSize;

    // Form submissions
    document.getElementById('add-planting-form').addEventListener('submit', handleAddPlanting);
    document.getElementById('add-harvest-form').addEventListener('submit', handleAddHarvest);
    document.getElementById('household-form').addEventListener('submit', handleHouseholdUpdate);

    // Calendar filter
    document.getElementById('crop-filter').addEventListener('change', renderCalendar);

    // Populate year filter for harvests
    populateYearFilter();
    document.getElementById('harvest-year').addEventListener('change', renderHarvestLog);
}

function populateCropSelects() {
    const cropSelect = document.getElementById('crop-select');
    const harvestCropSelect = document.getElementById('harvest-crop');

    const sortedCrops = Object.entries(CROPS).sort((a, b) => a[1].name.localeCompare(b[1].name));

    sortedCrops.forEach(([id, crop]) => {
        const option1 = document.createElement('option');
        option1.value = id;
        option1.textContent = crop.name;
        cropSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = id;
        option2.textContent = crop.name;
        harvestCropSelect.appendChild(option2);
    });
}

function populateYearFilter() {
    const yearSelect = document.getElementById('harvest-year');
    const currentYear = new Date().getFullYear();

    // Get unique years from harvests
    const years = new Set(state.harvests.map(h => new Date(h.date).getFullYear()));
    years.add(currentYear);

    const sortedYears = [...years].sort((a, b) => b - a);

    yearSelect.innerHTML = '';
    sortedYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        if (year === currentYear) option.selected = true;
        yearSelect.appendChild(option);
    });
}

// =====================
// FORM HANDLERS
// =====================

function handleAddPlanting(e) {
    e.preventDefault();

    const cropId = document.getElementById('crop-select').value;
    const plantDate = document.getElementById('plant-date').value;
    const quantity = document.getElementById('quantity').value;
    const notes = document.getElementById('notes').value;

    const planting = {
        id: Date.now().toString(),
        cropId,
        plantDate,
        expectedHarvest: getExpectedHarvestDate(cropId, plantDate).toISOString().split('T')[0],
        quantity,
        notes,
        active: true
    };

    state.plantings.push(planting);
    saveState();

    // Reset form
    e.target.reset();
    document.getElementById('plant-date').valueAsDate = new Date();

    renderGarden();
    renderDashboard();

    alert(`${CROPS[cropId].name} added to your garden!`);
}

function handleAddHarvest(e) {
    e.preventDefault();

    const cropId = document.getElementById('harvest-crop').value;
    const date = document.getElementById('harvest-date').value;
    const weight = parseFloat(document.getElementById('harvest-weight').value);
    const notes = document.getElementById('harvest-notes').value;

    const harvest = {
        id: Date.now().toString(),
        cropId,
        date,
        weight,
        notes,
        calories: calculateCalories(cropId, weight),
        savings: calculateSavings(cropId, weight)
    };

    state.harvests.push(harvest);
    saveState();

    // Reset form
    e.target.reset();
    document.getElementById('harvest-date').valueAsDate = new Date();

    populateYearFilter();
    renderHarvestLog();
    renderDashboard();
    renderSufficiency();

    alert(`${weight}kg of ${CROPS[cropId].name} logged!`);
}

function handleHouseholdUpdate(e) {
    e.preventDefault();
    state.householdSize = parseInt(document.getElementById('household-size').value);
    saveState();
    renderSufficiency();
    renderDashboard();
}

// =====================
// DASHBOARD RENDERING
// =====================

function renderDashboard() {
    renderNotifications();
    renderQuickStats();
}

function renderNotifications() {
    const plantNowList = document.getElementById('plant-now-list');
    const harvestNowList = document.getElementById('harvest-now-list');

    const currentMonth = getCurrentMonth();

    // Crops to plant now
    const toPlant = getCropsToPlant(currentMonth);
    if (toPlant.length === 0) {
        plantNowList.innerHTML = '<p class="empty-message">No crops to plant this month</p>';
    } else {
        plantNowList.innerHTML = toPlant.map(crop => `
            <div class="task-item">
                <span class="crop-name">${crop.name}</span>
                <span class="task-action">${crop.notes.split('.')[0]}</span>
            </div>
        `).join('');
    }

    // Crops to harvest now
    const toHarvest = getCropsToHarvest(currentMonth);

    // Also check for plantings that should be ready
    const readyPlantings = state.plantings.filter(p => {
        if (!p.active) return false;
        const harvestDate = new Date(p.expectedHarvest);
        const now = new Date();
        return harvestDate <= now;
    });

    let harvestHtml = '';

    if (readyPlantings.length > 0) {
        harvestHtml += readyPlantings.map(p => `
            <div class="task-item harvest">
                <span class="crop-name">${CROPS[p.cropId].name}</span>
                <span class="task-action">Ready since ${formatDate(p.expectedHarvest)}</span>
            </div>
        `).join('');
    }

    if (toHarvest.length > 0) {
        harvestHtml += toHarvest.map(crop => `
            <div class="task-item harvest">
                <span class="crop-name">${crop.name}</span>
                <span class="task-action">In season now</span>
            </div>
        `).join('');
    }

    if (harvestHtml === '') {
        harvestNowList.innerHTML = '<p class="empty-message">No crops ready to harvest</p>';
    } else {
        harvestNowList.innerHTML = harvestHtml;
    }
}

function renderQuickStats() {
    const activeCrops = state.plantings.filter(p => p.active).length;
    const currentYear = new Date().getFullYear();
    const yearHarvests = state.harvests.filter(h => new Date(h.date).getFullYear() === currentYear);

    // Only food crops (vegetable + fruit) count toward self-sufficiency
    const foodHarvests = yearHarvests.filter(h => {
        const crop = CROPS[h.cropId];
        return crop && (crop.type === 'vegetable' || crop.type === 'fruit');
    });
    const totalHarvested = foodHarvests.reduce((sum, h) => sum + h.weight, 0);

    document.getElementById('active-crops').textContent = activeCrops;
    document.getElementById('total-harvested').textContent = `${totalHarvested.toFixed(1)} kg`;

    // Calculate overall sufficiency
    const targetWeight = YEARLY_PRODUCE_TARGET * state.householdSize;
    const sufficiency = targetWeight > 0 ? Math.min(100, Math.round((totalHarvested / targetWeight) * 100)) : 0;
    document.getElementById('sufficiency-percent').textContent = `${sufficiency}%`;
}

// =====================
// CALENDAR RENDERING
// =====================

function renderCalendar() {
    const container = document.getElementById('crop-calendar');
    const filter = document.getElementById('crop-filter').value;

    let crops = Object.entries(CROPS);
    if (filter !== 'all') {
        crops = crops.filter(([_, crop]) => crop.type === filter);
    }
    crops.sort((a, b) => a[1].name.localeCompare(b[1].name));

    // Header row
    let html = `
        <div class="calendar-row calendar-header">
            <div class="calendar-cell">Crop</div>
            ${MONTHS.map(m => `<div class="calendar-cell">${m}</div>`).join('')}
        </div>
    `;

    // Crop rows
    crops.forEach(([id, crop]) => {
        html += `<div class="calendar-row">`;
        html += `<div class="calendar-cell crop-name">${crop.name}</div>`;

        for (let month = 1; month <= 12; month++) {
            const canPlant = crop.plantMonths.includes(month);
            const canHarvest = crop.harvestMonths.includes(month);

            let cellClass = 'calendar-cell';
            if (canPlant && canHarvest) cellClass += ' both';
            else if (canPlant) cellClass += ' plant';
            else if (canHarvest) cellClass += ' harvest';

            html += `<div class="${cellClass}"></div>`;
        }

        html += `</div>`;
    });

    container.innerHTML = html;
}

// =====================
// GARDEN RENDERING
// =====================

function renderGarden() {
    const container = document.getElementById('plantings-list');

    const activePlantings = state.plantings.filter(p => p.active);

    if (activePlantings.length === 0) {
        container.innerHTML = '<p class="empty-message">No active plantings. Add some crops to get started!</p>';
        return;
    }

    container.innerHTML = activePlantings.map(p => {
        const crop = CROPS[p.cropId];
        const harvestDate = new Date(p.expectedHarvest);
        const now = new Date();
        const isReady = harvestDate <= now;

        return `
            <div class="planting-card">
                <h4>${crop.name}</h4>
                <p>Planted: ${formatDate(p.plantDate)}</p>
                <p class="harvest-date ${isReady ? 'ready' : ''}">
                    ${isReady ? 'Ready to harvest!' : `Expected harvest: ${formatDate(p.expectedHarvest)}`}
                </p>
                ${p.quantity ? `<p>Quantity: ${p.quantity}</p>` : ''}
                ${p.notes ? `<p>Notes: ${p.notes}</p>` : ''}
                <div class="actions">
                    <button class="btn-primary" onclick="harvestPlanting('${p.id}')">Log Harvest</button>
                    <button class="btn-danger" onclick="removePlanting('${p.id}')">Remove</button>
                </div>
            </div>
        `;
    }).join('');
}

function harvestPlanting(plantingId) {
    const planting = state.plantings.find(p => p.id === plantingId);
    if (!planting) return;

    // Switch to harvest tab and pre-fill the crop
    switchTab('harvest');
    document.getElementById('harvest-crop').value = planting.cropId;
    document.getElementById('harvest-date').valueAsDate = new Date();
    document.getElementById('harvest-weight').focus();
}

function removePlanting(plantingId) {
    if (!confirm('Remove this planting from your garden?')) return;

    state.plantings = state.plantings.filter(p => p.id !== plantingId);
    saveState();
    renderGarden();
    renderDashboard();
}

// =====================
// HARVEST LOG RENDERING
// =====================

function renderHarvestLog() {
    const tbody = document.getElementById('harvest-table-body');
    const selectedYear = parseInt(document.getElementById('harvest-year').value) || new Date().getFullYear();

    const yearHarvests = state.harvests
        .filter(h => new Date(h.date).getFullYear() === selectedYear)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (yearHarvests.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-message">No harvests recorded for this year</td></tr>';
        document.getElementById('year-total').textContent = '0 kg';
        return;
    }

    tbody.innerHTML = yearHarvests.map(h => `
        <tr>
            <td>${formatDate(h.date)}</td>
            <td>${CROPS[h.cropId]?.name || 'Unknown'}</td>
            <td>${h.weight} kg</td>
            <td>${h.notes || '-'}</td>
            <td><button class="btn-danger" onclick="deleteHarvest('${h.id}')">Delete</button></td>
        </tr>
    `).join('');

    const total = yearHarvests.reduce((sum, h) => sum + h.weight, 0);
    document.getElementById('year-total').textContent = `${total.toFixed(1)} kg`;
}

function deleteHarvest(harvestId) {
    if (!confirm('Delete this harvest record?')) return;

    state.harvests = state.harvests.filter(h => h.id !== harvestId);
    saveState();
    populateYearFilter();
    renderHarvestLog();
    renderDashboard();
    renderSufficiency();
}

// =====================
// SUFFICIENCY RENDERING
// =====================

function renderSufficiency() {
    const currentYear = new Date().getFullYear();
    const yearHarvests = state.harvests.filter(h => new Date(h.date).getFullYear() === currentYear);

    // Only food crops (vegetable + fruit) count toward self-sufficiency metrics
    const foodHarvests = yearHarvests.filter(h => {
        const crop = CROPS[h.cropId];
        return crop && (crop.type === 'vegetable' || crop.type === 'fruit');
    });

    // Calculate metrics
    const totalWeight = foodHarvests.reduce((sum, h) => sum + h.weight, 0);
    const totalCalories = foodHarvests.reduce((sum, h) => sum + h.calories, 0);
    const totalSavings = foodHarvests.reduce((sum, h) => sum + h.savings, 0);

    // Unique food crops harvested
    const uniqueCrops = new Set(foodHarvests.map(h => h.cropId));
    const varietyCount = uniqueCrops.size;

    // Targets
    const targetCalories = DAILY_CALORIES * 365 * state.householdSize;
    const targetWeight = YEARLY_PRODUCE_TARGET * state.householdSize;
    const targetVariety = FOOD_CROP_TYPES;

    // Percentages
    const caloriePercent = Math.min(100, Math.round((totalCalories / targetCalories) * 100));
    const weightPercent = Math.min(100, Math.round((totalWeight / targetWeight) * 100));
    const varietyPercent = Math.min(100, Math.round((varietyCount / targetVariety) * 100));

    // Update UI
    updateProgressRing('calorie-ring', caloriePercent);
    document.getElementById('calorie-detail').textContent =
        `${numberWithCommas(totalCalories)} / ${numberWithCommas(targetCalories)} kcal`;

    updateProgressRing('variety-ring', varietyPercent);
    document.getElementById('variety-detail').textContent =
        `${varietyCount} / ${targetVariety} crop types`;

    updateProgressRing('weight-ring', weightPercent);
    document.getElementById('weight-detail').textContent =
        `${totalWeight.toFixed(1)} / ${targetWeight} kg target`;

    // Savings doesn't have a percentage, just show the value
    const savingsRing = document.getElementById('savings-ring');
    savingsRing.querySelector('.progress-value').textContent = `€${totalSavings.toFixed(0)}`;
    document.getElementById('savings-detail').textContent = 'Estimated savings this year';

    // Crop breakdown (food crops only)
    renderCropBreakdown(foodHarvests);
}

function updateProgressRing(ringId, percent) {
    const ring = document.getElementById(ringId);
    ring.style.background = `conic-gradient(var(--irish-green) ${percent}%, var(--gray-light) ${percent}%)`;
    ring.querySelector('.progress-value').textContent = `${percent}%`;
}

function renderCropBreakdown(harvests) {
    const container = document.getElementById('crop-breakdown');

    // Group by crop
    const byCrop = {};
    harvests.forEach(h => {
        if (!byCrop[h.cropId]) {
            byCrop[h.cropId] = { weight: 0, calories: 0, savings: 0 };
        }
        byCrop[h.cropId].weight += h.weight;
        byCrop[h.cropId].calories += h.calories;
        byCrop[h.cropId].savings += h.savings;
    });

    if (Object.keys(byCrop).length === 0) {
        container.innerHTML = '<p class="empty-message">No harvests recorded yet</p>';
        return;
    }

    const sorted = Object.entries(byCrop).sort((a, b) => b[1].weight - a[1].weight);

    container.innerHTML = sorted.map(([cropId, data]) => `
        <div class="breakdown-item">
            <span class="crop">${CROPS[cropId]?.name || 'Unknown'}</span>
            <span class="amount">${data.weight.toFixed(1)} kg</span>
        </div>
    `).join('');
}

// =====================
// UTILITY FUNCTIONS
// =====================

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// =====================
// INITIAL RENDER
// =====================

function renderAll() {
    renderDashboard();
    renderCalendar();
    renderGarden();
    renderHarvestLog();
    renderSufficiency();
}
