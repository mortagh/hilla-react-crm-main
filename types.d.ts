///<reference path="node_modules/@types/react/index.d.ts"/>

/*
 * Namespace 'React' has no exported member 'StatelessComponent'
 * in formik, react-mapbox-gl
 */
declare namespace React {
  type StatelessComponent<P> = React.FunctionComponent<P>;
}