// - small click animation (preserve original behaviour)
// - notificações a cada 7 segundos mostrando clientes que entraram no grupo

// Botão: animação de toque
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.96)';
    });
    button.addEventListener('mouseup', () => {
        button.style.transform = 'scale(1)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
    // touch support
    button.addEventListener('touchstart', () => button.style.transform = 'scale(0.96)');
    button.addEventListener('touchend', () => button.style.transform = 'scale(1)');
});

// -- Notificações de entradas no grupo -- //
const toastContainer = document.getElementById('toast-container');
const totalJoinsEl = document.getElementById('total-joins');

// Lista de nomes de exemplo (podes editar)
const names = [
    'Tio Adrade', 'Miguel', 'Maria', 'João', 'Ana', 'Pedro', 'Fátima',
    'Carlos', 'Luísa', 'José', 'António', 'Rita', 'Helena', 'Nelson', 'Sofia'
];

// Mensagens templates
const messages = [
    (n) => `${n} entrou no grupo`,
    (n) => `${n} acabou de se juntar`,
    (n) => `${n} agora faz parte do grupo`,
    (n) => `${n} entrou — bem-vindo(a)!`
];

// Contador de entradas (começa com valor do HTML ou 1248 por padrão)
let totalJoins = parseInt(totalJoinsEl.textContent.replace(/\D/g,'')) || 1248;
totalJoinsEl.textContent = `+${totalJoins}`;

// Gera um toast e incrementa contador
function showJoinToast() {
    const name = names[Math.floor(Math.random() * names.length)];
    const message = messages[Math.floor(Math.random() * messages.length)](name);

    // criar toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    // avatar mostra iniciais
    const initials = name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
    toast.innerHTML = `
        <div class="avatar" aria-hidden="true">${initials}</div>
        <div class="text">
            <strong>${message}</strong>
            <small>Agora — TXENECA</small>
        </div>
    `;

    toastContainer.appendChild(toast);

    // actualiza contador total
    const inc = Math.random() < 0.9 ? 1 : 2;
    totalJoins += inc;
    totalJoinsEl.textContent = `+${totalJoins}`;

    // remover toast após animação
    setTimeout(() => {
        toast.style.animation = 'toast-out .45s forwards';
        setTimeout(() => {
            toast.remove();
        }, 450);
    }, 4800);
}

showJoinToast();
let toastInterval = setInterval(showJoinToast, 7000);

// pausa quando o site não está visível
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(toastInterval);
    } else {
        toastInterval = setInterval(showJoinToast, 7000);
    }
});

// ano auto no rodapé
document.getElementById('year').textContent = new Date().getFullYear();
