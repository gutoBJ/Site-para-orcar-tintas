const produtos = JSON.parse(localStorage.getItem("produtosSelecionados")) || []

const container = document.getElementById("listaSelecionados")

produtos.forEach((p, index) => {
  container.innerHTML += `
    <div class="border p-4 rounded mb-2 flex justify-between">
      <span>${p.Nome}</span>
      <button onclick="remover(${index})" class="text-red-500">Remover</button>
    </div>
  `
})

function remover(index) {
  produtos.splice(index, 1)
  localStorage.setItem("produtosSelecionados", JSON.stringify(produtos))
  location.reload()
}