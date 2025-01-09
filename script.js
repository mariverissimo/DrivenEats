let selectedItems = {}

function selectItem(elemento, category) {
    if (selectedItems[category] !== undefined) {
        selectedItems[category].classList.remove("borda");
    }
    elemento.classList.add("borda");
    selectedItems[category] = elemento;
    verificarPedido();
}

function verificarPedido() {
    const botao = document.querySelector('button');
    
    if (selectedItems["comida"] && selectedItems["bebida"] && selectedItems["sobremesa"]) {
        botao.disabled = false;
        botao.classList.remove("desabilitado");
        botao.classList.add("habilitado");
        botao.innerHTML = "Fechar pedido";
        botao.onclick = fecharPedido();
    } else {
        botao.disabled = true;
        botao.classList.remove("habilitado");
        botao.classList.add("desabilitado");
        botao.onclick = null
    }
}

function fecharPedido() {
    const detalhesPedido = document.querySelector("#fecharPedido");
    
    const precoComida = Number(selectedItems["comida"].querySelector('p').innerHTML.replace('R$', '').replace(',', '.'));
    const precoBebida = Number(selectedItems["bebida"].querySelector('p').innerHTML.replace('R$', '').replace(',', '.'));
    const precoSobremesa = Number(selectedItems["sobremesa"].querySelector('p').innerHTML.replace('R$', '').replace(',', '.'));
    
    const valorTotal = precoComida + precoBebida + precoSobremesa;

    detalhesPedido.innerHTML = 
        `${finalOrder(selectedItems["comida"])}<br>
         ${finalOrder(selectedItems["bebida"])}<br>
         ${finalOrder(selectedItems["sobremesa"])}<br>`;

    const total = document.querySelector("#total-pedido");
    total.innerHTML = `<strong>Total: R$ ${valorTotal.toFixed(2).replace('.', ',')}</strong>`;

    document.querySelector("#info").classList.remove("hidden");
}

function finalOrder(item) {
    const pedido = item.querySelector('h2').innerHTML; 
    const preco = item.querySelector('p').innerHTML.replace('R$', '');
    return `<div class="detalhe-item">${pedido} - <strong class="detalhe-preco">R$ ${preco}</strong></div>`;
}

function confirmarPedido() {
    const phoneNumber = "5521985024105"; 
    
    const precoComida = Number(selectedItems["comida"].querySelector('p').innerHTML.replace('R$', '').replace(',', '.'));
    const precoBebida = Number(selectedItems["bebida"].querySelector('p').innerHTML.replace('R$', '').replace(',', '.'));
    const precoSobremesa = Number(selectedItems["sobremesa"].querySelector('p').innerHTML.replace('R$', '').replace(',', '.'));

    const totalPedido = precoComida + precoBebida + precoSobremesa;

    const comidaSelecionada = selectedItems["comida"].querySelector('h2').innerHTML;
    const bebidaSelecionada = selectedItems["bebida"].querySelector('h2').innerHTML;
    const sobremesaSelecionada = selectedItems["sobremesa"].querySelector('h2').innerHTML;

    const mensagem = `Olá, DrivenEats! Gostaria de fazer o pedido:\n ${comidaSelecionada}\nR$${precoComida.toFixed(2).replace('.', ',')}\n, ${bebidaSelecionada}\nR$${precoBebida.toFixed(2).replace('.', ',')}\n e ${sobremesaSelecionada}\nR$${precoSobremesa.toFixed(2).replace('.', ',')}\n Total: R$ ${totalPedido.toFixed(2).replace('.', ',')}`;

    const Link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(Link, "_blank");
}

function cancelarPedido() {
    document.querySelector("#info").classList.add("hidden");
}


