import { useState, useRef, useMemo, FC } from 'react';
import { 
  Download, 
  Search, 
  Trash2, 
  Printer, 
  CheckCircle2, 
  Filter,
  Package,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2pdf from 'html2pdf.js';
import { 
  Insumo, 
  INITIAL_DATA, 
  CATEGORY_MAPPING, 
  GroupedInsumos 
} from './types.ts';

// --- LOGO COMPONENT ---
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <svg viewBox="0 0 100 100" className="w-10 h-10 print:w-12 print:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10L90 50L50 90L10 50L50 10Z" stroke="#C83E2D" strokeWidth="4" />
      <path d="M50 25L75 50L50 75L25 50L50 25Z" stroke="#C83E2D" strokeWidth="2" />
      <rect x="45" y="45" width="10" height="10" fill="#C83E2D" />
      <path d="M20 30L30 20M70 20L80 30M80 70L70 80M30 80L20 70" stroke="#C83E2D" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <div className="flex flex-col leading-tight">
      <span className="text-xl font-black tracking-tighter text-brand-ink print:text-black">METATE</span>
      <span className="text-[10px] font-bold text-brand-accent tracking-[.3em] uppercase">Grill</span>
    </div>
  </div>
);

// --- COMPONENT: DOCUMENT HEADER ---
const DocumentHeader = () => (
  <header className="px-6 py-8 border-b-2 border-brand-accent flex justify-between items-center gap-8 print:px-0 print:border-brand-accent">
    <div className="flex-1 flex items-center gap-4">
      <Logo />
      <div className="h-10 w-[1px] bg-brand-border mx-2" />
      <div>
        <h2 className="text-lg font-extrabold text-brand-ink uppercase tracking-tight print:text-black">Solicitud de Insumos</h2>
        <div className="flex items-center gap-2 text-brand-ink-dim text-[11px] print:text-gray-600">
          <span className="font-mono text-brand-accent">FOLIO: SI-2026-0042</span>
          <span className="opacity-30">•</span>
          <span>Dep. Producción</span>
        </div>
      </div>
    </div>
    
    <div className="hidden lg:flex flex-col items-end gap-1">
      <div className="text-[10px] font-bold text-brand-ink-dim uppercase">Estatus</div>
      <div className="flex items-center gap-1.5 bg-brand-accent-dim/20 border border-brand-accent/20 px-3 py-1 rounded-full text-brand-accent">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span className="text-[10px] font-black tracking-widest uppercase italic">Autorizada</span>
      </div>
    </div>
  </header>
);

// --- COMPONENT: CATEGORY SECTION ---
interface InventorySectionProps {
  category: string;
  data: GroupedInsumos[string];
  itemStartIndex: number;
}

const InventorySection: FC<InventorySectionProps> = ({ 
  category, 
  data, 
  itemStartIndex 
}) => (
  <section className="mb-10 break-inside-avoid print:mb-8">
    <div className="flex items-center gap-3 mb-4 sticky top-0 bg-brand-surface py-2 print:static print:bg-transparent">
      <div className="h-1.5 w-8 bg-brand-accent rounded-full" />
      <h4 className="text-[12px] font-black text-brand-ink uppercase tracking-[2px]">{category}</h4>
      <div className="flex-1 h-[1px] bg-brand-border opacity-20" />
      <span className="text-[9px] font-bold text-brand-ink-dim bg-brand-surface-light px-2 py-0.5 rounded border border-brand-border h-fit">
        {data.items.length} LÍNEAS
      </span>
    </div>
    
    <div className="overflow-hidden border border-brand-border rounded-lg print:border-gray-200">
      <table className="w-full border-collapse">
        <thead className="bg-brand-surface-light print:bg-gray-100">
          <tr className="border-b border-brand-border print:border-gray-200">
            <th className="py-4 px-4 text-left text-[10px] uppercase tracking-widest text-brand-ink-dim font-bold w-16">Item</th>
            <th className="py-4 px-4 text-left text-[10px] uppercase tracking-widest text-brand-ink-dim font-bold">Producto</th>
            <th className="py-4 px-4 text-center text-[10px] uppercase tracking-widest text-brand-ink-dim font-bold w-32">Cantidad</th>
            <th className="py-4 px-4 text-center text-[10px] uppercase tracking-widest text-brand-ink-dim font-bold w-24">Unidad</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-border print:divide-gray-100">
          {data.items.map((item, idx) => (
            <tr key={item.producto} className="hover:bg-brand-surface-light/30 transition-colors print:hover:bg-transparent">
              <td className="py-3 px-4 text-[11px] font-mono text-brand-ink-dim/40 print:text-gray-400">
                {String(itemStartIndex + idx).padStart(3, '0')}
              </td>
              <td className="py-3 px-4 text-[13px] font-medium text-brand-ink print:text-black">
                {item.producto}
              </td>
              <td className="py-3 px-4 text-center font-mono font-bold text-brand-accent text-sm">
                {(item.cantidad as number).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="py-3 px-4 text-center">
                <span className="text-[10px] font-bold text-brand-ink-dim uppercase">
                  {item.unidad}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="bg-brand-bg/40 p-3 border-t border-brand-border flex justify-between items-center print:bg-gray-50 print:border-gray-200">
        <span className="text-[9px] font-black text-brand-ink-dim uppercase tracking-[3px]">Total Parcial ({category})</span>
        <div className="flex gap-4">
          {Object.entries(data.subtotals).map(([unit, qty]) => (
            <span key={unit} className="text-xs font-bold text-brand-accent flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/30" />
              {(qty as number).toLocaleString('es-MX')} 
              <span className="text-[9px] text-brand-ink-dim font-medium uppercase">{unit}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// --- MAIN APP ---
export default function App() {
  const [data, setData] = useState<Insumo[]>(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);

  // Grouped and filtered data
  const { groupedData, grandTotals, totalItems } = useMemo(() => {
    const filtered = data.filter(item => 
      item.producto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const grouped: GroupedInsumos = {};
    const totals: { [unit: string]: number } = {};

    filtered.forEach((item) => {
      const category = (function(producto: string): string {
        for (const [cat, items] of Object.entries(CATEGORY_MAPPING)) {
          if (items.includes(producto)) return cat;
        }
        return "Otros Insumos";
      })(item.producto);

      if (!grouped[category]) {
        grouped[category] = { items: [], subtotals: {} };
      }
      grouped[category].items.push(item);

      if (!grouped[category].subtotals[item.unidad]) {
        grouped[category].subtotals[item.unidad] = 0;
      }
      grouped[category].subtotals[item.unidad] += item.cantidad;

      if (!totals[item.unidad]) {
        totals[item.unidad] = 0;
      }
      totals[item.unidad] += item.cantidad;
    });

    return { 
      groupedData: grouped, 
      grandTotals: totals, 
      totalItems: filtered.length 
    };
  }, [data, searchTerm]);

  /**
   * Enhanced PDF Export Handler with Proper Pagination
   */
  const handleExportPdf = async () => {
    if (!documentRef.current) return;
    
    setIsExporting(true);
    const element = documentRef.current;
    
    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: `METATE-GRILL-SOLICITUD-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        // CRITICAL: We avoid background colors that might use oklab internally
        backgroundColor: '#0C0C0C' 
      },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'] as any, // Avoid breaking inside sections/tables
        after: '.group-section' 
      }
    };

    try {
      // Temporary injection of clean styles for PDF engine
      const style = document.createElement('style');
      style.innerHTML = `
        /* Force hex colors for PDF engine to avoid oklab errors */
        .document-container { color: #FFFFFF !important; }
        .document-container .text-brand-accent { color: #C83E2D !important; }
        .document-container .text-brand-ink-dim { color: #999999 !important; }
        .document-container .bg-brand-surface { background-color: #161616 !important; }
        .document-container .bg-brand-surface-light { background-color: #222222 !important; }
        .document-container .border-brand-border { border-color: #2A2A2A !important; }
        .group-section { page-break-inside: avoid !important; }
        tr { page-break-inside: avoid !important; }
      `;
      document.head.appendChild(style);

      await html2pdf().set(opt).from(element).save();
      
      document.head.removeChild(style);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => window.print();

  const updateQuantity = (producto: string, newQty: number) => {
    setData(prev => prev.map(item => 
      item.producto === producto ? { ...item, cantidad: newQty } : item
    ));
  };

  const removeItem = (producto: string) => {
    setData(prev => prev.filter(p => p.producto !== producto));
  };

  let globalItemCounter = 1;

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col lg:flex-row p-0 lg:p-6 gap-6 overflow-hidden max-h-screen">
      {/* SIDEBAR */}
      <aside className="no-print lg:w-72 flex flex-col gap-6 shrink-0 h-full overflow-y-auto lg:overflow-visible">
        <Logo className="mb-2" />

        <div className="space-y-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-ink-dim group-focus-within:text-brand-accent w-4 h-4 transition-colors" />
            <input 
              type="text" 
              placeholder="Filtro rápido..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-brand-surface border border-brand-border rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent text-sm text-brand-ink transition-all placeholder:text-brand-ink-dim/40"
            />
          </div>

          <div className="flex flex-col gap-2">
            <button 
              onClick={handleExportPdf}
              disabled={isExporting}
              className="flex items-center justify-center gap-2 bg-brand-accent hover:brightness-110 text-white px-4 py-3 rounded-xl font-bold text-xs transition-all shadow-lg shadow-brand-accent/20 disabled:opacity-50 active:scale-95"
            >
              {isExporting ? <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" /> : <Download className="w-4 h-4" />}
              PDF PROFESIONAL
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 bg-brand-surface-light border border-brand-border hover:bg-brand-surface text-brand-ink px-4 py-3 rounded-xl font-bold text-xs transition-all"
            >
              <Printer className="w-4 h-4 text-brand-ink-dim" />
              IMPRESIÓN LOCAL
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col gap-3">
          <div className="flex items-center justify-between text-[11px] font-black text-brand-ink-dim uppercase px-2">
            <span className="flex items-center gap-2"><Filter className="w-3 h-3" /> Listado</span>
            <span className="text-brand-accent">{totalItems} Ítems</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-brand-border">
            {data.filter(i => i.producto.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
              <motion.div 
                layout
                key={item.producto}
                className="group flex items-center justify-between p-3 bg-brand-surface border border-brand-border/50 rounded-xl hover:border-brand-accent/40 transition-all"
              >
                <div className="flex-1 min-w-0 pr-3">
                  <p className="text-[11px] font-bold text-brand-ink truncate group-hover:text-brand-accent transition-colors">{item.producto}</p>
                  <p className="text-[9px] text-brand-ink-dim font-bold uppercase">{item.unidad}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input 
                    type="number" 
                    value={item.cantidad}
                    onChange={(e) => updateQuantity(item.producto, parseFloat(e.target.value) || 0)}
                    className="w-14 px-1 py-1 text-[11px] font-black bg-brand-surface-light border border-brand-border rounded-lg text-center text-brand-accent focus:ring-1 focus:ring-brand-accent"
                  />
                  <button onClick={() => removeItem(item.producto)} className="p-1.5 text-brand-ink-dim hover:text-brand-accent transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-surface to-brand-bg border border-brand-border p-5 rounded-2xl shadow-xl no-print">
            <div className="text-[9px] uppercase tracking-[2px] text-brand-ink-dim mb-2 flex justify-between">Insumos Totales <Package className="w-3 h-3" /></div>
            <div className="text-3xl font-black text-brand-accent tracking-tighter leading-none">{data.length}</div>
            <div className="mt-3 overflow-hidden rounded-full h-1 bg-brand-border">
              <div className="h-full bg-brand-accent w-3/4 rounded-full" />
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT Area */}
      <main className="flex-1 bg-brand-surface border border-brand-border rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-full print:bg-white print:border-none print:shadow-none print:rounded-none">
        <div className="flex-1 overflow-y-auto p-4 lg:p-10 flex justify-center print:overflow-visible print:p-0">
          <div 
            ref={documentRef}
            className="document-container w-full max-w-[210mm] min-h-[297mm] bg-brand-surface text-brand-ink print:bg-white print:text-black"
          >
            <DocumentHeader />

            <div className="p-8 space-y-2 mt-4 print:px-0">
              {(Object.entries(groupedData) as [string, GroupedInsumos[string]][]).map(([category, catData]) => {
                const section = <InventorySection key={category} category={category} data={catData} itemStartIndex={globalItemCounter} />;
                globalItemCounter += catData.items.length;
                return section;
              })}
            </div>

            <footer className="p-8 mt-12 border-t border-brand-border bg-brand-surface-light/30 break-inside-avoid print:px-0 print:bg-white print:border-black">
               <div className="flex items-center justify-between mb-8">
                  <h4 className="text-[10px] font-black text-brand-ink uppercase tracking-[4px]">Cubo de Resumen</h4>
                  <div className="text-[9px] text-brand-ink-dim italic">SI-2026-0042 • {new Date().toLocaleDateString('es-MX')}</div>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-16">
                 {Object.entries(grandTotals).map(([unit, qty]) => (
                   <div key={unit} className="bg-brand-surface border border-brand-border p-4 rounded-2xl print:bg-white print:border-gray-200">
                      <div className="text-xl font-black text-brand-ink mb-0.5 print:text-black">
                        {(qty as number).toLocaleString('es-MX', { maximumFractionDigits: 1 })}
                      </div>
                      <div className="text-[10px] font-black text-brand-accent uppercase tracking-widest leading-none">{unit}</div>
                   </div>
                 ))}
               </div>

               <div className="flex justify-between gap-12 text-center">
                  {[
                    { label: "SOLICITANTE", sub: "Producción" },
                    { label: "ALMACÉN", sub: "Control" },
                    { label: "GERENCIA", sub: "Firma Autorizada", accent: true }
                  ].map((sign, i) => (
                    <div key={i} className={`flex-1 border-t-2 ${sign.accent ? 'border-brand-accent' : 'border-brand-border'} pt-4`}>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${sign.accent ? 'text-brand-accent' : 'text-brand-ink-dim'}`}>{sign.label}</span>
                      <p className="text-[9px] text-brand-ink-dim/50 italic mt-1">{sign.sub}</p>
                    </div>
                  ))}
               </div>
            </footer>
          </div>
        </div>

        {/* SYSTEM STATUS BAR */}
        <div className="no-print h-12 bg-brand-surface-light border-t border-brand-border px-6 flex justify-between items-center text-[10px] font-bold text-brand-ink-dim tracking-tight">
           <div className="flex items-center gap-6">
             <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent" /> METATE GRILL SYSTEM</span>
             <span className="opacity-20 text-lg">|</span>
             <span>ID: SI-2026-0042</span>
           </div>
           <div className="flex items-center gap-5">
             <span className="flex items-center gap-2">RED: <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /></span>
             <span>USER: CARLOS ARAICO</span>
           </div>
        </div>
      </main>
    </div>
  );
}

