// Function to fetch card data from an external JSON file
async function fetchCardData() {
    const response = await fetch('/cardData.json');
    return await response.json();
}

// Function to generate cards
async function generateCards() {
    const cardData = await fetchCardData();
    const container = document.getElementById('card-container');
    cardData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.content}</p>
            <a href="${data.link}">Go to</a>
        `;
        container.appendChild(card);
    });
}

// Function to fetch and display files from the 'files' folder
async function fetchFiles() {
    const response = await fetch('/files/'); // Assuming directory listing is enabled
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(await response.text(), 'text/html');
    const links = htmlDoc.querySelectorAll('a');
    const fileList = document.getElementById('file-list');
    var filesNumber = 0;
    links.forEach(link => {
        const fileName = link.getAttribute('href');
        if (!fileName.endsWith('/')) { // Only include .deb files
            filesNumber++;
            const listItem = document.createElement('div');
            listItem.className = 'card';
            listItem.innerHTML = `<a href="files/${fileName}">${fileName}</a>`;
            fileList.appendChild(listItem);
        }
    });
    if (filesNumber === 0) {
        const noFilesMessage = document.createElement('div');
        noFilesMessage.className = 'info-message';
        noFilesMessage.textContent = 'No files found.';
        fileList.appendChild(noFilesMessage);
    }
}

// Call the function on page load
window.onload = () => {
    generateCards(); // Existing function for cards
    fetchFiles();
};
