document.addEventListener('DOMContentLoaded', () => {
    const openCaseBtn = document.getElementById('openCaseBtn');
    const caseResultDiv = document.getElementById('caseResult');

    // Lista de skins possíveis (você pode expandir isso muito!)
    const skins = [
        { name: 'AK-47 | Redline', rarity: 'Comum', color: '#b0c4de' }, // Azul claro
        { name: 'AWP | Asiimov', rarity: 'Rara', color: '#8a2be2' },   // Roxo
        { name: 'M4A4 | Buzz Kill', rarity: 'Comum', color: '#b0c4de' },
        { name: 'Desert Eagle | Blaze', rarity: 'Lendária', color: '#ffd700' }, // Dourado
        { name: 'Glock-18 | Fade', rarity: 'Rara', color: '#8a2be2' },
        { name: 'Butterfly Knife | Doppler', rarity: 'Excepcional', color: '#ff4500' }, // Laranja avermelhado
        { name: 'USP-S | Cyrex', rarity: 'Comum', color: '#b0c4de' },
        { name: 'Karambit | Lore', rarity: 'Excepcional', color: '#ff4500' },
        { name: 'P250 | Sand Dune', rarity: 'Comum', color: '#b0c4de' },
        { name: 'Five-SeveN | Hyper Beast', rarity: 'Rara', color: '#8a2be2' },
    ];

    // Função para simular a abertura da caixa
    function openCase() {
        // Desabilita o botão para evitar cliques múltiplos durante a "animação"
        openCaseBtn.disabled = true;
        caseResultDiv.textContent = 'Abrindo caixa...';
        caseResultDiv.style.color = '#e0e0e0'; // Cor padrão durante a abertura

        // Simula um atraso para parecer que a caixa está "girando"
        setTimeout(() => {
            // Sorteia uma skin aleatória
            const randomIndex = Math.floor(Math.random() * skins.length);
            const droppedSkin = skins[randomIndex];

            // Exibe o resultado
            caseResultDiv.textContent = `Você tirou: ${droppedSkin.name} (${droppedSkin.rarity})!`;
            caseResultDiv.style.color = droppedSkin.color; // Muda a cor do texto conforme a raridade

            // Reabilita o botão
            openCaseBtn.disabled = false;
        }, 2000); // 2 segundos de atraso
    }

    // Adiciona o evento de clique ao botão
    if (openCaseBtn) {
        openCaseBtn.addEventListener('click', openCase);
    }
});
