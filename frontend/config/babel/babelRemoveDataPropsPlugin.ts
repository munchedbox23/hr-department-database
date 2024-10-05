import { PluginItem, NodePath } from "@babel/core";
import { JSXIdentifier } from "@babel/types";

export default function babelRemoveDataPropsPlugin(): PluginItem {
  return {
    visitor: {
      Program(path: NodePath, state: any) {
        const forbidden = state.opts.props || [];

        path.traverse({
          JSXIdentifier(current: NodePath<JSXIdentifier>) {
            const nodeName = current.node.name;

            if (forbidden.includes(nodeName)) {
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}
