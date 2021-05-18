// import * as React from 'react';
// import { PropInjector } from '@material-ui/types';
import * as CSS from 'csstype'

// Disable automatic export
export {}

// private JSS type that should be public
type JSSNormalCssProperties = CSS.Properties<number| string>

export type PropsFunc<Props extends Record<symbol, unknown>, T> = (props: any) => T

// const a: PropsFunc<typeof {}, {padding:number}> = (MyProps: MyProps) => ({ padding: MyProps.spacing })

// console.log(a)
/**
 * Allows the user to augment the properties available
 */
export type BaseCSSProperties = JSSNormalCssProperties

export interface CSSProperties extends BaseCSSProperties {
  // Allow pseudo selectors and media queries
  // `unknown` is used since TS does not allow assigning an interface without
  // an index signature to one with an index signature. This is to allow type safe
  // module augmentation.
  // Technically we want any key not typed in `BaseCSSProperties` to be of type
  // `CSSProperties` but this doesn't work. The index signature needs to cover
  // BaseCSSProperties as well. Usually you would use `BaseCSSProperties[keyof BaseCSSProperties]`
  // but this would not allow assigning React.CSSProperties to CSSProperties
  [k: string]: unknown | CSSProperties
}

export type BaseCreateCSSProperties<Props> =
| {
  [P in keyof BaseCSSProperties]:
    | BaseCSSProperties[P]
    | PropsFunc<Props, BaseCSSProperties[P]>
}
| {
  [K: string]: BaseCreateCSSProperties<Props>
}

export interface CreateCSSProperties<Props>
// extends BaseCreateCSSProperties<Props>
   {
  // Allow pseudo selectors and media queries
  [k: string]:
    | BaseCreateCSSProperties<Props>[keyof BaseCreateCSSProperties<Props>]
    | CreateCSSProperties<Props> | BaseCSSProperties
}

/**
 * This is basically the API of JSS. It defines a Map<string, CSS>,
 * where
 * - the `keys` are the class (names) that will be created
 * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
 *
 * if only `CSSProperties` are matched `Props` are inferred to `any`
 */
export type StyleRules<
  Props extends Record<symbol, unknown>,
  ClassKey extends string = string
> = Record<
  ClassKey,
  // JSS property bag
  | CSSProperties
  // JSS property bag where values are based on props
  | CreateCSSProperties<Props>
  // JSS property bag based on props
  | PropsFunc<Props, CreateCSSProperties<Props>>
>

/**
 * @internal
 */
export type StyleRulesCallback<
  Theme,
  Props extends Record<symbol, unknown>,
  ClassKey extends string = string
> = (theme: Theme) => StyleRules<Props, ClassKey>

export type Styles<
  Theme,
  Props extends Record<symbol, unknown>,
  ClassKey extends string = string
> = StyleRules<Props, ClassKey> | StyleRulesCallback<Theme, Props, ClassKey>

export type ClassNameMap<ClassKey extends string = string> = Record<
  ClassKey,
  string
>
