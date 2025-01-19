import { CreateOptions } from "./types";

export async function action(options: CreateOptions) {
  console.log("Create command called with:", options);
}
