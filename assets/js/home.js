// Exibir produtos na página
fetch('../../controller/get_products.php')
.then(response => response.json())
.then(data => {
    const productsDiv = document.getElementById('products');
    const cartItems = []; // Array para armazenar os itens do carrinho

    data.forEach(product => {
        // Cria um card para cada produto
        const card = document.createElement('div');
        card.classList.add('card');
        
        //imagem do produto
        const productImage = document.createElement('img');
        productImage.src = product.imagemProduto; //URL da imagem
        productImage.alt = product.imagemProduto;
        card.appendChild(productImage);  
        
        // nome do produto
        const productName = document.createElement('h2');
        productName.textContent = product.nomeProduto;
        card.appendChild(productName);
        
        //preço do produto
        const productPrice = document.createElement('p');
        productPrice.textContent = `R$ ${product.preco}`;
        card.appendChild(productPrice);
        
        // Botão "Comprar"
        const buyButton = document.createElement('button');
        buyButton.classList.add('btn', 'btn-primary');
        buyButton.textContent = "Comprar";
        
        // Adiciona evento de clique ao botão "Comprar"
        buyButton.addEventListener('click', () => {    
            addToCart(product); // Chama a função para adicionar ao carrinho
            // Obtém a referência da div de mensagem de sucesso
            const successMsgProduct = document.getElementById('sucessMsgProduct');
            // Define o estilo para display: block
            successMsgProduct.style.display = 'flex';
            setTimeout(() => {
                successMsgProduct.style.display = 'none';
            }, 5000);
        });
        
        card.appendChild(buyButton);  
        
        // Adiciona o card à lista de produtos
        productsDiv.appendChild(card);
    });





const cartDiv = document.getElementById('cartContainer');
const cartMainDiv = document.getElementById('cartMainDiv');

const cartIcon = document.getElementById('cartIcon');
cartIcon.addEventListener('click', () => {
    cartMainDiv.style.display = "block";
});

const cartCloseButton = document.getElementById('cartCloseButton');
cartCloseButton.addEventListener("click", function(){
    cartMainDiv.style.display = "none";
});


// Função para adicionar um item ao carrinho


function addToCart(product) {
    cartItems.push(product); // Adiciona o produto ao array do carrinho
    updateCart(); // Atualiza a exibição do carrinho
}

// Função para atualizar a exibição do carrinho
function updateCart() {
    cartDiv.innerHTML = ''; // Limpa o conteúdo anterior do carrinho
    
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.setAttribute("class", "cartItem");
    
        // Cria a tag <img> para a imagem 
        const productImage = document.createElement('img');
        productImage.src = item.imagemProduto; // URL da imagem
        productImage.alt = item.nomeProduto; 
        cartItem.appendChild(productImage);
    
        // Adiciona o item do carrinho
        const itemInfo = document.createElement('div');
        itemInfo.textContent = `${item.nomeProduto} - R$ ${item.preco}`;
        cartItem.appendChild(itemInfo);
    
        // remover item do carrinho
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => {
            removeFromCart(item);
        });
        cartItem.appendChild(removeButton);
    
        cartDiv.appendChild(cartItem);
    });
   

    // Atualiza o total
    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.preco), 0);
    const totalDiv = document.getElementById('cartTotal');
    totalDiv.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
}

    // Função para remover um item do carrinho
function removeFromCart(itemToRemove) {
    const index = cartItems.findIndex(item => item.id === itemToRemove.id); // Assumindo que cada item tem um campo "id"
    if (index !== -1) {
        cartItems.splice(index, 1); // Remove o item do array
        updateCart(); // Atualiza a exibição do carrinho
    }
}
})
.catch(error => console.error('Erro ao buscar produtos:', error));