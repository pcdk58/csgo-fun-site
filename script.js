document.addEventListener('DOMContentLoaded', () => {
    const openCaseBtn = document.getElementById('openCaseBtn');
    const caseResultDiv = document.getElementById('caseResult');
    const rouletteTrack = document.getElementById('rouletteTrack');

    // Lista de skins possíveis (com URLs de exemplo para imagens)
    const skins = [
        { name: 'AK-47 | Redline', rarity: 'Comum', color: '#b0c4de', imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsTOjXM5vNFgS_rJ7SU2VlFh4c2h_fgF_nQRQ4k-K4sLwxj_tU9s2r3C9wHBBwcnE09_g2B0xU00k0-WzD7602xQ' },
        { name: 'AWP | Asiimov', rarity: 'Rara', color: '#8a2be2', imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsTOjXM5vNFgS_rJ7SU2VlFh4c2h_fgF_nQRQ4k-K4sLwxj_tU9s2r3C9wHBBwcnE09_g2B0xU00k0-WzD7602xQ' },
        { name: 'M4A4 | Buzz Kill', rarity: 'Comum', color: '#b0c4de', imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsTOjXM5vNFgS_rJ7SU2VlFh4c2h_fgF_nQRQ4k-K4sLwxj_tU9s2r3C9wHBBwcnE09_g2B0xU00k0-WzD7602xQ' },
        { name: 'Desert Eagle | Blaze', rarity: 'Lendária', color: '#ffd700', imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsTOjXM5vNFgS_rJ7SU2VlFh4c2h_fgF_nQRQ4k-K4sLwxj_tU9s2r3C9wHBBwcnE09_g2B0xU00k0-WzD7602xQ' },
        { name: 'Glock-18 | Fade', rarity: 'Rara', color: '#8a2be2', imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsTOjXM5vNFgS_rJ7SU2VlFh4c2h_fgF_nQRQ4k-K4sLwxj_tU9s2r3C9wHBBwcnE09_g2B0xU00k0-WzD7602xQ' },
        { name: 'Butterfly Knife | Doppler', rarity: 'Excepcional', color: '#ff4500', imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsTOjXM5vNFgS_rJ7SU2VlFh4c2h_fgF_nQRQ4k-K4sLwxj_tU9s2r3C9wHBBwcnE09_g2B0xU00k0-WzD7602xQ' },
        { name: 'USP-S | Cyrex', rarity: 'Comum', color: '#b0c4de', imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsTOjXM5vNFgS_rJ7SU2VlFh4c2h_fgF_nQRQ4k-K4sLwxj_tU9s2r3C9wHBBwcnE09_g2B0xU00k0-WzD7602xQ' },
        { name: 'Karambit | Lore', rarity: 'Excepcional', color: '#ff4500', imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsTOjXM5vNFgS_rJ7SU2VlFh4c2h_fgF_nQRQ4k-K4sLwxj_tU9s2r3C9wHBBwcnE09_g2B0xU00k0-WzD7602xQ' },
        { name: 'P250 | Sand Dune', rarity: 'Comum', color: '#b0c4de', imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsTOjXM5vNFgS_rJ7SU2VlFh4c2h_fgF_nQRQ4k-K4sLwxj_tU9s2r3C9wHBBwcnE09_g2B0xU00k0-WzD7602xQ' },
        { name: 'Five-SeveN | Hyper Beast', rarity: 'Rara', color: '#8a2be2', imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsTOjXM5vNFgS_rJ7SU2VlFh4c2h_fgF_nQRQ4k-K4sLwxj_tU9s2r3C9wHBBwcnE09_g2B0xU00k0-WzD7602xQ' },
    ];

    // ATENÇÃO: As URLs das imagens acima são apenas exemplos e podem não funcionar
    // para todas as skins. Você precisará encontrar URLs válidas de imagens de skins
    // do CS2. Uma boa prática seria usar um serviço de CDN ou ter suas próprias imagens.

    const ITEM_WIDTH = 110; // Largura de cada item da roleta (100px + 5px de margin de cada lado)
    const ITEMS_TO_DISPLAY = 75; // Número de itens a serem exibidos na roleta para a animação

    // Função para criar um elemento de skin para a roleta
    function createSkinElement(skin) {
        const itemDiv = document.createElement('div');
        // Adiciona a classe base e a classe de raridade
        itemDiv.classList.add('roulette-item', `rarity-${skin.rarity.toLowerCase().replace(' ', '-')}`);

        const img = document.createElement('img');
        img.src = skin.imageUrl;
        img.alt = skin.name;
        itemDiv.appendChild(img);

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('skin-name');
        nameSpan.textContent = skin.name;
        itemDiv.appendChild(nameSpan);

        return itemDiv;
    }

    // Função para preencher a roleta com skins aleatórias
    function populateRoulette() {
        rouletteTrack.innerHTML = ''; // Limpa a roleta
        // Adiciona um bom número de skins para a animação
        for (let i = 0; i < ITEMS_TO_DISPLAY; i++) {
            const randomSkin = skins[Math.floor(Math.random() * skins.length)];
            rouletteTrack.appendChild(createSkinElement(randomSkin));
        }
    }

    // Função para simular a abertura da caixa com roleta
    function openCaseWithRoulette() {
        openCaseBtn.disabled = true;
        caseResultDiv.textContent = ''; // Limpa o resultado anterior
        rouletteTrack.style.transition = 'none'; // Desabilita a transição para resetar a posição
        rouletteTrack.style.transform = 'translateX(0)'; // Volta ao início

        populateRoulette(); // Repopula a roleta com novas skins

        // Garante que o DOM seja atualizado antes de aplicar a transição
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Escolhe a skin que será o resultado final
                const winIndex = Math.floor(Math.random() * skins.length);
                const winningSkin = skins[winIndex];

                // Remove a skin sorteada e a insere em uma posição estratégica
                // para que ela pare na linha indicadora.
                // Inserimos a skin vencedora em uma posição no meio, por exemplo, na posição 50.
                const targetPosition = Math.floor(ITEMS_TO_DISPLAY / 2); // Posição alvo para a skin vencedora
                const winningSkinElement = createSkinElement(winningSkin);
                rouletteTrack.insertBefore(winningSkinElement, rouletteTrack.children[targetPosition]);


                // Calcula o deslocamento para que a skin vencedora pare no centro
                // A linha indicadora está no meio (50% da largura do contêiner da roleta).
                // Precisamos calcular a posição do item vencedor para que seu centro coincida com a linha.
                // Primeiro, a posição do item vencedor na faixa, assumindo que ele tem a largura ITEM_WIDTH.
                // O meio da faixa é (rouletteTrack.offsetWidth / 2).
                // O centro do item alvo é (targetPosition * ITEM_WIDTH) + (ITEM_WIDTH / 2).
                // O quanto precisamos mover é o meio da faixa menos o centro do item alvo.

                // Ajuste para centralizar o item sob a linha:
                // O centro da roleta está em rouletteTrack.offsetWidth / 2
                // A posição do centro do ITEM_WINNER é (targetPosition * ITEM_WIDTH) + (ITEM_WIDTH / 2)
                // A diferença é o quanto precisamos mover a roleta para a esquerda
                // Considerando a margem à esquerda do primeiro item.
                const offset = rouletteTrack.offsetWidth / 2 - (targetPosition * ITEM_WIDTH + (ITEM_WIDTH / 2));
                
                // Aplica a transição e o deslocamento
                rouletteTrack.style.transition = 'transform 6s cubic-bezier(0.2, 0.8, 0.7, 1)'; // Reabilita a transição
                rouletteTrack.style.transform = `translateX(${offset}px)`;

                // Exibe o resultado após a animação terminar
                rouletteTrack.addEventListener('transitionend', () => {
                    caseResultDiv.textContent = `Você tirou: ${winningSkin.name} (${winningSkin.rarity})!`;
                    caseResultDiv.style.color = winningSkin.color;
                    openCaseBtn.disabled = false;
                }, { once: true }); // Executa o listener apenas uma vez
            });
        });
    }

    // Adiciona o evento de clique ao botão
    if (openCaseBtn) {
        openCaseBtn.addEventListener('click', openCaseWithRoulette);
    }
});
