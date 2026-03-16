// FoodMax - Chatbot JavaScript

function toggleMenu() {
    var menuToggle = document.querySelector('.menu-toggle');
    var navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

// Initial greeting
window.addEventListener('load', function() {
    setTimeout(function() {
        addBotMessage('Hola! Soy el asistente de FoodMax. Estoy aqui para ayudarte con: hacer un pedido, cancelar un pedido, consultar el estado, medios de pago, delivery, horarios. En que puedo ayudarte hoy?');
    }, 500);
});

function getCurrentTime() {
    var now = new Date();
    return now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

function addUserMessage(text) {
    var chatMessages = document.getElementById('chatMessages');
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = '<div class="message-text">' + text + '</div><div class="message-time">' + getCurrentTime() + '</div>';
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(text) {
    var chatMessages = document.getElementById('chatMessages');
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = '<div class="message-text">' + text.replace(/\n/g, '<br>') + '</div><div class="message-time">' + getCurrentTime() + '</div>';
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    document.getElementById('typingIndicator').classList.add('active');
    document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
}

function hideTyping() {
    document.getElementById('typingIndicator').classList.remove('active');
}

function sendMessage() {
    var chatInput = document.getElementById('chatInput');
    var sendBtn = document.getElementById('sendBtn');
    var message = chatInput.value.trim();
    
    if (!message) return;
    
    addUserMessage(message);
    chatInput.value = '';
    sendBtn.disabled = true;
    
    showTyping();
    
    setTimeout(function() {
        hideTyping();
        var response = getBotResponse(message);
        addBotMessage(response);
        sendBtn.disabled = false;
        chatInput.focus();
    }, 1500);
}

function sendSuggestion(text) {
    document.getElementById('chatInput').value = text;
    sendMessage();
}

function quickAction(action) {
    var messages = {
        'horarios': 'Cuales son los horarios?',
        'cancelar': 'Quiero cancelar mi pedido',
        'demora': 'Mi pedido esta tardando',
        'menu': 'Quiero ver el menu',
        'contacto': 'Como puedo contactarlos?'
    };
    document.getElementById('chatInput').value = messages[action];
    sendMessage();
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function getBotResponse(message) {
    var lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('cancelar')) {
        return 'Para cancelar tu pedido, necesitamos tu numero de pedido. Escribinos al WhatsApp con tu numero de orden. Si el pedido ya fue preparado, no sera posible cancelar.';
    }
    
    if (lowerMessage.includes('demora') || lowerMessage.includes('tarda')) {
        return 'Lamentamos la demora! Los tiempos de entrega son: Delivery propio 30-45 min, PedidosYa segun la app. Por favor proporciona tu numero de pedido.';
    }
    
    if (lowerMessage.includes('pedir') || lowerMessage.includes('pedido')) {
        return 'Es muy facil hacer tu pedido! Visitanos en Catalogo, elegi productos, completas datos y te redirigimos a WhatsApp. Tambien podes llamar al +54 9 11 1234-5678';
    }
    
    if (lowerMessage.includes('horario')) {
        return 'Horarios: Mar a Vie 12-15 / 19-23, Sab y Dom 12-24, Lunes cerrado. Te esperamos!';
    }
    
    if (lowerMessage.includes('pago')) {
        return 'Medios de pago: Efectivo, Tarjeta de Debito, Tarjeta de Credito, Transferencia, MercadoPago';
    }
    
    if (lowerMessage.includes('delivery') || lowerMessage.includes('envio')) {
        return 'Opciones: Delivery propio directo, PedidosYa desde la app, Cadeteria servicio rapido';
    }
    
    if (lowerMessage.includes('menu') || lowerMessage.includes('comida')) {
        return 'Menu: Hamburguesas $1800-$3800, Lomitos $2500-$3500, Pollo $1600-$2400, Carne $3500-$4200, Menu del dia $2100';
    }
    
    if (lowerMessage.includes('contacto') || lowerMessage.includes('telefono')) {
        return 'Contacto: Av. Alvear y Humberto Primo, +54 9 11 1234-5678, @FoodMaxOK';
    }
    
    if (lowerMessage.includes('gracias')) {
        return 'De nada! Gracias a vos por elegir FoodMax! Que disfrutes tu comida!';
    }
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos')) {
        return 'Hola! Bienvenido a FoodMax! Estoy para ayudarte. Puedo asistirte con pedidos, cancelaciones, horarios, menu y mas. Que necesitas?';
    }
    
    return 'Entendido! Puedo ayudarte con: menu completo, delivery, medios de pago, cancelar pedido, horarios, contacto. Sobre que necesitas ayuda?';
}

