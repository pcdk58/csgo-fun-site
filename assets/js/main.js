const skins = [
  { nome: "AWP | Asiimov", raridade: "rara", caixa: "hydra" },
  { nome: "AK-47 | Redline", raridade: "comum", caixa: "hydra" },
  { nome: "M4A1-S | Hyper Beast", raridade: "rara", caixa: "chroma3" },
  { nome: "Glock-18 | Wasteland Rebel", raridade: "comum", caixa: "chroma3" }
];

function girarRoleta() {
  const sorteada = skins[Math.floor(Math.random() * skins.length)];
  alert("Você ganhou: " + sorteada.nome);
  salvarInventario(sorteada);
}

function salvarInventario(skin) {
  let inventario = JSON.parse(localStorage.getItem("inventario") || "[]");
  inventario.push(skin);
  localStorage.setItem("inventario", JSON.stringify(inventario));
}

function carregarInventario() {
  let inv = document.getElementById("inventario");
  if (!inv) return;
  let inventario = JSON.parse(localStorage.getItem("inventario") || "[]");
  if (inventario.length === 0) inv.innerHTML = "<p>Sem skins ainda.</p>";
  else {
    inventario.forEach(skin => {
      let div = document.createElement("div");
      div.innerText = `${skin.nome} (${skin.raridade}) - Caixa: ${skin.caixa}`;
      inv.appendChild(div);
    });
  }
}
carregarInventario();