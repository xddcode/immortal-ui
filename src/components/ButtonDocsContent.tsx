import React, { ReactNode } from "react";
import { ArrowRight, Check, Copy, Download, GitBranch, GitFork } from "lucide-react";
import { ImmortalButton } from "./ImmortalComponents";
import { CodeBlock } from "./CodeBlock";
import "./ButtonDocs.css";

function ExampleSection({
  id,
  title,
  description,
  codeLabel,
  code,
  children,
}: {
  id: string;
  title: string;
  description: string;
  codeLabel: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="button-docs-section">
      <header className="button-docs-section-heading">
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className="button-docs-preview">{children}</div>
      <CodeBlock code={code} label={codeLabel} />
    </section>
  );
}

function Example({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="button-docs-example">
      <div className="button-docs-sample">{children}</div>
      <span>{label}</span>
    </div>
  );
}

const variantsCode = `import { ImmortalButton } from "./components/ImmortalComponents";

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-3">
      <ImmortalButton>Default</ImmortalButton>
      <ImmortalButton variant="metallic">Metallic</ImmortalButton>
      <ImmortalButton variant="recessed">Recessed</ImmortalButton>
      <ImmortalButton variant="danger">Danger</ImmortalButton>
      <ImmortalButton variant="ghost">Ghost</ImmortalButton>
      <ImmortalButton variant="link">Link</ImmortalButton>
    </div>
  );
}`;

const sizesCode = `import { ImmortalButton } from "./components/ImmortalComponents";

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-3">
      <ImmortalButton size="sm">Small</ImmortalButton>
      <ImmortalButton size="md">Medium</ImmortalButton>
      <ImmortalButton size="lg">Large</ImmortalButton>
    </div>
  );
}`;

const iconsCode = `import { ImmortalButton } from "./components/ImmortalComponents";
import { ArrowRight, GitBranch, GitFork } from "lucide-react";

export function ButtonIcons() {
  return (
    <div className="flex items-center gap-3">
      <ImmortalButton icon={<GitBranch size={16} />}>
        New Branch
      </ImmortalButton>
      <ImmortalButton icon={<GitFork size={16} />} iconPosition="end">
        Fork
      </ImmortalButton>
      <ImmortalButton
        size="icon"
        aria-label="Continue"
        icon={<ArrowRight size={16} />}
      />
    </div>
  );
}`;

const statesCode = `import { ImmortalButton } from "./components/ImmortalComponents";

export function ButtonStates() {
  return (
    <div className="flex flex-wrap gap-3">
      <ImmortalButton>Ready</ImmortalButton>
      <ImmortalButton loading loadingText="Deploying...">
        Deploy
      </ImmortalButton>
      <ImmortalButton disabled>Unavailable</ImmortalButton>
    </div>
  );
}`;

const materialsCode = `import { ImmortalButton } from "./components/ImmortalComponents";

export function ButtonMaterials() {
  return (
    <div className="flex flex-wrap gap-3">
      <ImmortalButton material="classic">Classic</ImmortalButton>
      <ImmortalButton material="platinum">Platinum</ImmortalButton>
      <ImmortalButton material="gold">Gold</ImmortalButton>
      <ImmortalButton material="obsidian">Obsidian</ImmortalButton>
      <ImmortalButton material="cobalt">Cobalt</ImmortalButton>
      <ImmortalButton material="rosegold">Rose Gold</ImmortalButton>
      <ImmortalButton material="emerald">Emerald</ImmortalButton>
    </div>
  );
}`;

export function ButtonDocsContent({ htmlSnippet }: { htmlSnippet: string }) {
  return (
    <>
      <ExampleSection
        id="preview"
        title="Variants"
        description="Six levels of emphasis, built from the same interaction model. Use metallic for the primary action, quieter surfaces for secondary choices, and link for lightweight inline actions."
        codeLabel="TSX · Button variants"
        code={variantsCode}
      >
        <div className="button-docs-example-grid">
          <Example label="Default"><ImmortalButton>Default</ImmortalButton></Example>
          <Example label="Metallic"><ImmortalButton variant="metallic">Metallic</ImmortalButton></Example>
          <Example label="Recessed"><ImmortalButton variant="recessed">Recessed</ImmortalButton></Example>
          <Example label="Danger"><ImmortalButton variant="danger">Danger</ImmortalButton></Example>
          <Example label="Ghost"><ImmortalButton variant="ghost">Ghost</ImmortalButton></Example>
          <Example label="Link"><ImmortalButton variant="link">Link</ImmortalButton></Example>
        </div>
      </ExampleSection>

      <ExampleSection
        id="examples"
        title="Sizes"
        description="Compact controls, comfortable defaults, and prominent actions share the same proportions and optical weight."
        codeLabel="TSX · Button sizes"
        code={sizesCode}
      >
        <div className="button-docs-example-grid">
          <Example label="Small"><ImmortalButton size="sm">Small</ImmortalButton></Example>
          <Example label="Medium"><ImmortalButton>Medium</ImmortalButton></Example>
          <Example label="Large"><ImmortalButton size="lg">Large</ImmortalButton></Example>
        </div>
      </ExampleSection>

      <ExampleSection
        id="icons"
        title="Icons"
        description="Start and end icons follow the logical writing direction, including RTL layouts. Use icon-only buttons for compact controls and always provide an accessible name."
        codeLabel="TSX · Button icons"
        code={iconsCode}
      >
        <div className="button-docs-example-grid">
          <Example label="Start icon"><ImmortalButton className="whitespace-nowrap" icon={<GitBranch size={16} />}>New Branch</ImmortalButton></Example>
          <Example label="End icon"><ImmortalButton icon={<GitFork size={16} />} iconPosition="end">Fork</ImmortalButton></Example>
          <Example label="Icon only"><ImmortalButton size="icon" aria-label="Continue" icon={<ArrowRight size={16} />} /></Example>
        </div>
      </ExampleSection>

      <ExampleSection
        id="states"
        title="States"
        description="Loading prevents repeated actions while preserving a clear accessible state. Disabled buttons remain visible but leave the keyboard navigation order."
        codeLabel="TSX · Loading and disabled"
        code={statesCode}
      >
        <div className="button-docs-example-grid">
          <Example label="Ready"><ImmortalButton>Ready</ImmortalButton></Example>
          <Example label="Loading"><ImmortalButton loading loadingText="Deploying...">Deploy</ImmortalButton></Example>
          <Example label="Disabled"><ImmortalButton disabled>Unavailable</ImmortalButton></Example>
        </div>
      </ExampleSection>

      <ExampleSection
        id="materials"
        title="Materials"
        description="One component structure, seven finishes. Set material locally when a button needs a different finish from the rest of the interface."
        codeLabel="TSX · Local material overrides"
        code={materialsCode}
      >
        <div className="button-docs-example-grid">
          <Example label="Classic Dark"><ImmortalButton material="classic">Classic</ImmortalButton></Example>
          <Example label="Platinum"><ImmortalButton material="platinum">Platinum</ImmortalButton></Example>
          <Example label="Royal Gold"><ImmortalButton material="gold">Gold</ImmortalButton></Example>
          <Example label="Obsidian"><ImmortalButton material="obsidian">Obsidian</ImmortalButton></Example>
          <Example label="Cobalt"><ImmortalButton material="cobalt">Cobalt</ImmortalButton></Example>
          <Example label="Rose Gold"><ImmortalButton material="rosegold">Rose Gold</ImmortalButton></Example>
          <Example label="Emerald"><ImmortalButton material="emerald">Emerald</ImmortalButton></Example>
        </div>
      </ExampleSection>

      <section id="guidelines" className="button-docs-section">
        <header className="button-docs-section-heading">
          <h2>Usage guidelines</h2>
          <p>Keep the physical treatment expressive and the interaction predictable.</p>
        </header>
        <div className="button-docs-guidelines">
          <article>
            <Check size={16} />
            <div><h3>One primary action</h3><p>Use one metallic primary button in a decision area. Default, recessed, and ghost establish quieter levels.</p></div>
          </article>
          <article>
            <Check size={16} />
            <div><h3>Preserve native behavior</h3><p>Use <code>type="submit"</code> for form submission and <code>type="button"</code> for ordinary actions. Loading blocks repeat clicks.</p></div>
          </article>
          <article>
            <Check size={16} />
            <div><h3>Name every icon button</h3><p>Icon-only buttons need an <code>aria-label</code>. Visible text remains the accessible name for labeled buttons.</p></div>
          </article>
          <article>
            <Check size={16} />
            <div><h3>Use links for navigation</h3><p>Buttons perform actions. Use a semantic link when the destination is another page, route, or resource.</p></div>
          </article>
        </div>
        <div className="button-docs-download-note">
          <Download size={16} />
          <p>Keyboard focus uses a visible outline independent of the material shadow. Reduced-motion preferences apply to both CSS and WebGL effects.</p>
        </div>
      </section>

      {htmlSnippet && (
        <details className="button-docs-html-reference">
          <summary><Copy size={14} /> HTML / CSS style reference</summary>
          <p>A visual reference for the Classic surface. Use the React implementation for events, sound, and the full material system.</p>
          <CodeBlock code={htmlSnippet} label="HTML / CSS reference" />
        </details>
      )}
    </>
  );
}
