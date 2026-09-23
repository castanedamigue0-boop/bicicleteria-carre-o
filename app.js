/* ============================================
   BICISTORE - APP.JS
   Sistema de Inventario Completo
   ============================================ */

'use strict';

// ============================================
// ESTADO GLOBAL
// ============================================
const STATE = {
  productos: [],
  movimientos: [],
  nextId: 1,
  editingId: null,
};

// ============================================
// PRODUCTOS POR DEFECTO (catálogo inicial)
// ============================================
const PRODUCTOS_DEFAULT = [
  { nombre: 'Bicicleta MTB Aro 29', categoria: 'Bicicletas',           stock: 8,  stockMin: 3,  precioCompra: 350000, precioVenta: 550000, unidad: 'unidad', emoji: '🚵', codigo: 'BIC-001', descripcion: 'Bicicleta de montaña aro 29 con suspensión delantera' },
  { nombre: 'Bicicleta Ruta Carbon', categoria: 'Bicicletas',          stock: 4,  stockMin: 2,  precioCompra: 800000, precioVenta: 1200000, unidad: 'unidad', emoji: '🚴', codigo: 'BIC-002', descripcion: 'Bicicleta de ruta cuadro de carbono' },
  { nombre: 'Bicicleta BMX',         categoria: 'Bicicletas',          stock: 6,  stockMin: 3,  precioCompra: 180000, precioVenta: 280000, unidad: 'unidad', emoji: '🚲', codigo: 'BIC-003', descripcion: 'BMX para freestyle y pista' },
  { nombre: 'Llanta MTB 29x2.10',    categoria: 'Llantas y Neumáticos', stock: 20, stockMin: 8,  precioCompra: 35000,  precioVenta: 58000,  unidad: 'unidad', emoji: '⭕', codigo: 'LLA-001', descripcion: 'Llanta todo terreno' },
  { nombre: 'Llanta Ruta 700x25',    categoria: 'Llantas y Neumáticos', stock: 15, stockMin: 6,  precioCompra: 28000,  precioVenta: 45000,  unidad: 'unidad', emoji: '⭕', codigo: 'LLA-002', descripcion: 'Llanta de ruta alta presión' },
  { nombre: 'Cámara Aro 29',         categoria: 'Llantas y Neumáticos', stock: 30, stockMin: 10, precioCompra: 8000,   precioVenta: 14000,  unidad: 'unidad', emoji: '🔵', codigo: 'LLA-003', descripcion: 'Cámara de aire válvula Presta' },
  { nombre: 'Frenos de Disco Hidráulico', categoria: 'Frenos',         stock: 12, stockMin: 4,  precioCompra: 120000, precioVenta: 190000, unidad: 'par',    emoji: '🛑', codigo: 'FRE-001', descripcion: 'Set frenos hidráulicos 160mm' },
  { nombre: 'Pastillas de Freno',    categoria: 'Frenos',              stock: 25, stockMin: 10, precioCompra: 12000,  precioVenta: 22000,  unidad: 'par',    emoji: '🔴', codigo: 'FRE-002', descripcion: 'Pastillas orgánicas universales' },
  { nombre: 'Cable de Freno',        categoria: 'Frenos',              stock: 40, stockMin: 15, precioCompra: 3500,   precioVenta: 7000,   unidad: 'unidad', emoji: '🪢', codigo: 'FRE-003', descripcion: 'Cable acero inoxidable' },
  { nombre: 'Cassette 11v 11-42',    categoria: 'Transmisión',         stock: 10, stockMin: 4,  precioCompra: 85000,  precioVenta: 135000, unidad: 'unidad', emoji: '⚙️', codigo: 'TRA-001', descripcion: 'Cassette 11 velocidades compatible Shimano' },
  { nombre: 'Cadena 11 velocidades', categoria: 'Transmisión',         stock: 18, stockMin: 6,  precioCompra: 35000,  precioVenta: 58000,  unidad: 'unidad', emoji: '🔗', codigo: 'TRA-002', descripcion: 'Cadena KMC 11v' },
  { nombre: 'Plato Shimano 36T',     categoria: 'Transmisión',         stock: 9,  stockMin: 3,  precioCompra: 45000,  precioVenta: 72000,  unidad: 'unidad', emoji: '🌀', codigo: 'TRA-003', descripcion: 'Plato aluminio 7075' },
  { nombre: 'Desviador Trasero',     categoria: 'Transmisión',         stock: 7,  stockMin: 3,  precioCompra: 90000,  precioVenta: 145000, unidad: 'unidad', emoji: '🔧', codigo: 'TRA-004', descripcion: 'Desviador Shadow 11v' },
  { nombre: 'Manillar Aluminio 760', categoria: 'Manillar y Potencia', stock: 14, stockMin: 5,  precioCompra: 32000,  precioVenta: 52000,  unidad: 'unidad', emoji: '🎮', codigo: 'MAN-001', descripcion: 'Manillar flat bar 760mm' },
  { nombre: 'Potencia 90mm',         categoria: 'Manillar y Potencia', stock: 12, stockMin: 4,  precioCompra: 28000,  precioVenta: 45000,  unidad: 'unidad', emoji: '🔩', codigo: 'MAN-002', descripcion: 'Potencia aluminio 31.8mm' },
  { nombre: 'Grips Ergonómicos',     categoria: 'Manillar y Potencia', stock: 22, stockMin: 8,  precioCompra: 15000,  precioVenta: 26000,  unidad: 'par',    emoji: '✊', codigo: 'MAN-003', descripcion: 'Grips lock-on ergonómicos' },
  { nombre: 'Sillín Gel Comfort',    categoria: 'Sillín',              stock: 16, stockMin: 5,  precioCompra: 42000,  precioVenta: 68000,  unidad: 'unidad', emoji: '🪑', codigo: 'SIL-001', descripcion: 'Sillín acolchado gel para larga distancia' },
  { nombre: 'Tija de Sillín 31.6',   categoria: 'Sillín',              stock: 10, stockMin: 3,  precioCompra: 25000,  precioVenta: 40000,  unidad: 'unidad', emoji: '📏', codigo: 'SIL-002', descripcion: 'Tija telescópica aluminio' },
  { nombre: 'Luz Delantera LED',     categoria: 'Iluminación',         stock: 20, stockMin: 8,  precioCompra: 18000,  precioVenta: 32000,  unidad: 'unidad', emoji: '💡', codigo: 'ILU-001', descripcion: 'Luz recargable USB 800 lúmenes' },
  { nombre: 'Luz Trasera Roja',      categoria: 'Iluminación',         stock: 25, stockMin: 8,  precioCompra: 10000,  precioVenta: 18000,  unidad: 'unidad', emoji: '🔴', codigo: 'ILU-002', descripcion: 'Luz trasera recargable con sensor' },
  { nombre: 'Casco MTB',             categoria: 'Accesorios',          stock: 12, stockMin: 4,  precioCompra: 75000,  precioVenta: 125000, unidad: 'unidad', emoji: '⛑️', codigo: 'ACC-001', descripcion: 'Casco certificado MIPS' },
  { nombre: 'Candado U-Lock',        categoria: 'Accesorios',          stock: 15, stockMin: 5,  precioCompra: 38000,  precioVenta: 62000,  unidad: 'unidad', emoji: '🔒', codigo: 'ACC-002', descripcion: 'Candado U-Lock nivel 7 seguridad' },
  { nombre: 'Portabotellas',         categoria: 'Accesorios',          stock: 30, stockMin: 10, precioCompra: 8000,   precioVenta: 14000,  unidad: 'unidad', emoji: '🧴', codigo: 'ACC-003', descripcion: 'Porta bidón aluminio' },
  { nombre: 'Computador GPS',        categoria: 'Accesorios',          stock: 6,  stockMin: 2,  precioCompra: 180000, precioVenta: 280000, unidad: 'unidad', emoji: '📱', codigo: 'ACC-004', descripcion: 'Ciclocomputador con GPS y Bluetooth' },
  { nombre: 'Kit Herramientas',      categoria: 'Herramientas',        stock: 10, stockMin: 3,  precioCompra: 55000,  precioVenta: 90000,  unidad: 'kit',    emoji: '🧰', codigo: 'HER-001', descripcion: 'Kit multi-herramienta 16 funciones' },
  { nombre: 'Bomba de Piso',         categoria: 'Herramientas',        stock: 8,  stockMin: 2,  precioCompra: 42000,  precioVenta: 68000,  unidad: 'unidad', emoji: '🔧', codigo: 'HER-002', descripcion: 'Bomba piso manómetro dual válvula' },
  { nombre: 'Parche Tubeless',       categoria: 'Herramientas',        stock: 50, stockMin: 20, precioCompra: 2500,   precioVenta: 5000,   unidad: 'unidad', emoji: '🩹', codigo: 'HER-003', descripcion: 'Kit parches tubeless self-sealing' },
  { nombre: 'Aceite Cadena 100ml',   categoria: 'Lubricantes',         stock: 35, stockMin: 12, precioCompra: 9000,   precioVenta: 16000,  unidad: 'unidad', emoji: '🛢️', codigo: 'LUB-001', descripcion: 'Lubricante específico para cadena' },
  { nombre: 'Desengrasante 500ml',   categoria: 'Lubricantes',         stock: 20, stockMin: 8,  precioCompra: 12000,  precioVenta: 22000,  unidad: 'unidad', emoji: '🧼', codigo: 'LUB-002', descripcion: 'Desengrasante biodegradable' },
  { nombre: 'Guantes MTB',           categoria: 'Ropa y Equipamiento', stock: 18, stockMin: 6,  precioCompra: 28000,  precioVenta: 48000,  unidad: 'par',    emoji: '🧤', codigo: 'ROP-001', descripcion: 'Guantes amortiguados ventilados' },
  { nombre: 'Malla Ciclista',        categoria: 'Ropa y Equipamiento', stock: 14, stockMin: 5,  precioCompra: 45000,  precioVenta: 75000,  unidad: 'unidad', emoji: '👕', codigo: 'ROP-002', descripcion: 'Malla técnica transpirable UV50+' },
  { nombre: 'Culote Acolchado',      categoria: 'Ropa y Equipamiento', stock: 10, stockMin: 4,  precioCompra: 55000,  precioVenta: 90000,  unidad: 'unidad', emoji: '🩳', codigo: 'ROP-003', descripcion: 'Culote con badana gel 3D' },
  { nombre: 'Motor Eléctrico 250W',  categoria: 'Electricidad',        stock: 3,  stockMin: 1,  precioCompra: 450000, precioVenta: 720000, unidad: 'unidad', emoji: '⚡', codigo: 'ELE-001', descripcion: 'Kit conversión bicicleta eléctrica' },
  { nombre: 'Batería Litio 36V',     categoria: 'Electricidad',        stock: 4,  stockMin: 2,  precioCompra: 380000, precioVenta: 600000, unidad: 'unidad', emoji: '🔋', codigo: 'ELE-002', descripcion: 'Batería 36V 10Ah para e-bike' },
];

const EMOJIS = ['🚲','🚵','🚴','🏍️','⭕','⚙️','🔧','🔩','🪛','🛠️','🧰','🔗','🌀','💡','🔴','🔵','⛑️','🔒','🧴','📱','🩹','🛢️','🧼','🧤','👕','🩳','⚡','🔋','🎮','✊','🪑','📏','🏁','🥇','🏆','💰','📦','🛒','🚀','❤️'];

// ============================================
// UTILIDADES
// ============================================
const fmt = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
const fmtShort = (n) => {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return '$' + (n / 1_000).toFixed(0) + 'K';
  return fmt(n);
};
const uid = () => STATE.nextId++;
const today = () => new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

function toast(msg, type = 'success', icon = null) {
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fas ${icon || icons[type]}"></i><span>${msg}</span>`;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(() => { el.classList.add('fade-out'); setTimeout(() => el.remove(), 350); }, 3000);
}

function saveData() {
  localStorage.setItem('bicistore_productos',    JSON.stringify(STATE.productos));
  localStorage.setItem('bicistore_movimientos',  JSON.stringify(STATE.movimientos));
  localStorage.setItem('bicistore_nextId',       JSON.stringify(STATE.nextId));
}

function loadData() {
  try {
    const p = localStorage.getItem('bicistore_productos');
    const m = localStorage.getItem('bicistore_movimientos');
    const n = localStorage.getItem('bicistore_nextId');
    if (p) STATE.productos    = JSON.parse(p);
    if (m) STATE.movimientos  = JSON.parse(m);
    if (n) STATE.nextId       = JSON.parse(n);
  } catch(e) {
    console.warn('localStorage corrupto, reiniciando datos:', e);
    localStorage.clear();
    STATE.productos   = [];
    STATE.movimientos = [];
    STATE.nextId      = 1;
  }

  if (!STATE.productos.length) {
    PRODUCTOS_DEFAULT.forEach(d => {
      STATE.productos.push({ id: uid(), activo: true, vendidos: 0, ...d });
    });
    saveData();
  }
}

// ============================================
// NAVEGACIÓN
// ============================================
const TITLES = {
  dashboard:    'Dashboard',
  inventario:   'Inventario',
  ventas:       'Nueva Venta',
  compras:      'Nueva Compra',
  movimientos:  'Movimientos',
  calculadora:  'Calculadora',
};

function navigate(section) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.section === section));
  document.querySelectorAll('.section').forEach(el => {
    el.classList.remove('active');
    if (el.id === `section-${section}`) el.classList.add('active');
  });
  document.getElementById('pageTitle').textContent = TITLES[section] || section;

  if (section === 'dashboard')   renderDashboard();
  if (section === 'inventario')  renderInventory();
  if (section === 'ventas')      renderVentasSelect();
  if (section === 'compras')     renderComprasSelect();
  if (section === 'movimientos') renderMovimientos();

  // close mobile sidebar
  document.getElementById('sidebar').classList.remove('mobile-open');
}

// ============================================
// DASHBOARD
// ============================================
function renderDashboard() {
  const totalProductos = STATE.productos.length;
  const totalValor     = STATE.productos.reduce((s, p) => s + p.precioVenta * p.stock, 0);
  const ventas         = STATE.movimientos.filter(m => m.tipo === 'venta');
  const totalVentas    = ventas.reduce((s, m) => s + m.total, 0);
  const stockBajo      = STATE.productos.filter(p => p.stock <= p.stockMin && p.stock > 0).length;
  const agotados       = STATE.productos.filter(p => p.stock === 0).length;

  animateNumber('totalProductos', totalProductos);
  document.getElementById('totalValor').textContent   = fmtShort(totalValor);
  document.getElementById('totalVentas').textContent  = fmtShort(totalVentas);
  document.getElementById('stockBajo').textContent    = stockBajo + agotados;
  document.getElementById('alertBadge').textContent   = stockBajo + agotados;

  // Recent moves
  const recentEl = document.getElementById('recentMoves');
  const recent = [...STATE.movimientos].reverse().slice(0, 8);
  if (!recent.length) {
    recentEl.innerHTML = '<p class="empty-msg">Sin movimientos aún</p>';
  } else {
    recentEl.innerHTML = recent.map(m => `
      <div class="move-item">
        <div class="move-icon ${m.tipo === 'venta' ? 'sale' : 'buy'}">
          <i class="fas ${m.tipo === 'venta' ? 'fa-arrow-up' : 'fa-arrow-down'}"></i>
        </div>
        <div class="move-info">
          <strong>${m.productoNombre}</strong>
          <span>${m.tipo === 'venta' ? 'Venta' : 'Compra'} • ${m.cantidad} ${m.unidad} • ${m.fecha}</span>
        </div>
        <span class="move-amount ${m.tipo === 'venta' ? 'green' : 'red'}">${m.tipo === 'venta' ? '+' : '-'}${fmtShort(m.total)}</span>
      </div>`).join('');
  }

  // Top products
  const topEl = document.getElementById('topProducts');
  const top = [...STATE.productos].sort((a, b) => b.vendidos - a.vendidos).slice(0, 5);
  if (!top.some(p => p.vendidos > 0)) {
    topEl.innerHTML = '<p class="empty-msg">Sin ventas registradas</p>';
  } else {
    topEl.innerHTML = top.filter(p => p.vendidos > 0).map((p, i) => `
      <div class="top-item">
        <span class="top-emoji">${p.emoji}</span>
        <div class="top-info">
          <strong>${p.nombre}</strong>
          <span>${p.vendidos} unidades vendidas</span>
        </div>
        <span class="top-rank">#${i + 1}</span>
      </div>`).join('');
  }

  // Alerts
  const alertsEl = document.getElementById('alertsList');
  const alertProds = STATE.productos.filter(p => p.stock <= p.stockMin);
  if (!alertProds.length) {
    alertsEl.innerHTML = '<p class="empty-msg">Sin alertas de stock ✅</p>';
  } else {
    alertsEl.innerHTML = alertProds.map(p => `
      <div class="alert-item">
        <span>${p.emoji}</span>
        <i class="fas ${p.stock === 0 ? 'fa-ban' : 'fa-exclamation-triangle'}"></i>
        <span><strong>${p.nombre}</strong> — ${p.stock === 0 ? 'AGOTADO' : `Stock: ${p.stock} (mín: ${p.stockMin})`}</span>
      </div>`).join('');
  }
}

function animateNumber(id, value) {
  const el = document.getElementById(id);
  let current = 0;
  const step = Math.ceil(value / 30);
  const timer = setInterval(() => {
    current = Math.min(current + step, value);
    el.textContent = current.toLocaleString('es-CO');
    if (current >= value) clearInterval(timer);
  }, 30);
}

// ============================================
// INVENTARIO - TABLA
// ============================================
function getFilteredProducts() {
  const cat   = document.getElementById('filterCategoria').value;
  const stock = document.getElementById('filterStock').value;
  const q     = (document.getElementById('invSearch').value || '').toLowerCase().trim();

  return STATE.productos.filter(p => {
    if (cat && p.categoria !== cat) return false;
    if (stock === 'bajo')    return p.stock > 0 && p.stock <= p.stockMin;
    if (stock === 'normal')  return p.stock > p.stockMin;
    if (stock === 'agotado') return p.stock === 0;
    if (q) return (
      p.nombre.toLowerCase().includes(q) ||
      p.codigo.toLowerCase().includes(q)
    );
    return true;
  });
}

// Resalta la coincidencia dentro de un texto
function highlight(text, q) {
  if (!q) return text;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<span class="highlight">$1</span>');
}

function renderInventory() {
  renderCategoryChips();
  const products = getFilteredProducts();
  const tbody    = document.getElementById('inventoryBody');
  const empty    = document.getElementById('tableEmpty');
  const q        = (document.getElementById('invSearch').value || '').toLowerCase().trim();

  // Contador de resultados
  const resEl = document.getElementById('invSearchResults');
  if (resEl) {
    if (q) {
      resEl.textContent  = products.length
        ? `${products.length} resultado${products.length !== 1 ? 's' : ''} encontrado${products.length !== 1 ? 's' : ''}`
        : 'Sin resultados';
      resEl.className    = 'inv-search-results ' + (products.length ? 'has-results' : 'no-results');
    } else {
      resEl.textContent = '';
      resEl.className   = 'inv-search-results';
    }
  }

  // Botón limpiar
  const clearBtn = document.getElementById('invSearchClear');
  if (clearBtn) clearBtn.classList.toggle('visible', q.length > 0);
  const tbody = document.getElementById('inventoryBody');
  const empty = document.getElementById('tableEmpty');

  if (!products.length) {
    tbody.innerHTML = '';
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';

  tbody.innerHTML = products.map(p => {
    const margin    = p.precioCompra > 0 ? ((p.precioVenta - p.precioCompra) / p.precioVenta * 100).toFixed(1) : 0;
    const marginCls = margin >= 30 ? 'margin-good' : margin >= 15 ? 'margin-mid' : 'margin-bad';
    const stockCls  = p.stock === 0 ? 'stock-empty' : p.stock <= p.stockMin ? 'stock-low' : 'stock-ok';
    const hNombre   = highlight(p.nombre, q);
    const hCodigo   = highlight(p.codigo, q);
    return `
    <tr>
      <td class="prod-emoji-cell">${p.emoji}</td>
      <td><code style="font-size:.78rem;color:var(--text3)">${hCodigo}</code></td>
      <td>
        <div style="font-weight:600">${hNombre}</div>
        ${p.descripcion ? `<div style="font-size:.75rem;color:var(--text3);margin-top:2px">${p.descripcion.substring(0,45)}${p.descripcion.length>45?'...':''}</div>` : ''}
      </td>
      <td><span style="font-size:.8rem;padding:3px 8px;background:var(--bg3);border-radius:20px">${p.categoria}</span></td>
      <td>
        <span class="stock-badge ${stockCls}">
          <i class="fas ${p.stock === 0 ? 'fa-ban' : p.stock <= p.stockMin ? 'fa-exclamation-triangle' : 'fa-check'}"></i>
          ${p.stock} ${p.unidad}
        </span>
        <div style="font-size:.72rem;color:var(--text3);margin-top:3px">Mín: ${p.stockMin}</div>
      </td>
      <td class="price-cell">${fmt(p.precioCompra)}</td>
      <td class="price-cell sell">${fmt(p.precioVenta)}</td>
      <td class="margin-cell ${marginCls}">${margin}%</td>
      <td><span class="status-badge ${p.activo ? 'status-active' : 'status-inactive'}">${p.activo ? 'Activo' : 'Inactivo'}</span></td>
      <td class="actions-cell">
        <button class="btn btn-sm btn-primary btn-icon" title="Editar" onclick="editProducto(${p.id})"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-outline btn-icon" title="${p.activo ? 'Desactivar' : 'Activar'}" onclick="toggleActivo(${p.id})">
          <i class="fas ${p.activo ? 'fa-eye-slash' : 'fa-eye'}"></i>
        </button>
        <button class="btn btn-sm btn-danger btn-icon" title="Eliminar" onclick="deleteProducto(${p.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`;
  }).join('');
}

// ============================================
// CATEGORY CHIPS
// ============================================
const CAT_META = {
  'Bicicletas':           { emoji: '🚲', color: '#2563eb' },
  'Llantas y Neumáticos': { emoji: '⭕', color: '#7c3aed' },
  'Frenos':               { emoji: '🛑', color: '#dc2626' },
  'Transmisión':          { emoji: '⚙️', color: '#d97706' },
  'Manillar y Potencia':  { emoji: '🎮', color: '#0891b2' },
  'Sillín':               { emoji: '🪑', color: '#9333ea' },
  'Iluminación':          { emoji: '💡', color: '#ca8a04' },
  'Accesorios':           { emoji: '🧴', color: '#16a34a' },
  'Herramientas':         { emoji: '🧰', color: '#ea580c' },
  'Lubricantes':          { emoji: '🛢️', color: '#475569' },
  'Ropa y Equipamiento':  { emoji: '👕', color: '#db2777' },
  'Electricidad':         { emoji: '⚡', color: '#4f46e5' },
};

let activeChip = ''; // '' = Todos

function renderCategoryChips() {
  const container = document.getElementById('categoryChips');
  if (!container) return;

  // Contar productos por categoría
  const counts = {};
  STATE.productos.forEach(p => {
    counts[p.categoria] = (counts[p.categoria] || 0) + 1;
  });
  const total = STATE.productos.length;

  // Chip "Todos"
  let html = `
    <div class="cat-chip chip-all ${activeChip === '' ? 'active' : ''}" onclick="filterByChip('')">
      <span class="cat-chip-emoji">📦</span>
      <span class="cat-chip-label">Todos</span>
      <span class="cat-chip-count">${total}</span>
    </div>`;

  // Chips por categoría (solo las que tienen productos)
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      const meta = CAT_META[cat] || { emoji: '🔹', color: '#64748b' };
      html += `
        <div class="cat-chip ${activeChip === cat ? 'active' : ''}" onclick="filterByChip('${cat.replace(/'/g, "\\'")}')"
             style="${activeChip === cat ? '' : `--chip-accent:${meta.color}`}">
          <span class="cat-chip-emoji">${meta.emoji}</span>
          <span class="cat-chip-label">${cat}</span>
          <span class="cat-chip-count">${count}</span>
        </div>`;
    });

  container.innerHTML = html;
}

function filterByChip(cat) {
  activeChip = cat;
  // Sync with the dropdown filter too
  document.getElementById('filterCategoria').value = cat;
  renderCategoryChips();
  renderInventory();
}

// ============================================
// CRUD PRODUCTOS
// ============================================
function openModalNuevo() {
  STATE.editingId = null;
  document.getElementById('modalTitle').innerHTML = '<i class="fas fa-plus"></i> Agregar Producto';
  document.getElementById('prodId').value         = '';
  document.getElementById('prodCodigo').value     = autoCode();
  document.getElementById('prodNombre').value     = '';
  document.getElementById('prodCategoria').value  = '';
  document.getElementById('prodStock').value      = '0';
  document.getElementById('prodStockMin').value   = '5';
  document.getElementById('prodPrecioCompra').value = '';
  document.getElementById('prodPrecioVenta').value  = '';
  document.getElementById('prodUnidad').value     = 'unidad';
  document.getElementById('prodDescripcion').value  = '';
  document.getElementById('prodEmoji').value      = '🚲';
  renderEmojiPicker('🚲');
  document.getElementById('modalProducto').classList.add('open');
}

function editProducto(id) {
  const p = STATE.productos.find(x => x.id === id);
  if (!p) return;
  STATE.editingId = id;
  document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i> Editar Producto';
  document.getElementById('prodId').value           = p.id;
  document.getElementById('prodCodigo').value       = p.codigo;
  document.getElementById('prodNombre').value       = p.nombre;
  document.getElementById('prodCategoria').value    = p.categoria;
  document.getElementById('prodStock').value        = p.stock;
  document.getElementById('prodStockMin').value     = p.stockMin;
  document.getElementById('prodPrecioCompra').value = p.precioCompra;
  document.getElementById('prodPrecioVenta').value  = p.precioVenta;
  document.getElementById('prodUnidad').value       = p.unidad;
  document.getElementById('prodDescripcion').value  = p.descripcion || '';
  document.getElementById('prodEmoji').value        = p.emoji;
  renderEmojiPicker(p.emoji);
  document.getElementById('modalProducto').classList.add('open');
}

function saveProducto() {
  const nombre       = document.getElementById('prodNombre').value.trim();
  const categoria    = document.getElementById('prodCategoria').value;
  const stock        = parseInt(document.getElementById('prodStock').value) || 0;
  const stockMin     = parseInt(document.getElementById('prodStockMin').value) || 0;
  const precioCompra = parseFloat(document.getElementById('prodPrecioCompra').value) || 0;
  const precioVenta  = parseFloat(document.getElementById('prodPrecioVenta').value) || 0;
  const unidad       = document.getElementById('prodUnidad').value;
  const descripcion  = document.getElementById('prodDescripcion').value.trim();
  const emoji        = document.getElementById('prodEmoji').value;
  const codigo       = document.getElementById('prodCodigo').value.trim() || autoCode();

  if (!nombre || !categoria) { toast('Nombre y categoría son obligatorios', 'error'); return; }
  if (precioVenta <= 0)      { toast('El precio de venta debe ser mayor a 0', 'warning'); return; }

  if (STATE.editingId) {
    const idx = STATE.productos.findIndex(x => x.id === STATE.editingId);
    if (idx !== -1) {
      STATE.productos[idx] = { ...STATE.productos[idx], nombre, categoria, stock, stockMin, precioCompra, precioVenta, unidad, descripcion, emoji, codigo };
      toast(`✏️ "${nombre}" actualizado`, 'success');
    }
  } else {
    STATE.productos.push({ id: uid(), activo: true, vendidos: 0, nombre, categoria, stock, stockMin, precioCompra, precioVenta, unidad, descripcion, emoji, codigo });
    toast(`🎉 "${nombre}" agregado al inventario`, 'success');
  }

  saveData();
  closeModal();
  renderInventory();   // includes renderCategoryChips()
  renderDashboard();
}

function deleteProducto(id) {
  const p = STATE.productos.find(x => x.id === id);
  if (!p) return;
  if (!confirm(`¿Eliminar "${p.nombre}"? Esta acción no se puede deshacer.`)) return;
  STATE.productos = STATE.productos.filter(x => x.id !== id);
  saveData();
  renderInventory();   // includes renderCategoryChips()
  renderDashboard();
  toast(`🗑️ "${p.nombre}" eliminado`, 'warning');
}

function toggleActivo(id) {
  const p = STATE.productos.find(x => x.id === id);
  if (!p) return;
  p.activo = !p.activo;
  saveData();
  renderInventory();
  toast(`${p.activo ? '✅ Activado' : '🔕 Desactivado'}: ${p.nombre}`, p.activo ? 'success' : 'warning');
}

function closeModal() {
  document.getElementById('modalProducto').classList.remove('open');
  STATE.editingId = null;
}

function autoCode() {
  return 'PROD-' + String(STATE.nextId).padStart(3, '0');
}

// ---- EMOJI PICKER ----
function renderEmojiPicker(selected) {
  const container = document.getElementById('emojiPicker');
  container.innerHTML = EMOJIS.map(e => `
    <span class="emoji-option ${e === selected ? 'selected' : ''}" onclick="selectEmoji('${e}')">${e}</span>
  `).join('');
}

function selectEmoji(emoji) {
  document.getElementById('prodEmoji').value = emoji;
  document.querySelectorAll('.emoji-option').forEach(el => el.classList.toggle('selected', el.textContent === emoji));
}

// ============================================
// VENTAS
// ============================================
function renderVentasSelect() {
  const sel = document.getElementById('ventaProducto');
  sel.innerHTML = '<option value="">Selecciona un producto</option>' +
    STATE.productos.filter(p => p.activo && p.stock > 0).map(p =>
      `<option value="${p.id}" data-precio="${p.precioVenta}" data-stock="${p.stock}" data-unidad="${p.unidad}">${p.emoji} ${p.nombre} (Stock: ${p.stock})</option>`
    ).join('');
  renderVentasHistorial();
  calcVentaTotal();
}

function calcVentaTotal() {
  const sel       = document.getElementById('ventaProducto');
  const opt       = sel.options[sel.selectedIndex];
  const precio    = opt ? parseFloat(opt.dataset.precio || 0) : 0;
  const cantidad  = parseInt(document.getElementById('ventaCantidad').value) || 0;
  const descuento = parseFloat(document.getElementById('ventaDescuento').value) || 0;
  const subtotal  = precio * cantidad;
  const total     = subtotal * (1 - descuento / 100);
  document.getElementById('ventaPrecio').value = precio > 0 ? precio : '';
  document.getElementById('ventaTotal').value  = total > 0 ? fmt(total) : '';
}

function registrarVenta() {
  const sel      = document.getElementById('ventaProducto');
  const prodId   = parseInt(sel.value);
  const opt      = sel.options[sel.selectedIndex];
  const cantidad = parseInt(document.getElementById('ventaCantidad').value) || 0;
  const descuento= parseFloat(document.getElementById('ventaDescuento').value) || 0;
  const cliente  = document.getElementById('ventaCliente').value.trim() || 'Anónimo';

  if (!prodId)     { toast('Selecciona un producto', 'error'); return; }
  if (cantidad < 1){ toast('Cantidad debe ser al menos 1', 'error'); return; }

  const prod = STATE.productos.find(p => p.id === prodId);
  if (!prod) return;
  if (cantidad > prod.stock) { toast(`Stock insuficiente. Disponible: ${prod.stock} ${prod.unidad}`, 'error'); return; }

  const precio  = prod.precioVenta;
  const total   = precio * cantidad * (1 - descuento / 100);

  prod.stock    -= cantidad;
  prod.vendidos  = (prod.vendidos || 0) + cantidad;

  STATE.movimientos.push({
    id: uid(), tipo: 'venta', productoId: prod.id, productoNombre: prod.nombre,
    cantidad, precio, descuento, total, cliente, unidad: prod.unidad, fecha: today(),
    emoji: prod.emoji,
  });

  saveData();
  toast(`💰 Venta registrada: ${fmt(total)}`, 'success');

  // reset form
  document.getElementById('ventaProducto').value   = '';
  document.getElementById('ventaCantidad').value   = '1';
  document.getElementById('ventaDescuento').value  = '0';
  document.getElementById('ventaCliente').value    = '';
  document.getElementById('ventaPrecio').value     = '';
  document.getElementById('ventaTotal').value      = '';

  renderVentasSelect();
  renderDashboard();

  if (prod.stock <= prod.stockMin) {
    setTimeout(() => toast(`⚠️ Stock bajo en "${prod.nombre}": ${prod.stock} restantes`, 'warning'), 1000);
  }
}

function renderVentasHistorial() {
  const el = document.getElementById('ventasList');
  const ventas = STATE.movimientos.filter(m => m.tipo === 'venta').reverse().slice(0, 20);
  if (!ventas.length) { el.innerHTML = '<p class="empty-msg">Sin ventas registradas</p>'; return; }
  el.innerHTML = ventas.map(m => `
    <div class="move-item">
      <div class="move-icon sale"><i class="fas fa-arrow-up"></i></div>
      <div class="move-info">
        <strong>${m.emoji || '🛍️'} ${m.productoNombre}</strong>
        <span>${m.cantidad} ${m.unidad} • Cliente: ${m.cliente} • ${m.fecha}</span>
        ${m.descuento > 0 ? `<span style="color:#fbbf24;font-size:.72rem">Desc: ${m.descuento}%</span>` : ''}
      </div>
      <span class="move-amount green">+${fmt(m.total)}</span>
    </div>`).join('');
}

// ============================================
// COMPRAS
// ============================================
function renderComprasSelect() {
  const sel = document.getElementById('compraProducto');
  sel.innerHTML = '<option value="">Selecciona un producto</option>' +
    STATE.productos.map(p =>
      `<option value="${p.id}" data-precio="${p.precioCompra}" data-unidad="${p.unidad}">${p.emoji} ${p.nombre}</option>`
    ).join('');
  renderComprasHistorial();
  calcCompraTotal();
}

function calcCompraTotal() {
  const sel     = document.getElementById('compraProducto');
  const opt     = sel.options[sel.selectedIndex];
  const precio  = parseFloat(document.getElementById('compraPrecio').value) || (opt ? parseFloat(opt.dataset.precio || 0) : 0);
  const cantidad = parseInt(document.getElementById('compraCantidad').value) || 0;
  const total   = precio * cantidad;
  document.getElementById('compraTotal').value = total > 0 ? fmt(total) : '';
}

function onCompraProductoChange() {
  const sel  = document.getElementById('compraProducto');
  const opt  = sel.options[sel.selectedIndex];
  const precio = opt ? opt.dataset.precio : '';
  document.getElementById('compraPrecio').value = precio || '';
  calcCompraTotal();
}

function registrarCompra() {
  const sel       = document.getElementById('compraProducto');
  const prodId    = parseInt(sel.value);
  const cantidad  = parseInt(document.getElementById('compraCantidad').value) || 0;
  const precio    = parseFloat(document.getElementById('compraPrecio').value) || 0;
  const proveedor = document.getElementById('compraProveedor').value.trim() || 'Sin proveedor';

  if (!prodId)    { toast('Selecciona un producto', 'error'); return; }
  if (cantidad < 1){ toast('Cantidad debe ser al menos 1', 'error'); return; }
  if (precio <= 0) { toast('Ingresa un precio de compra válido', 'error'); return; }

  const prod   = STATE.productos.find(p => p.id === prodId);
  if (!prod) return;
  const total  = precio * cantidad;

  prod.stock        += cantidad;
  prod.precioCompra  = precio;

  STATE.movimientos.push({
    id: uid(), tipo: 'compra', productoId: prod.id, productoNombre: prod.nombre,
    cantidad, precio, total, proveedor, unidad: prod.unidad, fecha: today(), emoji: prod.emoji,
  });

  saveData();
  toast(`📦 Entrada registrada: +${cantidad} ${prod.unidad} de "${prod.nombre}"`, 'success');

  document.getElementById('compraProducto').value  = '';
  document.getElementById('compraCantidad').value  = '1';
  document.getElementById('compraPrecio').value    = '';
  document.getElementById('compraProveedor').value = '';
  document.getElementById('compraTotal').value     = '';

  renderComprasSelect();
  renderDashboard();
}

function renderComprasHistorial() {
  const el = document.getElementById('comprasList');
  const compras = STATE.movimientos.filter(m => m.tipo === 'compra').reverse().slice(0, 20);
  if (!compras.length) { el.innerHTML = '<p class="empty-msg">Sin compras registradas</p>'; return; }
  el.innerHTML = compras.map(m => `
    <div class="move-item">
      <div class="move-icon buy"><i class="fas fa-arrow-down"></i></div>
      <div class="move-info">
        <strong>${m.emoji || '📦'} ${m.productoNombre}</strong>
        <span>${m.cantidad} ${m.unidad} • Proveedor: ${m.proveedor} • ${m.fecha}</span>
      </div>
      <span class="move-amount red">-${fmt(m.total)}</span>
    </div>`).join('');
}

// ============================================
// MOVIMIENTOS
// ============================================
function renderMovimientos() {
  const filter = document.getElementById('filterMovType').value;
  const movs   = [...STATE.movimientos].reverse().filter(m => !filter || m.tipo === filter);

  const ingresos = STATE.movimientos.filter(m => m.tipo === 'venta').reduce((s, m) => s + m.total, 0);
  const egresos  = STATE.movimientos.filter(m => m.tipo === 'compra').reduce((s, m) => s + m.total, 0);
  const balance  = ingresos - egresos;

  document.getElementById('sumIngresos').textContent = fmt(ingresos);
  document.getElementById('sumEgresos').textContent  = fmt(egresos);
  const balEl = document.getElementById('sumBalance');
  balEl.textContent  = fmt(Math.abs(balance));
  balEl.style.color  = balance >= 0 ? '#4ade80' : '#f87171';

  const el = document.getElementById('allMovesList');
  if (!movs.length) { el.innerHTML = '<p class="empty-msg" style="padding:32px">Sin movimientos</p>'; return; }
  el.innerHTML = movs.map(m => `
    <div class="move-item">
      <div class="move-icon ${m.tipo === 'venta' ? 'sale' : 'buy'}">
        <i class="fas ${m.tipo === 'venta' ? 'fa-arrow-up' : 'fa-arrow-down'}"></i>
      </div>
      <div class="move-info">
        <strong>${m.emoji || ''} ${m.productoNombre}</strong>
        <span>
          ${m.tipo === 'venta' ? `🛍️ Venta • Cliente: ${m.cliente}` : `📦 Compra • Proveedor: ${m.proveedor}`}
          • ${m.cantidad} ${m.unidad} • ${m.fecha}
          ${m.descuento > 0 ? `• Desc: ${m.descuento}%` : ''}
        </span>
      </div>
      <div style="text-align:right">
        <span class="move-amount ${m.tipo === 'venta' ? 'green' : 'red'}">${m.tipo === 'venta' ? '+' : '-'}${fmt(m.total)}</span>
        <div style="font-size:.72rem;color:var(--text3)">Unit: ${fmt(m.precio)}</div>
      </div>
    </div>`).join('');
}

// ============================================
// EXPORTAR CSV
// ============================================
function exportCSV() {
  const rows = [['Tipo','Producto','Cantidad','Unidad','Precio Unit.','Total','Cliente/Proveedor','Fecha']];
  STATE.movimientos.forEach(m => {
    rows.push([
      m.tipo, m.productoNombre, m.cantidad, m.unidad,
      m.precio, m.total,
      m.tipo === 'venta' ? m.cliente : m.proveedor,
      m.fecha,
    ]);
  });
  const csv  = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a'); a.href = url; a.download = 'bicistore_movimientos.csv';
  a.click(); URL.revokeObjectURL(url);
  toast('📄 CSV exportado correctamente', 'success');
}

// ============================================
// CALCULADORA
// ============================================
let calcState = { expression: '', result: '0', hasError: false };

function calcNum(n) {
  if (calcState.hasError) calcClear();
  calcState.expression += n;
  updateCalcDisplay();
}

function calcOp(op) {
  if (calcState.hasError) calcClear();
  const ops = ['+', '-', '*', '/'];
  const last = calcState.expression.slice(-1);
  if (ops.includes(last)) calcState.expression = calcState.expression.slice(0, -1);
  calcState.expression += op;
  updateCalcDisplay();
}

function calcEqual() {
  try {
    if (!calcState.expression) return;
    // Safe eval using Function
    const expr = calcState.expression.replace(/÷/g, '/').replace(/×/g, '*');
    // eslint-disable-next-line no-new-func
    const res  = Function('"use strict"; return (' + expr + ')')();
    if (!isFinite(res)) throw new Error('Infinito');
    calcState.result     = parseFloat(res.toFixed(10)).toLocaleString('es-CO');
    calcState.expression = String(res);
    calcState.hasError   = false;
  } catch {
    calcState.result   = 'Error';
    calcState.hasError = true;
  }
  updateCalcDisplay();
}

function calcClear() {
  calcState = { expression: '', result: '0', hasError: false };
  updateCalcDisplay();
}

function calcBackspace() {
  if (calcState.hasError) { calcClear(); return; }
  calcState.expression = calcState.expression.slice(0, -1);
  updateCalcDisplay();
}

function updateCalcDisplay() {
  document.getElementById('calcExpression').textContent = calcState.expression
    .replace(/\*/g, ' × ').replace(/\//g, ' ÷ ').replace(/\+/g, ' + ');
  document.getElementById('calcResult').textContent = calcState.result;
  document.getElementById('calcResult').style.color = calcState.hasError ? '#f87171' : 'var(--text)';
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  const section = document.querySelector('.section.active');
  if (!section || section.id !== 'section-calculadora') return;
  if ('0123456789.'.includes(e.key)) calcNum(e.key);
  else if ('+-*/'.includes(e.key)) calcOp(e.key);
  else if (e.key === 'Enter' || e.key === '=') calcEqual();
  else if (e.key === 'Backspace') calcBackspace();
  else if (e.key === 'Escape') calcClear();
});

// ============================================
// CALCULADORA DE RENTABILIDAD
// ============================================
function calcProfit() {
  const compra   = parseFloat(document.getElementById('pcCompra').value)   || 0;
  const venta    = parseFloat(document.getElementById('pcVenta').value)    || 0;
  const cantidad = parseFloat(document.getElementById('pcCantidad').value) || 1;

  const ganUnit  = venta - compra;
  const margen   = venta > 0 ? ((ganUnit / venta) * 100).toFixed(1) : 0;
  const ganTotal = ganUnit * cantidad;
  const roi      = compra > 0 ? ((ganUnit / compra) * 100).toFixed(1) : 0;

  document.getElementById('gananciaUnit').textContent = fmt(ganUnit);
  document.getElementById('margenPct').textContent    = margen + '%';
  document.getElementById('gananciaTotal').textContent = fmt(ganTotal);
  document.getElementById('roiVal').textContent       = roi + '%';

  document.getElementById('gananciaUnit').style.color  = ganUnit >= 0 ? '#4ade80' : '#f87171';
  document.getElementById('gananciaTotal').style.color = ganTotal >= 0 ? '#4ade80' : '#f87171';
}

// ============================================
// BÚSQUEDA GLOBAL
// ============================================
function handleGlobalSearch() {
  const el = document.getElementById('globalSearch');
  const q = el ? el.value.toLowerCase() : '';
  if (!q) return;
  navigate('inventario');
  setTimeout(renderInventory, 50);
}

// ============================================
// EVENT LISTENERS
// ============================================
function el(id) { return document.getElementById(id); }

function initEvents() {
  // Sidebar navigation
  document.querySelectorAll('.nav-item').forEach(n => {
    n.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(n.dataset.section);
    });
  });

  // Sidebar toggle (desktop)
  el('sidebarToggle')?.addEventListener('click', () => {
    el('sidebar')?.classList.toggle('collapsed');
    el('mainContent')?.classList.toggle('expanded');
  });

  // Mobile menu
  el('menuBtn')?.addEventListener('click', () => {
    el('sidebar')?.classList.toggle('mobile-open');
  });

  // Modal
  el('btnAgregarProducto')?.addEventListener('click', openModalNuevo);
  el('modalClose')?.addEventListener('click', closeModal);
  el('btnCancelarModal')?.addEventListener('click', closeModal);
  el('btnGuardarProducto')?.addEventListener('click', saveProducto);
  el('modalProducto')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Buscador inventario
  el('invSearch')?.addEventListener('input', () => renderInventory());
  el('invSearchClear')?.addEventListener('click', () => {
    el('invSearch').value = '';
    renderInventory();
    el('invSearch').focus();
  });

  // Filtros
  el('filterCategoria')?.addEventListener('change', () => {
    activeChip = el('filterCategoria').value;
    renderInventory();
  });
  el('filterStock')?.addEventListener('change', renderInventory);

  // Global search topbar
  el('globalSearch')?.addEventListener('input', handleGlobalSearch);

  // Ventas
  el('ventaProducto')?.addEventListener('change', calcVentaTotal);
  el('ventaCantidad')?.addEventListener('input', calcVentaTotal);
  el('ventaDescuento')?.addEventListener('input', calcVentaTotal);
  el('btnRegistrarVenta')?.addEventListener('click', registrarVenta);

  // Compras
  el('compraProducto')?.addEventListener('change', onCompraProductoChange);
  el('compraCantidad')?.addEventListener('input', calcCompraTotal);
  el('compraPrecio')?.addEventListener('input', calcCompraTotal);
  el('btnRegistrarCompra')?.addEventListener('click', registrarCompra);

  // Movimientos
  el('filterMovType')?.addEventListener('change', renderMovimientos);

  // CSV
  el('btnExportCSV')?.addEventListener('click', exportCSV);
}

// ============================================
// INIT
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  try {
    loadData();
  } catch(e) {
    console.error('Error cargando datos:', e);
  }

  try {
    initEvents();
  } catch(e) {
    console.error('Error iniciando eventos:', e);
  }

  try {
    renderEmojiPicker('🚲');
  } catch(e) {
    console.error('Error emoji picker:', e);
  }

  // Ocultar loader siempre, sin importar errores
  const loader = document.getElementById('loader');
  const hide = () => {
    if (loader) loader.classList.add('hidden');
    try { navigate('dashboard'); } catch(e) { console.error(e); }
  };
  setTimeout(hide, 800);
});
