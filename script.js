 console.log('Script Loaded'); // Debugging log

const ukItemsContainer = document.getElementById('uk-items-container');
const auItemsContainer = document.getElementById('au-items-container');
const itemForm = document.getElementById('item-form');

// Load saved items from localStorage
let savedItems = JSON.parse(localStorage.getItem('items')) || [];
console.log('Loaded Saved Items:', savedItems); // Debugging log

savedItems.forEach(item => {
    if (item.region === '(UK)') {
        addItemToDOM(item, 'uk-items-container');
    } else if (item.region === '(AU)') {
        addItemToDOM(item, 'au-items-container');
    }
});

// Function to add an item to the DOM
function addItemToDOM(item, containerId) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    // Title without Region
    const titleDiv = document.createElement('p');
    titleDiv.textContent = item.title.replace(/\s\(.*\)/, ''); // Remove region from title
    itemDiv.appendChild(titleDiv);

    // Description
    const descriptionDiv = document.createElement('p');
    descriptionDiv.textContent = item.description;
    itemDiv.appendChild(descriptionDiv);

    // Price
    const priceDiv = document.createElement('p');
    priceDiv.textContent = `Price: $${item.price}`;
    itemDiv.appendChild(priceDiv);

    // Controls (Copy and Delete)
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'controls';

    // Copy Title Button
    const copyTitleButton = document.createElement('button');
    copyTitleButton.className = 'copy';
    copyTitleButton.textContent = 'Copy Title';
    copyTitleButton.onclick = () => {
        navigator.clipboard.writeText(titleDiv.textContent); // Copy only the title
        alert(`"${titleDiv.textContent}" copied to clipboard!`);
    };
    controlsDiv.appendChild(copyTitleButton);

    // Copy Description Button
    const copyDescriptionButton = document.createElement('button');
    copyDescriptionButton.className = 'copy';
    copyDescriptionButton.textContent = 'Copy Description';
    copyDescriptionButton.onclick = () => {
        navigator.clipboard.writeText(descriptionDiv.textContent); // Copy only the description
        alert(`"${descriptionDiv.textContent}" copied to clipboard!`);
    };
    controlsDiv.appendChild(copyDescriptionButton);

    // Copy Price Button
    const copyPriceButton = document.createElement('button');
    copyPriceButton.className = 'copy';
    copyPriceButton.textContent = 'Copy Price';
    copyPriceButton.onclick = () => {
        navigator.clipboard.writeText(priceDiv.textContent); // Copy only the price
        alert(`"${priceDiv.textContent}" copied to clipboard!`);
    };
    controlsDiv.appendChild(copyPriceButton);

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        itemDiv.remove();
        savedItems.splice(savedItems.indexOf(item), 1);
        localStorage.setItem('items', JSON.stringify(savedItems));
        console.log('Updated Saved Items:', savedItems); // Debugging log
    };
    controlsDiv.appendChild(deleteButton);

    itemDiv.appendChild(controlsDiv);

    // Append item to the appropriate container
    const container = document.getElementById(containerId);
    container.appendChild(itemDiv);
}

// Handle form submission
itemForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from inputs
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    if (!title || !description || !price) return;

    // Determine the region based on the button clicked
    const regionButton = event.submitter; // Get the button that triggered the form submission
    const region = regionButton.classList.contains('uk') ? '(UK)' : '(AU)';
    console.log('Region:', region); // Debugging log

    // Create new item object
    const newItem = {
        title: `${title} ${region}`,
        description,
        price,
        region
    };

    // Save the item to localStorage
    savedItems.push(newItem);
    localStorage.setItem('items', JSON.stringify(savedItems));
    console.log('Updated Saved Items:', savedItems); // Debugging log

    // Add the item to the appropriate column
    addItemToDOM(newItem, `${region.toLowerCase()}-items-container`);

    // Clear form inputs
    itemForm.reset();
});
