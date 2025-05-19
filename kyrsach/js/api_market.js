document.addEventListener('DOMContentLoaded', async () => {
    const nftGrid = document.getElementById('nftGrid');
    const apiUrl = 'http://65.108.96.184:4999/get/InfoByName';
    const response = await fetch('./data/nfts.json');
    const nftItems = await response.json();
    nftItems.forEach(item => {
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: item.name, id: item.id })
        })
            .then(response => response.json())
            .then(data => {
                const card = createNftCard(
                    data.image,
                    data.description,
                    item.name,
                    item.price
                    );
                    nftGrid.appendChild(card);
                })
        });

    function createNftCard(imageUrl, description, name, price) {
        const card = document.createElement('div');
        const formattedDescription = description.replace(/\n/g, '<br>');
        card.className = 'nft-card';
        card.innerHTML = `
        <div class="nft-image-container">
            <img src="${imageUrl}" alt="${name}" class="nft-image">
        </div>
        <div class="nft-info">
            <h3 class="nft-name">${name}</h3>
            <p class="nft-description">${formattedDescription}</p>
            <div class="nft-price">${price}</div>
        </div>
    `;
        return card;
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});