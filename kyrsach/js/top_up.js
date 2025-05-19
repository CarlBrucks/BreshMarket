document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('./data/wallets.json');
        const wallets = await response.json();
        const cryptoGrid = document.getElementById('cryptoGrid');

        wallets.forEach(wallet => {
            const card = document.createElement('div');
            card.className = 'crypto-card';
            card.innerHTML = `
                <div class="crypto-header">
                    <img src="${wallet.icon}" alt="${wallet.name}" class="crypto-icon">
                    <h3>${wallet.name}</h3>
                </div>
                <div class="qr-code">
                    <img src="${wallet.qr}" alt="QR код ${wallet.name}">
                </div>
                <div class="crypto-address">${wallet.address}</div>
                <button class="copy-btn" data-address="${wallet.address}">
                    Копировать адрес
                </button>
            `;
            cryptoGrid.appendChild(card);
        });

        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const address = this.getAttribute('data-address');
                const originalText = this.textContent;

                navigator.clipboard.writeText(address)
                    .then(() => {
                        this.textContent = 'Скопировано!';
                        setTimeout(() => {
                            this.textContent = originalText;
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Ошибка копирования:', err);
                        this.textContent = 'Ошибка!';
                    });
            });
        });

    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        document.getElementById('cryptoGrid').innerHTML = `
            <div class="error">Не удалось загрузить данные о кошельках</div>
        `;
    }
});