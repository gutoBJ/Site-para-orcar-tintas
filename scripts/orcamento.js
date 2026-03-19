function verProduto(index) {
  const p = window.listaProdutos[index]

  const modal = document.getElementById("modal")
  const conteudo = document.getElementById("modalConteudo")

  conteudo.innerHTML = `
    <img src="${p.Imagem}" class="w-30 h-40 object-cover mb-4 rounded-xl"/>

    <h2 class="text-xl font-bold mb-2">${p.Nome}</h2>
    <p><b>Categoria:</b> ${p.Categoria}</p>
    <p><b>Composição:</b> ${p.Composicao}</p>
    <p><b>Diluição:</b> ${p.Diluicao}</p>
    <p><b>Aplicação:</b> ${p.Aplicacao}</p>
    <p><b>Rendimento:</b> ${p.Rendimento}</p>
    <p><b>Secagem:</b> ${p.Secagem}</p>
  `

  modal.classList.remove("hidden")
  modal.classList.add("flex")
}

document.getElementById("fecharModal").addEventListener("click", () => {
  const modal = document.getElementById("modal")
  modal.classList.add("hidden")
  modal.classList.remove("flex")
})

/* document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    e.target.classList.add("hidden")
    e.target.classList.remove("flex")
  }
}) */

// cursor-pointer hover:bg-[#9e5809]"

let selecionados = []

function toggleProduto(index) {
  const p = window.listaProdutos[index]

  const existe = selecionados.find(item => item.Nome === p.Nome)

  if (existe) {
    selecionados = selecionados.filter(item => item.Nome !== p.Nome)
    selecionados.pop(p)
  } else {
    selecionados.push(p)
  }

  atualizarBotao()
}

function atualizarBotao() {
  const btn = document.getElementById("btnOrcamento")

  if (selecionados.length > 0) {
    btn.disabled = false
    btn.classList.remove("bg-gray-400", "cursor-not-allowed")
    btn.classList.add("bg-[#c96e07]", "hover:bg-[#9e5809]", "cursor-pointer")
  } else {
    btn.disabled = true
    btn.classList.add("bg-gray-400", "cursor-not-allowed")
    btn.classList.remove("bg-[#c96e07]", "hover:bg-[#9e5809]")
  }
}

function fazerOrcamento() {
  localStorage.setItem("produtosSelecionados", JSON.stringify(selecionados))
  window.location.href = "../pages/form.html"
}

async function carregarProdutos(){

  const res = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AWDtjMUbORLx1zyAj2Scj0J54qTQaBmCtNPJDKxE_yOtSWpGLS-fOgIW1iigFMgPtPUOegRjl1amfc3WwE_ILUETWpKnO0aNa7I87xm-ULFkOEYQOem3-ZPQaD7ynQ-2_aHdKMC6dTa0s5T_daW9qEey5ftBBvmEWsk79zBGFYsEiOMufECix2HWC5fUlpNrNkK7gtVo8AyY3ROwjTH5Cm1q7aMpi-G-N2aTrfYTm6LGd2e3gROXK_dfkhPapCqKoBBSSsxwAIBwzQRdUwk01Ua5zZ8d3nPEIA&lib=MaLU4PuxjuL7pN23MWAE4VQIm5ToQ0m3X")
  const produtos = await res.json()

  const container = document.getElementById("produtos")

  produtos.forEach((p, index) => {
    container.innerHTML += `
      <div class="border p-6 rounded shadow">
        <input type="checkbox" id="${index}" name="${p.Nome}" onchange="toggleProduto(${index})">
        <img src="${p.Imagem}" class="w-30 h-32 object-cover rounded-xl"/>

        <h2 class="font-bold">${p.Nome}</h2>
        <p>Categoria: ${p.Categoria}</p>

        <p class="text-sm">Rendimento: ${p.Rendimento}</p>
        <p class="text-sm">Secagem: ${p.Secagem}</p>

        <button onclick="verProduto(${index})"
          class="mt-2 bg-blue-600 text-white px-3 py-1 rounded cursor-pointer w-30 h-10 hover:bg-[#0f0fb4]">
          Ver detalhes
        </button>
      </div>
    `
  }
)

  container.innerHTML += `
      <button onClick="fazerOrcamento()" id="btnOrcamento" class="disabled bg-gray-400 cursor-not-allowed text-white p-2 w-36 rounded">
          Fazer orçamento
      </button> 
  `

  window.listaProdutos = produtos
}

carregarProdutos()