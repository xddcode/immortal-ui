import React, { ReactNode } from "react";
import { ArrowRight, AudioLines, GitBranch, GitFork, Minus, Plus, Search } from "lucide-react";
import { ImmortalButton, ImmortalInput } from "./ImmortalComponents";
import {
  ImmortalButtonGroup,
  ImmortalButtonGroupSeparator,
  ImmortalButtonGroupText,
  ImmortalButtonGroupVariant,
} from "./ImmortalButtonGroup";
import { CodeBlock } from "./CodeBlock";
import { MetalMaterialId } from "./WebGLMetalEngine";
import "./ButtonDocs.css";

function ExampleSection({ id, title, description, codeLabel, code, children }: {
  id: string;
  title: string;
  description: string;
  codeLabel: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="button-docs-section">
      <header className="button-docs-section-heading"><h2>{title}</h2><p>{description}</p></header>
      <div className="button-docs-preview">{children}</div>
      <CodeBlock code={code} label={codeLabel} />
    </section>
  );
}

function Example({ label, children }: { label: string; children: ReactNode }) {
  return <div className="button-docs-example"><div className="button-docs-sample">{children}</div><span>{label}</span></div>;
}

function ActionGroup({ variant, material, size = "sm" }: {
  variant?: ImmortalButtonGroupVariant;
  material?: MetalMaterialId;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <ImmortalButtonGroup variant={variant} material={material} aria-label="Project actions">
      <ImmortalButton size={size}>Preview</ImmortalButton>
      <ImmortalButtonGroupSeparator />
      <ImmortalButton size={size}>Deploy</ImmortalButton>
    </ImmortalButtonGroup>
  );
}

const variantsCode = `import { ImmortalButton } from "./components/ImmortalComponents";
import { ImmortalButtonGroup, ImmortalButtonGroupSeparator } from "./components/ImmortalButtonGroup";

export function GroupVariants() {
  return (
    <div className="flex flex-col gap-3">
      <ImmortalButtonGroup aria-label="Default actions">
        <ImmortalButton>Preview</ImmortalButton>
        <ImmortalButtonGroupSeparator />
        <ImmortalButton>Deploy</ImmortalButton>
      </ImmortalButtonGroup>
      <ImmortalButtonGroup variant="metallic" aria-label="Primary actions">
        <ImmortalButton>Preview</ImmortalButton>
        <ImmortalButtonGroupSeparator />
        <ImmortalButton>Deploy</ImmortalButton>
      </ImmortalButtonGroup>
      <ImmortalButtonGroup variant="recessed" aria-label="Secondary actions">
        <ImmortalButton>Preview</ImmortalButton>
        <ImmortalButtonGroupSeparator />
        <ImmortalButton>Deploy</ImmortalButton>
      </ImmortalButtonGroup>
      <ImmortalButtonGroup variant="danger" aria-label="Danger actions">
        <ImmortalButton>Preview</ImmortalButton>
        <ImmortalButtonGroupSeparator />
        <ImmortalButton>Delete</ImmortalButton>
      </ImmortalButtonGroup>
      <ImmortalButtonGroup variant="ghost" aria-label="Quiet actions">
        <ImmortalButton>Preview</ImmortalButton>
        <ImmortalButtonGroupSeparator />
        <ImmortalButton>Deploy</ImmortalButton>
      </ImmortalButtonGroup>
      <ImmortalButtonGroup variant="link" aria-label="Inline actions">
        <ImmortalButton>Preview</ImmortalButton>
        <ImmortalButtonGroupSeparator />
        <ImmortalButton>Deploy</ImmortalButton>
      </ImmortalButtonGroup>
    </div>
  );
}`;

const sizesCode = `import { ImmortalButton } from "./components/ImmortalComponents";
import { ImmortalButtonGroup, ImmortalButtonGroupSeparator } from "./components/ImmortalButtonGroup";

export function GroupSizes() {
  return (
    <div className="flex flex-col gap-3">
      <ImmortalButtonGroup aria-label="Small actions">
        <ImmortalButton size="sm">Preview</ImmortalButton>
        <ImmortalButtonGroupSeparator />
        <ImmortalButton size="sm">Deploy</ImmortalButton>
      </ImmortalButtonGroup>
      <ImmortalButtonGroup aria-label="Medium actions">
        <ImmortalButton size="md">Preview</ImmortalButton>
        <ImmortalButtonGroupSeparator />
        <ImmortalButton size="md">Deploy</ImmortalButton>
      </ImmortalButtonGroup>
      <ImmortalButtonGroup aria-label="Large actions">
        <ImmortalButton size="lg">Preview</ImmortalButton>
        <ImmortalButtonGroupSeparator />
        <ImmortalButton size="lg">Deploy</ImmortalButton>
      </ImmortalButtonGroup>
    </div>
  );
}`;

const iconsCode = `import { ImmortalButton } from "./components/ImmortalComponents";
import { ImmortalButtonGroup, ImmortalButtonGroupSeparator } from "./components/ImmortalButtonGroup";
import { ArrowRight, GitBranch, GitFork, Minus, Plus } from "lucide-react";

export function GroupIcons() {
  return (
    <div className="flex flex-col gap-3">
      <ImmortalButtonGroup aria-label="Branch actions">
        <ImmortalButton size="sm" icon={<GitBranch size={15} />}>New Branch</ImmortalButton>
        <ImmortalButtonGroupSeparator />
        <ImmortalButton size="sm" icon={<GitFork size={15} />} iconPosition="end">Fork</ImmortalButton>
        <ImmortalButton size="icon" aria-label="Continue" icon={<ArrowRight size={15} />} />
      </ImmortalButtonGroup>

      <ImmortalButtonGroup orientation="vertical" aria-label="Quantity controls">
        <ImmortalButton size="icon" aria-label="Increase" icon={<Plus size={16} />} />
        <ImmortalButtonGroupSeparator orientation="horizontal" />
        <ImmortalButton size="icon" aria-label="Decrease" icon={<Minus size={16} />} />
      </ImmortalButtonGroup>
    </div>
  );
}`;

const materialsCode = `import { ImmortalButton } from "./components/ImmortalComponents";
import { ImmortalButtonGroup, ImmortalButtonGroupSeparator } from "./components/ImmortalButtonGroup";

export function GroupMaterials() {
  return (
    <div className="flex flex-col gap-3">
      {["classic", "platinum", "gold", "obsidian", "cobalt", "rosegold", "emerald"].map((material) => (
        <ImmortalButtonGroup key={material} material={material} aria-label={material}>
          <ImmortalButton size="sm">Preview</ImmortalButton>
          <ImmortalButtonGroupSeparator />
          <ImmortalButton size="sm">Deploy</ImmortalButton>
        </ImmortalButtonGroup>
      ))}
    </div>
  );
}`;

const layoutCode = `import { ImmortalButton } from "./components/ImmortalComponents";
import { ImmortalButtonGroup, ImmortalButtonGroupSeparator, ImmortalButtonGroupText } from "./components/ImmortalButtonGroup";

export function GroupLayouts() {
  return (
    <div className="flex flex-col gap-4">
      <ImmortalButtonGroup orientation="vertical" aria-label="Account actions">
        <ImmortalButton size="sm">Profile</ImmortalButton>
        <ImmortalButtonGroupSeparator orientation="horizontal" />
        <ImmortalButton size="sm">Settings</ImmortalButton>
      </ImmortalButtonGroup>

      <ImmortalButtonGroup aria-label="Editor actions">
        <ImmortalButtonGroup aria-label="History actions">
          <ImmortalButton size="sm">Undo</ImmortalButton>
          <ImmortalButton size="sm">Redo</ImmortalButton>
        </ImmortalButtonGroup>
        <ImmortalButtonGroup aria-label="Publishing actions">
          <ImmortalButtonGroupText>Ready</ImmortalButtonGroupText>
          <ImmortalButton size="sm">Publish</ImmortalButton>
        </ImmortalButtonGroup>
      </ImmortalButtonGroup>
    </div>
  );
}`;

const inputCode = `import { ImmortalButton, ImmortalInput } from "./components/ImmortalComponents";
import { AudioLines, Plus, Search } from "lucide-react";

export function GroupWithInput() {
  return (
    <div className="flex flex-col gap-4">
      <div role="group" aria-label="Search projects" className="flex items-center gap-2">
        <ImmortalInput aria-label="Project query" placeholder="Search…" className="w-64" />
        <ImmortalButton size="icon" aria-label="Search" icon={<Search size={16} />} />
      </div>

      <div role="group" aria-label="Message composer" className="flex items-center gap-2">
        <ImmortalButton size="icon" aria-label="Add attachment" icon={<Plus size={16} />} />
        <div className="flex items-center gap-2">
          <ImmortalInput aria-label="Message" placeholder="Send a message…" className="w-64" />
          <ImmortalButton size="icon" aria-label="Voice input" icon={<AudioLines size={16} />} />
        </div>
      </div>
    </div>
  );
}`;

export function ButtonGroupDocsContent() {
  return (
    <>
      <ExampleSection id="preview" title="Variants" description="Each variant is one continuous surface. The Group owns the visual treatment while every child keeps its own action, icon, loading, and keyboard behavior." codeLabel="TSX · Group variants" code={variantsCode}>
        <div className="button-docs-example-grid button-group-docs-grid">
          <Example label="Default"><ActionGroup /></Example>
          <Example label="Metallic"><ActionGroup variant="metallic" /></Example>
          <Example label="Recessed"><ActionGroup variant="recessed" /></Example>
          <Example label="Danger"><ActionGroup variant="danger" /></Example>
          <Example label="Ghost"><ActionGroup variant="ghost" /></Example>
          <Example label="Link"><ActionGroup variant="link" /></Example>
        </div>
      </ExampleSection>

      <ExampleSection id="examples" title="Sizes" description="Use the existing Button sizes inside a shared group. Small, medium, and large controls keep the same proportions and optical weight." codeLabel="TSX · Group sizes" code={sizesCode}>
        <div className="button-docs-example-grid button-group-docs-grid">
          <Example label="Small"><ActionGroup size="sm" /></Example>
          <Example label="Medium"><ActionGroup size="md" /></Example>
          <Example label="Large"><ActionGroup size="lg" /></Example>
        </div>
      </ExampleSection>

      <ExampleSection id="icons" title="Icons" description="Start and end icons retain the Button API and follow the logical writing direction. Icon-only actions keep their accessible names." codeLabel="TSX · Group icons" code={iconsCode}>
        <div className="button-docs-example-grid button-docs-example-grid-wide">
          <Example label="Start, end, and icon-only">
            <ImmortalButtonGroup aria-label="Branch actions">
              <ImmortalButton size="sm" icon={<GitBranch size={15} />}>New Branch</ImmortalButton>
              <ImmortalButtonGroupSeparator />
              <ImmortalButton size="sm" icon={<GitFork size={15} />} iconPosition="end">Fork</ImmortalButton>
              <ImmortalButton size="icon" aria-label="Continue" icon={<ArrowRight size={15} />} />
            </ImmortalButtonGroup>
          </Example>
          <Example label="Icon-only group">
            <ImmortalButtonGroup orientation="vertical" aria-label="Quantity controls">
              <ImmortalButton size="icon" aria-label="Increase" icon={<Plus size={16} />} />
              <ImmortalButtonGroupSeparator orientation="horizontal" />
              <ImmortalButton size="icon" aria-label="Decrease" icon={<Minus size={16} />} />
            </ImmortalButtonGroup>
          </Example>
        </div>
      </ExampleSection>

      <ExampleSection id="materials" title="Materials" description="The same seven finishes are available at the Group level. Children inherit the material without rendering duplicate bezels." codeLabel="TSX · Group materials" code={materialsCode}>
        <div className="button-docs-example-grid button-group-docs-grid">
          <Example label="Classic Dark"><ActionGroup material="classic" /></Example>
          <Example label="Platinum"><ActionGroup material="platinum" /></Example>
          <Example label="Royal Gold"><ActionGroup material="gold" /></Example>
          <Example label="Obsidian"><ActionGroup material="obsidian" /></Example>
          <Example label="Cobalt"><ActionGroup material="cobalt" /></Example>
          <Example label="Rose Gold"><ActionGroup material="rosegold" /></Example>
          <Example label="Emerald"><ActionGroup material="emerald" /></Example>
        </div>
      </ExampleSection>

      <ExampleSection id="layout" title="Layout & composition" description="Use vertical orientation for stacked actions, separators for rhythm, text for context, and nested groups for spacing between independent surfaces." codeLabel="TSX · Layout and composition" code={layoutCode}>
        <div className="flex flex-col items-start gap-6">
          <ImmortalButtonGroup orientation="vertical" aria-label="Account actions">
            <ImmortalButton size="sm">Profile</ImmortalButton>
            <ImmortalButtonGroupSeparator orientation="horizontal" />
            <ImmortalButton size="sm">Settings</ImmortalButton>
          </ImmortalButtonGroup>
          <ImmortalButtonGroup aria-label="Editor actions">
            <ImmortalButtonGroup aria-label="History actions">
              <ImmortalButton size="sm">Undo</ImmortalButton>
              <ImmortalButton size="sm">Redo</ImmortalButton>
            </ImmortalButtonGroup>
            <ImmortalButtonGroup aria-label="Publishing actions">
              <ImmortalButtonGroupText>Ready</ImmortalButtonGroupText>
              <ImmortalButton size="sm">Publish</ImmortalButton>
            </ImmortalButtonGroup>
          </ImmortalButtonGroup>
        </div>
      </ExampleSection>

      <ExampleSection id="input" title="Input composition" description="Compose the original Input and Button with ordinary layout. Their surfaces, focus rings, materials, and behavior stay exactly the same as standalone components." codeLabel="TSX · Input composition" code={inputCode}>
        <div className="flex flex-col items-start gap-6">
          <div role="group" aria-label="Search projects" className="flex items-center gap-2">
            <ImmortalInput aria-label="Project query" placeholder="Search…" className="w-56 sm:w-64" />
            <ImmortalButton size="icon" aria-label="Search" icon={<Search size={16} />} />
          </div>
          <div role="group" aria-label="Message composer" className="flex items-center gap-2">
            <ImmortalButton size="icon" aria-label="Add attachment" icon={<Plus size={16} />} />
            <div className="flex items-center gap-2">
              <ImmortalInput aria-label="Message" placeholder="Send a message…" className="w-56 sm:w-64" />
              <ImmortalButton size="icon" aria-label="Voice input" icon={<AudioLines size={16} />} />
            </div>
          </div>
        </div>
      </ExampleSection>
    </>
  );
}
