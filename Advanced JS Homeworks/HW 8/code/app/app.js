const carsTable = document.getElementById('cars-table');
const tbody = carsTable.querySelector('tbody');
const noDataMessage = document.getElementById('no-data-message');
const typeFilter = document.getElementById('type-filter');
const brandFilter = document.getElementById('brand-filter');
const modelFilter = document.getElementById('model-filter');
const doorsFilter = document.getElementById('doors-filter');
const gasTypeFilter = document.getElementById('gas-type-filter');
const colorFilter = document.getElementById('color-filter');
const newFilter = document.getElementById('new-filter');
const oldFilter = document.getElementById('old-filter');
const horsepowerFilter = document.getElementById('horsepower-filter');
const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');
const horsepowerDisplay = document.getElementById('horsepower-value');

const carsData = [];

function fetchDataAndInitializeFilters() {
    fetch('https://raw.githubusercontent.com/sedc-codecademy/mkwd12-04-ajs/main/G5/Homework/cars.json')
        .then(response => response.json())
        .then(data => {
            carsData.push(...data);

    

            initializeFilters();
            initializeDropdownOptions();
            filterCars();
            updateDisplay();
        })
        .catch(error => console.error('Error fetching data: ', error));
}



function initializeFilters() {
    typeFilter.value = '';
    brandFilter.value = '';
    modelFilter.value = '';
    doorsFilter.value = '';
    gasTypeFilter.value = '';
    colorFilter.value = '';
    newFilter.checked = true;
    oldFilter.checked = false;
    horsepowerFilter.value = '';
}

function initializeDropdownOptions() {
    clearDropdownOptions(typeFilter);
    clearDropdownOptions(brandFilter);
    clearDropdownOptions(modelFilter);
    clearDropdownOptions(doorsFilter);
    clearDropdownOptions(gasTypeFilter);
    clearDropdownOptions(colorFilter);
    clearDropdownOptions(horsepowerFilter);

    populateDropdownOptions(typeFilter, 'type');
    populateDropdownOptions(brandFilter, 'brand');
    populateDropdownOptions(modelFilter, 'model');
    populateDropdownOptions(doorsFilter, 'doors');
    populateDropdownOptions(gasTypeFilter, 'gasType');
    populateDropdownOptions(colorFilter, 'color');
    populateDropdownOptions(horsepowerFilter, 'horsepower');
}

function clearDropdownOptions(dropdown) {
    dropdown.innerHTML = '';
}

function populateDropdownOptions(dropdown, property, filterByBrand = null) {
    const options = Array.from(new Set(
        filterByBrand
            ? carsData.filter(car => car.brand === filterByBrand).map(car => car[property])
            : carsData.map(car => car[property])
    ));

    console.log(`Dropdown ${property} options:`, options);

    if (property === 'doors' || property === 'horsepower') {
        options.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    }

    options.unshift('All');

    dropdown.innerHTML = '';

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
    });
}

function updateFilterOptions(filter, options) {
    filter.innerHTML = '';
    options.unshift('');

    options.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = option.textContent = optionValue;
        filter.appendChild(option);
    });
}

function getUniqueModels(brand) {
    return Array.from(new Set(carsData.filter(car => car.brand === brand).map(car => car.model)));
}

function getUniqueDoors(brand) {
    return Array.from(new Set(carsData.filter(car => car.brand === brand).map(car => car.doors)));
}

function getUniqueColors(brand) {
    return Array.from(new Set(carsData.filter(car => car.brand === brand).map(car => car.color)));
}

function filterCars() {
    const selectedBrand = brandFilter.value;
    const selectedModel = modelFilter.value;

    const filters = {
        type: typeFilter.value,
        brand: selectedBrand,
        model: selectedModel,
        doors: doorsFilter.value,
        gasType: gasTypeFilter.value,
        color: colorFilter.value,
        isNew: newFilter.checked,
        isOld: oldFilter.checked,
        horsepower: horsepowerFilter.value
    };

    const filterKeys = Object.keys(filters);
    const hasAnyFilter = filterKeys.some(key => filters[key]);

    let filteredCars = [];

    if (hasAnyFilter) {
        filteredCars = carsData.filter(car => {
            const filterMatch = filterKeys.every(key => {
                if (key === 'brand' && filters[key] === 'Other Brands') {
                    return !['BMW', 'Audi'].includes(car[key]);
                }

                if (key === 'brand' && filters[key] === 'All') {
                    return true;
                }

                if (key === 'brand' && filters[key] === 'BMW') {
                    return car[key].includes('BMW');
                }

                if (key === 'brand' && filters[key] === 'Audi') {
                    return car[key].includes('Audi');
                }

                return !filters[key] || car[key] == filters[key];
            });

            return filterMatch;
        });
    } else {
        // If no filters are selected, display all cars
        filteredCars = carsData;
    }

    // Clear existing rows
    tbody.innerHTML = '';

    // Add filtered cars to the table
    filteredCars.forEach(car => {
        const row = tbody.insertRow();

        const typeCell = row.insertCell();
        typeCell.textContent = car.type;

        const brandCell = row.insertCell();
        brandCell.textContent = car.brand;

        const modelCell = row.insertCell();
        modelCell.textContent = car.model;

        const doorsCell = row.insertCell();
        doorsCell.textContent = car.doors;

        const gasTypeCell = row.insertCell();
        gasTypeCell.textContent = car.gasType;

        const colorCell = row.insertCell();
        colorCell.textContent = car.color;

        const newOldCell = row.insertCell();
        newOldCell.textContent = car.isNew ? 'New' : 'Old';

        const horsepowerCell = row.insertCell();
        horsepowerCell.textContent = car.horsepower;
    });

    // Show no data message if no cars are displayed
    const noDataMessage = document.getElementById('no-data-message');
    noDataMessage.classList.toggle('hidden', filteredCars.length > 0);
}

function updateDisplay() {
    const selectedBrand = brandFilter.value;
    const selectedModel = modelFilter.value;

    const selectedCar = carsData.find(car => car.brand === selectedBrand && car.model === selectedModel);

    if (selectedCar) {
        newFilter.checked = selectedCar.isNew;
        oldFilter.checked = !selectedCar.isNew;
        horsepowerFilter.value = selectedCar.horsepower;
        horsepowerDisplay.textContent = `Horsepower: ${selectedCar.horsepower}`;
    }
}

fetchDataAndInitializeFilters();

brandFilter.addEventListener('change', function () {
    const selectedBrand = brandFilter.value;
    populateDropdownOptions(modelFilter, 'model', selectedBrand);
    populateDropdownOptions(doorsFilter, 'doors', selectedBrand);
    populateDropdownOptions(colorFilter, 'color', selectedBrand);
    filterCars();
});

modelFilter.addEventListener('change', function () {
    filterCars();
    updateDisplay();
});

horsepowerFilter.addEventListener('input', function () {
    horsepowerDisplay.textContent = `Horsepower: ${horsepowerFilter.value}`;
});

searchBtn.addEventListener('click', function () {
    filterCars();
    updateDisplay();

    const noDataMessage = document.getElementById('no-data-message');
    noDataMessage.classList.toggle('hidden', tbody.childElementCount > 0);
});
resetBtn.addEventListener('click', () => {
    initializeFilters();
    filterCars();
});
