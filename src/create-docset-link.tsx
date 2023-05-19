import { DashArguments } from "./types";
import { Clipboard, launchCommand, LaunchType, showHUD, showToast, Toast } from "@raycast/api";
import { URL } from "url";

export default async function Command(props: { arguments: DashArguments }) {
  const { docset } = props.arguments;
  if (!docset) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Docset keyword is required",
    });
    return;
  }
  // todo: replace author with "RSO"
  let deeplink = `raycast://extensions/JasonJiang/dash/docset`;
  const url = new URL(deeplink);
  url.searchParams.set(
    "arguments",
    JSON.stringify({
      docset,
    })
  );
  deeplink = url.toString();
  console.log("url: ", deeplink);
  await Clipboard.copy(deeplink);
  await showHUD("Link Copied to clipboard");
  await launchCommand({
    name: "create-quicklink",
    type: LaunchType.UserInitiated,
    ownerOrAuthorName: "raycast",
    extensionName: "raycast",
    arguments: { link: deeplink },
  });
}
