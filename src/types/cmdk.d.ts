// src/types/cmdk.d.ts
import * as React from "react";

type CommandComponent = React.ForwardRefExoticComponent<any> & {
  Input: React.ForwardRefExoticComponent<any>;
  List: React.ForwardRefExoticComponent<any>;
  Empty: React.ForwardRefExoticComponent<any>;
  Group: React.ForwardRefExoticComponent<any>;
  Item: React.ForwardRefExoticComponent<any>;
  Separator: React.ForwardRefExoticComponent<any>;
};

export const Command: CommandComponent;
export type Command = CommandComponent;
