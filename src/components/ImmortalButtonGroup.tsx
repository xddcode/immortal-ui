import React, { Children, ReactElement, ReactNode, isValidElement } from 'react';
import {
  METAL_MATERIALS,
  MetalMaterialId,
  MetalMaterialScope,
  WebGLBezelCanvas,
  getMetalSurfaceGradient,
  getSweepingRim,
  useMetalConfig,
} from './WebGLMetalEngine';
import { ButtonGroupContext } from './ButtonGroupContext';
import './ImmortalButtonGroup.css';

export type ImmortalButtonGroupVariant = 'default' | 'metallic' | 'recessed' | 'danger' | 'ghost' | 'link';

export interface ImmortalButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: ImmortalButtonGroupVariant;
  material?: MetalMaterialId;
  children: ReactNode;
}

export function ImmortalButtonGroup({
  orientation = 'horizontal',
  variant = 'default',
  material,
  children,
  className = '',
  role = 'group',
  style,
  ...props
}: ImmortalButtonGroupProps) {
  const { material: globalMaterial, bezelWidth, surfaceGradientAmplitude } = useMetalConfig();
  const effectiveMaterial = material || globalMaterial;
  const preset = METAL_MATERIALS[effectiveMaterial] || METAL_MATERIALS.classic;
  const rimPreset = variant === 'danger' && !material ? METAL_MATERIALS.rosegold : preset;
  const isClassic = !preset.isWebGLMetal;
  const isComposition = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === ImmortalButtonGroup,
  );
  const bezel = variant === 'link' ? '0px' : isClassic ? 'var(--container-border-width)' : `${Math.max(1, bezelWidth)}px`;
  const geometry = {
    '--immortal-button-group-radius': '12px',
    '--immortal-button-group-cap-radius': `calc(12px - ${bezel})`,
  } as React.CSSProperties;

  let outer: React.CSSProperties = {
    backgroundImage: `var(--bg-convex), ${getSweepingRim(rimPreset.cssBorderRim)}`,
    boxShadow: 'var(--shadow-convex-sm)',
  };
  let content: React.CSSProperties = {
    background: isClassic ? 'transparent' : preset.capGradient,
    color: '#f4f4f6',
  };
  if (variant === 'metallic') {
    const face = isClassic
      ? 'linear-gradient(160deg, #ffffff 0%, #d4d4d8 60%, #a1a1aa 100%)'
      : getMetalSurfaceGradient(preset, surfaceGradientAmplitude);
    outer = {
      backgroundImage: isClassic ? `${face}, ${getSweepingRim(rimPreset.cssBorderRim)}` : undefined,
      boxShadow: 'var(--shadow-convex-sm)',
    };
    content = {
      background: face,
      color: effectiveMaterial === 'obsidian' || effectiveMaterial === 'cobalt' ? '#ffffff' : '#09090b',
    };
  } else if (variant === 'recessed') {
    outer = {
      backgroundImage: `var(--bg-concave), ${getSweepingRim(rimPreset.cssBorderRimSubtle)}`,
      boxShadow: 'var(--shadow-concave)',
    };
    content = { background: 'var(--bg-concave)', color: '#a1a1aa' };
  } else if (variant === 'danger') {
    outer = {
      backgroundImage: `linear-gradient(145deg, #2a1216 0%, #13080a 60%, #1f0d10 100%), ${getSweepingRim(rimPreset.cssBorderRim)}`,
      boxShadow: 'var(--shadow-convex-sm)',
    };
    content = {
      background: 'linear-gradient(145deg, #2a1216 0%, #13080a 60%, #1f0d10 100%)',
      color: '#fda4af',
    };
  } else if (variant === 'ghost') {
    outer = { background: 'rgba(255,255,255,0.02)', boxShadow: 'none' };
    content = { background: 'transparent', color: '#d4d4d8' };
  } else if (variant === 'link') {
    outer = { background: 'transparent', boxShadow: 'none' };
    content = { background: 'transparent', color: '#a1a1aa' };
  }

  return (
    <MetalMaterialScope material={effectiveMaterial}>
      <ButtonGroupContext.Provider value={true}>
        <div
          {...props}
          role={role}
          data-orientation={orientation}
          data-composition={isComposition || undefined}
          data-variant={variant}
          style={isComposition ? style : {
            ...geometry,
            ...outer,
            padding: bezel,
            backgroundOrigin: 'padding-box, border-box',
            backgroundClip: 'padding-box, border-box',
            ...style,
          }}
          className={`immortal-button-group ${isComposition ? 'is-composition' : 'group'} ${className}`}
        >
          {!isComposition && !isClassic && variant !== 'ghost' && variant !== 'link' && (
            <WebGLBezelCanvas
              material={rimPreset.id}
              canvasWidth={360}
              canvasHeight={80}
              className="rounded-[inherit]"
            />
          )}
          <div
            data-orientation={orientation}
            style={isComposition ? undefined : content}
            className="immortal-button-group-content"
          >
            {children}
          </div>
        </div>
      </ButtonGroupContext.Provider>
    </MetalMaterialScope>
  );
}

export function ImmortalButtonGroupSeparator({
  orientation = 'vertical',
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical';
}) {
  return (
    <div
      {...props}
      aria-hidden="true"
      data-orientation={orientation}
      className={`immortal-button-group-separator ${className}`}
    />
  );
}

export function ImmortalButtonGroupText({
  render,
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  render?: ReactElement<{ className?: string; children?: ReactNode }>;
}) {
  const classes = `immortal-button-group-text ${className}`;
  if (render) {
    return React.cloneElement(render, {
      ...props,
      className: `${classes} ${render.props.className || ''}`,
      children,
    });
  }
  return <div {...props} className={classes}>{children}</div>;
}
