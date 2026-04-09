/**
 * Patent Drafting Agent
 * Simulates an AI agent that analyzes invention ideas and drafts patent documents.
 */

export interface PatentAnalysis {
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

export class PatentAgent {
  async processInvention(idea: string): Promise<PatentAnalysis> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const domain = this.extractDomain(idea);
    const components = this.extractComponents(idea);
    const keywords = this.generateKeywords(idea, domain);
    const priorArt = this.simulatePriorArt(domain, components);
    const novelty = this.evaluateNovelty(idea, priorArt);
    const title = this.generateTitle(idea, domain);

    return {
      title,
      analysis: {
        domain,
        components,
        purpose: idea.length > 100 ? idea.substring(0, 100) + '...' : idea
      },
      keywords,
      priorArt,
      novelty,
      document: {
        abstract: this.generateAbstract(idea, components),
        background: this.generateBackground(domain),
        summary: this.generateSummary(idea, components),
        description: this.generateDetailedDescription(idea, components),
        claims: this.generateClaims(title, components)
      },
      drawing: this.generateDrawing(components)
    };
  }

  private extractDomain(idea: string): string {
    const lower = idea.toLowerCase();
    if (lower.includes('software') || lower.includes('app') || lower.includes('algorithm')) return 'Computer Science / Software';
    if (lower.includes('engine') || lower.includes('machine') || lower.includes('device')) return 'Mechanical Engineering';
    if (lower.includes('circuit') || lower.includes('sensor') || lower.includes('battery')) return 'Electrical Engineering';
    if (lower.includes('medicine') || lower.includes('drug') || lower.includes('health')) return 'Biotechnology / Medical';
    return 'General Technology';
  }

  private extractComponents(idea: string): string[] {
    // Simple extraction based on common nouns or keywords
    const commonComponents = ['processor', 'sensor', 'database', 'interface', 'module', 'housing', 'linkage', 'actuator', 'controller', 'network'];
    const found = commonComponents.filter(c => idea.toLowerCase().includes(c));
    return found.length > 0 ? found : ['Primary Unit', 'Control Logic', 'Output Interface'];
  }

  private generateKeywords(idea: string, domain: string): string[] {
    const base = idea.split(' ').filter(w => w.length > 5).slice(0, 5);
    return [...new Set([...base, domain.split(' ')[0], 'Innovation', 'System'])];
  }

  private simulatePriorArt(domain: string, components: string[]) {
    return [
      {
        title: `US Patent 9,876,543: Standard ${domain} System`,
        description: `A conventional approach to ${domain.toLowerCase()} using basic ${components[0] || 'components'}.`,
        similarity: 'High - Uses similar base architecture but lacks the specific integration described.'
      },
      {
        title: `European Patent EP2345678: Advanced ${components[0] || 'Modular'} Framework`,
        description: `A modular framework for ${domain.toLowerCase()} focusing on efficiency.`,
        similarity: 'Medium - Shares functional goals but uses a different structural methodology.'
      }
    ];
  }

  private evaluateNovelty(idea: string, priorArt: any[]): { level: 'Low' | 'Medium' | 'High', justification: string } {
    if (idea.length > 200) return { level: 'High', justification: 'The invention presents a highly specific and complex integration of components not seen in current prior art.' };
    if (idea.length > 100) return { level: 'Medium', justification: 'While the base components are known, the specific configuration offers incremental improvements over existing systems.' };
    return { level: 'Low', justification: 'The core concept shares significant overlap with established methodologies in the field.' };
  }

  private generateTitle(idea: string, domain: string): string {
    return `SYSTEM AND METHOD FOR ${idea.split(' ').slice(0, 3).join(' ').toUpperCase()} IN ${domain.toUpperCase()}`;
  }

  private generateAbstract(idea: string, components: string[]): string {
    return `An automated system for implementing ${idea.toLowerCase()}. The system comprises a plurality of modules including ${components.join(', ')}, configured to operate in a synchronized manner to achieve enhanced efficiency and reliability in the specified technical domain.`;
  }

  private generateBackground(domain: string): string {
    return `In the field of ${domain}, existing solutions often struggle with scalability and precise control. Traditional methods rely on manual configurations which are prone to error. There exists a significant need for a more robust, automated approach as disclosed herein.`;
  }

  private generateSummary(idea: string, components: string[]): string {
    return `The present invention provides a novel architecture for ${idea.toLowerCase()}. By utilizing a specialized ${components[0]} in conjunction with ${components[1] || 'secondary logic'}, the system achieves a technical advantage by reducing latency and improving overall throughput.`;
  }

  private generateDetailedDescription(idea: string, components: string[]): string {
    return `Referring to the embodiments, the system initiates by receiving input data via the ${components[0]}. This data is then processed by the ${components[1] || 'central controller'} using a proprietary algorithm. The resulting output is transmitted through the ${components[2] || 'communication layer'} to the end-user interface. This configuration ensures that all technical requirements are met while maintaining a low resource footprint.`;
  }

  private generateClaims(title: string, components: string[]): string[] {
    return [
      `1. A system for ${title.toLowerCase()}, comprising: a first module for data acquisition; a second module for processing said data; and a third module for outputting results.`,
      `2. The system of claim 1, wherein the second module comprises a ${components[0]} configured to optimize resource allocation.`,
      `3. A method for operating the system of claim 1, comprising the steps of: acquiring raw input; processing said input via a specialized logic; and generating a technical report.`
    ];
  }

  private generateDrawing(components: string[]): string {
    const c1 = components[0] || 'Input';
    const c2 = components[1] || 'Processor';
    const c3 = components[2] || 'Output';
    
    return `
    [ USER IDEA ] 
          |
          v
    +--------------+
    |  ${c1.padEnd(10)}  |
    +--------------+
          |
          v
    +--------------+
    |  ${c2.padEnd(10)}  |
    +--------------+
          |
          v
    +--------------+
    |  ${c3.padEnd(10)}  |
    +--------------+
          |
          v
    [ PATENT DOC ]
    `;
  }
}
