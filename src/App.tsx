import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Search, 
  Lightbulb, 
  ShieldCheck, 
  ChevronRight, 
  Download, 
  Copy, 
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

interface PatentAnalysis {
  title: string;
  analysis: {
    domain: string;
    components: string[];
    purpose: string;
  };
  keywords: string[];
  priorArt: {
    title: string;
    description: string;
    similarity: string;
  }[];
  novelty: {
    level: 'Low' | 'Medium' | 'High';
    justification: string;
  };
  document: {
    abstract: string;
    background: string;
    summary: string;
    description: string;
    claims: string[];
  };
  drawing: string;
}

const STEPS = [
  { id: 'analyze', label: 'Analyzing Invention Architecture', icon: Cpu },
  { id: 'keywords', label: 'Extracting Technical Keywords', icon: Search },
  { id: 'prior-art', label: 'Simulating Prior Art Search', icon: Layers },
  { id: 'novelty', label: 'Evaluating Novelty & Non-Obviousness', icon: Lightbulb },
  { id: 'draft', label: 'Generating Formal Patent Claims', icon: FileText },
];

export default function App() {
  const [idea, setIdea] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<PatentAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDraft = async () => {
    if (!idea.trim()) return;
    
    setIsProcessing(true);
    setResult(null);
    setError(null);
    setCurrentStep(0);

    // Simulate step progression for UI feel
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1500);

    try {
      const response = await fetch('/api/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) throw new Error('Failed to process invention');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      clearInterval(stepInterval);
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">PatentDraft <span className="text-blue-600">AI</span></h1>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
            <span>Enterprise Edition</span>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> System Ready
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          {/* Left Column: Input & Results */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Invention Disclosure</h2>
              <p className="text-gray-600 mb-6">Describe your technical invention in detail. Include components, functionality, and the problem it solves.</p>
              
              <div className="relative group">
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g., A solar-powered water filtration system using graphene-based membranes and IoT-enabled quality sensors..."
                  className="w-full h-48 p-6 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-lg leading-relaxed"
                  disabled={isProcessing}
                />
                <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-mono">
                  {idea.length} characters
                </div>
              </div>

              <button
                onClick={handleDraft}
                disabled={isProcessing || !idea.trim()}
                className={`mt-6 w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                  isProcessing || !idea.trim() 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98]'
                }`}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Processing with AI Agent...
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-5 h-5" />
                    Draft Patent Application
                  </>
                )}
              </button>
            </section>

            <AnimatePresence mode="wait">
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
                >
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                    Agent Execution Pipeline
                  </h3>
                  <div className="space-y-4">
                    {STEPS.map((step, idx) => {
                      const Icon = step.icon;
                      const isActive = idx === currentStep;
                      const isCompleted = idx < currentStep;
                      
                      return (
                        <div key={step.id} className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            isCompleted ? 'bg-green-100 text-green-600' : 
                            isActive ? 'bg-blue-100 text-blue-600 animate-pulse' : 
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                          </div>
                          <span className={`font-medium ${
                            isCompleted ? 'text-gray-500' : 
                            isActive ? 'text-blue-600' : 
                            'text-gray-400'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  {/* Analysis Overview */}
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-bold uppercase tracking-wider text-xs text-gray-500">Invention Analysis</h3>
                      <span className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded">ID: PAT-{Math.floor(Math.random() * 10000)}</span>
                    </div>
                    <div className="p-6 grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase">Technical Domain</label>
                        <p className="text-lg font-semibold text-blue-600">{result.analysis.domain}</p>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase">Novelty Rating</label>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            result.novelty.level === 'High' ? 'bg-green-100 text-green-700' :
                            result.novelty.level === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {result.novelty.level} Novelty
                          </span>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Key Components</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {result.analysis.components.map(c => (
                            <span key={c} className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium border border-gray-200">{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prior Art */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Search className="w-5 h-5 text-gray-400" />
                      Simulated Prior Art Search
                    </h3>
                    <div className="space-y-4">
                      {result.priorArt.map((art, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <h4 className="font-bold text-sm text-gray-800">{art.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{art.description}</p>
                          <div className="mt-2 flex items-center gap-2 text-xs font-medium text-blue-600">
                            <ChevronRight className="w-3 h-3" />
                            {art.similarity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Patent Document */}
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
                      <h3 className="font-bold">Generated Patent Document</h3>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => copyToClipboard(JSON.stringify(result.document, null, 2))}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-8 space-y-8 font-serif leading-relaxed text-gray-800 max-h-[600px] overflow-y-auto">
                      <div className="text-center space-y-2 mb-12">
                        <h2 className="text-2xl font-bold uppercase tracking-tight">{result.title}</h2>
                        <p className="text-sm font-sans font-bold text-gray-400 uppercase">United States Patent Application</p>
                      </div>

                      <section>
                        <h4 className="font-sans font-bold text-xs uppercase text-blue-600 mb-2">Abstract</h4>
                        <p>{result.document.abstract}</p>
                      </section>

                      <section>
                        <h4 className="font-sans font-bold text-xs uppercase text-blue-600 mb-2">Background of the Invention</h4>
                        <p>{result.document.background}</p>
                      </section>

                      <section>
                        <h4 className="font-sans font-bold text-xs uppercase text-blue-600 mb-2">Summary of the Invention</h4>
                        <p>{result.document.summary}</p>
                      </section>

                      <section>
                        <h4 className="font-sans font-bold text-xs uppercase text-blue-600 mb-2">Detailed Description</h4>
                        <p>{result.document.description}</p>
                      </section>

                      <section>
                        <h4 className="font-sans font-bold text-xs uppercase text-blue-600 mb-2">Claims</h4>
                        <div className="space-y-4">
                          {result.document.claims.map((claim, idx) => (
                            <p key={idx} className="pl-4 border-l-2 border-gray-100 italic">{claim}</p>
                          ))}
                        </div>
                      </section>

                      <section className="pt-8 border-t border-gray-100">
                        <h4 className="font-sans font-bold text-xs uppercase text-blue-600 mb-4">Technical Drawing (FIG. 1)</h4>
                        <pre className="font-mono text-xs bg-gray-50 p-6 rounded-xl border border-gray-200 overflow-x-auto">
                          {result.drawing}
                        </pre>
                      </section>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
              <h3 className="font-bold text-lg mb-2">AI Patent Agent</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Our agent uses advanced semantic analysis to evaluate technical disclosures against global patent databases.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
                  Formal Legal Language
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
                  Prior Art Simulation
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
                  Novelty Assessment
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Drafting Tips</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1"><ArrowRight className="w-4 h-4 text-blue-600" /></div>
                  <p className="text-sm text-gray-600">Be specific about the <strong>technical problem</strong> your invention solves.</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1"><ArrowRight className="w-4 h-4 text-blue-600" /></div>
                  <p className="text-sm text-gray-600">List all <strong>physical components</strong> and their interactions.</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1"><ArrowRight className="w-4 h-4 text-blue-600" /></div>
                  <p className="text-sm text-gray-600">Explain the <strong>technical advantage</strong> over existing methods.</p>
                </li>
              </ul>
            </div>

            <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center">
              <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Legal Disclaimer</p>
              <p className="text-[10px] text-gray-400 mt-2 leading-tight">
                This tool is for drafting assistance only and does not constitute legal advice. Consult a registered patent attorney for formal filings.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-200 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500">© 2026 PatentDraft AI Systems. All rights reserved.</p>
          <div className="flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">API Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

