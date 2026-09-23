/* ============================================
   BICISTORE - APP.JS  (versión limpia)
   ============================================ */
'use strict';

// ================================================================
// ESTADO
// ================================================================
const STATE = {
  productos: [],
  movimientos: [],
  nextId: 1,
  editingId: null,
};

// ================================================================
// CATÁLOGO INICIAL
// ================================================================
const PRODUCTOS_DEFAULT = [
  { nombre:'Bicicleta MTB Aro 29',      categoria:'Bicicletas',           stock:8,  stockMin:3,  precioCompra:350000,  precioVenta:550000,  unidad:'unidad', emoji:'🚵', codigo:'BIC-001', descripcion:'Bicicleta de montaña aro 29 con suspensión delantera' },
  { nombre:'Bicicleta Ruta Carbon',      categoria:'Bicicletas',           stock:4,  stockMin:2,  precioCompra:800000,  precioVenta:1200000, unidad:'unidad', emoji:'🚴', codigo:'BIC-002', descripcion:'Bicicleta de ruta cuadro de carbono' },
  { nombre:'Bicicleta BMX',              categoria:'Bicicletas',           stock:6,  stockMin:3,  precioCompra:180000,  precioVenta:280000,  unidad:'unidad', emoji:'🚲', codigo:'BIC-003', descripcion:'BMX para freestyle y pista' },
  { nombre:'Llanta MTB 29x2.10',         categoria:'Llantas y Neumáticos', stock:20, stockMin:8,  precioCompra:35000,   precioVenta:58000,   unidad:'unidad', emoji:'⭕', codigo:'LLA-001', descripcion:'Llanta todo terreno' },
  { nombre:'Llanta Ruta 700x25',         categoria:'Llantas y Neumáticos', stock:15, stockMin:6,  precioCompra:28000,   precioVenta:45000,   unidad:'unidad', emoji:'⭕', codigo:'LLA-002', descripcion:'Llanta de ruta alta presión' },
  { nombre:'Cámara Aro 29',              categoria:'Llantas y Neumáticos', stock:30, stockMin:10, precioCompra:8000,    precioVenta:14000,   unidad:'unidad', emoji:'🔵', codigo:'LLA-003', descripcion:'Cámara de aire válvula Presta' },
  { nombre:'Frenos de Disco Hidráulico', categoria:'Frenos',               stock:12, stockMin:4,  precioCompra:120000,  precioVenta:190000,  unidad:'par',    emoji:'🛑', codigo:'FRE-001', descripcion:'Set frenos hidráulicos 160mm' },
  { nombre:'Pastillas de Freno',         categoria:'Frenos',               stock:25, stockMin:10, precioCompra:12000,   precioVenta:22000,   unidad:'par',    emoji:'🔴', codigo:'FRE-002', descripcion:'Pastillas orgánicas universales' },
  { nombre:'Cable de Freno',             categoria:'Frenos',               stock:40, stockMin:15, precioCompra:3500,    precioVenta:7000,    unidad:'unidad', emoji:'🪢', codigo:'FRE-003', descripcion:'Cable acero inoxidable' },
  { nombre:'Cassette 11v 11-42',         categoria:'Transmisión',          stock:10, stockMin:4,  precioCompra:85000,   precioVenta:135000,  unidad:'unidad', emoji:'⚙️', codigo:'TRA-001', descripcion:'Cassette 11v compatible Shimano' },
  { nombre:'Cadena 11 velocidades',      categoria:'Transmisión',          stock:18, stockMin:6,  precioCompra:35000,   precioVenta:58000,   unidad:'unidad', emoji:'🔗', codigo:'TRA-002', descripcion:'Cadena KMC 11v' },
  { nombre:'Plato Shimano 36T',          categoria:'Transmisión',          stock:9,  stockMin:3,  precioCompra:45000,   precioVenta:72000,   unidad:'unidad', emoji:'🌀', codigo:'TRA-003', descripcion:'Plato aluminio 7075' },
  { nombre:'Desviador Trasero',          categoria:'Transmisión',          stock:7,  stockMin:3,  precioCompra:90000,   precioVenta:145000,  unidad:'unidad', emoji:'🔧', codigo:'TRA-004', descripcion:'Desviador Shadow 11v' },
  { nombre:'Manillar Aluminio 760',      categoria:'Manillar y Potencia',  stock:14, stockMin:5,  precioCompra:32000,   precioVenta:52000,   unidad:'unidad', emoji:'🎮', codigo:'MAN-001', descripcion:'Manillar flat bar 760mm' },
  { nombre:'Potencia 90mm',              categoria:'Manillar y Potencia',  stock:12, stockMin:4,  precioCompra:28000,   precioVenta:45000,   unidad:'unidad', emoji:'🔩', codigo:'MAN-002', descripcion:'Potencia aluminio 31.8mm' },
  { nombre:'Grips Ergonómicos',          categoria:'Manillar y Potencia',  stock:22, stockMin:8,  precioCompra:15000,   precioVenta:26000,   unidad:'par',    emoji:'✊', codigo:'MAN-003', descripcion:'Grips lock-on ergonómicos' },
  { nombre:'Sillín Gel Comfort',         categoria:'Sillín',               stock:16, stockMin:5,  precioCompra:42000,   precioVenta:68000,   unidad:'unidad', emoji:'🪑', codigo:'SIL-001', descripcion:'Sillín acolchado gel' },
  { nombre:'Tija de Sillín 31.6',        categoria:'Sillín',               stock:10, stockMin:3,  precioCompra:25000,   precioVenta:40000,   unidad:'unidad', emoji:'📏', codigo:'SIL-002', descripcion:'Tija telescópica aluminio' },
  { nombre:'Luz Delantera LED',          categoria:'Iluminación',          stock:20, stockMin:8,  precioCompra:18000,   precioVenta:32000,   unidad:'unidad', emoji:'💡', codigo:'ILU-001', descripcion:'Luz recargable USB 800 lúmenes' },
  { nombre:'Luz Trasera Roja',           categoria:'Iluminación',          stock:25, stockMin:8,  precioCompra:10000,   precioVenta:18000,   unidad:'unidad', emoji:'🔴', codigo:'ILU-002', descripcion:'Luz trasera recargable con sensor' },
  { nombre:'Casco MTB',                  categoria:'Accesorios',           stock:12, stockMin:4,  precioCompra:75000,   precioVenta:125000,  unidad:'unidad', emoji:'⛑️', codigo:'ACC-001', descripcion:'Casco certificado MIPS' },
  { nombre:'Candado U-Lock',             categoria:'Accesorios',           stock:15, stockMin:5,  precioCompra:38000,   precioVenta:62000,   unidad:'unidad', emoji:'🔒', codigo:'ACC-002', descripcion:'Candado U-Lock nivel 7' },
  { nombre:'Portabotellas',              categoria:'Accesorios',           stock:30, stockMin:10, precioCompra:8000,    precioVenta:14000,   unidad:'unidad', emoji:'🧴', codigo:'ACC-003', descripcion:'Porta bidón aluminio' },
  { nombre:'Computador GPS',             categoria:'Accesorios',           stock:6,  stockMin:2,  precioCompra:180000,  precioVenta:280000,  unidad:'unidad', emoji:'📱', codigo:'ACC-004', descripcion:'Ciclocomputador GPS Bluetooth' },
  { nombre:'Kit Herramientas',           categoria:'Herramientas',         stock:10, stockMin:3,  precioCompra:55000,   precioVenta:90000,   unidad:'kit',    emoji:'🧰', codigo:'HER-001', descripcion:'Kit multi-herramienta 16 funciones' },
  { nombre:'Bomba de Piso',              categoria:'Herramientas',         stock:8,  stockMin:2,  precioCompra:42000,   precioVenta:68000,   unidad:'unidad', emoji:'🔧', codigo:'HER-002', descripcion:'Bomba piso manómetro dual válvula' },
  { nombre:'Parche Tubeless',            categoria:'Herramientas',         stock:50, stockMin:20, precioCompra:2500,    precioVenta:5000,    unidad:'unidad', emoji:'🩹', codigo:'HER-003', descripcion:'Kit parches tubeless self-sealing' },
  { nombre:'Aceite Cadena 100ml',        categoria:'Lubricantes',          stock:35, stockMin:12, precioCompra:9000,    precioVenta:16000,   unidad:'unidad', emoji:'🛢️', codigo:'LUB-001', descripcion:'Lubricante específico para cadena' },
  { nombre:'Desengrasante 500ml',        categoria:'Lubricantes',          stock:20, stockMin:8,  precioCompra:12000,   precioVenta:22000,   unidad:'unidad', emoji:'🧼', codigo:'LUB-002', descripcion:'Desengrasante biodegradable' },
  { nombre:'Guantes MTB',                categoria:'Ropa y Equipamiento',  stock:18, stockMin:6,  precioCompra:28000,   precioVenta:48000,   unidad:'par',    emoji:'🧤', codigo:'ROP-001', descripcion:'Guantes amortiguados ventilados' },
  { nombre:'Malla Ciclista',             categoria:'Ropa y Equipamiento',  stock:14, stockMin:5,  precioCompra:45000,   precioVenta:75000,   unidad:'unidad', emoji:'👕', codigo:'ROP-002', descripcion:'Malla técnica transpirable UV50+' },
  { nombre:'Culote Acolchado',           categoria:'Ropa y Equipamiento',  stock:10, stockMin:4,  precioCompra:55000,   precioVenta:90000,   unidad:'unidad', emoji:'🩳', codigo:'ROP-003', descripcion:'Culote con badana gel 3D' },
  { nombre:'Motor Eléctrico 250W',       categoria:'Electricidad',         stock:3,  stockMin:1,  precioCompra:450000,  precioVenta:720000,  unidad:'unidad', emoji:'⚡', codigo:'ELE-001', descripcion:'Kit conversión bicicleta eléctrica' },
  { nombre:'Batería Litio 36V',          categoria:'Electricidad',         stock:4,  stockMin:2,  precioCompra:380000,  precioVenta:600000,  unidad:'unidad', emoji:'🔋', codigo:'ELE-002', descripcion:'Batería 36V 10Ah para e-bike' },
];

const EMOJIS = ['🚲','🚵','🚴','🏍️','⭕','⚙️','🔧','🔩','🪛','🛠️','🧰','🔗','🌀','💡','🔴','🔵','⛑️','🔒','🧴','📱','🩹','🛢️','🧼','🧤','👕','🩳','⚡','🔋','🎮','✊','🪑','📏','🏁','🥇','🏆','💰','📦','🛒','🚀','❤️'];

// ================================================================
// UTILIDADES
// ================================================================
const fmt      = (n) => new Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', maximumFractionDigits:0 }).format(n);
const fmtShort = (n) => { if (n>=1000000) return '$'+(n/1000000).toFixed(1)+'M'; if (n>=1000) return '$'+(n/1000).toFixed(0)+'K'; return fmt(n); };
const uid      = () => STATE.nextId++;
const today    = () => new Date().toLocaleDateString('es-CO', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
const eid      = (id) => document.getElementById(id);

// ================================================================
// TOAST
// ================================================================
function toast(msg, type) {
  type = type || 'success';
  var icons = { success:'fa-check-circle', error:'fa-times-circle', warning:'fa-exclamation-triangle', info:'fa-info-circle' };
  var div = document.createElement('div');
  div.className = 'toast ' + type;
  div.innerHTML = '<i class="fas ' + (icons[type]||icons.success) + '"></i><span>' + msg + '</span>';
  var tc = eid('toastContainer');
  if (tc) tc.appendChild(div);
  setTimeout(function(){ div.classList.add('fade-out'); setTimeout(function(){ div.remove(); }, 350); }, 3000);
}

// ================================================================
// PERSISTENCIA
// ================================================================
function saveData() {
  try {
    localStorage.setItem('bicistore_productos',   JSON.stringify(STATE.productos));
    localStorage.setItem('bicistore_movimientos', JSON.stringify(STATE.movimientos));
    localStorage.setItem('bicistore_nextId',      JSON.stringify(STATE.nextId));
  } catch(e) {}
}

function loadData() {
  try {
    var p = localStorage.getItem('bicistore_productos');
    var m = localStorage.getItem('bicistore_movimientos');
    var n = localStorage.getItem('bicistore_nextId');
    if (p) STATE.productos   = JSON.parse(p);
    if (m) STATE.movimientos = JSON.parse(m);
    if (n) STATE.nextId      = JSON.parse(n);
  } catch(e) {
    localStorage.clear();
    STATE.productos = []; STATE.movimientos = []; STATE.nextId = 1;
  }
  if (!STATE.productos.length) {
    PRODUCTOS_DEFAULT.forEach(function(d) {
      STATE.productos.push(Object.assign({ id:uid(), activo:true, vendidos:0 }, d));
    });
    saveData();
  }
}

// ================================================================
// NAVEGACIÓN
// ================================================================
var TITLES = { dashboard:'Dashboard', inventario:'Inventario', ventas:'Nueva Venta', compras:'Nueva Compra', movimientos:'Movimientos', calculadora:'Calculadora' };

function navigate(section) {
  // marcar nav activo
  document.querySelectorAll('.nav-item').forEach(function(n) {
    n.classList.toggle('active', n.dataset.section === section);
  });

  // mostrar/ocultar secciones
  document.querySelectorAll('.section').forEach(function(s) {
    s.classList.remove('active');
  });
  var target = eid('section-' + section);
  if (target) target.classList.add('active');

  // título
  var pt = eid('pageTitle');
  if (pt) pt.textContent = TITLES[section] || section;

  // renderizar sección
  if (section === 'dashboard')   renderDashboard();
  if (section === 'inventario')  renderInventory();
  if (section === 'ventas')      renderVentasSelect();
  if (section === 'compras')     renderComprasSelect();
  if (section === 'movimientos') renderMovimientos();

  // cerrar sidebar mobile
  var sb = eid('sidebar');
  if (sb) sb.classList.remove('mobile-open');
}

// ================================================================
// DASHBOARD
// ================================================================
function renderDashboard() {
  var totalProductos = STATE.productos.length;
  var totalValor     = STATE.productos.reduce(function(s,p){ return s + p.precioVenta * p.stock; }, 0);
  var totalVentas    = STATE.movimientos.filter(function(m){ return m.tipo==='venta'; }).reduce(function(s,m){ return s+m.total; }, 0);
  var stockBajo      = STATE.productos.filter(function(p){ return p.stock <= p.stockMin && p.stock > 0; }).length;
  var agotados       = STATE.productos.filter(function(p){ return p.stock === 0; }).length;

  animateNumber('totalProductos', totalProductos);
  if (eid('totalValor'))  eid('totalValor').textContent  = fmtShort(totalValor);
  if (eid('totalVentas')) eid('totalVentas').textContent = fmtShort(totalVentas);
  if (eid('stockBajo'))   eid('stockBajo').textContent   = stockBajo + agotados;
  if (eid('alertBadge'))  eid('alertBadge').textContent  = stockBajo + agotados;

  var recentEl = eid('recentMoves');
  if (recentEl) {
    var recent = STATE.movimientos.slice().reverse().slice(0,8);
    recentEl.innerHTML = !recent.length
      ? '<p class="empty-msg">Sin movimientos aún</p>'
      : recent.map(function(m) {
          return '<div class="move-item">'
            + '<div class="move-icon ' + (m.tipo==='venta'?'sale':'buy') + '"><i class="fas ' + (m.tipo==='venta'?'fa-arrow-up':'fa-arrow-down') + '"></i></div>'
            + '<div class="move-info"><strong>' + m.productoNombre + '</strong>'
            + '<span>' + (m.tipo==='venta'?'Venta':'Compra') + ' &bull; ' + m.cantidad + ' ' + m.unidad + ' &bull; ' + m.fecha + '</span></div>'
            + '<span class="move-amount ' + (m.tipo==='venta'?'green':'red') + '">' + (m.tipo==='venta'?'+':'-') + fmtShort(m.total) + '</span>'
            + '</div>';
        }).join('');
  }

  var topEl = eid('topProducts');
  if (topEl) {
    var top = STATE.productos.slice().sort(function(a,b){ return b.vendidos-a.vendidos; }).filter(function(p){ return p.vendidos>0; }).slice(0,5);
    topEl.innerHTML = !top.length
      ? '<p class="empty-msg">Sin ventas registradas</p>'
      : top.map(function(p,i) {
          return '<div class="top-item">'
            + '<span class="top-emoji">' + p.emoji + '</span>'
            + '<div class="top-info"><strong>' + p.nombre + '</strong><span>' + p.vendidos + ' unidades vendidas</span></div>'
            + '<span class="top-rank">#' + (i+1) + '</span></div>';
        }).join('');
  }

  var alertsEl = eid('alertsList');
  if (alertsEl) {
    var alertProds = STATE.productos.filter(function(p){ return p.stock <= p.stockMin; });
    alertsEl.innerHTML = !alertProds.length
      ? '<p class="empty-msg">Sin alertas de stock ✅</p>'
      : alertProds.map(function(p) {
          return '<div class="alert-item">'
            + '<span>' + p.emoji + '</span>'
            + '<i class="fas ' + (p.stock===0?'fa-ban':'fa-exclamation-triangle') + '"></i>'
            + '<span><strong>' + p.nombre + '</strong> — ' + (p.stock===0?'AGOTADO':'Stock: '+p.stock+' (mín: '+p.stockMin+')') + '</span>'
            + '</div>';
        }).join('');
  }
}

function animateNumber(id, value) {
  var el = eid(id);
  if (!el) return;
  var current = 0;
  var step = Math.max(1, Math.ceil(value/30));
  var timer = setInterval(function() {
    current = Math.min(current+step, value);
    el.textContent = current.toLocaleString('es-CO');
    if (current >= value) clearInterval(timer);
  }, 30);
}

// ================================================================
// CATEGORY CHIPS
// ================================================================
var CAT_META = {
  'Bicicletas':           { emoji:'🚲' }, 'Llantas y Neumáticos': { emoji:'⭕' },
  'Frenos':               { emoji:'🛑' }, 'Transmisión':          { emoji:'⚙️' },
  'Manillar y Potencia':  { emoji:'🎮' }, 'Sillín':               { emoji:'🪑' },
  'Iluminación':          { emoji:'💡' }, 'Accesorios':           { emoji:'🧴' },
  'Herramientas':         { emoji:'🧰' }, 'Lubricantes':          { emoji:'🛢️' },
  'Ropa y Equipamiento':  { emoji:'👕' }, 'Electricidad':         { emoji:'⚡' },
};
var activeChip = '';
var viewMode   = (localStorage.getItem('bicistore_view') || 'grid');

function renderCategoryChips() {
  var container = eid('categoryChips');
  if (!container) return;
  var counts = {};
  STATE.productos.forEach(function(p) { counts[p.categoria] = (counts[p.categoria]||0) + 1; });
  var total = STATE.productos.length;

  var html = '<div class="cat-chip chip-all ' + (activeChip===''?'active':'') + '" onclick="filterByChip(\'\')">'
    + '<span class="cat-chip-emoji">📦</span><span class="cat-chip-label">Todos</span>'
    + '<span class="cat-chip-count">' + total + '</span></div>';

  Object.keys(counts).sort(function(a,b){ return counts[b]-counts[a]; }).forEach(function(cat) {
    var meta = CAT_META[cat] || { emoji:'🔹' };
    html += '<div class="cat-chip ' + (activeChip===cat?'active':'') + '" onclick="filterByChip(\'' + cat.replace(/'/g,"\\'") + '\')">'
      + '<span class="cat-chip-emoji">' + meta.emoji + '</span>'
      + '<span class="cat-chip-label">' + cat + '</span>'
      + '<span class="cat-chip-count">' + counts[cat] + '</span></div>';
  });
  container.innerHTML = html;
}

function filterByChip(cat) {
  activeChip = cat;
  var fc = eid('filterCategoria');
  if (fc) fc.value = cat;
  renderInventory();
}

function setViewMode(mode) {
  viewMode = mode;
  localStorage.setItem('bicistore_view', mode);
  syncViewButtons();
  renderInventory();
}

function syncViewButtons() {
  var bg = eid('btnViewGrid');
  var bl = eid('btnViewList');
  if (bg) bg.classList.toggle('active', viewMode==='grid');
  if (bl) bl.classList.toggle('active', viewMode==='list');
}

// ================================================================
// INVENTARIO
// ================================================================
function getFilteredProducts() {
  var cat   = (eid('filterCategoria')||{value:''}).value || '';
  var stock = (eid('filterStock')||{value:''}).value     || '';
  var q     = ((eid('invSearch')||{value:''}).value      || '').toLowerCase().trim();
  return STATE.productos.filter(function(p) {
    if (cat && p.categoria !== cat) return false;
    if (stock==='bajo')    return p.stock>0 && p.stock<=p.stockMin;
    if (stock==='normal')  return p.stock>p.stockMin;
    if (stock==='agotado') return p.stock===0;
    if (q) return p.nombre.toLowerCase().indexOf(q)>=0 || p.codigo.toLowerCase().indexOf(q)>=0;
    return true;
  });
}

function highlight(text, q) {
  if (!q) return text;
  var esc = q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return text.replace(new RegExp('('+esc+')','gi'),'<span class="highlight">$1</span>');
}

function renderInventory() {
  renderCategoryChips();
  syncViewButtons();

  var products = getFilteredProducts();
  var q = ((eid('invSearch')||{value:''}).value||'').toLowerCase().trim();

  // contador búsqueda
  var resEl = eid('invSearchResults');
  if (resEl) {
    if (q) {
      resEl.textContent = products.length
        ? products.length + ' resultado' + (products.length!==1?'s':'') + ' encontrado' + (products.length!==1?'s':'')
        : 'Sin resultados';
      resEl.className = 'inv-search-results ' + (products.length?'has-results':'no-results');
    } else {
      resEl.textContent = '';
      resEl.className = 'inv-search-results';
    }
  }
  var cb = eid('invSearchClear');
  if (cb) cb.classList.toggle('visible', q.length>0);

  if (viewMode === 'grid') {
    renderGrid(products, q);
  } else {
    renderList(products, q);
  }
}

// ---- VISTA LISTA ----
function renderList(products, q) {
  var tableWrap = document.querySelector('.table-wrapper');
  if (tableWrap) tableWrap.style.display = 'block';
  var grid = eid('productsGrid');
  if (grid) grid.style.display = 'none';

  var tbody = eid('inventoryBody');
  var empty = eid('tableEmpty');
  if (!tbody) return;

  if (!products.length) {
    tbody.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (empty) empty.style.display = 'none';

  tbody.innerHTML = products.map(function(p) {
    var margin    = p.precioCompra>0 ? ((p.precioVenta-p.precioCompra)/p.precioVenta*100).toFixed(1) : 0;
    var marginCls = margin>=30?'margin-good':margin>=15?'margin-mid':'margin-bad';
    var stockCls  = p.stock===0?'stock-empty':p.stock<=p.stockMin?'stock-low':'stock-ok';
    var hNombre   = highlight(p.nombre, q);
    var hCodigo   = highlight(p.codigo, q);
    var thumbHtml = p.imagen
      ? '<img class="prod-thumb" src="' + p.imagen + '" alt="' + p.nombre + '" />'
      : '<div class="prod-thumb-emoji">' + p.emoji + '</div>';
    return '<tr>'
      + '<td>' + thumbHtml + '</td>'
      + '<td><code style="font-size:.78rem;color:var(--text3)">' + hCodigo + '</code></td>'
      + '<td><div style="font-weight:600">' + hNombre + '</div>'
        + (p.descripcion?'<div style="font-size:.75rem;color:var(--text3);margin-top:2px">'+p.descripcion.substring(0,45)+(p.descripcion.length>45?'...':'')+'</div>':'')
      + '</td>'
      + '<td><span style="font-size:.8rem;padding:3px 8px;background:var(--bg3);border-radius:20px">' + p.categoria + '</span></td>'
      + '<td><span class="stock-badge ' + stockCls + '"><i class="fas ' + (p.stock===0?'fa-ban':p.stock<=p.stockMin?'fa-exclamation-triangle':'fa-check') + '"></i> ' + p.stock + ' ' + p.unidad + '</span>'
        + '<div style="font-size:.72rem;color:var(--text3);margin-top:3px">Mín: ' + p.stockMin + '</div></td>'
      + '<td class="price-cell">' + fmt(p.precioCompra) + '</td>'
      + '<td class="price-cell sell">' + fmt(p.precioVenta) + '</td>'
      + '<td class="margin-cell ' + marginCls + '">' + margin + '%</td>'
      + '<td><span class="status-badge ' + (p.activo?'status-active':'status-inactive') + '">' + (p.activo?'Activo':'Inactivo') + '</span></td>'
      + '<td class="actions-cell">'
        + '<button class="btn btn-sm btn-primary btn-icon" onclick="editProducto(' + p.id + ')" title="Editar"><i class="fas fa-edit"></i></button>'
        + '<button class="btn btn-sm btn-outline btn-icon" onclick="toggleActivo(' + p.id + ')" title="'+(p.activo?'Desactivar':'Activar')+'"><i class="fas '+(p.activo?'fa-eye-slash':'fa-eye')+'"></i></button>'
        + '<button class="btn btn-sm btn-danger btn-icon" onclick="deleteProducto(' + p.id + ')" title="Eliminar"><i class="fas fa-trash"></i></button>'
      + '</td></tr>';
  }).join('');
}

// ---- VISTA CUADRÍCULA ----
function renderGrid(products, q) {
  var tableWrap = document.querySelector('.table-wrapper');
  if (tableWrap) tableWrap.style.display = 'none';

  var grid = eid('productsGrid');
  if (!grid) {
    grid = document.createElement('div');
    grid.id = 'productsGrid';
    grid.className = 'products-grid';
    var secInv = eid('section-inventario');
    if (secInv) secInv.appendChild(grid);
  }
  grid.style.display = 'grid';

  if (!products.length) {
    grid.innerHTML = '<div class="grid-empty"><i class="fas fa-box-open"></i><p>No hay productos</p></div>';
    return;
  }

  grid.innerHTML = products.map(function(p) {
    var margin    = p.precioCompra>0 ? ((p.precioVenta-p.precioCompra)/p.precioVenta*100).toFixed(1) : 0;
    var marginCls = margin>=30?'margin-good':margin>=15?'margin-mid':'margin-bad';
    var stockCls  = p.stock===0?'stock-empty':p.stock<=p.stockMin?'stock-low':'stock-ok';
    var stockIcon = p.stock===0?'fa-ban':p.stock<=p.stockMin?'fa-exclamation-triangle':'fa-check';
    var hNombre   = highlight(p.nombre, q);
    var topContent = p.imagen
      ? '<img src="' + p.imagen + '" alt="' + p.nombre + '" style="width:100%;height:100%;object-fit:cover" />'
      : '<span style="font-size:3rem">' + p.emoji + '</span>';
    return '<div class="prod-card">'
      + '<div class="prod-card-top">' + topContent
      + '<span class="prod-card-status"><span class="status-badge ' + (p.activo?'status-active':'status-inactive') + '" style="font-size:.68rem">' + (p.activo?'Activo':'Inactivo') + '</span></span></div>'
      + '<div class="prod-card-body">'
      + '<div class="prod-card-name">' + hNombre + '</div>'
      + '<div class="prod-card-code">' + p.codigo + '</div>'
      + '<span class="prod-card-cat">' + p.categoria + '</span>'
      + '<div style="margin-top:6px"><span class="stock-badge ' + stockCls + '" style="font-size:.75rem"><i class="fas ' + stockIcon + '"></i> ' + p.stock + ' ' + p.unidad + '</span></div>'
      + '<div class="prod-card-prices">'
      + '<div><div class="prod-card-price-buy">Compra: ' + fmt(p.precioCompra) + '</div>'
      + '<div class="prod-card-price-sell">' + fmt(p.precioVenta) + '</div></div>'
      + '<span class="margin-cell ' + marginCls + '" style="font-size:.8rem">' + margin + '%</span></div>'
      + '</div>'
      + '<div class="prod-card-footer"><span style="font-size:.72rem;color:var(--text3)">Mín: ' + p.stockMin + '</span>'
      + '<div class="prod-card-actions">'
      + '<button class="btn btn-sm btn-primary btn-icon" onclick="editProducto(' + p.id + ')" title="Editar"><i class="fas fa-edit"></i></button>'
      + '<button class="btn btn-sm btn-outline btn-icon" onclick="toggleActivo(' + p.id + ')" title="'+(p.activo?'Desactivar':'Activar')+'"><i class="fas '+(p.activo?'fa-eye-slash':'fa-eye')+'"></i></button>'
      + '<button class="btn btn-sm btn-danger btn-icon" onclick="deleteProducto(' + p.id + ')" title="Eliminar"><i class="fas fa-trash"></i></button>'
      + '</div></div></div>';
  }).join('');
}

// ================================================================
// IMAGEN DE PRODUCTO
// ================================================================
function setImgPreview(src) {
  var preview = eid('imgPreview');
  var inp     = eid('prodImagen');
  if (!preview || !inp) return;
  if (src) {
    preview.src = src;
    inp.value   = src;
  } else {
    preview.src = 'img/placeholder.svg';
    inp.value   = '';
  }
}

function initImgUpload() {
  var fileInput   = eid('imgFileInput');
  var cameraInput = eid('imgCameraInput');
  var area        = eid('imgUploadArea');
  var quitarBtn   = eid('btnQuitarImg');

  function handleFile(file) {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast('La imagen supera los 2MB', 'error'); return; }
    var reader = new FileReader();
    reader.onload = function(e) { setImgPreview(e.target.result); };
    reader.readAsDataURL(file);
  }

  if (fileInput) {
    fileInput.addEventListener('change', function() {
      handleFile(fileInput.files[0]);
      fileInput.value = '';
    });
  }

  if (cameraInput) {
    cameraInput.addEventListener('change', function() {
      handleFile(cameraInput.files[0]);
      cameraInput.value = '';
    });
  }

  // Clic en el área abre galería (no si hizo clic en botón)
  if (area) {
    area.addEventListener('click', function(e) {
      if (e.target.closest('.btn') || e.target.closest('label')) return;
      if (fileInput) fileInput.click();
    });
    // Drag & drop
    area.addEventListener('dragover',  function(e) { e.preventDefault(); area.classList.add('drag-over'); });
    area.addEventListener('dragleave', function()  { area.classList.remove('drag-over'); });
    area.addEventListener('drop', function(e) {
      e.preventDefault();
      area.classList.remove('drag-over');
      var file = e.dataTransfer.files[0];
      if (!file || !file.type.startsWith('image/')) { toast('Solo se aceptan imágenes', 'warning'); return; }
      handleFile(file);
    });
  }

  if (quitarBtn) {
    quitarBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      setImgPreview('');
    });
  }
}

// ================================================================
// CRUD PRODUCTOS
// ================================================================
function openModalNuevo() {
  STATE.editingId = null;
  eid('modalTitle').innerHTML   = '<i class="fas fa-plus"></i> Agregar Producto';
  eid('prodId').value           = '';
  eid('prodCodigo').value       = autoCode();
  eid('prodNombre').value       = '';
  eid('prodCategoria').value    = '';
  eid('prodStock').value        = '0';
  eid('prodStockMin').value     = '5';
  eid('prodPrecioCompra').value = '';
  eid('prodPrecioVenta').value  = '';
  eid('prodUnidad').value       = 'unidad';
  eid('prodDescripcion').value  = '';
  eid('prodEmoji').value        = '🚲';
  setImgPreview('');
  renderEmojiPicker('🚲');
  eid('modalProducto').classList.add('open');
}

function editProducto(id) {
  var p = STATE.productos.find(function(x){ return x.id===id; });
  if (!p) return;
  STATE.editingId = id;
  eid('modalTitle').innerHTML   = '<i class="fas fa-edit"></i> Editar Producto';
  eid('prodId').value           = p.id;
  eid('prodCodigo').value       = p.codigo;
  eid('prodNombre').value       = p.nombre;
  eid('prodCategoria').value    = p.categoria;
  eid('prodStock').value        = p.stock;
  eid('prodStockMin').value     = p.stockMin;
  eid('prodPrecioCompra').value = p.precioCompra;
  eid('prodPrecioVenta').value  = p.precioVenta;
  eid('prodUnidad').value       = p.unidad;
  eid('prodDescripcion').value  = p.descripcion || '';
  eid('prodEmoji').value        = p.emoji;
  setImgPreview(p.imagen || '');
  renderEmojiPicker(p.emoji);
  eid('modalProducto').classList.add('open');
}

function saveProducto() {
  var nombre       = eid('prodNombre').value.trim();
  var categoria    = eid('prodCategoria').value;
  var stock        = parseInt(eid('prodStock').value)         || 0;
  var stockMin     = parseInt(eid('prodStockMin').value)      || 0;
  var precioCompra = parseFloat(eid('prodPrecioCompra').value) || 0;
  var precioVenta  = parseFloat(eid('prodPrecioVenta').value)  || 0;
  var unidad       = eid('prodUnidad').value;
  var descripcion  = eid('prodDescripcion').value.trim();
  var emoji        = eid('prodEmoji').value;
  var codigo       = eid('prodCodigo').value.trim() || autoCode();
  var imagen       = eid('prodImagen').value || '';

  if (!nombre || !categoria) { toast('Nombre y categoría son obligatorios', 'error'); return; }
  if (precioVenta <= 0)      { toast('El precio de venta debe ser mayor a 0', 'warning'); return; }

  if (STATE.editingId) {
    var idx = STATE.productos.findIndex(function(x){ return x.id===STATE.editingId; });
    if (idx !== -1) {
      STATE.productos[idx] = Object.assign({}, STATE.productos[idx], { nombre, categoria, stock, stockMin, precioCompra, precioVenta, unidad, descripcion, emoji, codigo, imagen });
      toast('✏️ "' + nombre + '" actualizado', 'success');
    }
  } else {
    STATE.productos.push({ id:uid(), activo:true, vendidos:0, nombre, categoria, stock, stockMin, precioCompra, precioVenta, unidad, descripcion, emoji, codigo, imagen });
    toast('🎉 "' + nombre + '" agregado', 'success');
  }
  saveData();
  closeModal();
  renderInventory();
  renderDashboard();
}

function deleteProducto(id) {
  var p = STATE.productos.find(function(x){ return x.id===id; });
  if (!p) return;
  if (!confirm('¿Eliminar "' + p.nombre + '"?')) return;
  STATE.productos = STATE.productos.filter(function(x){ return x.id!==id; });
  saveData();
  renderInventory();
  renderDashboard();
  toast('🗑️ "' + p.nombre + '" eliminado', 'warning');
}

function toggleActivo(id) {
  var p = STATE.productos.find(function(x){ return x.id===id; });
  if (!p) return;
  p.activo = !p.activo;
  saveData();
  renderInventory();
  toast((p.activo?'✅ Activado':'🔕 Desactivado') + ': ' + p.nombre, p.activo?'success':'warning');
}

function closeModal() {
  eid('modalProducto').classList.remove('open');
  STATE.editingId = null;
}

function autoCode() {
  return 'PROD-' + String(STATE.nextId).padStart(3,'0');
}

function renderEmojiPicker(selected) {
  var container = eid('emojiPicker');
  if (!container) return;
  container.innerHTML = EMOJIS.map(function(e) {
    return '<span class="emoji-option ' + (e===selected?'selected':'') + '" onclick="selectEmoji(\'' + e + '\')">' + e + '</span>';
  }).join('');
}

function selectEmoji(emoji) {
  eid('prodEmoji').value = emoji;
  document.querySelectorAll('.emoji-option').forEach(function(el) {
    el.classList.toggle('selected', el.textContent.trim()===emoji);
  });
}

// ================================================================
// VENTAS
// ================================================================
function renderVentasSelect() {
  var sel = eid('ventaProducto');
  if (!sel) return;
  sel.innerHTML = '<option value="">Selecciona un producto</option>'
    + STATE.productos.filter(function(p){ return p.activo && p.stock>0; }).map(function(p) {
        return '<option value="'+p.id+'" data-precio="'+p.precioVenta+'" data-stock="'+p.stock+'" data-unidad="'+p.unidad+'">'
          + p.emoji+' '+p.nombre+' (Stock: '+p.stock+')</option>';
      }).join('');
  renderVentasHistorial();
  calcVentaTotal();
}

function calcVentaTotal() {
  var sel      = eid('ventaProducto');  if (!sel) return;
  var opt      = sel.options[sel.selectedIndex];
  var precio   = opt ? parseFloat(opt.dataset.precio||0) : 0;
  var cantidad = parseInt((eid('ventaCantidad')||{value:'0'}).value)  || 0;
  var desc     = parseFloat((eid('ventaDescuento')||{value:'0'}).value) || 0;
  var total    = precio * cantidad * (1 - desc/100);
  if (eid('ventaPrecio')) eid('ventaPrecio').value = precio>0 ? precio : '';
  if (eid('ventaTotal'))  eid('ventaTotal').value  = total>0  ? fmt(total) : '';
}

function registrarVenta() {
  var sel      = eid('ventaProducto');
  var prodId   = parseInt(sel.value);
  var cantidad = parseInt(eid('ventaCantidad').value)  || 0;
  var descuento= parseFloat(eid('ventaDescuento').value) || 0;
  var cliente  = eid('ventaCliente').value.trim() || 'Anónimo';

  if (!prodId)     { toast('Selecciona un producto', 'error'); return; }
  if (cantidad<1)  { toast('Cantidad debe ser al menos 1', 'error'); return; }

  var prod = STATE.productos.find(function(p){ return p.id===prodId; });
  if (!prod) return;
  if (cantidad > prod.stock) { toast('Stock insuficiente. Disponible: '+prod.stock, 'error'); return; }

  var total = prod.precioVenta * cantidad * (1 - descuento/100);
  prod.stock   -= cantidad;
  prod.vendidos = (prod.vendidos||0) + cantidad;

  STATE.movimientos.push({ id:uid(), tipo:'venta', productoId:prod.id, productoNombre:prod.nombre,
    cantidad:cantidad, precio:prod.precioVenta, descuento:descuento, total:total,
    cliente:cliente, unidad:prod.unidad, fecha:today(), emoji:prod.emoji });

  saveData();
  toast('💰 Venta registrada: '+fmt(total), 'success');
  eid('ventaProducto').value=''; eid('ventaCantidad').value='1';
  eid('ventaDescuento').value='0'; eid('ventaCliente').value='';
  if (eid('ventaPrecio')) eid('ventaPrecio').value='';
  if (eid('ventaTotal'))  eid('ventaTotal').value='';
  renderVentasSelect();
  renderDashboard();
  if (prod.stock<=prod.stockMin) setTimeout(function(){ toast('⚠️ Stock bajo en "'+prod.nombre+'": '+prod.stock+' restantes','warning'); },1000);
}

function renderVentasHistorial() {
  var el = eid('ventasList');
  if (!el) return;
  var ventas = STATE.movimientos.filter(function(m){ return m.tipo==='venta'; }).slice().reverse().slice(0,20);
  el.innerHTML = !ventas.length
    ? '<p class="empty-msg">Sin ventas registradas</p>'
    : ventas.map(function(m) {
        return '<div class="move-item">'
          + '<div class="move-icon sale"><i class="fas fa-arrow-up"></i></div>'
          + '<div class="move-info"><strong>'+(m.emoji||'🛍️')+' '+m.productoNombre+'</strong>'
          + '<span>'+m.cantidad+' '+m.unidad+' &bull; Cliente: '+m.cliente+' &bull; '+m.fecha+'</span>'
          + (m.descuento>0?'<span style="color:#fbbf24;font-size:.72rem">Desc: '+m.descuento+'%</span>':'')
          + '</div><span class="move-amount green">+'+fmt(m.total)+'</span></div>';
      }).join('');
}

// ================================================================
// COMPRAS
// ================================================================
function renderComprasSelect() {
  var sel = eid('compraProducto');
  if (!sel) return;
  sel.innerHTML = '<option value="">Selecciona un producto</option>'
    + STATE.productos.map(function(p) {
        return '<option value="'+p.id+'" data-precio="'+p.precioCompra+'" data-unidad="'+p.unidad+'">'
          + p.emoji+' '+p.nombre+'</option>';
      }).join('');
  renderComprasHistorial();
  calcCompraTotal();
}

function calcCompraTotal() {
  var precio   = parseFloat((eid('compraPrecio')||{value:'0'}).value)   || 0;
  var cantidad = parseInt((eid('compraCantidad')||{value:'0'}).value) || 0;
  var total    = precio * cantidad;
  if (eid('compraTotal')) eid('compraTotal').value = total>0 ? fmt(total) : '';
}

function onCompraProductoChange() {
  var sel = eid('compraProducto');
  var opt = sel.options[sel.selectedIndex];
  if (eid('compraPrecio')) eid('compraPrecio').value = opt ? (opt.dataset.precio||'') : '';
  calcCompraTotal();
}

function registrarCompra() {
  var prodId    = parseInt(eid('compraProducto').value);
  var cantidad  = parseInt(eid('compraCantidad').value)  || 0;
  var precio    = parseFloat(eid('compraPrecio').value)   || 0;
  var proveedor = eid('compraProveedor').value.trim() || 'Sin proveedor';

  if (!prodId)   { toast('Selecciona un producto','error'); return; }
  if (cantidad<1){ toast('Cantidad debe ser al menos 1','error'); return; }
  if (precio<=0) { toast('Ingresa un precio de compra válido','error'); return; }

  var prod  = STATE.productos.find(function(p){ return p.id===prodId; });
  if (!prod) return;
  var total = precio * cantidad;
  prod.stock       += cantidad;
  prod.precioCompra = precio;

  STATE.movimientos.push({ id:uid(), tipo:'compra', productoId:prod.id, productoNombre:prod.nombre,
    cantidad:cantidad, precio:precio, total:total, proveedor:proveedor,
    unidad:prod.unidad, fecha:today(), emoji:prod.emoji });

  saveData();
  toast('📦 Entrada: +'+cantidad+' '+prod.unidad+' de "'+prod.nombre+'"','success');
  eid('compraProducto').value=''; eid('compraCantidad').value='1';
  eid('compraPrecio').value='';   eid('compraProveedor').value='';
  if (eid('compraTotal')) eid('compraTotal').value='';
  renderComprasSelect();
  renderDashboard();
}

function renderComprasHistorial() {
  var el = eid('comprasList');
  if (!el) return;
  var compras = STATE.movimientos.filter(function(m){ return m.tipo==='compra'; }).slice().reverse().slice(0,20);
  el.innerHTML = !compras.length
    ? '<p class="empty-msg">Sin compras registradas</p>'
    : compras.map(function(m) {
        return '<div class="move-item">'
          + '<div class="move-icon buy"><i class="fas fa-arrow-down"></i></div>'
          + '<div class="move-info"><strong>'+(m.emoji||'📦')+' '+m.productoNombre+'</strong>'
          + '<span>'+m.cantidad+' '+m.unidad+' &bull; Proveedor: '+m.proveedor+' &bull; '+m.fecha+'</span>'
          + '</div><span class="move-amount red">-'+fmt(m.total)+'</span></div>';
      }).join('');
}

// ================================================================
// MOVIMIENTOS
// ================================================================
function renderMovimientos() {
  var filter   = (eid('filterMovType')||{value:''}).value || '';
  var movs     = STATE.movimientos.slice().reverse().filter(function(m){ return !filter||m.tipo===filter; });
  var ingresos = STATE.movimientos.filter(function(m){ return m.tipo==='venta'; }).reduce(function(s,m){ return s+m.total; },0);
  var egresos  = STATE.movimientos.filter(function(m){ return m.tipo==='compra'; }).reduce(function(s,m){ return s+m.total; },0);
  var balance  = ingresos - egresos;

  if (eid('sumIngresos')) eid('sumIngresos').textContent = fmt(ingresos);
  if (eid('sumEgresos'))  eid('sumEgresos').textContent  = fmt(egresos);
  var balEl = eid('sumBalance');
  if (balEl) { balEl.textContent = fmt(Math.abs(balance)); balEl.style.color = balance>=0?'#4ade80':'#f87171'; }

  var el = eid('allMovesList');
  if (!el) return;
  el.innerHTML = !movs.length
    ? '<p class="empty-msg" style="padding:32px">Sin movimientos</p>'
    : movs.map(function(m) {
        return '<div class="move-item">'
          + '<div class="move-icon '+(m.tipo==='venta'?'sale':'buy')+'"><i class="fas '+(m.tipo==='venta'?'fa-arrow-up':'fa-arrow-down')+'"></i></div>'
          + '<div class="move-info"><strong>'+(m.emoji||'')+' '+m.productoNombre+'</strong>'
          + '<span>'+(m.tipo==='venta'?'🛍️ Venta &bull; Cliente: '+m.cliente:'📦 Compra &bull; Proveedor: '+m.proveedor)
          + ' &bull; '+m.cantidad+' '+m.unidad+' &bull; '+m.fecha
          + (m.descuento>0?' &bull; Desc: '+m.descuento+'%':'')+' </span></div>'
          + '<div style="text-align:right">'
          + '<span class="move-amount '+(m.tipo==='venta'?'green':'red')+'">'+(m.tipo==='venta'?'+':'-')+fmt(m.total)+'</span>'
          + '<div style="font-size:.72rem;color:var(--text3)">Unit: '+fmt(m.precio)+'</div></div></div>';
      }).join('');
}

// ================================================================
// EXPORTAR CSV
// ================================================================
function exportCSV() {
  var rows = [['Tipo','Producto','Cantidad','Unidad','Precio Unit.','Total','Cliente/Proveedor','Fecha']];
  STATE.movimientos.forEach(function(m) {
    rows.push([m.tipo,m.productoNombre,m.cantidad,m.unidad,m.precio,m.total,m.tipo==='venta'?m.cliente:m.proveedor,m.fecha]);
  });
  var csv  = rows.map(function(r){ return r.map(function(v){ return '"'+v+'"'; }).join(','); }).join('\n');
  var blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href=url; a.download='bicistore_movimientos.csv'; a.click();
  URL.revokeObjectURL(url);
  toast('📄 CSV exportado','success');
}

// ================================================================
// CALCULADORA
// ================================================================
var calcState = { expression:'', result:'0', hasError:false };

function calcNum(n)  { if(calcState.hasError) calcClear(); calcState.expression+=n; updateCalcDisplay(); }
function calcClear() { calcState={expression:'',result:'0',hasError:false}; updateCalcDisplay(); }
function calcBackspace() { if(calcState.hasError){calcClear();return;} calcState.expression=calcState.expression.slice(0,-1); updateCalcDisplay(); }
function calcOp(op) {
  if(calcState.hasError) calcClear();
  var ops=['+','-','*','/'];
  if(ops.indexOf(calcState.expression.slice(-1))>=0) calcState.expression=calcState.expression.slice(0,-1);
  calcState.expression+=op; updateCalcDisplay();
}
function calcEqual() {
  try {
    if(!calcState.expression) return;
    var res = Function('"use strict";return('+calcState.expression+')')();
    if(!isFinite(res)) throw new Error();
    calcState.result=parseFloat(res.toFixed(10)).toLocaleString('es-CO');
    calcState.expression=String(res); calcState.hasError=false;
  } catch(e) { calcState.result='Error'; calcState.hasError=true; }
  updateCalcDisplay();
}
function updateCalcDisplay() {
  var exEl=eid('calcExpression'), reEl=eid('calcResult');
  if(exEl) exEl.textContent=calcState.expression.replace(/\*/g,' × ').replace(/\//g,' ÷ ').replace(/\+/g,' + ');
  if(reEl){ reEl.textContent=calcState.result; reEl.style.color=calcState.hasError?'#f87171':'var(--text)'; }
}
function calcProfit() {
  var compra=parseFloat((eid('pcCompra')||{value:0}).value)||0;
  var venta=parseFloat((eid('pcVenta')||{value:0}).value)||0;
  var cantidad=parseFloat((eid('pcCantidad')||{value:1}).value)||1;
  var ganUnit=venta-compra, ganTotal=ganUnit*cantidad;
  var margen=venta>0?((ganUnit/venta)*100).toFixed(1):0;
  var roi=compra>0?((ganUnit/compra)*100).toFixed(1):0;
  if(eid('gananciaUnit')){eid('gananciaUnit').textContent=fmt(ganUnit); eid('gananciaUnit').style.color=ganUnit>=0?'#4ade80':'#f87171';}
  if(eid('margenPct'))    eid('margenPct').textContent=margen+'%';
  if(eid('gananciaTotal')){eid('gananciaTotal').textContent=fmt(ganTotal); eid('gananciaTotal').style.color=ganTotal>=0?'#4ade80':'#f87171';}
  if(eid('roiVal'))       eid('roiVal').textContent=roi+'%';
}

document.addEventListener('keydown', function(e) {
  var s=document.querySelector('.section.active');
  if(!s||s.id!=='section-calculadora') return;
  if('0123456789.'.indexOf(e.key)>=0) calcNum(e.key);
  else if('+-*/'.indexOf(e.key)>=0)   calcOp(e.key);
  else if(e.key==='Enter'||e.key==='=') calcEqual();
  else if(e.key==='Backspace') calcBackspace();
  else if(e.key==='Escape')    calcClear();
});

// ================================================================
// BÚSQUEDA GLOBAL TOPBAR
// ================================================================
function handleGlobalSearch() {
  var el=eid('globalSearch');
  if(!el||!el.value.trim()) return;
  navigate('inventario');
}

// ================================================================
// EVENTOS
// ================================================================
function initEvents() {
  // Navegación sidebar
  document.querySelectorAll('.nav-item').forEach(function(n) {
    n.addEventListener('click', function(e) { e.preventDefault(); navigate(n.dataset.section); });
  });

  // Toggle sidebar desktop
  var st=eid('sidebarToggle');
  if(st) st.addEventListener('click', function() {
    var sb=eid('sidebar'), mc=eid('mainContent');
    if(sb) sb.classList.toggle('collapsed');
    if(mc) mc.classList.toggle('expanded');
  });

  // Menú mobile
  var mb=eid('menuBtn');
  if(mb) mb.addEventListener('click', function() { var sb=eid('sidebar'); if(sb) sb.classList.toggle('mobile-open'); });

  // View toggle
  var bg=eid('btnViewGrid'), bl=eid('btnViewList');
  if(bg) bg.addEventListener('click', function(){ setViewMode('grid'); });
  if(bl) bl.addEventListener('click', function(){ setViewMode('list'); });

  // Modal
  var bap=eid('btnAgregarProducto'); if(bap) bap.addEventListener('click', openModalNuevo);
  var mc=eid('modalClose');         if(mc)  mc.addEventListener('click', closeModal);
  var bcm=eid('btnCancelarModal');  if(bcm) bcm.addEventListener('click', closeModal);
  var bgp=eid('btnGuardarProducto'); if(bgp) bgp.addEventListener('click', saveProducto);
  var mo=eid('modalProducto');
  if(mo) mo.addEventListener('click', function(e){ if(e.target===e.currentTarget) closeModal(); });

  // Imagen upload
  initImgUpload();

  // Buscador inventario
  var is=eid('invSearch');       if(is)  is.addEventListener('input', renderInventory);
  var isc=eid('invSearchClear'); if(isc) isc.addEventListener('click', function(){ eid('invSearch').value=''; renderInventory(); eid('invSearch').focus(); });

  // Filtros inventario
  var fc=eid('filterCategoria');
  if(fc) fc.addEventListener('change', function(){ activeChip=fc.value; renderInventory(); });
  var fs=eid('filterStock');
  if(fs) fs.addEventListener('change', renderInventory);

  // Búsqueda global topbar
  var gs=eid('globalSearch');
  if(gs) gs.addEventListener('input', handleGlobalSearch);

  // Ventas
  var vp=eid('ventaProducto');  if(vp) vp.addEventListener('change', calcVentaTotal);
  var vc=eid('ventaCantidad');  if(vc) vc.addEventListener('input', calcVentaTotal);
  var vd=eid('ventaDescuento'); if(vd) vd.addEventListener('input', calcVentaTotal);
  var brv=eid('btnRegistrarVenta'); if(brv) brv.addEventListener('click', registrarVenta);

  // Compras
  var cp=eid('compraProducto');  if(cp) cp.addEventListener('change', onCompraProductoChange);
  var cc=eid('compraCantidad');  if(cc) cc.addEventListener('input', calcCompraTotal);
  var cpr=eid('compraPrecio');   if(cpr) cpr.addEventListener('input', calcCompraTotal);
  var brc=eid('btnRegistrarCompra'); if(brc) brc.addEventListener('click', registrarCompra);

  // Movimientos
  var fmt2=eid('filterMovType'); if(fmt2) fmt2.addEventListener('change', renderMovimientos);

  // CSV
  var bcsv=eid('btnExportCSV'); if(bcsv) bcsv.addEventListener('click', exportCSV);
}

// ================================================================
// INIT
// ================================================================
window.addEventListener('DOMContentLoaded', function() {
  try { loadData();             } catch(e){ console.error(e); }
  try { initEvents();           } catch(e){ console.error(e); }
  try { renderEmojiPicker('🚲'); } catch(e){ console.error(e); }
  try { navigate('dashboard');  } catch(e){ console.error(e); }
});
