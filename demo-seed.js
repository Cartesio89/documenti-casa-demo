/* Dati FITTIZI per la versione demo. Nessun dato reale: importi, date e nomi sono inventati. */
'use strict';
function demoDB() {
  const T = Date.now();
  const iso = (n) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + n); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
  const db = {
    version: 1,
    meta: { updatedAt: T, calendarEmails: ['', ''], calendarAuto: false, mailbox: '', mailSenders: [] },
    docs: {}, works: {}, tags: {}, mail: {}, homes: {}, dupok: {},
  };
  db.tags = {
    t_condo: { id: 't_condo', name: 'condominio', color: '#2F4BD8', createdAt: T, updatedAt: T },
    t_garanzia: { id: 't_garanzia', name: 'garanzia', color: '#0F7B6C', createdAt: T, updatedAt: T },
    t_detr: { id: 't_detr', name: 'detraibile', color: '#9A3A06', createdAt: T, updatedAt: T },
  };
  db.works = { w_bagno: { id: 'w_bagno', name: 'Ristrutturazione bagno', notes: 'Esempio: preventivo, fatture e pratiche di un lavoro.', homeId: null, createdAt: T - 9e7, updatedAt: T } };
  let n = 0;
  const add = (f) => {
    const id = 'demo' + (++n);
    db.docs[id] = Object.assign({
      id, title: '', section: 'casa', category: 'altro', sub: '', workId: null, status: 'none', prevStatus: null,
      amount: null, docDate: iso(0), dueDate: null, paidAt: null, tags: [], notes: '', pages: [],
      source: 'manual', unseen: false, createdAt: T - n * 1000, updatedAt: T,
    }, f);
  };
  add({ title: 'Bolletta luce e gas', category: 'utenze', sub: 'Luce e gas', status: 'addebitata', amount: 86.4, docDate: iso(-20), dueDate: iso(9), notes: 'Addebito automatico sul conto.' });
  add({ title: 'Bolletta acqua', category: 'utenze', sub: 'Acqua', status: 'da_pagare', amount: 42.15, docDate: iso(-14), dueDate: iso(4) });
  add({ title: 'Internet e telefono', category: 'utenze', sub: 'Internet e telefono', status: 'addebitata', amount: 29.9, docDate: iso(-10), dueDate: iso(12) });
  add({ title: 'Tassa rifiuti', category: 'utenze', sub: 'Rifiuti', status: 'pagato', amount: 96, docDate: iso(-45), dueDate: iso(-30), paidAt: iso(-31), prevStatus: 'da_pagare' });
  add({ title: 'Condominio, rata 3', category: 'condominio', sub: 'Rate', status: 'da_pagare', amount: 210, docDate: iso(-12), dueDate: iso(18), tags: ['t_condo'] });
  add({ title: 'Verbale assemblea', category: 'condominio', sub: 'Verbali e comunicazioni', status: 'none', docDate: iso(-60), tags: ['t_condo'] });
  add({ title: 'Assicurazione casa, rinnovo', category: 'assicurazioni', sub: 'Casa', status: 'da_pagare', amount: 138, docDate: iso(-8), dueDate: iso(35) });
  add({ title: 'Bollo auto', category: 'bollo', sub: 'Auto', status: 'da_pagare', amount: 187.45, docDate: iso(-5), dueDate: iso(25) });
  add({ title: 'Rata mutuo', category: 'mutuo', sub: 'Rate', status: 'pagato', amount: 640, docDate: iso(-10), dueDate: iso(-5), paidAt: iso(-5), prevStatus: 'addebitata' });
  add({ title: 'Preventivo bagno', category: 'lavori', sub: 'Preventivi', workId: 'w_bagno', status: 'none', amount: 5800, docDate: iso(-95), tags: ['t_detr'] });
  add({ title: 'Fattura acconto bagno', category: 'lavori', sub: 'Fatture', workId: 'w_bagno', status: 'pagato', amount: 2900, docDate: iso(-80), dueDate: iso(-75), paidAt: iso(-76), prevStatus: 'da_pagare', tags: ['t_detr'] });
  add({ title: 'Fattura saldo bagno', category: 'lavori', sub: 'Fatture', workId: 'w_bagno', status: 'da_pagare', amount: 2900, docDate: iso(-6), dueDate: iso(10), tags: ['t_detr'] });
  add({ title: 'Pratica comunale (CILA)', category: 'lavori', sub: 'Pratiche e permessi', workId: 'w_bagno', status: 'none', docDate: iso(-100) });
  add({ title: 'Lavatrice, scontrino', category: 'elettro', sub: 'Scontrini', status: 'pagato', amount: 499, docDate: iso(-200), paidAt: iso(-200), tags: ['t_garanzia'] });
  add({ title: 'Lavatrice, garanzia', category: 'elettro', sub: 'Garanzie', status: 'none', docDate: iso(-200), dueDate: iso(165), tags: ['t_garanzia'], notes: 'Il campo data qui indica la fine garanzia.' });
  add({ title: 'Divano, pagamento', category: 'elettro', sub: 'Pagamenti', status: 'pagato', amount: 1150, docDate: iso(-150), paidAt: iso(-150) });
  add({ title: 'Multa ZTL centro', section: 'multe', category: 'multe', status: 'da_pagare', amount: 83, docDate: iso(-15), dueDate: iso(6) });
  add({ title: 'Multa divieto di sosta', section: 'multe', category: 'multe', status: 'pagato', amount: 41, docDate: iso(-70), dueDate: iso(-50), paidAt: iso(-55), prevStatus: 'da_pagare' });
  return db;
}
function resetDemo() {
  try { ['dcd.data', 'dcd.sha', 'dcd.dirty', 'dcd.ui', 'dcd.inbox', 'dcd.cf', 'dcd.lastHome'].forEach((k) => localStorage.removeItem(k)); } catch (e) { /* ignorato */ }
  location.hash = '#/pagamenti'; location.reload();
}
